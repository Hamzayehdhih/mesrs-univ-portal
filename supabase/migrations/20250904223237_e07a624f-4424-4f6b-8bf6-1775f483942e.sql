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