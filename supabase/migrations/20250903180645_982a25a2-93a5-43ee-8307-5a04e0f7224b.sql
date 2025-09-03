-- Corriger les politiques RLS pour résoudre le problème de connexion
-- Le problème: les politiques trop restrictives empêchent la création automatique de profils

-- Supprimer toutes les politiques existantes
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can insert profiles" ON public.profiles;

-- Politique 1: Les utilisateurs peuvent voir leur propre profil
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Politique 2: Les admins peuvent voir tous les profils
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (is_admin());

-- Politique 3: Les utilisateurs peuvent modifier leur propre profil
CREATE POLICY "Users can update own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Politique 4: Permettre l'insertion automatique via trigger ET par les admins
-- Cette politique permet au trigger handle_new_user de fonctionner
CREATE POLICY "Allow profile creation" 
ON public.profiles 
FOR INSERT 
WITH CHECK (
  -- Permettre si c'est un admin
  is_admin() 
  OR 
  -- Permettre si c'est l'utilisateur qui crée son propre profil
  auth.uid() = user_id
  OR
  -- Permettre l'insertion par le système (trigger)
  auth.uid() IS NULL
);