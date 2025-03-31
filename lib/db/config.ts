import oracledb from "oracledb";

// Disable external configuration providers
oracledb.externalAuth = false;
oracledb.configDir = undefined;

// Configure Oracle client
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.autoCommit = true;

// Connection pool configuration
export const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING,
};

// Define types
export type QueryParam = string | number | boolean | null | undefined;
export type QueryResult = { rows: Array<Record<string, unknown>> };

// Define interfaces
export interface ConnectionPool {
  getConnection(): Promise<Connection>;
  close(drainTime: number): Promise<void>;
}

export interface Connection {
  execute(sql: string, params?: QueryParam[], options?: Record<string, unknown>): Promise<QueryResult>;
  close(): Promise<void>;
} 