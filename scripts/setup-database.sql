-- Setup database schema for AI Class Analytics

-- Create tables
CREATE TABLE teachers (
    id VARCHAR2(10) PRIMARY KEY,
    name VARCHAR2(100) NOT NULL,
    department VARCHAR2(50) NOT NULL,
    email VARCHAR2(100)
);

CREATE TABLE classes (
    id VARCHAR2(10) PRIMARY KEY,
    name VARCHAR2(100) NOT NULL,
    teacher_id VARCHAR2(10) NOT NULL,
    semester NUMBER(1) NOT NULL,
    year NUMBER(4) NOT NULL,
    CONSTRAINT fk_teacher FOREIGN KEY (teacher_id) REFERENCES teachers(id)
);

CREATE TABLE students (
    id VARCHAR2(10) PRIMARY KEY,
    name VARCHAR2(100) NOT NULL,
    class_id VARCHAR2(10) NOT NULL,
    email VARCHAR2(100),
    CONSTRAINT fk_class FOREIGN KEY (class_id) REFERENCES classes(id)
);

CREATE TABLE subjects (
    id VARCHAR2(10) PRIMARY KEY,
    name VARCHAR2(100) NOT NULL,
    short_name VARCHAR2(10) NOT NULL,
    credits NUMBER(1) NOT NULL
);

CREATE TABLE scores (
    id VARCHAR2(20) PRIMARY KEY,
    student_id VARCHAR2(10) NOT NULL,
    subject_id VARCHAR2(10) NOT NULL,
    score NUMBER(5,2) NOT NULL,
    max_score NUMBER(5,2) DEFAULT 100,
    date DATE NOT NULL,
    CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES students(id),
    CONSTRAINT fk_subject FOREIGN KEY (subject_id) REFERENCES subjects(id)
);

-- Insert sample data
-- Teachers
INSERT INTO teachers (id, name, department, email) VALUES ('T001', 'Dr. Smith', 'AI', 'smith@university.edu');
INSERT INTO teachers (id, name, department, email) VALUES ('T002', 'Prof. Johnson', 'AI', 'johnson@university.edu');
INSERT INTO teachers (id, name, department, email) VALUES ('T003', 'Dr. Williams', 'AI', 'williams@university.edu');

-- Classes
INSERT INTO classes (id, name, teacher_id, semester, year) VALUES ('C001', 'AI-2020', 'T001', 1, 2020);
INSERT INTO classes (id, name, teacher_id, semester, year) VALUES ('C002', 'AI-2021', 'T002', 1, 2021);
INSERT INTO classes (id, name, teacher_id, semester, year) VALUES ('C003', 'AI-2022', 'T003', 1, 2022);

-- Students (3 per class)
INSERT INTO students (id, name, class_id, email) VALUES ('S001', 'Alice Johnson', 'C001', 'alice@example.com');
INSERT INTO students (id, name, class_id, email) VALUES ('S002', 'Bob Smith', 'C001', 'bob@example.com');
INSERT INTO students (id, name, class_id, email) VALUES ('S003', 'Charlie Brown', 'C001', 'charlie@example.com');

INSERT INTO students (id, name, class_id, email) VALUES ('S004', 'Diana Prince', 'C002', 'diana@example.com');
INSERT INTO students (id, name, class_id, email) VALUES ('S005', 'Edward Clark', 'C002', 'edward@example.com');
INSERT INTO students (id, name, class_id, email) VALUES ('S006', 'Fiona White', 'C002', 'fiona@example.com');

INSERT INTO students (id, name, class_id, email) VALUES ('S007', 'George Davis', 'C003', 'george@example.com');
INSERT INTO students (id, name, class_id, email) VALUES ('S008', 'Hannah Wilson', 'C003', 'hannah@example.com');
INSERT INTO students (id, name, class_id, email) VALUES ('S009', 'Ian Thompson', 'C003', 'ian@example.com');

-- Subjects
INSERT INTO subjects (id, name, short_name, credits) VALUES ('SUB01', 'Expert Systems', 'ES', 4);
INSERT INTO subjects (id, name, short_name, credits) VALUES ('SUB02', 'Formal Languages & Automata Theory', 'FLAT', 3);
INSERT INTO subjects (id, name, short_name, credits) VALUES ('SUB03', 'Database Management Systems', 'DBMS', 4);
INSERT INTO subjects (id, name, short_name, credits) VALUES ('SUB04', 'Mathematics', 'MATHS', 3);
INSERT INTO subjects (id, name, short_name, credits) VALUES ('SUB05', 'Design & Analysis of Algorithms', 'DAA', 4);

-- Scores (example midsem scores for each student in each subject)
-- Class 2020
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC001', 'S001', 'SUB01', 85, TO_DATE('2020-03-15', 'YYYY-MM-DD'));
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC002', 'S001', 'SUB02', 78, TO_DATE('2020-03-16', 'YYYY-MM-DD'));
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC003', 'S001', 'SUB03', 92, TO_DATE('2020-03-17', 'YYYY-MM-DD'));
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC004', 'S001', 'SUB04', 88, TO_DATE('2020-03-18', 'YYYY-MM-DD'));
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC005', 'S001', 'SUB05', 95, TO_DATE('2020-03-19', 'YYYY-MM-DD'));

INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC006', 'S002', 'SUB01', 75, TO_DATE('2020-03-15', 'YYYY-MM-DD'));
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC007', 'S002', 'SUB02', 82, TO_DATE('2020-03-16', 'YYYY-MM-DD'));
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC008', 'S002', 'SUB03', 68, TO_DATE('2020-03-17', 'YYYY-MM-DD'));
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC009', 'S002', 'SUB04', 90, TO_DATE('2020-03-18', 'YYYY-MM-DD'));
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC010', 'S002', 'SUB05', 85, TO_DATE('2020-03-19', 'YYYY-MM-DD'));

INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC011', 'S003', 'SUB01', 92, TO_DATE('2020-03-15', 'YYYY-MM-DD'));
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC012', 'S003', 'SUB02', 88, TO_DATE('2020-03-16', 'YYYY-MM-DD'));
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC013', 'S003', 'SUB03', 95, TO_DATE('2020-03-17', 'YYYY-MM-DD'));
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC014', 'S003', 'SUB04', 79, TO_DATE('2020-03-18', 'YYYY-MM-DD'));
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC015', 'S003', 'SUB05', 84, TO_DATE('2020-03-19', 'YYYY-MM-DD'));

-- Class 2021
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC016', 'S004', 'SUB01', 65, TO_DATE('2021-03-15', 'YYYY-MM-DD'));
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC017', 'S004', 'SUB02', 72, TO_DATE('2021-03-16', 'YYYY-MM-DD'));
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC018', 'S004', 'SUB03', 81, TO_DATE('2021-03-17', 'YYYY-MM-DD'));
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC019', 'S004', 'SUB04', 75, TO_DATE('2021-03-18', 'YYYY-MM-DD'));
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC020', 'S004', 'SUB05', 79, TO_DATE('2021-03-19', 'YYYY-MM-DD'));

INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC021', 'S005', 'SUB01', 88, TO_DATE('2021-03-15', 'YYYY-MM-DD'));
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC022', 'S005', 'SUB02', 91, TO_DATE('2021-03-16', 'YYYY-MM-DD'));
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC023', 'S005', 'SUB03', 86, TO_DATE('2021-03-17', 'YYYY-MM-DD'));
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC024', 'S005', 'SUB04', 92, TO_DATE('2021-03-18', 'YYYY-MM-DD'));
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC025', 'S005', 'SUB05', 89, TO_DATE('2021-03-19', 'YYYY-MM-DD'));

INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC026', 'S006', 'SUB01', 78, TO_DATE('2021-03-15', 'YYYY-MM-DD'));
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC027', 'S006', 'SUB02', 82, TO_DATE('2021-03-16', 'YYYY-MM-DD'));
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC028', 'S006', 'SUB03', 76, TO_DATE('2021-03-17', 'YYYY-MM-DD'));
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC029', 'S006', 'SUB04', 85, TO_DATE('2021-03-18', 'YYYY-MM-DD'));
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC030', 'S006', 'SUB05', 80, TO_DATE('2021-03-19', 'YYYY-MM-DD'));

-- Class 2022
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC031', 'S007', 'SUB01', 93, TO_DATE('2022-03-15', 'YYYY-MM-DD'));
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC032', 'S007', 'SUB02', 89, TO_DATE('2022-03-16', 'YYYY-MM-DD'));
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC033', 'S007', 'SUB03', 95, TO_DATE('2022-03-17', 'YYYY-MM-DD'));
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC034', 'S007', 'SUB04', 92, TO_DATE('2022-03-18', 'YYYY-MM-DD'));
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC035', 'S007', 'SUB05', 97, TO_DATE('2022-03-19', 'YYYY-MM-DD'));

INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC036', 'S008', 'SUB01', 82, TO_DATE('2022-03-15', 'YYYY-MM-DD'));
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC037', 'S008', 'SUB02', 78, TO_DATE('2022-03-16', 'YYYY-MM-DD'));
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC038', 'S008', 'SUB03', 75, TO_DATE('2022-03-17', 'YYYY-MM-DD'));
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC039', 'S008', 'SUB04', 80, TO_DATE('2022-03-18', 'YYYY-MM-DD'));
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC040', 'S008', 'SUB05', 85, TO_DATE('2022-03-19', 'YYYY-MM-DD'));

INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC041', 'S009', 'SUB01', 71, TO_DATE('2022-03-15', 'YYYY-MM-DD'));
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC042', 'S009', 'SUB02', 68, TO_DATE('2022-03-16', 'YYYY-MM-DD'));
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC043', 'S009', 'SUB03', 65, TO_DATE('2022-03-17', 'YYYY-MM-DD'));
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC044', 'S009', 'SUB04', 70, TO_DATE('2022-03-18', 'YYYY-MM-DD'));
INSERT INTO scores (id, student_id, subject_id, score, date) VALUES ('SC045', 'S009', 'SUB05', 73, TO_DATE('2022-03-19', 'YYYY-MM-DD'));

COMMIT; 