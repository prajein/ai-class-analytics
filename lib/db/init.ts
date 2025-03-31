import { executeQuery, executeTransaction } from './index';

/**
 * Initialize the database with tables and seed data
 */
export async function initializeDatabase(): Promise<void> {
  try {
    // Create tables if they don't exist
    await executeTransaction([
      {
        query: `
          CREATE TABLE IF NOT EXISTS students (
            student_id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            section VARCHAR(50) NOT NULL,
            email VARCHAR(100) UNIQUE
          )
        `
      },
      {
        query: `
          CREATE TABLE IF NOT EXISTS teachers (
            teacher_id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            subject VARCHAR(100) NOT NULL,
            section VARCHAR(50) NOT NULL,
            email VARCHAR(100) UNIQUE
          )
        `
      },
      {
        query: `
          CREATE TABLE IF NOT EXISTS midsem_scores (
            id INT AUTO_INCREMENT PRIMARY KEY,
            student_id INT NOT NULL,
            es_score INT,
            flat_score INT,
            dbms_score INT,
            mathematics_score INT,
            daa_score INT,
            FOREIGN KEY (student_id) REFERENCES students(student_id)
          )
        `
      }
    ]);

    // Check if tables are empty
    const studentCount = await executeQuery('SELECT COUNT(*) as count FROM students');
    
    if (studentCount.rows[0].count === 0) {
      // Insert sample students
      await executeTransaction([
        {
          query: 'INSERT INTO students (name, section, email) VALUES (?, ?, ?)',
          params: ['John Doe', 'A', 'john@example.com']
        },
        {
          query: 'INSERT INTO students (name, section, email) VALUES (?, ?, ?)',
          params: ['Jane Smith', 'B', 'jane@example.com']
        },
        {
          query: 'INSERT INTO students (name, section, email) VALUES (?, ?, ?)',
          params: ['Bob Johnson', 'A', 'bob@example.com']
        }
      ]);
      
      // Insert sample teachers
      await executeTransaction([
        {
          query: 'INSERT INTO teachers (name, subject, section, email) VALUES (?, ?, ?, ?)',
          params: ['Dr. Alice Brown', 'ES', 'A', 'alice@example.com']
        },
        {
          query: 'INSERT INTO teachers (name, subject, section, email) VALUES (?, ?, ?, ?)',
          params: ['Prof. Charlie Davis', 'FLAT', 'B', 'charlie@example.com']
        }
      ]);
      
      // Insert sample midsem scores
      await executeTransaction([
        {
          query: 'INSERT INTO midsem_scores (student_id, es_score, flat_score, dbms_score, mathematics_score, daa_score) VALUES (?, ?, ?, ?, ?, ?)',
          params: [1, 25, 28, 22, 27, 24]
        },
        {
          query: 'INSERT INTO midsem_scores (student_id, es_score, flat_score, dbms_score, mathematics_score, daa_score) VALUES (?, ?, ?, ?, ?, ?)',
          params: [2, 23, 25, 28, 24, 26]
        },
        {
          query: 'INSERT INTO midsem_scores (student_id, es_score, flat_score, dbms_score, mathematics_score, daa_score) VALUES (?, ?, ?, ?, ?, ?)',
          params: [3, 27, 22, 25, 26, 23]
        }
      ]);
      
      console.log('Database initialized with seed data');
    } else {
      console.log('Database already contains data, skipping seed data insertion');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// Run this function to initialize the database
if (require.main === module) {
  initializeDatabase();
} 