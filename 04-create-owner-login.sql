-- Create the owner user account
-- Email: viaaltitude@gmail.com
-- Password: @Nike47473528

-- First, check if user already exists and delete if so
DELETE FROM auth.users WHERE email = 'viaaltitude@gmail.com';

-- Insert the owner user directly into auth.users
-- Password hash for: @Nike47473528
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  role,
  aud
)
VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'viaaltitude@gmail.com',
  crypt('@Nike47473528', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"role":"owner"}',
  now(),
  now(),
  'authenticated',
  'authenticated'
);
