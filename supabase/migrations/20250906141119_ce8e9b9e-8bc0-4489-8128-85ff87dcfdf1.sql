-- Insert sample data for Mauritanian universities and educational system

-- Insert sample universities (public and private)
INSERT INTO public.universities (name, code, address, email, phone, website, rector_name, student_count, is_active) VALUES
('Université de Nouakchott Al Aasriya', 'UNA', 'Avenue Gamal Abdel Nasser, Nouakchott, Mauritanie', 'contact@una.mr', '+222 45 29 20 60', 'https://una.mr', 'Dr. Yahya Ould Moustapha', 15000, true),
('Université des Sciences, de Technologie et de Médecine', 'USTM', 'BP 880, Nouakchott, Mauritanie', 'info@ustm.mr', '+222 45 25 13 82', 'https://ustm.mr', 'Prof. Mohamed Lemine Ould Bah', 8500, true),
('Université de Nouadhibou', 'UND', 'Nouadhibou, Mauritanie', 'contact@unouadhibou.mr', '+222 45 74 50 23', 'https://unouadhibou.mr', 'Dr. Fatimetou Mint Mohamed', 3200, true),
('Institut Supérieur de Comptabilité et d''Administration des Entreprises', 'ISCAE', 'Tevragh Zeina, Nouakchott', 'iscae@iscae.mr', '+222 45 25 40 89', 'https://iscae.mr', 'Dr. Ahmed Ould Daddah', 1800, true),
('École Nationale d''Administration', 'ENA', 'Nouakchott, Mauritanie', 'ena@gov.mr', '+222 45 29 45 67', 'https://ena.gov.mr', 'M. Sidi Mohamed Ould Boubacar', 800, true);

-- Insert current academic year
INSERT INTO public.academic_years (name, start_date, end_date, is_current) VALUES
('2024-2025', '2024-09-15', '2025-07-15', true),
('2023-2024', '2023-09-15', '2024-07-15', false),
('2025-2026', '2025-09-15', '2026-07-15', false);

-- Insert sample formations (degree programs)
INSERT INTO public.formations (name, code, description, university_id, duration_years, credits, capacity, is_active) VALUES
('Licence en Informatique', 'LI', 'Formation en informatique générale et développement logiciel', (SELECT id FROM universities WHERE code = 'USTM'), 3, 180, 120, true),
('Master en Génie Logiciel', 'MGL', 'Formation avancée en développement et architecture logicielle', (SELECT id FROM universities WHERE code = 'USTM'), 2, 120, 60, true),
('Licence en Économie et Gestion', 'LEG', 'Formation en sciences économiques et gestion des entreprises', (SELECT id FROM universities WHERE code = 'UNA'), 3, 180, 200, true),
('Doctorat en Sciences Juridiques', 'DSJ', 'Formation doctorale en droit et sciences juridiques', (SELECT id FROM universities WHERE code = 'UNA'), 3, 180, 30, true),
('Licence en Médecine', 'LM', 'Formation médicale générale', (SELECT id FROM universities WHERE code = 'USTM'), 7, 420, 80, true),
('Master en Administration des Affaires', 'MBA', 'Formation en management et administration', (SELECT id FROM universities WHERE code = 'ISCAE'), 2, 120, 40, true),
('Licence en Sciences de la Marine', 'LSM', 'Formation en sciences maritimes et océanographie', (SELECT id FROM universities WHERE code = 'UND'), 3, 180, 50, true),
('Master en Administration Publique', 'MAP', 'Formation en gestion publique et politiques', (SELECT id FROM universities WHERE code = 'ENA'), 2, 120, 25, true);

-- Insert sample scholarships
INSERT INTO public.scholarships (name, type, description, amount, duration_months, max_recipients, deadline, criteria, academic_year_id, is_active) VALUES
('Bourse d''Excellence Académique', 'merit', 'Bourse destinée aux étudiants ayant obtenu les meilleures notes', 50000.00, 12, 50, '2024-12-31', 'Moyenne générale supérieure à 16/20', (SELECT id FROM academic_years WHERE is_current = true), true),
('Bourse Sociale', 'need_based', 'Aide financière pour les étudiants en situation de précarité', 30000.00, 12, 100, '2024-12-31', 'Revenus familiaux inférieurs à 100,000 MRU/an', (SELECT id FROM academic_years WHERE is_current = true), true),
('Bourse de Recherche Doctorale', 'research', 'Soutien aux étudiants en doctorat', 80000.00, 36, 20, '2024-11-30', 'Inscription en doctorat avec projet de recherche approuvé', (SELECT id FROM academic_years WHERE is_current = true), true),
('Bourse d''Études à l''Étranger', 'international', 'Programme d''échange international', 200000.00, 12, 15, '2024-10-31', 'Niveau B2 en langue étrangère, moyenne > 14/20', (SELECT id FROM academic_years WHERE is_current = true), true);

-- Insert sample profiles (will be used for students and teachers)
INSERT INTO public.profiles (user_id, first_name, last_name, email, role, phone, address, date_of_birth, national_id) VALUES
(gen_random_uuid(), 'Ahmed', 'Ould Mohamed', 'ahmed.mohamed@email.com', 'student', '+222 46 12 34 56', 'Tevragh Zeina, Nouakchott', '2000-03-15', 'A123456789'),
(gen_random_uuid(), 'Fatimetou', 'Mint Abdallahi', 'fatimetou.abdallahi@email.com', 'student', '+222 46 23 45 67', 'Arafat, Nouakchott', '1999-07-22', 'B234567890'),
(gen_random_uuid(), 'Mohamed Lemine', 'Ould Cheikh', 'mohamed.cheikh@email.com', 'teacher', '+222 46 34 56 78', 'Ksar, Nouakchott', '1985-11-08', 'C345678901'),
(gen_random_uuid(), 'Mariem', 'Mint Sidi', 'mariem.sidi@email.com', 'teacher', '+222 46 45 67 89', 'Sebkha, Nouakchott', '1982-04-12', 'D456789012'),
(gen_random_uuid(), 'Sidi Mohamed', 'Ould Brahim', 'sidi.brahim@email.com', 'admin', '+222 46 56 78 90', 'Nouakchott', '1978-09-25', 'E567890123');

-- Insert sample students
INSERT INTO public.students (student_number, profile_id, university_id, formation_id, academic_year_id, level, gpa, enrollment_date, is_graduated) VALUES
('STU2024001', (SELECT id FROM profiles WHERE email = 'ahmed.mohamed@email.com'), 
 (SELECT id FROM universities WHERE code = 'USTM'), 
 (SELECT id FROM formations WHERE code = 'LI'), 
 (SELECT id FROM academic_years WHERE is_current = true), 2, 14.5, '2023-09-15', false),
('STU2024002', (SELECT id FROM profiles WHERE email = 'fatimetou.abdallahi@email.com'), 
 (SELECT id FROM universities WHERE code = 'UNA'), 
 (SELECT id FROM formations WHERE code = 'LEG'), 
 (SELECT id FROM academic_years WHERE is_current = true), 3, 16.2, '2022-09-15', false);

-- Insert sample teachers
INSERT INTO public.teachers (employee_number, profile_id, university_id, department, title, specialization, hire_date, salary) VALUES
('TCH2020001', (SELECT id FROM profiles WHERE email = 'mohamed.cheikh@email.com'), 
 (SELECT id FROM universities WHERE code = 'USTM'), 'Informatique', 'Maître de Conférences', 'Intelligence Artificielle', '2020-09-01', 180000.00),
('TCH2019001', (SELECT id FROM profiles WHERE email = 'mariem.sidi@email.com'), 
 (SELECT id FROM universities WHERE code = 'UNA'), 'Économie', 'Professeur', 'Économie du Développement', '2019-09-01', 220000.00);

-- Insert sample courses
INSERT INTO public.courses (name, code, description, formation_id, teacher_id, academic_year_id, semester, credits, max_students) VALUES
('Programmation Python', 'INFO101', 'Introduction à la programmation avec Python', 
 (SELECT id FROM formations WHERE code = 'LI'), 
 (SELECT id FROM teachers WHERE employee_number = 'TCH2020001'), 
 (SELECT id FROM academic_years WHERE is_current = true), 1, 6, 60),
('Microéconomie', 'ECON201', 'Principes de base de la microéconomie', 
 (SELECT id FROM formations WHERE code = 'LEG'), 
 (SELECT id FROM teachers WHERE employee_number = 'TCH2019001'), 
 (SELECT id FROM academic_years WHERE is_current = true), 1, 4, 100);

-- Insert sample enrollments
INSERT INTO public.enrollments (student_id, formation_id, academic_year_id, enrollment_date, status) VALUES
((SELECT id FROM students WHERE student_number = 'STU2024001'), 
 (SELECT id FROM formations WHERE code = 'LI'), 
 (SELECT id FROM academic_years WHERE is_current = true), '2024-09-15', 'active'),
((SELECT id FROM students WHERE student_number = 'STU2024002'), 
 (SELECT id FROM formations WHERE code = 'LEG'), 
 (SELECT id FROM academic_years WHERE is_current = true), '2024-09-15', 'active');

-- Insert sample scholarship applications
INSERT INTO public.scholarship_applications (student_id, scholarship_id, application_date, status, motivation_letter, score) VALUES
((SELECT id FROM students WHERE student_number = 'STU2024002'), 
 (SELECT id FROM scholarships WHERE name = 'Bourse d''Excellence Académique'), 
 '2024-10-01', 'approved', 'Je souhaite poursuivre mes études avec excellence...', 18.5);

-- Insert sample exams
INSERT INTO public.exams (name, course_id, exam_date, start_time, end_time, location, session, max_score, coefficient) VALUES
('Examen Final Python', (SELECT id FROM courses WHERE code = 'INFO101'), '2024-12-15', '09:00', '11:00', 'Amphithéâtre A', 'normal', 20.00, 2.0),
('Contrôle Continu Microéconomie', (SELECT id FROM courses WHERE code = 'ECON201'), '2024-11-20', '14:00', '16:00', 'Salle 205', 'normal', 20.00, 1.5);

-- Insert sample exam results
INSERT INTO public.exam_results (exam_id, student_id, score, grade, is_passed, comments) VALUES
((SELECT id FROM exams WHERE name = 'Contrôle Continu Microéconomie'), 
 (SELECT id FROM students WHERE student_number = 'STU2024002'), 
 16.5, 'B+', true, 'Très bon travail, continue ainsi'),
((SELECT id FROM exams WHERE name = 'Examen Final Python'), 
 (SELECT id FROM students WHERE student_number = 'STU2024001'), 
 14.0, 'B', true, 'Bon niveau, quelques améliorations possibles');

-- Insert sample activity logs
INSERT INTO public.activity_logs (user_id, action, resource_type, resource_id, details) VALUES
((SELECT user_id FROM profiles WHERE email = 'sidi.brahim@email.com'), 'CREATE', 'student', 
 (SELECT id FROM students WHERE student_number = 'STU2024001'), 
 '{"student_number": "STU2024001", "formation": "Licence en Informatique"}'),
((SELECT user_id FROM profiles WHERE email = 'sidi.brahim@email.com'), 'APPROVE', 'scholarship_application', 
 (SELECT id FROM scholarship_applications WHERE student_id = (SELECT id FROM students WHERE student_number = 'STU2024002')), 
 '{"scholarship": "Bourse d\'Excellence Académique", "amount": 50000}');