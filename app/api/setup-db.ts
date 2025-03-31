import { initializeDatabase } from '../../lib/db/init';

/**
 * Initialize the database on server startup
 * This is executed when the server starts
 */
export function setupDatabase() {
  try {
    console.log('Initializing database...');
    initializeDatabase();
    console.log('Database initialization complete');
    return { success: true };
  } catch (error) {
    console.error('Error initializing database:', error);
    return { success: false, error };
  }
}

// Export a global setup function that can be used in other files
export default setupDatabase; 