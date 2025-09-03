-- Corriger la politique d'insertion pour permettre au trigger de fonctionner
-- Le problème principal: la politique "Admins can insert profiles" empêche le trigger handle_new_user

-- Supprimer l'ancienne politique d'insertion restrictive
DROP POLICY IF EXISTS "Admins can insert profiles" ON public.profiles;

-- Créer la bonne politique d'insertion qui permet au trigger de fonctionner
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
  -- CRITIQUE: Permettre l'insertion par le système (trigger handle_new_user)
  -- Quand le trigger s'exécute, auth.uid() est NULL
  auth.uid() IS NULL
);