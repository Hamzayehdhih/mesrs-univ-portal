-- Insert sample academic years
INSERT INTO public.academic_years (name, start_date, end_date, is_current) VALUES
('2023-2024', '2023-09-01', '2024-06-30', false),
('2024-2025', '2024-09-01', '2025-06-30', true);

-- Insert sample universities
INSERT INTO public.universities (code, name, address, phone, email, website, rector_name, student_count, is_active) VALUES
('UNAM', 'Université de Nouakchott Al Aasriya', 'Nouakchott, Mauritanie', '+222 45 25 13 82', 'contact@una.mr', 'http://www.una.mr', 'Dr. Ahmed Ould Mohamed', 15000, true),
('UIZ', 'Université Islamique de Zouerate', 'Zouerate, Mauritanie', '+222 44 59 12 34', 'contact@uiz.mr', 'http://www.uiz.mr', 'Dr. Fatima Mint Ahmed', 3500, true),
('UNA', 'Université de Nouadhibou', 'Nouadhibou, Mauritanie', '+222 45 74 82 91', 'contact@unouadhibou.mr', 'http://www.unouadhibou.mr', 'Prof. Mohamed Ould Saleh', 2800, true),
('USTM', 'Université des Sciences et Technologies de Mauritanie', 'Nouakchott, Mauritanie', '+222 45 25 67 89', 'contact@ustm.mr', 'http://www.ustm.mr', 'Dr. Aminata Mint Mohamed', 4200, true);

-- Insert sample formations
INSERT INTO public.formations (code, name, description, university_id, credits, duration_years, capacity, is_active) VALUES
('INFO-L3', 'Licence en Informatique', 'Formation de base en informatique et programmation', (SELECT id FROM universities WHERE code = 'UNAM'), 180, 3, 120, true),
('MATH-L3', 'Licence en Mathématiques', 'Formation fondamentale en mathématiques', (SELECT id FROM universities WHERE code = 'UNAM'), 180, 3, 80, true),
('PHYS-L3', 'Licence en Physique', 'Formation en physique et sciences appliquées', (SELECT id FROM universities WHERE code = 'UNAM'), 180, 3, 60, true),
('BIO-L3', 'Licence en Biologie', 'Formation en sciences biologiques', (SELECT id FROM universities WHERE code = 'UNAM'), 180, 3, 100, true),
('ECO-L3', 'Licence en Économie', 'Formation en sciences économiques', (SELECT id FROM universities WHERE code = 'UIZ'), 180, 3, 150, true),
('GEST-L3', 'Licence en Gestion', 'Formation en management et gestion', (SELECT id FROM universities WHERE code = 'UIZ'), 180, 3, 120, true),
('DROIT-L3', 'Licence en Droit', 'Formation juridique fondamentale', (SELECT id FROM universities WHERE code = 'UNA'), 180, 3, 200, true),
('MED-L6', 'Médecine Générale', 'Formation médicale complète', (SELECT id FROM universities WHERE code = 'USTM'), 360, 6, 50, true);

-- Insert sample profiles (we'll need these for students and teachers)
INSERT INTO public.profiles (user_id, first_name, last_name, email, role, phone, address, national_id, is_active) VALUES
(gen_random_uuid(), 'Ahmed', 'Ould Mohamed', 'ahmed.mohamed@student.mr', 'student', '+222 46 12 34 56', 'Tevragh Zeina, Nouakchott', '1234567890', true),
(gen_random_uuid(), 'Fatima', 'Mint Ahmed', 'fatima.ahmed@student.mr', 'student', '+222 46 12 34 57', 'Arafat, Nouakchott', '1234567891', true),
(gen_random_uuid(), 'Mohamed', 'Ould Saleh', 'mohamed.saleh@student.mr', 'student', '+222 46 12 34 58', 'Ksar, Nouakchott', '1234567892', true),
(gen_random_uuid(), 'Aminata', 'Mint Mohamed', 'aminata.mohamed@student.mr', 'student', '+222 46 12 34 59', 'Sebkha, Nouakchott', '1234567893', true),
(gen_random_uuid(), 'Omar', 'Ould Ahmed', 'omar.ahmed@student.mr', 'student', '+222 46 12 34 60', 'Dar Naim, Nouakchott', '1234567894', true),
(gen_random_uuid(), 'Mariam', 'Mint Saleh', 'mariam.saleh@teacher.mr', 'teacher', '+222 46 12 35 01', 'Tevragh Zeina, Nouakchott', '9876543210', true),
(gen_random_uuid(), 'Ibrahim', 'Ould Mohamed', 'ibrahim.mohamed@teacher.mr', 'teacher', '+222 46 12 35 02', 'Arafat, Nouakchott', '9876543211', true),
(gen_random_uuid(), 'Khadija', 'Mint Ahmed', 'khadija.ahmed@teacher.mr', 'teacher', '+222 46 12 35 03', 'Ksar, Nouakchott', '9876543212', true),
(gen_random_uuid(), 'Admin', 'System', 'admin@mesrs.mr', 'admin', '+222 45 25 13 82', 'Ministère MESRS', 'ADMIN001', true);

-- Insert sample students
INSERT INTO public.students (student_number, profile_id, university_id, formation_id, academic_year_id, level, gpa, enrollment_date, is_graduated) VALUES
('ST2024001', (SELECT id FROM profiles WHERE email = 'ahmed.mohamed@student.mr'), (SELECT id FROM universities WHERE code = 'UNAM'), (SELECT id FROM formations WHERE code = 'INFO-L3'), (SELECT id FROM academic_years WHERE is_current = true), 3, 14.5, '2024-09-01', false),
('ST2024002', (SELECT id FROM profiles WHERE email = 'fatima.ahmed@student.mr'), (SELECT id FROM universities WHERE code = 'UNAM'), (SELECT id FROM formations WHERE code = 'MATH-L3'), (SELECT id FROM academic_years WHERE is_current = true), 2, 16.2, '2023-09-01', false),
('ST2024003', (SELECT id FROM profiles WHERE email = 'mohamed.saleh@student.mr'), (SELECT id FROM universities WHERE code = 'UIZ'), (SELECT id FROM formations WHERE code = 'ECO-L3'), (SELECT id FROM academic_years WHERE is_current = true), 1, 13.8, '2024-09-01', false),
('ST2024004', (SELECT id FROM profiles WHERE email = 'aminata.mohamed@student.mr'), (SELECT id FROM universities WHERE code = 'USTM'), (SELECT id FROM formations WHERE code = 'MED-L6'), (SELECT id FROM academic_years WHERE is_current = true), 2, 15.7, '2023-09-01', false),
('ST2024005', (SELECT id FROM profiles WHERE email = 'omar.ahmed@student.mr'), (SELECT id FROM universities WHERE code = 'UNA'), (SELECT id FROM formations WHERE code = 'DROIT-L3'), (SELECT id FROM academic_years WHERE is_current = true), 1, 12.3, '2024-09-01', false);

-- Insert sample teachers
INSERT INTO public.teachers (employee_number, profile_id, university_id, department, specialization, title, hire_date, salary) VALUES
('EN2020001', (SELECT id FROM profiles WHERE email = 'mariam.saleh@teacher.mr'), (SELECT id FROM universities WHERE code = 'UNAM'), 'Informatique', 'Algorithmique et Programmation', 'Maître de Conférences', '2020-09-01', 850000),
('EN2019002', (SELECT id FROM profiles WHERE email = 'ibrahim.mohamed@teacher.mr'), (SELECT id FROM universities WHERE code = 'UNAM'), 'Mathématiques', 'Analyse Mathématique', 'Professeur', '2019-09-01', 1200000),
('EN2021003', (SELECT id FROM profiles WHERE email = 'khadija.ahmed@teacher.mr'), (SELECT id FROM universities WHERE code = 'UIZ'), 'Économie', 'Économie du Développement', 'Maître Assistant', '2021-09-01', 750000);

-- Insert sample enrollments
INSERT INTO public.enrollments (student_id, formation_id, academic_year_id, status, enrollment_date, notes) VALUES
((SELECT id FROM students WHERE student_number = 'ST2024001'), (SELECT id FROM formations WHERE code = 'INFO-L3'), (SELECT id FROM academic_years WHERE is_current = true), 'active', '2024-09-01', 'Inscription régulière'),
((SELECT id FROM students WHERE student_number = 'ST2024002'), (SELECT id FROM formations WHERE code = 'MATH-L3'), (SELECT id FROM academic_years WHERE is_current = true), 'active', '2023-09-01', 'Inscription régulière'),
((SELECT id FROM students WHERE student_number = 'ST2024003'), (SELECT id FROM formations WHERE code = 'ECO-L3'), (SELECT id FROM academic_years WHERE is_current = true), 'active', '2024-09-01', 'Inscription régulière'),
((SELECT id FROM students WHERE student_number = 'ST2024004'), (SELECT id FROM formations WHERE code = 'MED-L6'), (SELECT id FROM academic_years WHERE is_current = true), 'active', '2023-09-01', 'Inscription régulière'),
((SELECT id FROM students WHERE student_number = 'ST2024005'), (SELECT id FROM formations WHERE code = 'DROIT-L3'), (SELECT id FROM academic_years WHERE is_current = true), 'pending', '2024-09-01', 'Dossier en cours de validation');

-- Insert sample scholarships
INSERT INTO public.scholarships (name, type, amount, duration_months, criteria, deadline, academic_year_id, max_recipients, description, is_active) VALUES
('Bourse Excellence MESRS', 'merit', 150000, 12, 'Moyenne générale > 16/20', '2024-12-31', (SELECT id FROM academic_years WHERE is_current = true), 50, 'Bourse pour les étudiants méritants', true),
('Bourse Sociale', 'need_based', 100000, 12, 'Revenu familial < 100.000 MRU/mois', '2024-11-30', (SELECT id FROM academic_years WHERE is_current = true), 200, 'Aide financière pour étudiants défavorisés', true),
('Bourse de Recherche', 'research', 200000, 24, 'Inscription en Master ou Doctorat', '2025-01-15', (SELECT id FROM academic_years WHERE is_current = true), 20, 'Soutien aux étudiants chercheurs', true);

-- Insert sample scholarship applications
INSERT INTO public.scholarship_applications (student_id, scholarship_id, status, application_date, motivation_letter, score) VALUES
((SELECT id FROM students WHERE student_number = 'ST2024002'), (SELECT id FROM scholarships WHERE name = 'Bourse Excellence MESRS'), 'approved', '2024-10-01', 'Je suis un étudiant passionné par les mathématiques...', 18.5),
((SELECT id FROM students WHERE student_number = 'ST2024001'), (SELECT id FROM scholarships WHERE name = 'Bourse Sociale'), 'pending', '2024-10-15', 'Ma famille a des difficultés financières...', NULL),
((SELECT id FROM students WHERE student_number = 'ST2024003'), (SELECT id FROM scholarships WHERE name = 'Bourse Sociale'), 'approved', '2024-09-20', 'Je demande cette bourse pour continuer mes études...', 15.2);

-- Update student counts in universities
UPDATE public.universities SET student_count = (
  SELECT COUNT(*) FROM public.students WHERE university_id = universities.id
) WHERE id IN (SELECT DISTINCT university_id FROM public.students);