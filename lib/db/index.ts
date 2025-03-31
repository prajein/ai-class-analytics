import * as mysql from 'mysql2/promise';
import { dbConfig, type QueryParam, type QueryResult, type ConnectionPool, type Connection } from './config';

// Global connection pool
let pool: ConnectionPool | null = null;

// Initialize connection pool
export async function initializePool() {
  try {
    if (!pool) {
      pool = mysql.createPool({
        ...dbConfig,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });
      console.log('MySQL connection pool created');
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
      await pool.end();
      pool = null;
      console.log('MySQL connection pool closed');
    }
  } catch (error) {
    console.error('Error closing connection pool:', error);
    throw error;
  }
}

// Execute a query with parameters and return results
export async function executeQuery(query: string, params: QueryParam[] = []): Promise<QueryResult> {
  let connection: Connection | null = null;
  try {
    if (!pool) {
      await initializePool();
    }
    
    connection = await pool!.getConnection();
    const [rows] = await connection.query(query, params);
    return { rows: rows as Array<Record<string, unknown>> };
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

// Execute multiple queries in a transaction
export async function executeTransaction(queries: Array<{ query: string; params?: QueryParam[] }>): Promise<void> {
  let connection: Connection | null = null;
  try {
    if (!pool) {
      await initializePool();
    }
    
    connection = await pool!.getConnection();
    await connection.query('START TRANSACTION');
    
    for (const { query, params = [] } of queries) {
      await connection.query(query, params);
    }
    
    await connection.query('COMMIT');
  } catch (error) {
    if (connection) {
      try {
        await connection.query('ROLLBACK');
      } catch (rollbackError) {
        console.error('Error rolling back transaction:', rollbackError);
      }
    }
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

// Use mock implementation for development
export * from "./mock"; 