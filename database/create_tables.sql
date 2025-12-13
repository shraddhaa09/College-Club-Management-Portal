-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('student','admin') NOT NULL,
    token VARCHAR(512) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SAMPLE USERS
INSERT INTO users (name, email, password, role) VALUES
('Admin', 'admin@clubhub.com', '$2b$12$Jo3GbxBc8EIuXQ3W7VSKuu1Eree8uBz0a4I0sJvdnTZEMs4EqdmK6', 'admin'),
('Jane Doe', 'jane.doe24@vit.edu', '$2y$10$abcdefgh1234567890xyz', 'student');

-- CLUBS TABLE
CREATE TABLE IF NOT EXISTS clubs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    club_email VARCHAR(100) NOT NULL UNIQUE,
    club_password VARCHAR(255) NOT NULL,
    token VARCHAR(512) NULL,
    approved TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE clubs ADD COLUMN approved TINYINT(1) DEFAULT 0;
DESCRIBE clubs;



-- SAMPLE CLUBS
INSERT INTO clubs (name, description, club_email, club_password,approved) VALUES
('Dance Club', 'VIT dance enthusiasts.', 'dance@vit.edu', '$2y$10$abcdefgh1234567890xyz','1'),
('Music Club', 'Musicians and singers community.', 'music@vit.edu', '$2y$10$abcdefgh1234567890xyz','1');

-- EVENTS TABLE
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    club_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    event_date DATE,
    description TEXT,
    status ENUM('pending','approved','rejected') DEFAULT 'pending',
    FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE
);

-- NOTICES TABLE
CREATE TABLE IF NOT EXISTS notices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    club_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    message TEXT,
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE
);

-- MEMBERSHIPS TABLE
CREATE TABLE IF NOT EXISTS memberships (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    club_id INT NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE,
    UNIQUE KEY unique_membership (user_id, club_id)
);
