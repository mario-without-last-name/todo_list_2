CREATE DATABASE perntodo_continued;

-- CREATE TABLE todo(
--     todo_id SERIAL PRIMARY KEY,
--     name VARCHAR(255),
--     address VARCHAR(255),
--     gender VARCHAR(255),
--     date_of_birth VARCHAR(255)
-- );

-- CREATE TABLE todo (
--     todo_id SERIAL PRIMARY KEY,
--     name VARCHAR(255),
--     age INT,
--     gender ENUM('male', 'female', 'unknown'),    --radio buttons
--     date_of_birth DATE,                          --date format (triple dropdown lists?)
--     gpa DECIMAL(3,1),                            -- 0.0 to 4.0
--     is_working BOOLEAN,                          --boolean
--     interests SET('games', 'sports', 'reading'), --checkboxes
--     description TEXT,
--     profile_picture LONGBLOB                     --image file
-- );

CREATE TABLE todo (
    todo_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    age INT,
    gender VARCHAR(255),
    date_of_birth DATE,
    gpa DECIMAL(3,1),
    is_working BOOLEAN,
    interests VARCHAR(255),
    profile_picture VARCHAR(255)
);

INSERT INTO todo (name, age, gender, date_of_birth, gpa, is_working, interests, profile_picture)
VALUES
('John', 25, 'male', '1997-01-15', 3.2, true, 'games,sports,reading', 'images/john.jpg'),
('Jane', 28, 'female', '1994-03-22', 3.8, false, '', 'images/jane.jpg'),
('Alex', 22, 'unknown', '1999-07-10', 2.7, true, 'sports', 'images/alex.jpg');

