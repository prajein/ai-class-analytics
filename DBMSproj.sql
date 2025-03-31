CREATE DATABASE AI_DEPARTMENT;
CREATE TABLE classes (
    section VARCHAR(50) PRIMARY KEY,  
    room_number VARCHAR(50),           
    building VARCHAR(100)              
);
CREATE TABLE teachers (
    teacher_id INT PRIMARY KEY,        
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    subject VARCHAR(100) NOT NULL,
    section VARCHAR(50),               
    FOREIGN KEY (section) REFERENCES classes(section)  
);
CREATE TABLE students (
    student_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    section VARCHAR(50),               
    FOREIGN KEY (section) REFERENCES classes(section)  
);
CREATE TABLE midsem_scores (
    student_id INT PRIMARY KEY,       
    es_score FLOAT CHECK (es_score >= 0 AND es_score <= 30),
    flat_score FLOAT CHECK (flat_score >= 0 AND flat_score <= 30),
    dbms_score FLOAT CHECK (dbms_score >= 0 AND dbms_score <= 30),
    mathematics_score FLOAT CHECK (mathematics_score >= 0 AND mathematics_score <= 30),
    daa_score FLOAT CHECK (daa_score >= 0 AND daa_score <= 30),
    total_score FLOAT,                 
    FOREIGN KEY (student_id) REFERENCES students(student_id) 
);
----------------------------------------------------------------------------------------------------------------------------------------------------------------
INSERT INTO classes (section, room_number, building) VALUES('A', '101', 'Main Building');
INSERT INTO classes (section, room_number, building) VALUES ('B', '102', 'Main Building');
INSERT INTO classes (section, room_number, building) VALUES ('C', '201', 'Science Block');
INSERT INTO classes (section, room_number, building) VALUES ('D', '202', 'Science Block');
INSERT INTO classes (section, room_number, building) VALUES ('E', '301', 'Arts Block');

-- Teachers for Section A
INSERT INTO teachers (teacher_id, name, email, subject, section) VALUES (1, 'Aditi Sharma', 'aditi.sharma@example.com', 'ES', 'A');
INSERT INTO teachers (teacher_id, name, email, subject, section) VALUES (2, 'Ravi Kumar', 'ravi.kumar@example.com', 'FLAT', 'A');
INSERT INTO teachers (teacher_id, name, email, subject, section) VALUES (3, 'Priya Singh', 'priya.singh@example.com', 'DBMS', 'A');
INSERT INTO teachers (teacher_id, name, email, subject, section) VALUES (4, 'Rahul Verma', 'rahul.verma@example.com', 'Mathematics', 'A');
INSERT INTO teachers (teacher_id, name, email, subject, section) VALUES (5, 'Sneha Gupta', 'sneha.gupta@example.com', 'DAA', 'A');

-- Teachers for Section B
INSERT INTO teachers (teacher_id, name, email, subject, section) VALUES (6, 'Anil Joshi', 'anil.joshi@example.com', 'ES', 'B');
INSERT INTO teachers (teacher_id, name, email, subject, section) VALUES (7, 'Meera Nair', 'meera.nair@example.com', 'FLAT', 'B');
INSERT INTO teachers (teacher_id, name, email, subject, section) VALUES (8, 'Kiran Reddy', 'kiran.reddy@example.com', 'DBMS', 'B');
INSERT INTO teachers (teacher_id, name, email, subject, section) VALUES (9, 'Suresh Babu', 'suresh.babu@example.com', 'Mathematics', 'B');
INSERT INTO teachers (teacher_id, name, email, subject, section) VALUES (10, 'Pooja Mehta', 'pooja.mehta@example.com', 'DAA', 'B');

-- Teachers for Section C
INSERT INTO teachers (teacher_id, name, email, subject, section) VALUES (11, 'Vikram Singh', 'vikram.singh@example.com', 'ES', 'C');
INSERT INTO teachers (teacher_id, name, email, subject, section) VALUES (12, 'Nisha Sharma', 'nisha.sharma@example.com', 'FLAT', 'C');
INSERT INTO teachers (teacher_id, name, email, subject, section) VALUES (13, 'Rajesh Gupta', 'rajesh.gupta@example.com', 'DBMS', 'C');
INSERT INTO teachers (teacher_id, name, email, subject, section) VALUES (14, 'Sanjay Verma', 'sanjay.verma@example.com', 'Mathematics', 'C');
INSERT INTO teachers (teacher_id, name, email, subject, section) VALUES (15, 'Ritika Iyer', 'ritika.iyer@example.com', 'DAA', 'C');

-- Teachers for Section D
INSERT INTO teachers (teacher_id, name, email, subject, section) VALUES (16, 'Aman Khanna', 'aman.khanna@example.com', 'ES', 'D');
INSERT INTO teachers (teacher_id, name, email, subject, section) VALUES (17, 'Deepika Rao', 'deepika.rao@example.com', 'FLAT', 'D');
INSERT INTO teachers (teacher_id, name, email, subject, section) VALUES (18, 'Kavita Joshi', 'kavita.joshi@example.com', 'DBMS', 'D');
INSERT INTO teachers (teacher_id, name, email, subject, section) VALUES (19, 'Rohit Sharma', 'rohit.sharma@example.com', 'Mathematics', 'D');
INSERT INTO teachers (teacher_id, name, email, subject, section) VALUES (20, 'Tanvi Mehta', 'tanvi.mehta@example.com', 'DAA', 'D');

-- Teachers for Section E
INSERT INTO teachers (teacher_id, name, email, subject, section) VALUES (21, 'Siddharth Nair', 'siddharth.nair@example.com', 'ES', 'E');
INSERT INTO teachers (teacher_id, name, email, subject, section) VALUES (22, 'Anjali Kapoor', 'anjali.kapoor@example.com', 'FLAT', 'E');
INSERT INTO teachers (teacher_id, name, email, subject, section) VALUES (23, 'Vivek Reddy', 'vivek.reddy@example.com', 'DBMS', 'E');
INSERT INTO teachers (teacher_id, name, email, subject, section) VALUES (24, 'Neha Gupta', 'neha.gupta@example.com', 'Mathematics', 'E');
INSERT INTO teachers (teacher_id, name, email, subject, section) VALUES (25, 'Ravi Iyer', 'ravi.iyer@example.com', 'DAA', 'E');

INSERT INTO students (student_id, name, email, section) VALUES (1, 'Aarav Mehta', 'aarav.mehta@example.com', 'A');
INSERT INTO students (student_id, name, email, section) VALUES (2, 'Vivaan Sharma', 'vivaan.sharma@example.com', 'A');
INSERT INTO students (student_id, name, email, section) VALUES (3, 'Aditya Rao', 'aditya.rao@example.com', 'B');
INSERT INTO students (student_id, name, email, section) VALUES (4, 'Ananya Iyer', 'ananya.iyer@example.com', 'C');
INSERT INTO students (student_id, name, email, section) VALUES (5, 'Diya Patel', 'diya.patel@example.com', 'D');
INSERT INTO students (student_id, name, email, section) VALUES (6, 'Karan Singh', 'karan.singh@example.com', 'E');
INSERT INTO students (student_id, name, email, section) VALUES (7, 'Riya Kapoor', 'riya.kapoor@example.com', 'A');
INSERT INTO students (student_id, name, email, section) VALUES (8, 'Arjun Joshi', 'arjun.joshi@example.com', 'B');
INSERT INTO students (student_id, name, email, section) VALUES (9, 'Nisha Reddy', 'nisha.reddy@example.com', 'C');
INSERT INTO students (student_id, name, email, section) VALUES (10, 'Siddharth Nair', 'siddharth.nair@example.com', 'D');

INSERT INTO midsem_scores (student_id, es_score, flat_score, dbms_score, mathematics_score, daa_score, total_score) VALUES (1, 28, 30, 25, 27, 29, NULL);  -- Aarav Mehta
INSERT INTO midsem_scores (student_id, es_score, flat_score, dbms_score, mathematics_score, daa_score, total_score) VALUES (2, 22, 25, 20, 18, 24, NULL);  -- Vivaan Sharma
INSERT INTO midsem_scores (student_id, es_score, flat_score, dbms_score, mathematics_score, daa_score, total_score) VALUES (3, 30, 28, 29, 30, 30, NULL);  -- Aditya Rao
INSERT INTO midsem_scores (student_id, es_score, flat_score, dbms_score, mathematics_score, daa_score, total_score) VALUES (4, 15, 20, 18, 17, 19, NULL);   -- Ananya Iyer
INSERT INTO midsem_scores (student_id, es_score, flat_score, dbms_score, mathematics_score, daa_score, total_score) VALUES (5, 29, 30, 30, 28, 27, NULL);   -- Diya Patel
INSERT INTO midsem_scores (student_id, es_score, flat_score, dbms_score, mathematics_score, daa_score, total_score) VALUES (6, 20, 22, 25, 19, 18, NULL);   -- Karan Singh
INSERT INTO midsem_scores (student_id, es_score, flat_score, dbms_score, mathematics_score, daa_score, total_score) VALUES (7, 27, 29, 28, 26, 30, NULL);   -- Riya Kapoor
INSERT INTO midsem_scores (student_id, es_score, flat_score, dbms_score, mathematics_score, daa_score, total_score) VALUES (8, 24, 20, 22, 21, 23, NULL);   -- Arjun Joshi
INSERT INTO midsem_scores (student_id, es_score, flat_score, dbms_score, mathematics_score, daa_score, total_score) VALUES (9, 28, 27, 30, 29, 28, NULL);   -- Nisha Reddy
INSERT INTO midsem_scores (student_id, es_score, flat_score, dbms_score, mathematics_score, daa_score, total_score) VALUES (10, 19, 21, 20, 18, 17, NULL);  -- Siddharth Nair

UPDATE midsem_scores
SET total_score = (es_score + flat_score + dbms_score + mathematics_score + daa_score) ;

------------ How many Classes fail to report information 
SELECT COUNT(DISTINCT s.section) AS classes_with_missing_info
FROM midsem_scores m
JOIN students s ON m.student_id = s.student_id
WHERE m.es_score IS NULL 
   OR m.flat_score IS NULL 
   OR m.dbms_score IS NULL 
   OR m.mathematics_score IS NULL 
   OR m.daa_score IS NULL;
   
-------------- worst marks in each subject class wise 
SELECT 
    s.section,
    MIN(m.es_score) AS worst_es,
    MIN(m.flat_score) AS worst_flat,
    MIN(m.dbms_score) AS worst_dbms,
    MIN(m.mathematics_score) AS worst_math,
    MIN(m.daa_score) AS worst_daa
FROM midsem_scores m
JOIN students s ON m.student_id = s.student_id
GROUP BY s.section;
-------------- best marks in each subject class wise 
SELECT 
    s.section,
    MAX(m.es_score) AS best_es,
    MAX(m.flat_score) AS best_flat,
    MAX(m.dbms_score) AS best_dbms,
    MAX(m.mathematics_score) AS best_math,
    MAX(m.daa_score) AS best_daa
FROM midsem_scores m
JOIN students s ON m.student_id = s.student_id
GROUP BY s.section
ORDER BY s.section;
-------------- Which  sections have lowest marks  in each of the 5 subjects —ES,Flat,DBMS,Mathematics,DAA 
WITH LowestScores AS (
    SELECT 
        s.section,
        m.es_score,
        m.flat_score,
        m.dbms_score,
        m.mathematics_score,
        m.daa_score,
        ROW_NUMBER() OVER (PARTITION BY 'ES' ORDER BY m.es_score) AS es_rank,
        ROW_NUMBER() OVER (PARTITION BY 'FLAT' ORDER BY m.flat_score) AS flat_rank,
        ROW_NUMBER() OVER (PARTITION BY 'DBMS' ORDER BY m.dbms_score) AS dbms_rank,
        ROW_NUMBER() OVER (PARTITION BY 'Mathematics' ORDER BY m.mathematics_score) AS math_rank,
        ROW_NUMBER() OVER (PARTITION BY 'DAA' ORDER BY m.daa_score) AS daa_rank
    FROM midsem_scores m
    JOIN students s ON m.student_id = s.student_id
)

SELECT 
    'ES' AS subject,
    section,
    es_score AS lowest_score
FROM LowestScores
WHERE es_rank = 1

UNION ALL

SELECT 
    'FLAT' AS subject,
    section,
    flat_score AS lowest_score
FROM LowestScores
WHERE flat_rank = 1

UNION ALL

SELECT 
    'DBMS' AS subject,
    section,
    dbms_score AS lowest_score
FROM LowestScores
WHERE dbms_rank = 1

UNION ALL

SELECT 
    'Mathematics' AS subject,
    section,
    mathematics_score AS lowest_score
FROM LowestScores
WHERE math_rank = 1

UNION ALL

SELECT 
    'DAA' AS subject,
    section,
    daa_score AS lowest_score
FROM LowestScores
WHERE daa_rank = 1;
---------------------------- Which sections have the highest marks in each of the 5 subjects —ES,Flat,DBMS,Mathematics,DAA 
WITH HighestScores AS (
    SELECT 
        s.section,
        m.es_score,
        m.flat_score,
        m.dbms_score,
        m.mathematics_score,
        m.daa_score,
        ROW_NUMBER() OVER (PARTITION BY 'ES' ORDER BY m.es_score DESC) AS es_rank,
        ROW_NUMBER() OVER (PARTITION BY 'FLAT' ORDER BY m.flat_score DESC) AS flat_rank,
        ROW_NUMBER() OVER (PARTITION BY 'DBMS' ORDER BY m.dbms_score DESC) AS dbms_rank,
        ROW_NUMBER() OVER (PARTITION BY 'Mathematics' ORDER BY m.mathematics_score DESC) AS math_rank,
        ROW_NUMBER() OVER (PARTITION BY 'DAA' ORDER BY m.daa_score DESC) AS daa_rank
    FROM midsem_scores m
    JOIN students s ON m.student_id = s.student_id
)

SELECT 
    'ES' AS subject,
    section,
    es_score AS highest_score
FROM HighestScores
WHERE es_rank = 1

UNION ALL

SELECT 
    'FLAT' AS subject,
    section,
    flat_score AS highest_score
FROM HighestScores
WHERE flat_rank = 1

UNION ALL

SELECT 
    'DBMS' AS subject,
    section,
    dbms_score AS highest_score
FROM HighestScores
WHERE dbms_rank = 1

UNION ALL

SELECT 
    'Mathematics' AS subject,
    section,
    mathematics_score AS highest_score
FROM HighestScores
WHERE math_rank = 1

UNION ALL

SELECT 
    'DAA' AS subject,
    section,
    daa_score AS highest_score
FROM HighestScores
WHERE daa_rank = 1;
------------------------------------ how many sections have the highest marks in each of the 5 subjects —ES,Flat,DBMS,Mathematics,DAA 
WITH MaxScores AS (
    SELECT 
        MAX(m.es_score) AS max_es,
        MAX(m.flat_score) AS max_flat,
        MAX(m.dbms_score) AS max_dbms,
        MAX(m.mathematics_score) AS max_math,
        MAX(m.daa_score) AS max_daa
    FROM midsem_scores m
),
SectionCounts AS (
    SELECT 
        s.section,
        m.es_score,
        m.flat_score,
        m.dbms_score,
        m.mathematics_score,
        m.daa_score
    FROM midsem_scores m
    JOIN students s ON m.student_id = s.student_id
)

SELECT 
    'ES' AS subject,
    COUNT(DISTINCT s.section) AS section_count
FROM SectionCounts s
JOIN MaxScores m ON s.es_score = m.max_es

UNION ALL

SELECT 
    'FLAT' AS subject,
    COUNT(DISTINCT s.section) AS section_count
FROM SectionCounts s
JOIN MaxScores m ON s.flat_score = m.max_flat

UNION ALL

SELECT 
    'DBMS' AS subject,
    COUNT(DISTINCT s.section) AS section_count
FROM SectionCounts s
JOIN MaxScores m ON s.dbms_score = m.max_dbms

UNION ALL

SELECT 
    'Mathematics' AS subject,
    COUNT(DISTINCT s.section) AS section_count
FROM SectionCounts s
JOIN MaxScores m ON s.mathematics_score = m.max_math

UNION ALL

SELECT 
    'DAA' AS subject,
    COUNT(DISTINCT s.section) AS section_count
FROM SectionCounts s
JOIN MaxScores m ON s.daa_score = m.max_daa;
------------------------------------------------------------- how many sections have the lowest marks in each of the 5 subjects —ES,Flat,DBMS,Mathematics,DAA 
WITH MinScores AS (
    SELECT 
        MIN(m.es_score) AS min_es,
        MIN(m.flat_score) AS min_flat,
        MIN(m.dbms_score) AS min_dbms,
        MIN(m.mathematics_score) AS min_math,
        MIN(m.daa_score) AS min_daa
    FROM midsem_scores m
),
SectionCounts AS (
    SELECT 
        s.section,
        m.es_score,
        m.flat_score,
        m.dbms_score,
        m.mathematics_score,
        m.daa_score
    FROM midsem_scores m
    JOIN students s ON m.student_id = s.student_id
)

SELECT 
    'ES' AS subject,
    COUNT(DISTINCT s.section) AS section_count
FROM SectionCounts s
JOIN MinScores m ON s.es_score = m.min_es

UNION ALL

SELECT 
    'FLAT' AS subject,
    COUNT(DISTINCT s.section) AS section_count
FROM SectionCounts s
JOIN MinScores m ON s.flat_score = m.min_flat

UNION ALL

SELECT 
    'DBMS' AS subject,
    COUNT(DISTINCT s.section) AS section_count
FROM SectionCounts s
JOIN MinScores m ON s.dbms_score = m.min_dbms

UNION ALL

SELECT 
    'Mathematics' AS subject,
    COUNT(DISTINCT s.section) AS section_count
FROM SectionCounts s
JOIN MinScores m ON s.mathematics_score = m.min_math

UNION ALL

SELECT 
    'DAA' AS subject,
    COUNT(DISTINCT s.section) AS section_count
FROM SectionCounts s
JOIN MinScores m ON s.daa_score = m.min_daa;
------------------------------------------------------------- The top 10 students by average total Midsems scores
SELECT 
    s.student_id,
    s.name,
    (m.es_score + m.flat_score + m.dbms_score + m.mathematics_score + m.daa_score) / 5.0 AS average_score
FROM midsem_scores m
JOIN students s ON m.student_id = s.student_id
ORDER BY average_score DESC;
------------------------------------------------------------- How the test performance varies by Teachers for a given subject 
SELECT 
    t.teacher_id,
    t.name AS teacher_name,
    s.section,
    AVG(m.mathematics_score) AS avg_math_score
FROM teachers t
JOIN students s ON t.section = s.section
JOIN midsem_scores m ON s.student_id = m.student_id
WHERE t.subject = 'Mathematics'  -- Replace 'Mathematics' with the desired subject
GROUP BY t.teacher_id, t.name, s.section
ORDER BY s.section;

SELECT 
    t.teacher_id,
    t.name AS teacher_name,
    s.section,
    AVG(m.ES_score) AS avg_ES_score
FROM teachers t
JOIN students s ON t.section = s.section
JOIN midsem_scores m ON s.student_id = m.student_id
WHERE t.subject = 'ES'  
GROUP BY t.teacher_id, t.name, s.section
ORDER BY s.section;

SELECT 
    t.teacher_id,
    t.name AS teacher_name,
    s.section,
    AVG(m.FLAT_score) AS avg_FLAT_score
FROM teachers t
JOIN students s ON t.section = s.section
JOIN midsem_scores m ON s.student_id = m.student_id
WHERE t.subject = 'FLAT'  
GROUP BY t.teacher_id, t.name, s.section
ORDER BY s.section;

SELECT 
    t.teacher_id,
    t.name AS teacher_name,
    s.section,
    AVG(m.DAA_score) AS avg_DAA_score
FROM teachers t
JOIN students s ON t.section = s.section
JOIN midsem_scores m ON s.student_id = m.student_id
WHERE t.subject = 'DAA'  
GROUP BY t.teacher_id, t.name, s.section
ORDER BY s.section;

SELECT 
    t.teacher_id,
    t.name AS teacher_name,
    s.section,
    AVG(m.DBMS_score) AS avg_DBMS_score
FROM teachers t
JOIN students s ON t.section = s.section
JOIN midsem_scores m ON s.student_id = m.student_id
WHERE t.subject = 'DBMS'  
GROUP BY t.teacher_id, t.name, s.section
ORDER BY s.section;

---------------------------------------------------------------------- The top 5 students by average Midsem  for a selected Teacher
SELECT 
    s.student_id,
    s.name AS student_name,
    (AVG(m.es_score) + AVG(m.flat_score) + AVG(m.dbms_score) + AVG(m.mathematics_score) + AVG(m.daa_score)) / 5.0 AS average_score
FROM students s
JOIN midsem_scores m ON s.student_id = m.student_id
JOIN teachers t ON s.section = t.section
WHERE t.teacher_id = 1  -- Replace with the desired teacher ID
GROUP BY s.student_id, s.name
ORDER BY average_score DESC;



