-- Insert sample academic years (only if they don't exist)
INSERT INTO public.academic_years (name, start_date, end_date, is_current) 
SELECT '2023-2024', '2023-09-01', '2024-06-30', false
WHERE NOT EXISTS (SELECT 1 FROM public.academic_years WHERE name = '2023-2024');

INSERT INTO public.academic_years (name, start_date, end_date, is_current) 
SELECT '2024-2025', '2024-09-01', '2025-06-30', true
WHERE NOT EXISTS (SELECT 1 FROM public.academic_years WHERE name = '2024-2025');

-- Insert sample universities (only if they don't exist)
INSERT INTO public.universities (code, name, address, phone, email, website, rector_name, student_count, is_active) 
SELECT 'UNAM', 'Université de Nouakchott Al Aasriya', 'Nouakchott, Mauritanie', '+222 45 25 13 82', 'contact@una.mr', 'http://www.una.mr', 'Dr. Ahmed Ould Mohamed', 12500, true
WHERE NOT EXISTS (SELECT 1 FROM public.universities WHERE code = 'UNAM');

INSERT INTO public.universities (code, name, address, phone, email, website, rector_name, student_count, is_active) 
SELECT 'UIZ', 'Université Islamique de Zouerate', 'Zouerate, Mauritanie', '+222 44 59 12 34', 'contact@uiz.mr', 'http://www.uiz.mr', 'Dr. Fatima Mint Ahmed', 3200, true
WHERE NOT EXISTS (SELECT 1 FROM public.universities WHERE code = 'UIZ');

INSERT INTO public.universities (code, name, address, phone, email, website, rector_name, student_count, is_active) 
SELECT 'UNA', 'Université de Nouadhibou', 'Nouadhibou, Mauritanie', '+222 45 74 82 91', 'contact@unouadhibou.mr', 'http://www.unouadhibou.mr', 'Prof. Mohamed Ould Saleh', 2100, true
WHERE NOT EXISTS (SELECT 1 FROM public.universities WHERE code = 'UNA');

INSERT INTO public.universities (code, name, address, phone, email, website, rector_name, student_count, is_active) 
SELECT 'USTM', 'Université des Sciences et Technologies de Mauritanie', 'Nouakchott, Mauritanie', '+222 45 25 67 89', 'contact@ustm.mr', 'http://www.ustm.mr', 'Dr. Aminata Mint Mohamed', 4800, true
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

INSERT INTO public.formations (code, name, description, university_id, credits, duration_years, capacity, is_active) 
SELECT 'GEST-L3', 'Licence en Gestion', 'Formation en management et gestion', u.id, 180, 3, 130, true
FROM public.universities u
WHERE u.code = 'UIZ' AND NOT EXISTS (SELECT 1 FROM public.formations WHERE code = 'GEST-L3');

-- Insert sample scholarships (only if they don't exist)
INSERT INTO public.scholarships (name, type, amount, duration_months, criteria, deadline, academic_year_id, max_recipients, description, is_active) 
SELECT 'Bourse Excellence MESRS', 'merit', 150000, 12, 'Moyenne générale > 16/20', '2024-12-31', ay.id, 50, 'Bourse pour les étudiants méritants', true
FROM public.academic_years ay
WHERE ay.is_current = true AND NOT EXISTS (SELECT 1 FROM public.scholarships WHERE name = 'Bourse Excellence MESRS');

INSERT INTO public.scholarships (name, type, amount, duration_months, criteria, deadline, academic_year_id, max_recipients, description, is_active) 
SELECT 'Bourse Sociale', 'need_based', 100000, 12, 'Revenu familial < 100.000 MRU/mois', '2024-11-30', ay.id, 200, 'Aide financière pour étudiants défavorisés', true
FROM public.academic_years ay
WHERE ay.is_current = true AND NOT EXISTS (SELECT 1 FROM public.scholarships WHERE name = 'Bourse Sociale');

INSERT INTO public.scholarships (name, type, amount, duration_months, criteria, deadline, academic_year_id, max_recipients, description, is_active) 
SELECT 'Bourse de Recherche', 'research', 200000, 24, 'Inscription en Master ou Doctorat', '2025-01-15', ay.id, 20, 'Soutien aux étudiants chercheurs', true
FROM public.academic_years ay
WHERE ay.is_current = true AND NOT EXISTS (SELECT 1 FROM public.scholarships WHERE name = 'Bourse de Recherche');