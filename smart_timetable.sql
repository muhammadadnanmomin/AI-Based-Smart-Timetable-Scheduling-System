-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 02, 2026 at 10:41 AM
-- Server version: 8.0.40
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smart_timetable`
--

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `department` varchar(100) DEFAULT NULL,
  `semester` int DEFAULT NULL,
  `total_students` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`id`, `name`, `department`, `semester`, `total_students`) VALUES
(3, 'TY BCA', 'Computer', 5, 60),
(4, 'FY BSc IT', 'IT', 1, 50),
(5, 'SY BSc IT', 'IT', 3, 55),
(6, 'TY BSc IT', 'IT', 5, 50),
(7, 'FY BCA A', 'Computer', 1, 65),
(20, 'SY BCA A', 'Computer', 3, 60),
(21, 'SY BCA B', 'Computer', 3, 58),
(22, 'TY BCA A', 'Computer', 5, 55);

-- --------------------------------------------------------

--
-- Table structure for table `constraints`
--

CREATE TABLE `constraints` (
  `id` int NOT NULL,
  `type` varchar(100) NOT NULL,
  `value` varchar(255) NOT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `days`
--

CREATE TABLE `days` (
  `id` int NOT NULL,
  `name` enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `days`
--

INSERT INTO `days` (`id`, `name`) VALUES
(1, 'Monday'),
(2, 'Tuesday'),
(3, 'Wednesday'),
(4, 'Thursday'),
(5, 'Friday');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `capacity` int DEFAULT NULL,
  `type` enum('lecture','lab') NOT NULL,
  `building` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `name`, `capacity`, `type`, `building`) VALUES
(4, 'Room 201', 60, 'lecture', 'A Block'),
(5, 'Room 202', 60, 'lecture', 'A Block'),
(6, 'Lab 2', 40, 'lab', 'B Block'),
(7, 'Lab 3', 40, 'lab', 'B Block'),
(8, 'Seminar Hall', 100, 'lecture', 'Main Block'),
(20, 'Room 301', 60, 'lecture', 'A Block'),
(21, 'Room 302', 60, 'lecture', 'A Block'),
(22, 'Lab 4', 40, 'lab', 'B Block'),
(23, 'Room 401', 60, 'lecture', 'C Block');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `code` varchar(20) DEFAULT NULL,
  `weekly_lectures` int NOT NULL,
  `is_lab` tinyint(1) DEFAULT NULL,
  `lab_duration` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `name`, `code`, `weekly_lectures`, `is_lab`, `lab_duration`) VALUES
(1, 'Mathematics', NULL, 4, NULL, NULL),
(3, 'Computer Science', NULL, 5, NULL, NULL),
(4, 'Data Structures', 'DS101', 4, 0, NULL),
(5, 'Operating Systems', 'OS102', 4, 0, NULL),
(6, 'Database Systems', 'DB103', 5, 0, NULL),
(7, 'Computer Networks', 'CN104', 3, 0, NULL),
(8, 'Software Engineering', 'SE105', 3, 0, NULL),
(9, 'Web Development', 'WD106', 4, 1, 2),
(10, 'Python Programming', 'PY107', 5, 1, 2),
(11, 'Statistics', 'ST108', 3, 0, NULL),
(12, 'Linear Algebra', 'LA109', 4, 0, NULL),
(13, 'Machine Learning', 'ML110', 3, 0, NULL),
(20, 'AI Fundamentals', 'AI201', 4, 0, NULL),
(21, 'Cloud Computing', 'CC202', 3, 0, NULL),
(22, 'Cyber Security', 'CS203', 4, 0, NULL),
(23, 'Big Data', 'BD204', 3, 0, NULL),
(24, 'IoT Systems', 'IOT205', 3, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `department` varchar(100) DEFAULT NULL,
  `max_lectures_per_day` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `user_id`, `name`, `department`, `max_lectures_per_day`) VALUES
(4, NULL, 'Mr. Deshmukh', 'Computer', 4),
(5, NULL, 'Ms. Patil', 'Computer', 5),
(6, NULL, 'Dr. Kulkarni', 'Science', 4),
(7, NULL, 'Mr. Shaikh', 'Computer', 3),
(8, NULL, 'Ms. Joshi', 'Maths', 4),
(9, NULL, 'Mr. Pawar', 'Science', 4),
(10, NULL, 'Ms. More', 'Computer', 5),
(11, NULL, 'Mr. Jadhav', 'Maths', 4),
(12, NULL, 'Ms. Shaikh', 'Science', 3),
(13, NULL, 'Dr. Patwardhan', 'Computer', 4),
(20, NULL, 'Mr. Kale', 'Computer', 4),
(21, NULL, 'Ms. Shinde', 'Computer', 5),
(22, NULL, 'Dr. More', 'Science', 4),
(23, NULL, 'Mr. Tamboli', 'Maths', 4),
(24, NULL, 'Ms. Sheikh', 'Computer', 3);

-- --------------------------------------------------------

--
-- Table structure for table `teacher_preferences`
--

CREATE TABLE `teacher_preferences` (
  `id` int NOT NULL,
  `teacher_id` int DEFAULT NULL,
  `preferred_day_id` int DEFAULT NULL,
  `preferred_slot_id` int DEFAULT NULL,
  `priority` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `teacher_preferences`
--

INSERT INTO `teacher_preferences` (`id`, `teacher_id`, `preferred_day_id`, `preferred_slot_id`, `priority`) VALUES
(3, 5, NULL, 2, 2),
(4, 6, NULL, 3, 1),
(5, 7, NULL, 1, 3),
(6, 8, NULL, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `teacher_subjects`
--

CREATE TABLE `teacher_subjects` (
  `id` int NOT NULL,
  `teacher_id` int DEFAULT NULL,
  `subject_id` int DEFAULT NULL,
  `class_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `teacher_subjects`
--

INSERT INTO `teacher_subjects` (`id`, `teacher_id`, `subject_id`, `class_id`) VALUES
(1, 4, 4, 3),
(2, 5, 5, 3),
(3, 6, 6, 3),
(4, 7, 7, 3),
(5, 8, 11, 3),
(6, 9, 10, 4),
(7, 10, 9, 4),
(8, 11, 12, 5),
(9, 12, 7, 6),
(10, 13, 13, 3),
(11, 20, 20, 20),
(12, 21, 21, 20),
(13, 22, 22, 21),
(14, 23, 23, 21),
(15, 24, 24, 22);

-- --------------------------------------------------------

--
-- Table structure for table `timetables`
--

CREATE TABLE `timetables` (
  `id` int NOT NULL,
  `teacher_id` int NOT NULL,
  `subject_id` int NOT NULL,
  `class_id` int NOT NULL,
  `room_id` int NOT NULL,
  `day_id` int NOT NULL,
  `slot_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `timetables`
--

INSERT INTO `timetables` (`id`, `teacher_id`, `subject_id`, `class_id`, `room_id`, `day_id`, `slot_id`) VALUES
(100, 1, 1, 1, 1, 1, 1),
(101, 2, 1, 1, 1, 1, 2),
(102, 3, 1, 1, 1, 1, 3),
(103, 1, 1, 1, 1, 1, 4),
(104, 2, 2, 1, 1, 1, 5),
(105, 3, 2, 1, 1, 2, 1),
(106, 1, 2, 1, 1, 2, 2),
(107, 2, 3, 1, 1, 2, 3),
(108, 3, 3, 1, 1, 2, 4),
(109, 1, 3, 1, 1, 2, 5),
(110, 2, 3, 1, 1, 3, 1),
(111, 3, 3, 1, 1, 3, 2),
(112, 2, 1, 2, 2, 1, 1),
(113, 1, 1, 2, 2, 1, 2),
(114, 1, 1, 2, 3, 1, 3),
(115, 3, 1, 2, 2, 1, 4),
(116, 3, 2, 2, 3, 1, 5),
(117, 2, 2, 2, 2, 2, 1),
(118, 2, 2, 2, 3, 2, 2),
(119, 1, 3, 2, 2, 2, 3),
(120, 1, 3, 2, 3, 2, 4),
(121, 3, 3, 2, 2, 2, 5),
(122, 3, 3, 2, 3, 3, 1),
(123, 2, 3, 2, 2, 3, 2),
(200, 4, 4, 3, 4, 1, 1),
(201, 5, 5, 3, 5, 1, 2),
(202, 6, 6, 3, 4, 1, 3),
(203, 7, 7, 3, 5, 2, 1),
(204, 10, 9, 4, 6, 2, 2),
(205, 9, 10, 4, 6, 3, 1),
(206, 11, 12, 5, 4, 3, 2),
(207, 12, 7, 6, 5, 4, 1),
(208, 13, 13, 3, 8, 4, 2),
(209, 4, 4, 7, 4, 5, 1),
(300, 20, 20, 20, 20, 1, 1),
(301, 21, 21, 20, 21, 1, 2),
(302, 22, 22, 21, 20, 2, 1),
(303, 23, 23, 21, 21, 2, 2),
(304, 24, 24, 22, 22, 3, 1),
(305, 20, 20, 20, 20, 3, 2),
(306, 21, 21, 20, 21, 4, 1),
(307, 22, 22, 21, 20, 4, 2),
(308, 23, 23, 21, 21, 5, 1),
(309, 24, 24, 22, 22, 5, 2);

-- --------------------------------------------------------

--
-- Table structure for table `timetable_entries`
--

CREATE TABLE `timetable_entries` (
  `id` int NOT NULL,
  `timetable_id` int DEFAULT NULL,
  `class_id` int DEFAULT NULL,
  `subject_id` int DEFAULT NULL,
  `teacher_id` int DEFAULT NULL,
  `room_id` int DEFAULT NULL,
  `day_id` int DEFAULT NULL,
  `time_slot_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `timetable_entries`
--

INSERT INTO `timetable_entries` (`id`, `timetable_id`, `class_id`, `subject_id`, `teacher_id`, `room_id`, `day_id`, `time_slot_id`) VALUES
(51, 300, 20, 20, 20, 20, 1, 1),
(52, 301, 20, 21, 21, 21, 1, 2),
(53, 302, 21, 22, 22, 20, 2, 1),
(54, 303, 21, 23, 23, 21, 2, 2),
(55, 304, 22, 24, 24, 22, 3, 1),
(56, 305, 20, 20, 20, 20, 3, 2),
(57, 306, 20, 21, 21, 21, 4, 1),
(58, 307, 21, 22, 22, 20, 4, 2),
(59, 308, 21, 23, 23, 21, 5, 1),
(60, 309, 22, 24, 24, 22, 5, 2);

-- --------------------------------------------------------

--
-- Table structure for table `time_slots`
--

CREATE TABLE `time_slots` (
  `id` int NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `slot_order` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `time_slots`
--

INSERT INTO `time_slots` (`id`, `start_time`, `end_time`, `slot_order`) VALUES
(1, '09:00:00', '10:00:00', 1),
(2, '10:00:00', '11:00:00', 2),
(3, '11:15:00', '12:15:00', 3),
(4, '12:15:00', '13:15:00', 4),
(5, '14:00:00', '15:00:00', 5),
(11, '15:00:00', '16:00:00', 6),
(12, '16:00:00', '17:00:00', 7);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('admin','teacher') NOT NULL,
  `created_at` timestamp NULL DEFAULT (now())
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password_hash`, `role`, `created_at`) VALUES
(1, 'Test User', 'testcurl@example.com', '$2b$12$1ux4pjl46Kf8EMHRfUjYruK1teyjvQLz2ZDXnJ7sZpGlvgqNWBFMa', 'admin', '2026-03-25 05:32:18'),
(2, 'Test User', 'testfix@example.com', '$2b$12$ef0lhz.y030.GD7RqjKhZuHkuwXzVu1VnPKD915J3AMjWZBkKE1iy', 'admin', '2026-03-25 05:32:18'),
(3, 'Test User', 'testfix2@example.com', '$2b$12$mAHr9unLhsZxZFNH3in.Be8pKT73s0pSGcLyOCAoQLM8WBWNTJGQG', 'admin', '2026-03-25 05:32:50'),
(4, 'Debug2', 'debug2@test.com', '$2b$12$M6LSbK6HW6Lwvtydwg/v3uJBSAj.9H9/y6.jy1ORzjHVDes/DPC9y', 'admin', '2026-03-25 05:34:11'),
(5, 'Debug User 3', 'debug3@test.com', '$2b$12$wCba2pDi8u8oXFoY.ppO5uMoUACcAj3VLRyFHUVkpnwNSG0a5lY8G', 'admin', '2026-03-25 05:41:31'),
(6, 'Debug User 4', 'debug4@test.com', '$2b$12$rbx6FEfG3YSHGxjxhBwPz.OmWWhQMT4rtS32sDz09DuLRUSzqc3FK', 'admin', '2026-03-25 05:41:59'),
(7, 'Debug User 5', 'debug5@test.com', '$2b$12$BVyCDkcNKRoyg5BCkjh95ebIxx5zC..CpLLUsyNKKYO.0obAX54Qm', 'admin', '2026-03-25 05:42:52'),
(8, 'Muhammad Adnan Momin', 'muhammadadnanmomin@gmail.com', '$2b$12$PFGvD3JAfoKwkomEQQPO0ueL5wNNZgrQzWa2Al0zoAfoIL.vl6lCi', 'admin', '2026-03-25 05:43:51');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ix_classes_id` (`id`);

--
-- Indexes for table `constraints`
--
ALTER TABLE `constraints`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ix_constraints_id` (`id`);

--
-- Indexes for table `days`
--
ALTER TABLE `days`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `ix_days_id` (`id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `ix_rooms_id` (`id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD KEY `ix_subjects_id` (`id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD KEY `ix_teachers_id` (`id`);

--
-- Indexes for table `teacher_preferences`
--
ALTER TABLE `teacher_preferences`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `preferred_day_id` (`preferred_day_id`),
  ADD KEY `preferred_slot_id` (`preferred_slot_id`),
  ADD KEY `ix_teacher_preferences_id` (`id`);

--
-- Indexes for table `teacher_subjects`
--
ALTER TABLE `teacher_subjects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_teacher_subject_class` (`teacher_id`,`subject_id`,`class_id`),
  ADD KEY `subject_id` (`subject_id`),
  ADD KEY `class_id` (`class_id`),
  ADD KEY `ix_teacher_subjects_id` (`id`);

--
-- Indexes for table `timetables`
--
ALTER TABLE `timetables`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ix_timetables_id` (`id`);

--
-- Indexes for table `timetable_entries`
--
ALTER TABLE `timetable_entries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_teacher_slot` (`teacher_id`,`day_id`,`time_slot_id`),
  ADD UNIQUE KEY `uq_room_slot` (`room_id`,`day_id`,`time_slot_id`),
  ADD UNIQUE KEY `uq_class_slot` (`class_id`,`day_id`,`time_slot_id`),
  ADD KEY `timetable_id` (`timetable_id`),
  ADD KEY `subject_id` (`subject_id`),
  ADD KEY `day_id` (`day_id`),
  ADD KEY `time_slot_id` (`time_slot_id`),
  ADD KEY `ix_timetable_entries_id` (`id`);

--
-- Indexes for table `time_slots`
--
ALTER TABLE `time_slots`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ix_time_slots_id` (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `ix_users_id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `constraints`
--
ALTER TABLE `constraints`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `days`
--
ALTER TABLE `days`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `teacher_preferences`
--
ALTER TABLE `teacher_preferences`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `teacher_subjects`
--
ALTER TABLE `teacher_subjects`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `timetables`
--
ALTER TABLE `timetables`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=310;

--
-- AUTO_INCREMENT for table `timetable_entries`
--
ALTER TABLE `timetable_entries`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `time_slots`
--
ALTER TABLE `time_slots`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `teachers`
--
ALTER TABLE `teachers`
  ADD CONSTRAINT `teachers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `teacher_preferences`
--
ALTER TABLE `teacher_preferences`
  ADD CONSTRAINT `teacher_preferences_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `teacher_preferences_ibfk_2` FOREIGN KEY (`preferred_day_id`) REFERENCES `days` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `teacher_preferences_ibfk_3` FOREIGN KEY (`preferred_slot_id`) REFERENCES `time_slots` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `teacher_subjects`
--
ALTER TABLE `teacher_subjects`
  ADD CONSTRAINT `teacher_subjects_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `teacher_subjects_ibfk_2` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `teacher_subjects_ibfk_3` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `timetable_entries`
--
ALTER TABLE `timetable_entries`
  ADD CONSTRAINT `timetable_entries_ibfk_1` FOREIGN KEY (`timetable_id`) REFERENCES `timetables` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `timetable_entries_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `timetable_entries_ibfk_3` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `timetable_entries_ibfk_4` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `timetable_entries_ibfk_5` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `timetable_entries_ibfk_6` FOREIGN KEY (`day_id`) REFERENCES `days` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `timetable_entries_ibfk_7` FOREIGN KEY (`time_slot_id`) REFERENCES `time_slots` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
