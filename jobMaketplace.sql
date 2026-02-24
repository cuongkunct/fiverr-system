-- Create Database
CREATE DATABASE JobMarketplace;
USE JobMarketplace;

-- 1. Job Categories
CREATE TABLE JobCategories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(255) NOT NULL
);


CREATE TABLE JobSubCategories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sub_category_name VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES JobCategories(id)
);

-- 3. Users
CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    birth_day DATE,
    gender VARCHAR(10),
    role VARCHAR(50) NOT NULL, -- Admin, Client, Freelancer
    skill TEXT,
    certification TEXT
    refresh_token VARCHAR(255)
    lastLoginAt DATETIME
    create_date DATETIME DEFAULT CURRENT_TIMESTAMP 
);
ALTER TABLE `Users` ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE `Users` ADD COLUMN `avatar` VARCHAR(255);
MODIFY isDeleted BOOLEAN DEFAULT TRUE;

-- 4. Jobs
CREATE TABLE Jobs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    job_name VARCHAR(255) NOT NULL,
    rating INT DEFAULT 0,
    price INT NOT NULL,
    image VARCHAR(255),
    description TEXT,
    short_description VARCHAR(500),
    job_stars INT DEFAULT 0,
    sub_category_id INT,
    creator_id INT,
    create_date DATETIME DEFAULT CURRENT_TIMESTAMP 
    FOREIGN KEY (sub_category_id) REFERENCES JobSubCategories(id),
    FOREIGN KEY (creator_id) REFERENCES Users(id)
);
ALTER TABLE Comments 
ADD COLUMN create_date DATETIME DEFAULT CURRENT_TIMESTAMP;

-- 5. Hired Jobs (ThueCongViec)
CREATE TABLE HiredJobs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    job_id INT,
    hirer_id INT,
    hire_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_completed BOOLEAN DEFAULT FALSE,
    create_date DATETIME DEFAULT CURRENT_TIMESTAMP 
    FOREIGN KEY (job_id) REFERENCES Jobs(id),
    FOREIGN KEY (hirer_id) REFERENCES Users(id)
);

-- 6. Comments
CREATE TABLE Comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    job_id INT,
    user_id INT,
    comment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    content TEXT,
    rating_stars INT,
    create_date DATETIME DEFAULT CURRENT_TIMESTAMP 
    FOREIGN KEY (job_id) REFERENCES Jobs(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- INSERT DEMO DATA
INSERT INTO JobCategories (category_name) VALUES ('Graphics & Design'), ('Programming & Tech');

INSERT INTO JobSubCategories (sub_category_name, category_id) VALUES ('Logo Design', 1), ('Web Development', 2);

INSERT INTO Users (name, email, password, role, skill) VALUES 
('John Doe', 'john@example.com', 'hashed_pass', 'Freelancer', 'NodeJS, React'),
('Alice Smith', 'alice@example.com', 'hashed_pass', 'Client', NULL);

INSERT INTO Jobs (job_name, price, sub_category_id, creator_id, description) VALUES 
('Professional Portfolio Website', 500, 2, 1, 'High quality web dev services');