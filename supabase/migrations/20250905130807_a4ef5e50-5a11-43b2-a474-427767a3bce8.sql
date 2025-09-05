-- Insert sample academic years (only if they don't exist)
INSERT INTO public.academic_years (name, start_date, end_date, is_current) 
SELECT '2023-2024', '2023-09-01', '2024-06-30', false
WHERE NOT EXISTS (SELECT 1 FROM public.academic_years WHERE name = '2023-2024');

INSERT INTO public.academic_years (name, start_date, end_date, is_current) 
SELECT '2024-2025', '2024-09-01', '2025-06-30', true
WHERE NOT EXISTS (SELECT 1 FROM public.academic_years WHERE name = '2024-2025');

-- Insert sample universities (only if they don't exist)
INSERT INTO public.universities (code, name, address, phone, email, website, rector_name, student_count, is_active) 
SELECT 'UNAM', 'Université de Nouakchott Al Aasriya', 'Nouakchott, Mauritanie', '+222 45 25 13 82', 'contact@una.mr', 'http://www.una.mr', 'Dr. Ahmed Ould Mohamed', 0, true
WHERE NOT EXISTS (SELECT 1 FROM public.universities WHERE code = 'UNAM');

INSERT INTO public.universities (code, name, address, phone, email, website, rector_name, student_count, is_active) 
SELECT 'UIZ', 'Université Islamique de Zouerate', 'Zouerate, Mauritanie', '+222 44 59 12 34', 'contact@uiz.mr', 'http://www.uiz.mr', 'Dr. Fatima Mint Ahmed', 0, true
WHERE NOT EXISTS (SELECT 1 FROM public.universities WHERE code = 'UIZ');

INSERT INTO public.universities (code, name, address, phone, email, website, rector_name, student_count, is_active) 
SELECT 'UNA', 'Université de Nouadhibou', 'Nouadhibou, Mauritanie', '+222 45 74 82 91', 'contact@unouadhibou.mr', 'http://www.unouadhibou.mr', 'Prof. Mohamed Ould Saleh', 0, true
WHERE NOT EXISTS (SELECT 1 FROM public.universities WHERE code = 'UNA');

INSERT INTO public.universities (code, name, address, phone, email, website, rector_name, student_count, is_active) 
SELECT 'USTM', 'Université des Sciences et Technologies de Mauritanie', 'Nouakchott, Mauritanie', '+222 45 25 67 89', 'contact@ustm.mr', 'http://www.ustm.mr', 'Dr. Aminata Mint Mohamed', 0, true
WHERE NOT EXISTS (SELECT 1 FROM public.universities WHERE code = 'USTM');

-- Insert sample formations (only if they don't exist)
INSERT INTO public.formations (code, name, description, university_id, credits, duration_years, capacity, is_active) 
SELECT 'INFO-L3', 'Licence en Informatique', 'Formation de base en informatique et programmation', u.id, 180, 3, 120, true
FROM public.universities u
WHERE u.code = 'UNAM' AND NOT EXISTS (SELECT 1 FROM public.formations WHERE code = 'INFO-L3');

INSERT INTO public.formations (code, name, description, university_id, credits, duration_years, capacity, is_active) 
SELECT 'MATH-L3', 'Licence en Mathématiques', 'Formation fondamentale en mathématiques', u.id, 180, 3, 80, true
FROM public.universities u
WHERE u.code = 'UNAM' AND NOT EXISTS (SELECT 1 FROM public.formations WHERE code = 'MATH-L3');

INSERT INTO public.formations (code, name, description, university_id, credits, duration_years, capacity, is_active) 
SELECT 'ECO-L3', 'Licence en Économie', 'Formation en sciences économiques', u.id, 180, 3, 150, true
FROM public.universities u
WHERE u.code = 'UIZ' AND NOT EXISTS (SELECT 1 FROM public.formations WHERE code = 'ECO-L3');

INSERT INTO public.formations (code, name, description, university_id, credits, duration_years, capacity, is_active) 
SELECT 'DROIT-L3', 'Licence en Droit', 'Formation juridique fondamentale', u.id, 180, 3, 200, true
FROM public.universities u
WHERE u.code = 'UNA' AND NOT EXISTS (SELECT 1 FROM public.formations WHERE code = 'DROIT-L3');

INSERT INTO public.formations (code, name, description, university_id, credits, duration_years, capacity, is_active) 
SELECT 'MED-L6', 'Médecine Générale', 'Formation médicale complète', u.id, 360, 6, 50, true
FROM public.universities u
WHERE u.code = 'USTM' AND NOT EXISTS (SELECT 1 FROM public.formations WHERE code = 'MED-L6');

-- Insert some sample profiles and students for demo purposes
INSERT INTO public.profiles (user_id, first_name, last_name, email, role, phone, address, national_id, is_active) 
SELECT gen_random_uuid(), 'Ahmed', 'Ould Mohamed', 'ahmed.mohamed@student.mr', 'student', '+222 46 12 34 56', 'Tevragh Zeina, Nouakchott', '1234567890', true
WHERE NOT EXISTS (SELECT 1 FROM public.profiles WHERE email = 'ahmed.mohamed@student.mr');

INSERT INTO public.profiles (user_id, first_name, last_name, email, role, phone, address, national_id, is_active) 
SELECT gen_random_uuid(), 'Fatima', 'Mint Ahmed', 'fatima.ahmed@student.mr', 'student', '+222 46 12 34 57', 'Arafat, Nouakchott', '1234567891', true
WHERE NOT EXISTS (SELECT 1 FROM public.profiles WHERE email = 'fatima.ahmed@student.mr');

INSERT INTO public.profiles (user_id, first_name, last_name, email, role, phone, address, national_id, is_active) 
SELECT gen_random_uuid(), 'Mohamed', 'Ould Saleh', 'mohamed.saleh@student.mr', 'student', '+222 46 12 34 58', 'Ksar, Nouakchott', '1234567892', true
WHERE NOT EXISTS (SELECT 1 FROM public.profiles WHERE email = 'mohamed.saleh@student.mr');

-- Insert sample students
INSERT INTO public.students (student_number, profile_id, university_id, formation_id, academic_year_id, level, gpa, enrollment_date, is_graduated) 
SELECT 'ST2024001', p.id, u.id, f.id, ay.id, 3, 14.5, '2024-09-01', false
FROM public.profiles p, public.universities u, public.formations f, public.academic_years ay
WHERE p.email = 'ahmed.mohamed@student.mr' AND u.code = 'UNAM' AND f.code = 'INFO-L3' AND ay.is_current = true 
AND NOT EXISTS (SELECT 1 FROM public.students WHERE student_number = 'ST2024001');

INSERT INTO public.students (student_number, profile_id, university_id, formation_id, academic_year_id, level, gpa, enrollment_date, is_graduated) 
SELECT 'ST2024002', p.id, u.id, f.id, ay.id, 2, 16.2, '2023-09-01', false
FROM public.profiles p, public.universities u, public.formations f, public.academic_years ay
WHERE p.email = 'fatima.ahmed@student.mr' AND u.code = 'UNAM' AND f.code = 'MATH-L3' AND ay.is_current = true 
AND NOT EXISTS (SELECT 1 FROM public.students WHERE student_number = 'ST2024002');

INSERT INTO public.students (student_number, profile_id, university_id, formation_id, academic_year_id, level, gpa, enrollment_date, is_graduated) 
SELECT 'ST2024003', p.id, u.id, f.id, ay.id, 1, 13.8, '2024-09-01', false
FROM public.profiles p, public.universities u, public.formations f, public.academic_years ay
WHERE p.email = 'mohamed.saleh@student.mr' AND u.code = 'UIZ' AND f.code = 'ECO-L3' AND ay.is_current = true 
AND NOT EXISTS (SELECT 1 FROM public.students WHERE student_number = 'ST2024003');