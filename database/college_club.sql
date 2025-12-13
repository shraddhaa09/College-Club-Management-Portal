-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 13, 2025 at 07:34 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `college_club`
--

-- --------------------------------------------------------

--
-- Table structure for table `clubs`
--

CREATE TABLE `clubs` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `club_email` varchar(255) NOT NULL,
  `club_password` varchar(255) NOT NULL,
  `mission` text DEFAULT NULL,
  `vision` text DEFAULT NULL,
  `contact_info` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clubs`
--

INSERT INTO `clubs` (`id`, `name`, `description`, `created_at`, `club_email`, `club_password`, `mission`, `vision`, `contact_info`) VALUES
(2, 'Test Club', 'This is a test club', '2025-11-01 18:12:05', 'demo@club.com', '$2y$10$YkXhB96QQzeSU18y0sF0ZOquw1NGHYaEt4../fhJ/Gar/zYxGtCzC', 'demomission', 'demonvision', '1234567890'),
(9, 'Tech Innovators Club', 'A club for students into cutting‑edge tech', '2025-11-09 13:35:45', 'techinnovators@vit.edu', '$2y$10$VcMlxTLhpXbOWJQjtdfk/uYWoYGGlI8Eqw.KxBXPJlasen.0NJDfq', 'Foster innovation & learning', 'Lead future technology solutions', '9000000001'),
(10, 'Creative Arts Society', 'Society for art, music and creative minds', '2025-11-09 13:36:36', 'creativearts@vit.edu', '$2y$10$i9x1ZqLGiiy.WzfYsGDNrenW4tYEDZ9Z8TRl6Rroe3O2WxhVHKw3G', 'Encourage creative expression', 'Bring arts into campus life', '9000000002'),
(11, 'Sustainability Action Team', 'Club working on campus & environment', '2025-11-09 13:37:22', 'sustainaction@vit.edu', '$2y$10$xbeaUMO2wZsFWmUeOTvnmO/vWZS.KbxkSX/q6LncVf5iOebU5BoAS', 'Promote eco‑friendly initiatives', 'Make VIT campus carbon neutral', '9000000003'),
(12, 'shraddha', 'student', '2025-11-09 18:13:19', 'shraddhaclub@vit.edu', '$2y$10$Dmi/SEJLTDYtv5stnN5JkerdcapLxVxA3qKxHmItd/fpnHIsBVq.K', 'vit', 'pune', '12456789'),
(13, 'Chess Club', 'Club for chess enthusiasts', '2025-11-10 04:12:06', 'chessclub@example.com', '$2y$10$1kdFpApID2LA8yV/gu/hVesPgdDA.071U5ZlgnGdmo5x5Pz92ilUi', 'Promote chess in campus', 'Be the best chess club', '1234567890'),
(14, 'Robotics Club', 'Club for robotics and automation enthusiasts', '2025-11-10 04:17:07', 'roboticsclub@example.com', '$2y$10$xK6IRu4NESRuE0XL4IEjFejYYy0B7KYILdP9sHcEpcuvX86OIYp3K', 'Encourage robotics projects in campus', 'Become a leading robotics club', '9876543210'),
(15, 'Tech Club', 'Technical club for coding and robotics.', '2025-11-10 08:56:10', 'techclub24@vit.edu', '$2y$10$hhy17rltAzCy3eOkG7n6yOf4ewQffIXaYEs70BsBnmXBt1ObPC.2y', 'Promote innovation and creativity.', 'Empower students through technology.', '9876543210'),
(16, 'Art Club', 'A club for creative minds.', '2025-11-10 13:41:33', 'artclub@vit.edu', '$2y$10$r93M6.WHqQml3cax96ZitejrDo9e5bP2tJyNI7BeXJRsfq6WdDWwG', 'Promote art and creativity.', 'To paint a bright future.', '9000011122'),
(17, 'Quiz Club', 'Knowledge is power.', '2025-11-10 13:53:47', 'quizclub24@vit.edu', '$2y$10$IWiAjZe8yEzeoolOiHklmeKbpayNGki7I6bclZ3t60pvGNRZR5bXG', 'Sharpen young minds.', 'One quiz at a time.', '9000022222'),
(18, 'Green Earth', 'An environmental club dedicated to sustainability and eco-awareness on campus.', '2025-11-10 14:08:15', 'greenearth@vit.edu', '$2y$10$ldkKEGRSfWtjHiI4moAVduzLFHuKQ.MNa5Xn8HaRY/becfUC1gCxy', 'To inspire eco-friendly practices and lead environmental initiatives.', 'To make VIT a model for sustainability and green living.', '9123456789'),
(19, 'TechVerse', 'A community of tech enthusiasts exploring AI, web, and robotics through workshops and projects', '2025-11-11 10:05:02', 'techverse.vit@gmail.com', '$2y$10$o90l4A1M8pzjvFkO1DiuKuK03m7xVwWwXEXuPs.UvXknbslQwEP06', 'To inspire innovation and hands-on learning in emerging technologies among students', 'To become a leading student-driven platform for technology and collaboration.', '98765 43210'),
(20, 'helloworld', 'qwer', '2025-12-03 20:01:22', 'helloworld@vit.edu', '$2y$10$1BW11j1kO1j0NXwDRwozROLqynyyWsKt/lAxWkp9Sfj3hj1Px09He', 'qwert', 'qwert', '9000000067');

-- --------------------------------------------------------

--
-- Table structure for table `club_activity_log`
--

CREATE TABLE `club_activity_log` (
  `id` int(11) NOT NULL,
  `club_id` int(11) DEFAULT NULL,
  `action` varchar(100) DEFAULT NULL,
  `details` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `club_categories`
--

CREATE TABLE `club_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `club_settings`
--

CREATE TABLE `club_settings` (
  `id` int(11) NOT NULL,
  `setting_key` varchar(100) NOT NULL,
  `setting_value` text DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `club_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `club_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `event_date` date DEFAULT NULL,
  `description` text DEFAULT NULL,
  `time` time DEFAULT NULL,
  `venue` varchar(100) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Upcoming'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `club_id`, `title`, `event_date`, `description`, `time`, `venue`, `status`) VALUES
(13, 2, 'Tech Talk: AI Trends', '2025-11-15', 'Discussion on latest AI technologies and trends.', '15:00:00', 'Auditorium A', 'Upcoming'),
(14, 2, 'Web Dev Workshop', '2025-11-16', 'Hands-on session on HTML, CSS, and JavaScript.', '10:00:00', 'Lab 101', 'Upcoming'),
(15, 2, 'Data Science Seminar', '2025-11-17', 'Introduction to data analytics and visualization.', '11:00:00', 'Conference Room', 'Upcoming'),
(16, 2, 'Cybersecurity Awareness', '2025-11-18', 'Learn basic cybersecurity and safe internet practices.', '14:00:00', 'Lab 202', 'Upcoming'),
(17, 2, 'IoT & Arduino Workshop', '2025-11-19', 'Hands-on session with Arduino microcontrollers.', '09:30:00', 'Electronics Lab', 'Upcoming'),
(18, 2, 'Mobile App Dev Bootcamp', '2025-11-20', 'Build simple Android apps using Kotlin.', '13:00:00', 'Lab 103', 'Upcoming'),
(19, 2, 'Cloud Computing Basics', '2025-11-21', 'Introduction to cloud platforms like AWS and Azure.', '12:00:00', 'Conference Room', 'Upcoming'),
(20, 2, 'Robotics Demo', '2025-11-22', 'Demonstration of basic robotics projects.', '16:00:00', 'Auditorium B', 'Upcoming'),
(23, 2, 'khelo india', '2025-11-12', 'outdoor', '04:10:00', 'ground', 'Upcoming'),
(24, 9, 'AI Bootcamp', '2025-12-05', 'A bootcamp covering AI basics to hands-on ML projects.', '10:00:00', 'Seminar Hall A', '1'),
(25, 9, 'Hackathon 2.0', '2025-12-15', '48-hour hackathon focused on smart city solutions.', '09:00:00', 'Innovation Lab', '1'),
(26, 9, 'Tech Quiz Mania', '2025-11-28', 'Quiz competition on current tech trends.', '14:00:00', 'Room 205', '1'),
(27, 9, 'Web3 Workshop', '2025-11-20', 'Workshop on blockchain, DApps and Web3 tools.', '16:00:00', 'Tech Block C', '1'),
(28, 9, 'Python for Beginners', '2025-12-08', 'Beginner friendly Python programming session.', '11:00:00', 'Online (Zoom)', '1'),
(29, 9, 'StartUp Stories', '2025-12-12', 'Founders from tech startups share their journey.', '17:00:00', 'Auditorium', '1'),
(30, 9, 'Annual Tech Expo', '2026-01-10', 'Showcase of student tech projects and prototypes.', '10:30:00', 'Main Hall', '1'),
(31, 9, 'Cloud Computing 101', '2025-12-21', 'Introduction to AWS, Azure, and the cloud ecosystem.', '15:30:00', 'Lab 3', '1'),
(32, 9, 'Women in Tech', '2025-12-18', 'Panel discussion with women tech leaders.', '13:00:00', 'Seminar Hall B', '1'),
(33, 9, 'UI/UX Sprint', '2025-12-25', 'A day of rapid prototyping and design thinking.', '10:00:00', 'Design Studio', '1'),
(34, 12, 'AI Symposium', '2025-12-10', 'Annual symposium with keynotes from AI leaders.', '10:30:00', 'Auditorium', '1'),
(35, 12, 'HackNight', '2025-12-15', '24-hour overnight coding and pizza marathon.', '20:00:00', 'Lab 4', '1'),
(36, 12, 'Robotics Workshop', '2025-11-25', 'Build your first robot—no experience needed!', '09:00:00', 'MakerSpace', '1'),
(37, 12, 'Web Dev Day', '2025-11-18', 'Full-day deep dive into React, Node, and APIs.', '11:00:00', 'Room 101', '1'),
(38, 12, 'Cloud Bootcamp', '2025-12-20', 'Get started with AWS and GCP hands-on labs.', '14:30:00', 'Online (Zoom)', '1'),
(39, 12, 'Startup Stories', '2025-12-22', 'Founders share startup journeys and Q&A.', '16:00:00', 'Auditorium', '1'),
(40, 12, 'Tech Quiz Mania', '2025-12-01', 'Quiz on algorithms, coding, and gadgets.', '13:00:00', 'Room 202', '1'),
(41, 12, 'IoT Unplugged', '2025-12-07', 'Explore the Internet of Things: sensors, data, and more.', '15:00:00', 'Smart Lab', '1'),
(42, 12, 'Big Data Day', '2025-12-14', 'Workshop on big data tools and techniques.', '12:00:00', 'Lab 2', '1'),
(43, 12, 'Design Sprint', '2025-12-19', 'Rapid prototyping and UI/UX exercises.', '10:00:00', 'Design Studio', '1'),
(44, 14, 'Robotics Workshop', '2025-11-20', 'Intro to robotics and automation', '10:00:00', 'Room 101', 'Upcoming'),
(45, 14, 'AI Robotics Competition', '2025-12-05', 'Campus level AI robotics challenge', '09:00:00', 'Auditorium', 'Upcoming'),
(46, 14, 'Drone Flying Session', '2025-12-15', 'Hands-on drone flying and programming', '11:00:00', 'Open Ground', 'Upcoming'),
(47, 18, 'Tree Plantation Drive', '2025-11-22', 'Join us for a plantation drive promoting a greener and cleaner campus environment.', '09:30:00', 'VIT Central Lawn', 'Active'),
(48, 18, 'Clean Campus Campaign', '2025-12-05', 'A cleanliness campaign to raise awareness about waste segregation and plastic-free living.', '10:00:00', 'Near Canteen Area', 'Upcoming'),
(49, 18, 'E-Waste Collection Drive', '2025-12-15', 'An initiative to collect and safely dispose of electronic waste from students and staff.', '11:00:00', 'Block B Parking Lot', 'Upcoming'),
(51, 18, 'AI Workshop', '2025-11-13', 'A beginner-friendly session introducing students to Artificial Intelligence and its real-world applications.', '10:33:00', 'ground', 'Upcoming');

-- --------------------------------------------------------

--
-- Table structure for table `event_attendance`
--

CREATE TABLE `event_attendance` (
  `id` int(11) NOT NULL,
  `event_id` int(11) DEFAULT NULL,
  `attendee_count` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `event_attendance`
--

INSERT INTO `event_attendance` (`id`, `event_id`, `attendee_count`) VALUES
(1, 44, 80),
(2, 46, 33);

-- --------------------------------------------------------

--
-- Table structure for table `event_files`
--

CREATE TABLE `event_files` (
  `id` int(11) NOT NULL,
  `event_id` int(11) DEFAULT NULL,
  `file_name` varchar(200) DEFAULT NULL,
  `file_path` varchar(300) DEFAULT NULL,
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `event_photos`
--

CREATE TABLE `event_photos` (
  `id` int(11) NOT NULL,
  `club_id` int(11) NOT NULL,
  `event_id` int(11) DEFAULT NULL,
  `file_path` varchar(255) NOT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `uploaded_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `event_photos`
--

INSERT INTO `event_photos` (`id`, `club_id`, `event_id`, `file_path`, `caption`, `uploaded_at`) VALUES
(4, 20, NULL, 'uploads/memories/1764792204_7b2d056c.png', NULL, '2025-12-04 01:33:24'),
(5, 18, NULL, 'uploads/memories/1764823434_fe611a5e.jpeg', NULL, '2025-12-04 10:13:54'),
(6, 18, NULL, 'uploads/memories/1764823442_55eb1649.jpeg', NULL, '2025-12-04 10:14:02'),
(7, 18, NULL, 'uploads/memories/1764823449_538ef4b5.jpeg', NULL, '2025-12-04 10:14:09');

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `department` varchar(100) NOT NULL,
  `domain` varchar(64) DEFAULT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'member',
  `status` varchar(20) NOT NULL DEFAULT 'active',
  `joined` datetime NOT NULL DEFAULT current_timestamp(),
  `club_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `name`, `email`, `department`, `domain`, `role`, `status`, `joined`, `club_id`) VALUES
(2, 'Priya Sharma', 'priya.sharma@example.com', 'Computer Science', 'Design', 'president', 'active', '2025-01-15 10:12:00', 9),
(3, 'Rajesh Kumar', 'rajesh.kumar@example.com', 'Mechanical', 'Content', 'member', 'active', '2025-02-03 14:23:00', 3),
(4, 'Anjali Desai', 'anjali.desai@example.com', 'Electrical', 'Management', 'secretary', 'active', '2025-03-18 13:55:00', 4),
(5, 'Vikram Singh', 'vikram.singh@example.com', 'Civil', 'Outreach', 'treasurer', 'active', '2025-03-29 08:45:00', 7),
(6, 'Kavya Menon', 'kavya.menon@example.com', 'IT', 'Technical', 'member', 'active', '2025-04-08 11:11:00', 5),
(7, 'Aditya Verma', 'aditya.verma@example.com', 'E&TC', 'Design', 'member', 'inactive', '2025-05-12 15:25:00', 6),
(8, 'Neha Gupta', 'neha.gupta@example.com', 'Robotics', 'Technical', 'member', 'active', '2025-05-17 09:10:00', 2),
(9, 'Ramesh Iyer', 'ramesh.iyer@example.com', 'Computer Science', 'Design', 'member', 'active', '2025-06-05 17:30:00', 9),
(10, 'Swati Jain', 'swati.jain@example.com', 'Electronics', 'Content', 'member', 'active', '2025-07-22 12:40:00', 8),
(11, 'Parth Shah', 'parth.shah@example.com', 'Mechanical', 'Technical', 'member', 'active', '2025-07-30 19:55:00', 3),
(12, 'Amit Rana', 'amit.rana@example.com', 'Mechanical', 'Design', 'member', 'pending', '2025-07-05 09:40:00', 3),
(13, 'Leena Joshi', 'leena.joshi@example.com', 'Electronics', 'Content', 'member', 'pending', '2025-07-06 11:24:00', 8),
(14, 'Ishaan Verma', 'ishaan.verma@example.com', 'Civil', 'Management', 'member', 'pending', '2025-07-07 10:53:00', 7),
(15, 'Ayesha Khan', 'ayesha.khan@example.com', 'Computer Science', 'Outreach', 'member', 'removed', '2025-07-08 15:36:00', 9),
(16, 'Puneet Mehta', 'puneet.mehta@example.com', 'Robotics', 'Technical', 'member', 'pending', '2025-07-09 14:15:00', 2),
(17, 'Sneha Patil', 'sneha.patil@example.com', 'IT', 'Design', 'member', 'pending', '2025-07-10 13:22:00', 5),
(18, 'Farhaan Shaikh', 'farhaan.shaikh@example.com', 'Mechanical', 'Technical', 'member', 'pending', '2025-07-11 09:10:00', 3),
(19, 'Ritika Sinha', 'ritika.sinha@example.com', 'Electrical', 'Design', 'member', 'pending', '2025-07-12 17:18:00', 4),
(20, 'Manav Gupta', 'manav.gupta@example.com', 'E&TC', 'Content', 'president', 'pending', '2025-07-13 12:32:00', 6),
(21, 'Tanvi Deshmukh', 'tanvi.deshmukh@example.com', 'Computer Science', 'Technical', 'member', 'active', '2025-07-14 18:59:00', 9),
(35, 'Arjun Mehta', 'arjun.mehta@example.com', 'Computer Science', 'Design', 'member', 'active', '2025-08-01 10:15:00', 18),
(36, 'Simran Kapoor', 'simran.kapoor@example.com', 'Electronics', 'Content', 'secretary', 'active', '2025-08-05 14:30:00', 18),
(37, 'Karan Malhotra', 'karan.malhotra@example.com', 'Mechanical', 'Management', 'member', 'active', '2025-08-10 09:45:00', 18),
(38, 'Tanya Iyer', 'tanya.iyer@example.com', 'IT', 'Outreach', 'treasurer', 'active', '2025-08-12 16:20:00', 18),
(39, 'Payal Deshmukh', 'rohit.deshmukh@example.com', 'Electrical', 'Technical', 'president', 'active', '2025-08-15 11:50:00', 18),
(40, 'shraddha', 'shra@gmail.com', 'cs', NULL, 'officer', 'active', '2025-11-11 09:46:50', 18),
(41, 'lala g', 'lala@vit.edu', 'wa', NULL, 'officer', 'removed', '2025-11-11 09:50:52', 18);

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `club_id` int(11) NOT NULL,
  `report_title` varchar(255) NOT NULL,
  `report_description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `department` varchar(100) NOT NULL,
  `admission_year` year(4) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `userType` varchar(50) DEFAULT 'Student',
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `semester` varchar(20) NOT NULL,
  `campus` varchar(100) NOT NULL,
  `prn` varchar(50) NOT NULL,
  `stream` varchar(100) NOT NULL,
  `graduation` varchar(10) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `userType`, `name`, `email`, `semester`, `campus`, `prn`, `stream`, `graduation`, `password_hash`, `created_at`) VALUES
(1, 'Student', 'shraddha', 'shraddha.khetmalis24@vit.edu', '3', 'bibwewadi', '12410958', 'Computer Engineering', '2028', '$2y$10$u4WnrNFE9nPNjj/pLhOUEenw8k82A3qPHWyB.iIwoetlIa1PaPs8y', '2025-12-04 04:30:13');

-- --------------------------------------------------------

--
-- Table structure for table `workshops`
--

CREATE TABLE `workshops` (
  `id` int(11) NOT NULL,
  `club_id` int(11) DEFAULT NULL,
  `title` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `date` date NOT NULL,
  `venue` varchar(255) DEFAULT NULL,
  `duration` varchar(50) DEFAULT NULL,
  `seats` int(11) DEFAULT 0,
  `enrolled` int(11) DEFAULT 0,
  `type` varchar(50) DEFAULT 'Workshop'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `workshops`
--

INSERT INTO `workshops` (`id`, `club_id`, `title`, `description`, `date`, `venue`, `duration`, `seats`, `enrolled`, `type`) VALUES
(2, NULL, 'Python Bootcamp with nandita', 'Beginner-friendly introduction to Python programming.', '2025-11-25', NULL, '4 hours', 40, 25, 'Workshop'),
(3, NULL, 'Git Workshop', 'Master Git for version control and collaboration.', '2025-12-02', NULL, '2 hours', 25, 18, 'Workshop'),
(5, NULL, 'Cloud Basics', 'Introduction to cloud computing and popular platforms.', '2025-12-05', NULL, '3 hours', 35, 22, 'Workshop'),
(6, 2, 'Python for Beginners', 'Learn Python basics and syntax.', '2025-11-15', NULL, '3 hours', 30, 0, 'Workshop'),
(7, 2, 'Web Development Bootcamp', 'HTML, CSS, and JS hands-on session.', '2025-11-16', NULL, '4 hours', 25, 0, 'Workshop'),
(8, 2, 'Data Science Intro', 'Overview of data analysis and visualization.', '2025-11-17', NULL, '2.5 hours', 20, 0, 'Workshop'),
(9, 2, 'AI & Machine Learning', 'Introductory session on AI and ML concepts.', '2025-11-18', NULL, '3 hours', 35, 0, 'Workshop'),
(10, 2, 'Cybersecurity Basics', 'Learn the fundamentals of network security.', '2025-11-19', NULL, '2 hours', 30, 0, 'Workshop'),
(11, 2, 'Arduino Workshop', 'Hands-on electronics and microcontrollers.', '2025-11-20', NULL, '3 hours', 15, 0, 'Workshop'),
(12, 2, 'Mobile App Development', 'Build simple Android apps using Kotlin.', '2025-11-21', NULL, '3.5 hours', 20, 0, 'Workshop'),
(13, 2, 'Cloud Computing 101', 'Introduction to cloud platforms and services.', '2025-11-22', NULL, '2 hours', 25, 0, 'Workshop'),
(14, 2, 'Robotics Basics', 'Learn basic robotics and automation principles.', '2025-11-23', NULL, '4 hours', 30, 0, 'Workshop'),
(15, 2, 'UI/UX Design Workshop', 'Design engaging interfaces and experiences.', '2025-11-24', NULL, '2.5 hours', 20, 0, 'Workshop'),
(16, 18, 'Green Tech Workshop', 'Sustainable technologies hands-on session.', '2025-12-10', '', '2h', 35, 5, 'Competition'),
(19, 18, 'Clean Energy Talk', 'Discussion on clean and renewable energy.', '2026-01-10', 'Auditorium', '1h', 50, 20, 'Workshop'),
(20, 18, 'Climate Action Bootcamp', 'Activities and workshops on climate initiatives.', '2026-02-05', 'Conference Hall', '3h', 35, 18, 'Workshop'),
(21, 18, 'Recycling 101', 'Learn recycling and eco-living basics.', '2025-12-20', 'Room 105', '1.5h', 40, 8, 'Workshop'),
(22, 18, 'Urban Gardening', 'Grow your own food in the city!', '2025-12-31', 'Community Garden', '2h', 25, 10, 'Workshop'),
(23, 18, 'Clean Energy Talk', 'Discussion on clean and renewable energy.', '2026-01-10', 'Auditorium', '1h', 50, 20, 'Workshop'),
(24, 18, 'Climate Action Bootcamp', 'Activities and workshops on climate initiatives.', '2026-02-05', 'Conference Hall', '3h', 35, 18, 'Workshop');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clubs`
--
ALTER TABLE `clubs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_club_name` (`name`),
  ADD UNIQUE KEY `unique_club_email` (`club_email`);

--
-- Indexes for table `club_activity_log`
--
ALTER TABLE `club_activity_log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `club_categories`
--
ALTER TABLE `club_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `club_settings`
--
ALTER TABLE `club_settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `setting_key` (`setting_key`),
  ADD KEY `fk_club_settings_club` (`club_id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `club_id` (`club_id`);

--
-- Indexes for table `event_attendance`
--
ALTER TABLE `event_attendance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indexes for table `event_files`
--
ALTER TABLE `event_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indexes for table `event_photos`
--
ALTER TABLE `event_photos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `club_id` (`club_id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `club_id` (`club_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `workshops`
--
ALTER TABLE `workshops`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_workshops_club` (`club_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clubs`
--
ALTER TABLE `clubs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `club_activity_log`
--
ALTER TABLE `club_activity_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `club_categories`
--
ALTER TABLE `club_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `club_settings`
--
ALTER TABLE `club_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `event_attendance`
--
ALTER TABLE `event_attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `event_files`
--
ALTER TABLE `event_files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `event_photos`
--
ALTER TABLE `event_photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `workshops`
--
ALTER TABLE `workshops`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `club_settings`
--
ALTER TABLE `club_settings`
  ADD CONSTRAINT `fk_club_settings_club` FOREIGN KEY (`club_id`) REFERENCES `clubs` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`club_id`) REFERENCES `clubs` (`id`);

--
-- Constraints for table `event_attendance`
--
ALTER TABLE `event_attendance`
  ADD CONSTRAINT `event_attendance_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`);

--
-- Constraints for table `event_files`
--
ALTER TABLE `event_files`
  ADD CONSTRAINT `event_files_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`);

--
-- Constraints for table `event_photos`
--
ALTER TABLE `event_photos`
  ADD CONSTRAINT `event_photos_ibfk_1` FOREIGN KEY (`club_id`) REFERENCES `clubs` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `event_photos_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`club_id`) REFERENCES `clubs` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `workshops`
--
ALTER TABLE `workshops`
  ADD CONSTRAINT `fk_workshops_club` FOREIGN KEY (`club_id`) REFERENCES `clubs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
