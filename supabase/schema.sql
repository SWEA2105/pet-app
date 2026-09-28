-- =========================================================
-- PETLUSH - SUPABASE DATABASE
-- FINAL CORRECTED VERSION
-- =========================================================


-- =========================================================
-- 1. PROFILES TABLE
-- =========================================================

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY
        REFERENCES auth.users(id)
        ON DELETE CASCADE,

    full_name TEXT,

    avatar_url TEXT,

    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles
ENABLE ROW LEVEL SECURITY;


-- Remove old profile policies
DROP POLICY IF EXISTS "Users can view own profile"
ON public.profiles;

DROP POLICY IF EXISTS "Users can update own profile"
ON public.profiles;

DROP POLICY IF EXISTS "Users can insert own profile"
ON public.profiles;


-- Create profile policies

CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (
    auth.uid() = id
);


CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (
    auth.uid() = id
)
WITH CHECK (
    auth.uid() = id
);


CREATE POLICY "Users can insert own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (
    auth.uid() = id
);


-- =========================================================
-- 2. AUTO CREATE PROFILE AFTER SIGNUP
-- =========================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN

    INSERT INTO public.profiles (
        id,
        full_name
    )
    VALUES (
        NEW.id,
        NEW.raw_user_meta_data ->> 'full_name'
    )
    ON CONFLICT (id) DO NOTHING;

    RETURN NEW;

END;
$$;


DROP TRIGGER IF EXISTS on_auth_user_created
ON auth.users;


CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();


-- =========================================================
-- 3. PETS TABLE
-- =========================================================

CREATE TABLE IF NOT EXISTS public.pets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL
        REFERENCES auth.users(id)
        ON DELETE CASCADE,

    name TEXT NOT NULL,

    species TEXT NOT NULL,

    breed TEXT,

    gender TEXT,

    date_of_birth DATE,

    weight NUMERIC,

    color TEXT,

    allergies TEXT,

    medical_notes TEXT,

    image_url TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    updated_at TIMESTAMPTZ DEFAULT NOW()
);


ALTER TABLE public.pets
ENABLE ROW LEVEL SECURITY;


-- Remove old pet policies

DROP POLICY IF EXISTS "Users can view own pets"
ON public.pets;

DROP POLICY IF EXISTS "Users can insert own pets"
ON public.pets;

DROP POLICY IF EXISTS "Users can update own pets"
ON public.pets;

DROP POLICY IF EXISTS "Users can delete own pets"
ON public.pets;


-- Create pet policies

CREATE POLICY "Users can view own pets"
ON public.pets
FOR SELECT
TO authenticated
USING (
    auth.uid() = user_id
);


CREATE POLICY "Users can insert own pets"
ON public.pets
FOR INSERT
TO authenticated
WITH CHECK (
    auth.uid() = user_id
);


CREATE POLICY "Users can update own pets"
ON public.pets
FOR UPDATE
TO authenticated
USING (
    auth.uid() = user_id
)
WITH CHECK (
    auth.uid() = user_id
);


CREATE POLICY "Users can delete own pets"
ON public.pets
FOR DELETE
TO authenticated
USING (
    auth.uid() = user_id
);


-- =========================================================
-- 4. PET IMAGE STORAGE
-- =========================================================

INSERT INTO storage.buckets (
    id,
    name,
    public
)
VALUES (
    'pet-images',
    'pet-images',
    true
)
ON CONFLICT (id)
DO UPDATE SET public = true;


-- Remove old storage policies

DROP POLICY IF EXISTS "Anyone can view pet images"
ON storage.objects;

DROP POLICY IF EXISTS "Users can upload pet images"
ON storage.objects;

DROP POLICY IF EXISTS "Users can update own pet images"
ON storage.objects;

DROP POLICY IF EXISTS "Users can delete own pet images"
ON storage.objects;


-- Anyone can view pet images

CREATE POLICY "Anyone can view pet images"
ON storage.objects
FOR SELECT
USING (
    bucket_id = 'pet-images'
);


-- Authenticated users can upload

CREATE POLICY "Users can upload pet images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'pet-images'
);


-- Users can update their own images
-- owner_id is TEXT, so convert auth.uid() to TEXT

CREATE POLICY "Users can update own pet images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
    bucket_id = 'pet-images'
    AND owner_id = auth.uid()::text
)
WITH CHECK (
    bucket_id = 'pet-images'
    AND owner_id = auth.uid()::text
);


-- Users can delete their own images

CREATE POLICY "Users can delete own pet images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
    bucket_id = 'pet-images'
    AND owner_id = auth.uid()::text
);


-- =========================================================
-- 5. REMINDERS TABLE
-- =========================================================

CREATE TABLE IF NOT EXISTS public.reminders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL
        REFERENCES auth.users(id)
        ON DELETE CASCADE,

    pet_id UUID
        REFERENCES public.pets(id)
        ON DELETE CASCADE,

    title TEXT NOT NULL,

    type TEXT NOT NULL,

    reminder_date DATE NOT NULL,

    reminder_time TIME,

    repeat_type TEXT DEFAULT 'Once',

    notes TEXT,

    is_completed BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMPTZ DEFAULT NOW()
);


ALTER TABLE public.reminders
ENABLE ROW LEVEL SECURITY;


DROP POLICY IF EXISTS "Users can CRUD own reminders"
ON public.reminders;


CREATE POLICY "Users can CRUD own reminders"
ON public.reminders
FOR ALL
TO authenticated
USING (
    auth.uid() = user_id
)
WITH CHECK (
    auth.uid() = user_id
);


-- =========================================================
-- 6. PROFILE IMAGE STORAGE
-- =========================================================

INSERT INTO storage.buckets (
    id,
    name,
    public
)
VALUES (
    'profile-images',
    'profile-images',
    true
)
ON CONFLICT (id)
DO UPDATE SET public = true;


-- Remove old profile image policies

DROP POLICY IF EXISTS "Anyone can view profile images"
ON storage.objects;

DROP POLICY IF EXISTS "Users can upload profile images"
ON storage.objects;

DROP POLICY IF EXISTS "Users can update profile images"
ON storage.objects;

DROP POLICY IF EXISTS "Users can delete profile images"
ON storage.objects;


-- Anyone can view profile images

CREATE POLICY "Anyone can view profile images"
ON storage.objects
FOR SELECT
USING (
    bucket_id = 'profile-images'
);


-- Authenticated users can upload

CREATE POLICY "Users can upload profile images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'profile-images'
);


-- Users can update their own profile image

CREATE POLICY "Users can update profile images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
    bucket_id = 'profile-images'
    AND owner_id = auth.uid()::text
)
WITH CHECK (
    bucket_id = 'profile-images'
    AND owner_id = auth.uid()::text
);


-- Users can delete their own profile image

CREATE POLICY "Users can delete profile images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
    bucket_id = 'profile-images'
    AND owner_id = auth.uid()::text
);


-- =========================================================
-- PETLUSH DATABASE SETUP COMPLETE
-- =========================================================