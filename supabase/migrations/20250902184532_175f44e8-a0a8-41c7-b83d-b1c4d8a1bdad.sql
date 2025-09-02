-- Create custom types
CREATE TYPE public.user_role AS ENUM ('admin', 'student', 'teacher', 'staff');
CREATE TYPE public.enrollment_status AS ENUM ('pending', 'approved', 'rejected', 'active', 'completed');
CREATE TYPE public.exam_session AS ENUM ('normal', 'catch_up');
CREATE TYPE public.scholarship_type AS ENUM ('excellence', 'social', 'research');
CREATE TYPE public.application_status AS ENUM ('pending', 'approved', 'rejected');

-- Create academic_years table
CREATE TABLE public.academic_years (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_current BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create universities table
CREATE TABLE public.universities (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE,
    address TEXT,
    phone TEXT,
    email TEXT,
    website TEXT,
    rector_name TEXT,
    student_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create formations table
CREATE TABLE public.formations (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE,
    description TEXT,
    credits INTEGER NOT NULL DEFAULT 0,
    duration_years INTEGER NOT NULL DEFAULT 3,
    capacity INTEGER DEFAULT 0,
    university_id UUID NOT NULL REFERENCES public.universities(id) ON DELETE CASCADE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profiles table for user data
CREATE TABLE public.profiles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role NOT NULL DEFAULT 'student',
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    date_of_birth DATE,
    national_id TEXT,
    address TEXT,
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create students table
CREATE TABLE public.students (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    profile_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    student_number TEXT NOT NULL UNIQUE,
    university_id UUID NOT NULL REFERENCES public.universities(id),
    formation_id UUID REFERENCES public.formations(id),
    academic_year_id UUID REFERENCES public.academic_years(id),
    level INTEGER DEFAULT 1,
    gpa DECIMAL(3,2) DEFAULT 0,
    enrollment_date DATE DEFAULT CURRENT_DATE,
    graduation_date DATE,
    is_graduated BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create teachers table
CREATE TABLE public.teachers (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    profile_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    employee_number TEXT NOT NULL UNIQUE,
    university_id UUID NOT NULL REFERENCES public.universities(id),
    department TEXT,
    title TEXT,
    specialization TEXT,
    hire_date DATE DEFAULT CURRENT_DATE,
    salary DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create courses table
CREATE TABLE public.courses (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE,
    description TEXT,
    credits INTEGER NOT NULL DEFAULT 3,
    formation_id UUID NOT NULL REFERENCES public.formations(id),
    teacher_id UUID REFERENCES public.teachers(id),
    academic_year_id UUID NOT NULL REFERENCES public.academic_years(id),
    semester INTEGER NOT NULL DEFAULT 1,
    max_students INTEGER DEFAULT 50,
    schedule JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create enrollments table
CREATE TABLE public.enrollments (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    formation_id UUID NOT NULL REFERENCES public.formations(id),
    academic_year_id UUID NOT NULL REFERENCES public.academic_years(id),
    status enrollment_status NOT NULL DEFAULT 'pending',
    enrollment_date DATE DEFAULT CURRENT_DATE,
    validation_date DATE,
    validated_by UUID REFERENCES public.profiles(id),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(student_id, formation_id, academic_year_id)
);

-- Create exams table
CREATE TABLE public.exams (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id UUID NOT NULL REFERENCES public.courses(id),
    name TEXT NOT NULL,
    exam_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    location TEXT,
    session exam_session NOT NULL DEFAULT 'normal',
    max_score DECIMAL(5,2) DEFAULT 20.00,
    coefficient DECIMAL(3,2) DEFAULT 1.00,
    instructions TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create exam_results table
CREATE TABLE public.exam_results (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    exam_id UUID NOT NULL REFERENCES public.exams(id),
    student_id UUID NOT NULL REFERENCES public.students(id),
    score DECIMAL(5,2),
    grade TEXT,
    is_passed BOOLEAN,
    comments TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(exam_id, student_id)
);

-- Create scholarships table
CREATE TABLE public.scholarships (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    type scholarship_type NOT NULL,
    description TEXT,
    amount DECIMAL(10,2) NOT NULL,
    duration_months INTEGER NOT NULL DEFAULT 12,
    max_recipients INTEGER DEFAULT 10,
    criteria TEXT,
    academic_year_id UUID NOT NULL REFERENCES public.academic_years(id),
    deadline DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create scholarship_applications table
CREATE TABLE public.scholarship_applications (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    scholarship_id UUID NOT NULL REFERENCES public.scholarships(id),
    student_id UUID NOT NULL REFERENCES public.students(id),
    status application_status NOT NULL DEFAULT 'pending',
    application_date DATE DEFAULT CURRENT_DATE,
    decision_date DATE,
    decision_by UUID REFERENCES public.profiles(id),
    motivation_letter TEXT,
    documents JSONB,
    score DECIMAL(5,2),
    comments TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(scholarship_id, student_id)
);

-- Create activity_logs table
CREATE TABLE public.activity_logs (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id),
    action TEXT NOT NULL,
    resource_type TEXT NOT NULL,
    resource_id UUID,
    details JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.academic_years ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.formations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scholarships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scholarship_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Create function to get current user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE user_id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT public.get_current_user_role() = 'admin';
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

-- Create function to check if user is teacher
CREATE OR REPLACE FUNCTION public.is_teacher()
RETURNS BOOLEAN AS $$
  SELECT public.get_current_user_role() = 'teacher';
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

-- Create function to check if user is student
CREATE OR REPLACE FUNCTION public.is_student()
RETURNS BOOLEAN AS $$
  SELECT public.get_current_user_role() = 'student';
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can insert profiles" ON public.profiles
    FOR INSERT WITH CHECK (public.is_admin());

-- RLS Policies for universities
CREATE POLICY "Everyone can view universities" ON public.universities
    FOR SELECT USING (true);

CREATE POLICY "Only admins can modify universities" ON public.universities
    FOR ALL USING (public.is_admin());

-- RLS Policies for formations
CREATE POLICY "Everyone can view formations" ON public.formations
    FOR SELECT USING (true);

CREATE POLICY "Only admins can modify formations" ON public.formations
    FOR ALL USING (public.is_admin());

-- RLS Policies for students
CREATE POLICY "Students can view their own data" ON public.students
    FOR SELECT USING (
        public.is_admin() OR 
        public.is_teacher() OR
        (public.is_student() AND profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()))
    );

CREATE POLICY "Only admins can modify students" ON public.students
    FOR ALL USING (public.is_admin());

-- RLS Policies for teachers
CREATE POLICY "Teachers can view their own data" ON public.teachers
    FOR SELECT USING (
        public.is_admin() OR
        (public.is_teacher() AND profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()))
    );

CREATE POLICY "Only admins can modify teachers" ON public.teachers
    FOR ALL USING (public.is_admin());

-- RLS Policies for courses
CREATE POLICY "Everyone can view courses" ON public.courses
    FOR SELECT USING (true);

CREATE POLICY "Teachers can modify their courses" ON public.courses
    FOR ALL USING (
        public.is_admin() OR
        (public.is_teacher() AND teacher_id IN (SELECT id FROM public.teachers WHERE profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())))
    );

-- RLS Policies for enrollments
CREATE POLICY "Students can view their enrollments" ON public.enrollments
    FOR SELECT USING (
        public.is_admin() OR
        public.is_teacher() OR
        (public.is_student() AND student_id IN (SELECT id FROM public.students WHERE profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())))
    );

CREATE POLICY "Students can create their enrollments" ON public.enrollments
    FOR INSERT WITH CHECK (
        public.is_admin() OR
        (public.is_student() AND student_id IN (SELECT id FROM public.students WHERE profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())))
    );

CREATE POLICY "Only admins can update enrollments" ON public.enrollments
    FOR UPDATE USING (public.is_admin());

-- RLS Policies for exams
CREATE POLICY "Everyone can view exams" ON public.exams
    FOR SELECT USING (true);

CREATE POLICY "Teachers can modify their exams" ON public.exams
    FOR ALL USING (
        public.is_admin() OR
        (public.is_teacher() AND course_id IN (SELECT id FROM public.courses WHERE teacher_id IN (SELECT id FROM public.teachers WHERE profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()))))
    );

-- RLS Policies for exam_results
CREATE POLICY "Students can view their results" ON public.exam_results
    FOR SELECT USING (
        public.is_admin() OR
        public.is_teacher() OR
        (public.is_student() AND student_id IN (SELECT id FROM public.students WHERE profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())))
    );

CREATE POLICY "Teachers can manage results for their courses" ON public.exam_results
    FOR ALL USING (
        public.is_admin() OR
        (public.is_teacher() AND exam_id IN (SELECT id FROM public.exams WHERE course_id IN (SELECT id FROM public.courses WHERE teacher_id IN (SELECT id FROM public.teachers WHERE profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())))))
    );

-- RLS Policies for scholarships
CREATE POLICY "Everyone can view scholarships" ON public.scholarships
    FOR SELECT USING (true);

CREATE POLICY "Only admins can modify scholarships" ON public.scholarships
    FOR ALL USING (public.is_admin());

-- RLS Policies for scholarship_applications
CREATE POLICY "Students can view their applications" ON public.scholarship_applications
    FOR SELECT USING (
        public.is_admin() OR
        (public.is_student() AND student_id IN (SELECT id FROM public.students WHERE profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())))
    );

CREATE POLICY "Students can create their applications" ON public.scholarship_applications
    FOR INSERT WITH CHECK (
        public.is_student() AND student_id IN (SELECT id FROM public.students WHERE profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()))
    );

CREATE POLICY "Only admins can update applications" ON public.scholarship_applications
    FOR UPDATE USING (public.is_admin());

-- RLS Policies for activity_logs
CREATE POLICY "Admins can view all logs" ON public.activity_logs
    FOR SELECT USING (public.is_admin());

CREATE POLICY "Users can view their own logs" ON public.activity_logs
    FOR SELECT USING (auth.uid() = user_id);

-- RLS Policies for academic_years
CREATE POLICY "Everyone can view academic years" ON public.academic_years
    FOR SELECT USING (true);

CREATE POLICY "Only admins can modify academic years" ON public.academic_years
    FOR ALL USING (public.is_admin());

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_universities_updated_at BEFORE UPDATE ON public.universities FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_formations_updated_at BEFORE UPDATE ON public.formations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON public.students FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON public.teachers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON public.courses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_enrollments_updated_at BEFORE UPDATE ON public.enrollments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_exams_updated_at BEFORE UPDATE ON public.exams FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_exam_results_updated_at BEFORE UPDATE ON public.exam_results FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_scholarships_updated_at BEFORE UPDATE ON public.scholarships FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_scholarship_applications_updated_at BEFORE UPDATE ON public.scholarship_applications FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_academic_years_updated_at BEFORE UPDATE ON public.academic_years FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id, first_name, last_name, email, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data ->> 'first_name', ''),
        COALESCE(NEW.raw_user_meta_data ->> 'last_name', ''),
        NEW.email,
        COALESCE((NEW.raw_user_meta_data ->> 'role')::user_role, 'student')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to handle new user creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to log activities
CREATE OR REPLACE FUNCTION public.log_activity(
    action_name TEXT,
    resource_type_name TEXT,
    resource_id_value UUID DEFAULT NULL,
    details_json JSONB DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO public.activity_logs (user_id, action, resource_type, resource_id, details)
    VALUES (auth.uid(), action_name, resource_type_name, resource_id_value, details_json);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create statistical functions
CREATE OR REPLACE FUNCTION public.get_dashboard_stats()
RETURNS JSONB AS $$
DECLARE
    result JSONB;
BEGIN
    SELECT jsonb_build_object(
        'total_students', (SELECT COUNT(*) FROM public.students),
        'total_teachers', (SELECT COUNT(*) FROM public.teachers),
        'total_universities', (SELECT COUNT(*) FROM public.universities WHERE is_active = true),
        'total_formations', (SELECT COUNT(*) FROM public.formations WHERE is_active = true),
        'pending_enrollments', (SELECT COUNT(*) FROM public.enrollments WHERE status = 'pending'),
        'active_scholarships', (SELECT COUNT(*) FROM public.scholarships WHERE is_active = true)
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create function to get enrollment statistics by formation
CREATE OR REPLACE FUNCTION public.get_enrollment_stats_by_formation()
RETURNS TABLE(formation_name TEXT, student_count BIGINT) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        f.name,
        COUNT(e.student_id)
    FROM public.formations f
    LEFT JOIN public.enrollments e ON f.id = e.formation_id AND e.status = 'active'
    WHERE f.is_active = true
    GROUP BY f.name
    ORDER BY COUNT(e.student_id) DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create function to get university statistics
CREATE OR REPLACE FUNCTION public.get_university_stats()
RETURNS TABLE(university_name TEXT, student_count BIGINT, teacher_count BIGINT) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        u.name,
        COUNT(DISTINCT s.id),
        COUNT(DISTINCT t.id)
    FROM public.universities u
    LEFT JOIN public.students s ON u.id = s.university_id
    LEFT JOIN public.teachers t ON u.id = t.university_id
    WHERE u.is_active = true
    GROUP BY u.name
    ORDER BY COUNT(DISTINCT s.id) DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create indexes for better performance
CREATE INDEX idx_students_university_id ON public.students(university_id);
CREATE INDEX idx_students_formation_id ON public.students(formation_id);
CREATE INDEX idx_teachers_university_id ON public.teachers(university_id);
CREATE INDEX idx_enrollments_student_id ON public.enrollments(student_id);
CREATE INDEX idx_enrollments_status ON public.enrollments(status);
CREATE INDEX idx_exam_results_student_id ON public.exam_results(student_id);
CREATE INDEX idx_scholarship_applications_student_id ON public.scholarship_applications(student_id);
CREATE INDEX idx_activity_logs_user_id ON public.activity_logs(user_id);
CREATE INDEX idx_activity_logs_created_at ON public.activity_logs(created_at);

-- Insert seed data for academic years
INSERT INTO public.academic_years (name, start_date, end_date, is_current) VALUES
('2024-2025', '2024-09-01', '2025-07-31', true),
('2023-2024', '2023-09-01', '2024-07-31', false),
('2025-2026', '2025-09-01', '2026-07-31', false);

-- Insert seed data for universities (Mauritanian universities)
INSERT INTO public.universities (name, code, address, phone, email, website, rector_name, is_active, latitude, longitude) VALUES
('Université de Nouakchott Al Asriya', 'UNA', 'Nouakchott, Mauritanie', '+222 45 25 26 80', 'info@una.mr', 'https://www.una.mr', 'Pr. Mohamed Yahya Ould Horma', true, 18.0735, -15.9582),
('Université de Nouadhibou', 'UN', 'Nouadhibou, Mauritanie', '+222 45 74 65 32', 'contact@un.mr', 'https://www.un.mr', 'Pr. Ahmed Ould Mohamed', true, 20.9315, -17.0347),
('Université de Kaédi', 'UK', 'Kaédi, Mauritanie', '+222 45 51 23 45', 'info@uk.mr', 'https://www.uk.mr', 'Pr. Fatima Mint Abdallahi', true, 16.1500, -13.5058),
('Institut Supérieur de Comptabilité et d''Administration des Entreprises', 'ISCAE', 'Nouakchott, Mauritanie', '+222 45 25 87 90', 'contact@iscae.mr', 'https://www.iscae.mr', 'Pr. Mohamed Ould Salem', true, 18.0735, -15.9582);

-- Insert seed data for formations
INSERT INTO public.formations (name, code, description, credits, duration_years, capacity, university_id) VALUES
('Licence en Informatique', 'LIC-INFO', 'Formation en développement logiciel et systèmes d''information', 180, 3, 50, (SELECT id FROM public.universities WHERE code = 'UNA')),
('Master en Génie Logiciel', 'MST-GL', 'Formation avancée en ingénierie logicielle', 120, 2, 30, (SELECT id FROM public.universities WHERE code = 'UNA')),
('Licence en Médecine', 'LIC-MED', 'Formation médicale générale', 360, 6, 40, (SELECT id FROM public.universities WHERE code = 'UNA')),
('Licence en Gestion', 'LIC-GEST', 'Formation en management et gestion d''entreprise', 180, 3, 60, (SELECT id FROM public.universities WHERE code = 'ISCAE')),
('Master en Finance', 'MST-FIN', 'Formation spécialisée en finance d''entreprise', 120, 2, 25, (SELECT id FROM public.universities WHERE code = 'ISCAE')),
('Licence en Génie Civil', 'LIC-GC', 'Formation en construction et infrastructures', 180, 3, 35, (SELECT id FROM public.universities WHERE code = 'UN')),
('Licence en Lettres Arabes', 'LIC-LA', 'Formation en langue et littérature arabes', 180, 3, 40, (SELECT id FROM public.universities WHERE code = 'UK'));