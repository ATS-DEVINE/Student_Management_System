-- Sample Data for Student Management System
-- Database: student_management

USE student_management;

-- Insert Admin User (Password: admin123 - should be hashed in production)
INSERT INTO admin (username, password, email) VALUES
('admin', 'admin123', 'admin@college.edu');

-- Insert Sample Students
INSERT INTO students (university_uid, name, email, phone, gender, date_of_birth, address, department, course, semester, admission_date) VALUES
('2024001', 'Rahul Sharma', 'rahul.sharma@email.com', '9876543210', 'Male', '2002-05-15', '123 Main Street, Delhi', 'Computer Science', 'B.Tech', 5, '2021-08-01'),
('2024002', 'Priya Singh', 'priya.singh@email.com', '9876543211', 'Female', '2002-08-20', '456 Park Avenue, Mumbai', 'Computer Science', 'B.Tech', 5, '2021-08-01'),
('2024003', 'Amit Kumar', 'amit.kumar@email.com', '9876543212', 'Male', '2002-03-10', '789 Garden Road, Bangalore', 'Information Technology', 'B.Tech', 5, '2021-08-01'),
('2024004', 'Sneha Patel', 'sneha.patel@email.com', '9876543213', 'Female', '2002-11-25', '321 Lake View, Chennai', 'Computer Science', 'B.Tech', 3, '2023-08-01'),
('2024005', 'Vikram Reddy', 'vikram.reddy@email.com', '9876543214', 'Male', '2002-07-08', '654 Hill Station, Hyderabad', 'Electronics', 'B.Tech', 5, '2021-08-01'),
('2024006', 'Neha Gupta', 'neha.gupta@email.com', '9876543215', 'Female', '2002-09-30', '987 City Center, Kolkata', 'Information Technology', 'B.Tech', 3, '2023-08-01'),
('2024007', 'Suresh Verma', 'suresh.verma@email.com', '9876543216', 'Male', '2002-04-12', '147 Beach Road, Goa', 'Computer Science', 'B.Tech', 7, '2020-08-01'),
('2024008', 'Anjali Mehta', 'anjali.mehta@email.com', '9876543217', 'Female', '2002-06-18', '258 Mountain View, Pune', 'Electronics', 'B.Tech', 5, '2021-08-01');

-- Insert Sample Teachers
INSERT INTO teachers (name, email, phone, qualification, department, specialization, joining_date) VALUES
('Dr. Rajesh Kumar', 'rajesh.kumar@college.edu', '8888888801', 'Ph.D Computer Science', 'Computer Science', 'Data Structures', '2015-07-15'),
('Prof. Sunita Sharma', 'sunita.sharma@college.edu', '8888888802', 'M.Tech', 'Computer Science', 'Algorithms', '2016-08-01'),
('Dr. Anil Verma', 'anil.verma@college.edu', '8888888803', 'Ph.D Electronics', 'Electronics', 'Digital Electronics', '2014-06-10'),
('Prof. Meera Joshi', 'meera.joshi@college.edu', '8888888804', 'M.Tech', 'Information Technology', 'Database Systems', '2017-07-20'),
('Dr. Prakash Singh', 'prakash.singh@college.edu', '8888888805', 'Ph.D Computer Science', 'Computer Science', 'Operating Systems', '2015-01-15');

-- Insert Sample Courses
INSERT INTO courses (course_name, course_code, department, duration) VALUES
('Bachelor of Technology in Computer Science', 'BTCS', 'Computer Science', 4),
('Bachelor of Technology in Information Technology', 'BTIT', 'Information Technology', 4),
('Bachelor of Technology in Electronics', 'BTEC', 'Electronics', 4),
('Master of Computer Applications', 'MCA', 'Computer Science', 3);

-- Insert Sample Subjects
INSERT INTO subjects (subject_name, subject_code, course, semester, credits, teacher_id) VALUES
('Data Structures and Algorithms', 'CS101', 'B.Tech', 3, 4, 1),
('Operating Systems', 'CS102', 'B.Tech', 5, 4, 5),
('Database Management Systems', 'CS103', 'B.Tech', 5, 4, 4),
('Computer Networks', 'CS104', 'B.Tech', 6, 4, 2),
('Software Engineering', 'CS105', 'B.Tech', 7, 3, 1),
('Digital Electronics', 'EC101', 'B.Tech', 3, 4, 3),
('Microprocessors', 'EC102', 'B.Tech', 5, 4, 3),
('Web Technologies', 'IT101', 'B.Tech', 5, 3, 4),
('Java Programming', 'CS106', 'B.Tech', 3, 3, 1),
('Computer Organization', 'CS107', 'B.Tech', 4, 4, 5);

-- Insert Sample Attendance
INSERT INTO attendance (student_id, subject_id, attendance_date, status) VALUES
(1, 1, '2024-01-15', 'PRESENT'),
(1, 1, '2024-01-16', 'PRESENT'),
(1, 1, '2024-01-17', 'ABSENT'),
(1, 1, '2024-01-18', 'PRESENT'),
(1, 1, '2024-01-19', 'PRESENT'),
(2, 1, '2024-01-15', 'PRESENT'),
(2, 1, '2024-01-16', 'PRESENT'),
(2, 1, '2024-01-17', 'PRESENT'),
(2, 1, '2024-01-18', 'PRESENT'),
(2, 1, '2024-01-19', 'ABSENT'),
(3, 1, '2024-01-15', 'ABSENT'),
(3, 1, '2024-01-16', 'PRESENT'),
(3, 1, '2024-01-17', 'PRESENT'),
(3, 1, '2024-01-18', 'PRESENT'),
(3, 1, '2024-01-19', 'PRESENT'),
(1, 2, '2024-01-15', 'PRESENT'),
(1, 2, '2024-01-16', 'PRESENT'),
(1, 2, '2024-01-17', 'PRESENT'),
(1, 2, '2024-01-18', 'ABSENT'),
(1, 2, '2024-01-19', 'PRESENT');

-- Insert Sample Marks
INSERT INTO marks (student_id, subject_id, examination_name, marks_obtained, max_marks) VALUES
(1, 1, 'Mid Term', 85.00, 100.00),
(1, 1, 'End Term', 78.00, 100.00),
(1, 2, 'Mid Term', 92.00, 100.00),
(1, 2, 'End Term', 88.00, 100.00),
(1, 3, 'Mid Term', 75.00, 100.00),
(1, 3, 'End Term', 82.00, 100.00),
(2, 1, 'Mid Term', 90.00, 100.00),
(2, 1, 'End Term', 85.00, 100.00),
(2, 2, 'Mid Term', 88.00, 100.00),
(2, 2, 'End Term', 90.00, 100.00),
(3, 1, 'Mid Term', 72.00, 100.00),
(3, 1, 'End Term', 68.00, 100.00),
(3, 2, 'Mid Term', 80.00, 100.00),
(3, 2, 'End Term', 75.00, 100.00),
(4, 1, 'Mid Term', 95.00, 100.00),
(4, 1, 'End Term', 92.00, 100.00),
(5, 6, 'Mid Term', 78.00, 100.00),
(5, 6, 'End Term', 82.00, 100.00);
