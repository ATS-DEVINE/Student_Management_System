-- Student Management System Database Schema
-- Database: student_management

-- Create Database
CREATE DATABASE IF NOT EXISTS student_management;
USE student_management;

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS marks;
DROP TABLE IF EXISTS attendance;
DROP TABLE IF EXISTS subjects;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS teachers;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS admin;

-- 1. Admin Table
CREATE TABLE admin (
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Students Table
CREATE TABLE students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    university_uid VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(15) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    date_of_birth DATE,
    address TEXT,
    department VARCHAR(50) NOT NULL,
    course VARCHAR(50) NOT NULL,
    semester INT NOT NULL,
    admission_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3. Teachers Table
CREATE TABLE teachers (
    teacher_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(15) NOT NULL,
    qualification VARCHAR(100),
    department VARCHAR(50) NOT NULL,
    specialization VARCHAR(100),
    joining_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 4. Courses Table
CREATE TABLE courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    course_name VARCHAR(100) NOT NULL,
    course_code VARCHAR(20) NOT NULL UNIQUE,
    department VARCHAR(50) NOT NULL,
    duration INT NOT NULL COMMENT 'Duration in years',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Subjects Table
CREATE TABLE subjects (
    subject_id INT PRIMARY KEY AUTO_INCREMENT,
    subject_name VARCHAR(100) NOT NULL,
    subject_code VARCHAR(20) NOT NULL UNIQUE,
    course VARCHAR(50) NOT NULL,
    semester INT NOT NULL,
    credits INT NOT NULL,
    teacher_id INT,
    FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Attendance Table
CREATE TABLE attendance (
    attendance_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    subject_id INT NOT NULL,
    attendance_date DATE NOT NULL,
    status VARCHAR(10) NOT NULL COMMENT 'PRESENT or ABSENT',
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id) ON DELETE CASCADE,
    UNIQUE KEY unique_attendance (student_id, subject_id, attendance_date),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Marks Table
CREATE TABLE marks (
    mark_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    subject_id INT NOT NULL,
    examination_name VARCHAR(50) NOT NULL,
    marks_obtained DECIMAL(5,2) NOT NULL,
    max_marks DECIMAL(5,2) NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_students_uid ON students(university_uid);
CREATE INDEX idx_students_department ON students(department);
CREATE INDEX idx_attendance_student ON attendance(student_id);
CREATE INDEX idx_attendance_date ON attendance(attendance_date);
CREATE INDEX idx_marks_student ON marks(student_id);
