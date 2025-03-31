import oracledb from 'oracledb';

// Configure Oracle client
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.autoCommit = true;

// Database connection configuration
const dbConfig = {
  user: process.env.DB_USER || 'system',
  password: process.env.DB_PASSWORD || 'oracle',
  connectString: process.env.DB_CONNECTION_STRING || 'localhost:1521/orcl'
};

// Define types
export type QueryParam = string | number | boolean | null | undefined;
export type QueryResult = Array<Record<string, unknown>>;

// Global connection pool
let pool: oracledb.Pool | null = null;

// Initialize connection pool
export async function initializePool() {
  try {
    if (!pool) {
      pool = await oracledb.createPool({
        ...dbConfig,
        poolMin: 2,
        poolMax: 5,
        poolIncrement: 1
      });
      console.log('Oracle connection pool created');
    }
  } catch (error) {
    console.error('Error creating connection pool:', error);
    throw error;
  }
}

// Close connection pool
export async function closePool() {
  try {
    if (pool) {
      await pool.close(0);
      pool = null;
      console.log('Oracle connection pool closed');
    }
  } catch (error) {
    console.error('Error closing connection pool:', error);
    throw error;
  }
}

// Execute a query with parameters and return results
export async function executeQuery(query: string, params: QueryParam[] = []): Promise<QueryResult> {
  let connection;
  try {
    if (!pool) {
      await initializePool();
    }
    
    connection = await pool!.getConnection();
    const result = await connection.execute(query, params);
    return result.rows as QueryResult;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error('Error closing connection:', error);
      }
    }
  }
}

// Execute multiple queries in a transaction
export async function executeTransaction(queries: Array<{ query: string; params?: QueryParam[] }>): Promise<void> {
  let connection;
  try {
    if (!pool) {
      await initializePool();
    }
    
    connection = await pool!.getConnection();
    await connection.execute('BEGIN');
    
    for (const { query, params = [] } of queries) {
      await connection.execute(query, params);
    }
    
    await connection.execute('COMMIT');
  } catch (error) {
    if (connection) {
      try {
        await connection.execute('ROLLBACK');
      } catch (rollbackError) {
        console.error('Error rolling back transaction:', rollbackError);
      }
    }
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error('Error closing connection:', error);
      }
    }
  }
}

// Use mock implementation for development
export * from "./mock"; 