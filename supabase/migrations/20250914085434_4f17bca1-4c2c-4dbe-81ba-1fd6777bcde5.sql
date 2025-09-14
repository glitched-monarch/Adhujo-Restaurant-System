-- Insert default user credentials
INSERT INTO users (username, password, role) VALUES 
('Staff', 'Staff123', 'staff'),
('Admin', 'Admin123', 'admin')
ON CONFLICT (username) DO UPDATE SET 
password = EXCLUDED.password,
role = EXCLUDED.role;