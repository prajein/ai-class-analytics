import oracledb from "oracledb";

// Configure Oracle client
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.autoCommit = true;

// Connection pool configuration
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING,
};

// Define a type for query parameters
type QueryParam = string | number | boolean | null | undefined;
type QueryResult = { rows: Array<Record<string, unknown>> };

// Define interfaces for Oracle DB objects
interface ConnectionPool {
  getConnection(): Promise<Connection>;
  close(drainTime: number): Promise<void>;
}

interface Connection {
  execute(sql: string, params?: QueryParam[], options?: Record<string, unknown>): Promise<QueryResult>;
  close(): Promise<void>;
}

let pool: ConnectionPool | null = null;

export async function createPool() {
  try {
    if (!pool) {
      pool = await oracledb.createPool(dbConfig) as ConnectionPool;
      console.log("Connection pool created");
    }
  } catch (error) {
    console.error("Error creating connection pool:", error);
    throw error;
  }
}

export async function closePool() {
  try {
    if (pool) {
      await pool.close(0);
      pool = null;
      console.log("Connection pool closed");
    }
  } catch (error) {
    console.error("Error closing connection pool:", error);
    throw error;
  }
}

export async function getConnection() {
  try {
    if (!pool) {
      await createPool();
    }
    return await pool!.getConnection();
  } catch (error) {
    console.error("Error getting connection:", error);
    throw error;
  }
}

export async function executeQuery(query: string, params: QueryParam[] = []) {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(query, params);
    return result.rows;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error("Error closing connection:", error);
      }
    }
  }
}

// Use mock implementation for development
export * from "./mock"; 