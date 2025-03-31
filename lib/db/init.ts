import { executeQuery } from './index';
import fs from 'fs';
import path from 'path';

/**
 * Initialize the database with tables and seed data from SQL file
 */
export async function initializeDatabase(): Promise<void> {
  try {
    // Read the SQL file
    const sqlFilePath = path.join(process.cwd(), 'DBMSproj.sql');
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');

    // Split the SQL content into individual statements
    const statements = sqlContent
      .split(';')
      .map(statement => statement.trim())
      .filter(statement => statement.length > 0);

    // Execute each statement
    for (const statement of statements) {
      try {
        await executeQuery(statement);
      } catch (error) {
        // Skip duplicate table/column errors
        if (error instanceof Error && 
            (error.message.includes('already exists') || 
             error.message.includes('Duplicate column'))) {
          console.log('Skipping duplicate:', statement.substring(0, 50) + '...');
          continue;
        }
        throw error;
      }
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// Run this function to initialize the database
if (require.main === module) {
  initializeDatabase();
} 