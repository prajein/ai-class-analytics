# Database Implementation

This folder contains a MySQL database implementation for the AI Class Analytics application. It provides an easy-to-use interface for performing database operations with your MySQL database.

## Files Overview

- `index.ts` - Main database interface with functions to interact with MySQL
- `config.ts` - Database configuration and type definitions
- `example.ts` - Example usage of the database functions
- `init.ts` - Database initialization and schema setup
- `mock.ts` - Mock implementation for development/testing

## Using the Database

### Basic Query Example

```typescript
import { executeQuery } from '@/lib/db';

// Fetch all students
const students = await executeQuery('SELECT * FROM students');

// Fetch students with parameters
const sectionAStudents = await executeQuery(
  'SELECT * FROM students WHERE section = ?', 
  ['A']
);
```

### Transaction Example

```typescript
import { executeTransaction } from '@/lib/db';

await executeTransaction([
  {
    query: 'INSERT INTO students (name, section, email) VALUES (?, ?, ?)',
    params: ['John Doe', 'A', 'john@example.com']
  },
  {
    query: 'INSERT INTO midsem_scores (student_id, es_score) VALUES (?, ?)',
    params: [11, 25]
  }
]);
```

## Database Configuration

The database connection is configured using environment variables:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ai_class_analytics
```

If not provided, these default values will be used.

## Database Schema

The database includes the following tables:

1. **students** - Student information
   - student_id (INT AUTO_INCREMENT PRIMARY KEY)
   - name (VARCHAR(100))
   - section (VARCHAR(50))
   - email (VARCHAR(100) UNIQUE)

2. **teachers** - Teacher information
   - teacher_id (INT AUTO_INCREMENT PRIMARY KEY)
   - name (VARCHAR(100))
   - subject (VARCHAR(100))
   - section (VARCHAR(50))
   - email (VARCHAR(100) UNIQUE)

3. **midsem_scores** - Exam scores for students
   - id (INT AUTO_INCREMENT PRIMARY KEY)
   - student_id (INT)
   - es_score (INT)
   - flat_score (INT)
   - dbms_score (INT)
   - mathematics_score (INT)
   - daa_score (INT)

## Features

1. **Connection Pooling**: Efficiently manages database connections
2. **Transaction Support**: Execute multiple queries in a single transaction
3. **Parameterized Queries**: Prevents SQL injection
4. **Error Handling**: Proper error handling and connection cleanup
5. **Type Safety**: TypeScript types for query parameters and results
6. **Mock Implementation**: Easy switching between real and mock database for development/testing 