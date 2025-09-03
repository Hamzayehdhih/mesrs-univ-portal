-- Nettoyage complet et correction des politiques RLS pour profiles
-- Résoudre le problème de connexion où rien ne s'affiche après login

-- Supprimer TOUTES les politiques existantes pour repartir de zéro
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can insert profiles" ON public.profiles;
DROP POLICY IF EXISTS "Allow profile creation" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Recréer les politiques correctes
-- 1. Lecture: Les utilisateurs peuvent voir leur propre profil
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- 2. Lecture: Les admins peuvent voir tous les profils
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (is_admin());

-- 3. Mise à jour: Les utilisateurs peuvent modifier leur propre profil
CREATE POLICY "Users can update own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- 4. Insertion: Permettre la création de profils par le trigger ET par les admins
CREATE POLICY "System and admin profile creation" 
ON public.profiles 
FOR INSERT 
WITH CHECK (
  -- Permettre aux admins
  is_admin() 
  OR 
  -- Permettre aux utilisateurs de créer leur propre profil
  auth.uid() = user_id
  OR
  -- CRUCIAL: Permettre au trigger system handle_new_user de créer des profils
  -- Le trigger s'exécute avec auth.uid() = NULL
  auth.uid() IS NULL
);