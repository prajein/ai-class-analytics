import { getDb, closeDb } from './index';

/**
 * Initialize the database with tables and seed data
 */
export function initializeDatabase(): void {
  const db = getDb();
  
  try {
    // Create tables if they don't exist
    db.exec(`
      -- Students table
      CREATE TABLE IF NOT EXISTS students (
        student_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        section TEXT NOT NULL,
        email TEXT UNIQUE
      );

      -- Teachers table
      CREATE TABLE IF NOT EXISTS teachers (
        teacher_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        subject TEXT NOT NULL,
        section TEXT NOT NULL,
        email TEXT UNIQUE
      );

      -- Midsem scores table
      CREATE TABLE IF NOT EXISTS midsem_scores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER NOT NULL,
        es_score INTEGER,
        flat_score INTEGER,
        dbms_score INTEGER,
        mathematics_score INTEGER,
        daa_score INTEGER,
        FOREIGN KEY (student_id) REFERENCES students(student_id)
      );
    `);

    // Insert seed data if tables are empty
    const studentCount = db.prepare('SELECT COUNT(*) as count FROM students').get() as { count: number };
    
    if (studentCount.count === 0) {
      // Insert sample students
      const insertStudent = db.prepare('INSERT INTO students (name, section, email) VALUES (?, ?, ?)');
      insertStudent.run('John Doe', 'A', 'john@example.com');
      insertStudent.run('Jane Smith', 'B', 'jane@example.com');
      insertStudent.run('Bob Johnson', 'A', 'bob@example.com');
      
      // Insert sample teachers
      const insertTeacher = db.prepare('INSERT INTO teachers (name, subject, section, email) VALUES (?, ?, ?, ?)');
      insertTeacher.run('Dr. Alice Brown', 'ES', 'A', 'alice@example.com');
      insertTeacher.run('Prof. Charlie Davis', 'FLAT', 'B', 'charlie@example.com');
      
      // Insert sample midsem scores
      const insertScore = db.prepare(
        'INSERT INTO midsem_scores (student_id, es_score, flat_score, dbms_score, mathematics_score, daa_score) VALUES (?, ?, ?, ?, ?, ?)'
      );
      insertScore.run(1, 25, 28, 22, 27, 24);
      insertScore.run(2, 23, 25, 28, 24, 26);
      insertScore.run(3, 27, 22, 25, 26, 23);
      
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
  closeDb();
} 