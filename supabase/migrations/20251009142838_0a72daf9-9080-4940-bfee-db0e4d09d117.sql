-- Insert default admin user
INSERT INTO public.users (username, password, role)
VALUES ('admin', '123', 'admin')
ON CONFLICT (username) DO NOTHING;

-- Insert default staff user
INSERT INTO public.users (username, password, role)
VALUES ('staff', '111', 'staff')
ON CONFLICT (username) DO NOTHING;

-- Assign admin role
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM public.users
WHERE username = 'admin'
ON CONFLICT DO NOTHING;

-- Assign staff role
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'staff'::app_role
FROM public.users
WHERE username = 'staff'
ON CONFLICT DO NOTHING;