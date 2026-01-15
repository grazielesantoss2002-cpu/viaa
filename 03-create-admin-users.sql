-- Create admin users for you and Letícia
-- IMPORTANT: Change these emails and passwords after first login!

INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
)
VALUES
  (
    gen_random_uuid(),
    'admin@viagensemilhas.com',
    crypt('ChangeMe123!', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{"name":"Admin"}',
    false,
    'authenticated'
  )
ON CONFLICT (email) DO NOTHING;

-- Note: After running this, you should:
-- 1. Login with email: admin@viagensemilhas.com and password: ChangeMe123!
-- 2. Immediately change your password
-- 3. Create accounts for yourself and Letícia with your real emails
