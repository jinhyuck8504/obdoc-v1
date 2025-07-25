-- Row Level Security Policies for Obdoc MVP
-- 이 파일을 schema.sql 실행 후에 Supabase SQL Editor에서 실행하세요

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Doctors table policies
CREATE POLICY "Doctors can view own data" ON doctors
  FOR SELECT USING (
    user_id = auth.uid() OR 
    auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
  );

CREATE POLICY "Doctors can update own data" ON doctors
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all doctors" ON doctors
  FOR ALL USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

-- Patients table policies
CREATE POLICY "Patients can view own data" ON patients
  FOR SELECT USING (
    user_id = auth.uid() OR
    doctor_id IN (SELECT id FROM doctors WHERE user_id = auth.uid()) OR
    auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
  );

CREATE POLICY "Doctors can manage their patients" ON patients
  FOR ALL USING (
    doctor_id IN (SELECT id FROM doctors WHERE user_id = auth.uid()) OR
    auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
  );

CREATE POLICY "Patients can update own data" ON patients
  FOR UPDATE USING (user_id = auth.uid());

-- Appointments table policies
CREATE POLICY "View appointments" ON appointments
  FOR SELECT USING (
    doctor_id IN (SELECT id FROM doctors WHERE user_id = auth.uid()) OR
    patient_id IN (SELECT id FROM patients WHERE user_id = auth.uid()) OR
    auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
  );

CREATE POLICY "Doctors can manage appointments" ON appointments
  FOR ALL USING (
    doctor_id IN (SELECT id FROM doctors WHERE user_id = auth.uid()) OR
    auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
  );

-- Community posts policies
CREATE POLICY "All patients can view community posts" ON community_posts
  FOR SELECT USING (
    auth.uid() IN (SELECT user_id FROM patients) OR
    auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
  );

CREATE POLICY "Patients can create posts" ON community_posts
  FOR INSERT WITH CHECK (
    patient_id IN (SELECT id FROM patients WHERE user_id = auth.uid())
  );

CREATE POLICY "Authors can update own posts" ON community_posts
  FOR UPDATE USING (
    patient_id IN (SELECT id FROM patients WHERE user_id = auth.uid())
  );

CREATE POLICY "Authors and admins can delete posts" ON community_posts
  FOR DELETE USING (
    patient_id IN (SELECT id FROM patients WHERE user_id = auth.uid()) OR
    auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
  );

-- Community comments policies
CREATE POLICY "All patients can view comments" ON community_comments
  FOR SELECT USING (
    auth.uid() IN (SELECT user_id FROM patients) OR
    auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
  );

CREATE POLICY "Patients can create comments" ON community_comments
  FOR INSERT WITH CHECK (
    patient_id IN (SELECT id FROM patients WHERE user_id = auth.uid())
  );

CREATE POLICY "Authors can update own comments" ON community_comments
  FOR UPDATE USING (
    patient_id IN (SELECT id FROM patients WHERE user_id = auth.uid())
  );

CREATE POLICY "Authors and admins can delete comments" ON community_comments
  FOR DELETE USING (
    patient_id IN (SELECT id FROM patients WHERE user_id = auth.uid()) OR
    auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
  );

-- Subscriptions table policies
CREATE POLICY "Doctors can view own subscriptions" ON subscriptions
  FOR SELECT USING (
    doctor_id IN (SELECT id FROM doctors WHERE user_id = auth.uid()) OR
    auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
  );

CREATE POLICY "Doctors can create subscriptions" ON subscriptions
  FOR INSERT WITH CHECK (
    doctor_id IN (SELECT id FROM doctors WHERE user_id = auth.uid())
  );

CREATE POLICY "Admins can manage all subscriptions" ON subscriptions
  FOR ALL USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));