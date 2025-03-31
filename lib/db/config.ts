import * as mysql from 'mysql2/promise';

// Database configuration
export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ai_class_analytics',
};

// Define types
export type QueryParam = string | number | boolean | null | undefined;
export type QueryResult = { rows: Array<Record<string, unknown>> };

// Define interfaces
export interface ConnectionPool {
  getConnection(): Promise<Connection>;
  end(): Promise<void>;
}

export interface Connection {
  query(sql: string, params?: QueryParam[]): Promise<[Array<Record<string, unknown>>, mysql.FieldPacket[]]>;
  release(): void;
} 