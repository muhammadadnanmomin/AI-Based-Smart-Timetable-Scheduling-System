-- =========================================
-- DATABASE: smart_timetable
-- =========================================

DROP DATABASE IF EXISTS smart_timetable;
CREATE DATABASE smart_timetable;
USE smart_timetable;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;

-- =========================================
-- TABLE: users
-- =========================================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin','teacher') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users VALUES
(1, 'Test User', 'testcurl@example.com', 'hash1', 'admin', NOW()),
(2, 'Test User', 'testfix@example.com', 'hash2', 'admin', NOW()),
(3, 'Test User', 'testfix2@example.com', 'hash3', 'admin', NOW()),
(4, 'Debug2', 'debug2@test.com', 'hash4', 'admin', NOW()),
(5, 'Debug User 3', 'debug3@test.com', 'hash5', 'admin', NOW()),
(6, 'Debug User 4', 'debug4@test.com', 'hash6', 'admin', NOW()),
(7, 'Debug User 5', 'debug5@test.com', 'hash7', 'admin', NOW()),
(8, 'Muhammad Adnan Momin', 'muhammadadnanmomin@gmail.com', 'hash8', 'admin', NOW());

-- =========================================
-- TABLE: classes
-- =========================================
CREATE TABLE classes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(100),
    semester INT,
    total_students INT
);

INSERT INTO classes VALUES
(1, 'TY BCA', 'Computer', 5, 60),
(2, 'FY BSc IT', 'IT', 1, 50),
(3, 'SY BSc IT', 'IT', 3, 55),
(4, 'TY BSc IT', 'IT', 5, 50),
(5, 'FY BCA A', 'Computer', 1, 65),
(6, 'SY BCA A', 'Computer', 3, 60),
(7, 'SY BCA B', 'Computer', 3, 58),
(8, 'TY BCA A', 'Computer', 5, 55);

-- =========================================
-- TABLE: days
-- =========================================
CREATE TABLE days (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name ENUM('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday') UNIQUE
);

INSERT INTO days VALUES
(1, 'Monday'),
(2, 'Tuesday'),
(3, 'Wednesday'),
(4, 'Thursday'),
(5, 'Friday');

-- =========================================
-- TABLE: rooms
-- =========================================
CREATE TABLE rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    capacity INT,
    type ENUM('lecture','lab') NOT NULL,
    building VARCHAR(100)
);

INSERT INTO rooms VALUES
(1, 'Room 201', 60, 'lecture', 'A Block'),
(2, 'Room 202', 60, 'lecture', 'A Block'),
(3, 'Lab 2', 40, 'lab', 'B Block'),
(4, 'Lab 3', 40, 'lab', 'B Block'),
(5, 'Seminar Hall', 100, 'lecture', 'Main Block'),
(6, 'Room 301', 60, 'lecture', 'A Block'),
(7, 'Room 302', 60, 'lecture', 'A Block'),
(8, 'Lab 4', 40, 'lab', 'B Block'),
(9, 'Room 401', 60, 'lecture', 'C Block');

-- =========================================
-- TABLE: subjects
-- =========================================
CREATE TABLE subjects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) UNIQUE,
    weekly_lectures INT NOT NULL,
    is_lab BOOLEAN,
    lab_duration INT
);

INSERT INTO subjects VALUES
(1, 'Mathematics', NULL, 4, 0, NULL),
(2, 'Computer Science', NULL, 5, 0, NULL),
(3, 'Data Structures', 'DS101', 4, 0, NULL),
(4, 'Operating Systems', 'OS102', 4, 0, NULL),
(5, 'Database Systems', 'DB103', 5, 0, NULL),
(6, 'Computer Networks', 'CN104', 3, 0, NULL),
(7, 'Software Engineering', 'SE105', 3, 0, NULL),
(8, 'Web Development', 'WD106', 4, 1, 2),
(9, 'Python Programming', 'PY107', 5, 1, 2),
(10, 'Statistics', 'ST108', 3, 0, NULL),
(11, 'Linear Algebra', 'LA109', 4, 0, NULL),
(12, 'Machine Learning', 'ML110', 3, 0, NULL),
(13, 'AI Fundamentals', 'AI201', 4, 0, NULL),
(14, 'Cloud Computing', 'CC202', 3, 0, NULL),
(15, 'Cyber Security', 'CS203', 4, 0, NULL),
(16, 'Big Data', 'BD204', 3, 0, NULL),
(17, 'IoT Systems', 'IOT205', 3, 1, 2);

-- =========================================
-- TABLE: teachers
-- =========================================
CREATE TABLE teachers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(100),
    department VARCHAR(100),
    max_lectures_per_day INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

INSERT INTO teachers VALUES
(1, NULL, 'Mr. Deshmukh', 'Computer', 4),
(2, NULL, 'Ms. Patil', 'Computer', 5),
(3, NULL, 'Dr. Kulkarni', 'Science', 4),
(4, NULL, 'Mr. Shaikh', 'Computer', 3),
(5, NULL, 'Ms. Joshi', 'Maths', 4),
(6, NULL, 'Mr. Pawar', 'Science', 4),
(7, NULL, 'Ms. More', 'Computer', 5),
(8, NULL, 'Mr. Jadhav', 'Maths', 4),
(9, NULL, 'Ms. Shaikh', 'Science', 3),
(10, NULL, 'Dr. Patwardhan', 'Computer', 4);

-- =========================================
-- TABLE: time_slots
-- =========================================
CREATE TABLE time_slots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    start_time TIME,
    end_time TIME,
    slot_order INT
);

INSERT INTO time_slots VALUES
(1, '09:00:00', '10:00:00', 1),
(2, '10:00:00', '11:00:00', 2),
(3, '11:15:00', '12:15:00', 3),
(4, '12:15:00', '13:15:00', 4),
(5, '14:00:00', '15:00:00', 5);

-- =========================================
-- TABLE: teacher_subjects
-- =========================================
CREATE TABLE teacher_subjects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    teacher_id INT,
    subject_id INT,
    class_id INT,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id),
    FOREIGN KEY (subject_id) REFERENCES subjects(id),
    FOREIGN KEY (class_id) REFERENCES classes(id)
);

INSERT INTO teacher_subjects VALUES
(1, 1, 3, 1),
(2, 2, 4, 1),
(3, 3, 5, 1),
(4, 4, 6, 1),
(5, 5, 10, 1);

-- =========================================
-- TABLE: timetable_entries
-- =========================================
CREATE TABLE timetable_entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    class_id INT,
    subject_id INT,
    teacher_id INT,
    room_id INT,
    day_id INT,
    time_slot_id INT,
    FOREIGN KEY (class_id) REFERENCES classes(id),
    FOREIGN KEY (subject_id) REFERENCES subjects(id),
    FOREIGN KEY (teacher_id) REFERENCES teachers(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    FOREIGN KEY (day_id) REFERENCES days(id),
    FOREIGN KEY (time_slot_id) REFERENCES time_slots(id)
);

INSERT INTO timetable_entries VALUES
(1, 1, 3, 1, 1, 1, 1),
(2, 1, 4, 2, 2, 1, 2),
(3, 1, 5, 3, 1, 1, 3),
(4, 1, 6, 4, 2, 2, 1),
(5, 2, 9, 6, 3, 3, 1);

COMMIT;