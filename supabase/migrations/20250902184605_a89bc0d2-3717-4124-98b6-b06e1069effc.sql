-- Create storage buckets for university system
INSERT INTO storage.buckets (id, name, public) VALUES 
('profiles', 'profiles', true),
('documents', 'documents', false),
('admin-documents', 'admin-documents', false);

-- Create storage policies for profile pictures (public)
CREATE POLICY "Profile images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'profiles');

CREATE POLICY "Users can upload their own profile image" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'profiles' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own profile image" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'profiles' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own profile image" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'profiles' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Create storage policies for student documents (private)
CREATE POLICY "Students can view their own documents" 
ON storage.objects 
FOR SELECT 
USING (
  bucket_id = 'documents' AND (
    public.is_admin() OR
    auth.uid()::text = (storage.foldername(name))[1]
  )
);

CREATE POLICY "Students can upload their own documents" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'documents' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Students can update their own documents" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'documents' AND (
    public.is_admin() OR
    auth.uid()::text = (storage.foldername(name))[1]
  )
);

CREATE POLICY "Students can delete their own documents" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'documents' AND (
    public.is_admin() OR
    auth.uid()::text = (storage.foldername(name))[1]
  )
);

-- Create storage policies for admin documents (restricted)
CREATE POLICY "Only admins can view admin documents" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'admin-documents' AND public.is_admin());

CREATE POLICY "Only admins can upload admin documents" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'admin-documents' AND public.is_admin());

CREATE POLICY "Only admins can update admin documents" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'admin-documents' AND public.is_admin());

CREATE POLICY "Only admins can delete admin documents" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'admin-documents' AND public.is_admin());

-- Create additional useful functions
CREATE OR REPLACE FUNCTION public.get_recent_activities(limit_count INTEGER DEFAULT 10)
RETURNS TABLE(
    action TEXT,
    resource_type TEXT,
    resource_id UUID,
    details JSONB,
    user_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        al.action,
        al.resource_type,
        al.resource_id,
        al.details,
        CONCAT(p.first_name, ' ', p.last_name) as user_name,
        al.created_at
    FROM public.activity_logs al
    LEFT JOIN public.profiles p ON al.user_id = p.user_id
    ORDER BY al.created_at DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create function to get enrollment trends
CREATE OR REPLACE FUNCTION public.get_enrollment_trends(months_back INTEGER DEFAULT 12)
RETURNS TABLE(
    month_year TEXT,
    new_enrollments BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        TO_CHAR(e.enrollment_date, 'YYYY-MM') as month_year,
        COUNT(*) as new_enrollments
    FROM public.enrollments e
    WHERE e.enrollment_date >= (CURRENT_DATE - INTERVAL '1 month' * months_back)
    GROUP BY TO_CHAR(e.enrollment_date, 'YYYY-MM')
    ORDER BY month_year;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create function to get student performance by formation
CREATE OR REPLACE FUNCTION public.get_formation_performance()
RETURNS TABLE(
    formation_name TEXT,
    total_students BIGINT,
    average_gpa DECIMAL(3,2),
    pass_rate DECIMAL(5,2)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        f.name,
        COUNT(s.id),
        AVG(s.gpa),
        (COUNT(CASE WHEN s.gpa >= 2.0 THEN 1 END) * 100.0 / COUNT(s.id))
    FROM public.formations f
    LEFT JOIN public.students s ON f.id = s.formation_id
    WHERE f.is_active = true
    GROUP BY f.name
    HAVING COUNT(s.id) > 0
    ORDER BY AVG(s.gpa) DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;