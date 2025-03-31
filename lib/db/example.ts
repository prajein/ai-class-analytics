import { executeQuery, initializePool, closePool } from './index';

/**
 * Example of using the MySQL database
 */
async function databaseExample() {
  try {
    // Initialize the connection pool
    await initializePool();
    
    // Example 1: Query all students
    console.log('\n--- All Students ---');
    const students = await executeQuery('SELECT * FROM students');
    console.log(students.rows);
    
    // Example 2: Query all teachers
    console.log('\n--- All Teachers ---');
    const teachers = await executeQuery('SELECT * FROM teachers');
    console.log(teachers.rows);
    
    // Example 3: Join query with parameters
    console.log('\n--- Student Scores ---');
    const scores = await executeQuery(`
      SELECT s.name, m.es_score, m.flat_score, m.dbms_score, m.mathematics_score, m.daa_score
      FROM students s
      JOIN midsem_scores m ON s.student_id = m.student_id
      WHERE s.section = ?
    `, ['A']);
    console.log(scores.rows);
    
    // Example 4: Complex query with multiple joins
    console.log('\n--- Student Performance by Section ---');
    const performance = await executeQuery(`
      SELECT 
        s.section,
        COUNT(DISTINCT s.student_id) as total_students,
        AVG(m.es_score) as avg_es,
        AVG(m.flat_score) as avg_flat,
        AVG(m.dbms_score) as avg_dbms,
        AVG(m.mathematics_score) as avg_math,
        AVG(m.daa_score) as avg_daa
      FROM students s
      JOIN midsem_scores m ON s.student_id = m.student_id
      GROUP BY s.section
      ORDER BY s.section
    `);
    console.log(performance.rows);
    
  } catch (error) {
    console.error('Error in database example:', error);
  } finally {
    // Always close the connection pool when done
    await closePool();
  }
}

// Run the example if this file is executed directly
if (require.main === module) {
  databaseExample();
} 