/**
 * Script to test Oracle database connection
 * Run with: node scripts/test-connection.js
 */

require('dotenv').config({ path: '.env.local' });
const oracledb = require('oracledb');

async function testConnection() {
  let connection;
  
  try {
    // Configure Oracle client
    oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
    oracledb.autoCommit = true;
    
    // Connection configuration
    const dbConfig = {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECTION_STRING,
    };
    
    console.log('Testing Oracle database connection...');
    
    // Check if environment variables are set
    if (!dbConfig.user || !dbConfig.password || !dbConfig.connectString) {
      throw new Error('Database credentials not found. Make sure DB_USER, DB_PASSWORD, and DB_CONNECTION_STRING are set in .env.local');
    }
    
    // Create a connection
    connection = await oracledb.getConnection(dbConfig);
    console.log('✅ Successfully connected to Oracle database!');
    
    // Test a simple query
    const result = await connection.execute('SELECT 1 as test FROM DUAL');
    console.log('✅ Query executed successfully');
    console.log('Result:', result.rows);
    
    // Print connection info
    console.log('\nConnection Details:');
    console.log('- Oracle Database version:', connection.oracleServerVersion);
    console.log('- Oracle Client version:', oracledb.versionString);
    
    console.log('\n✅ Connection test successful! Your database is properly configured.');
  } catch (error) {
    console.error('❌ Failed to connect to the database:');
    console.error(error);
    console.log('\nTroubleshooting tips:');
    console.log('1. Check that your Oracle DB credentials are correct in .env.local');
    console.log('2. Verify that your Oracle Database instance is running');
    console.log('3. Make sure your Oracle Instant Client is properly installed');
    console.log('4. Check network connectivity and firewall settings');
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log('Connection closed');
      } catch (error) {
        console.error('Error closing connection:', error);
      }
    }
  }
}

testConnection(); 