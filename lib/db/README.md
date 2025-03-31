# Database Implementation

This folder contains a simplified Oracle database implementation for the AI Class Analytics application. It provides an easy-to-use interface for performing database operations with your existing Oracle database.

## Files Overview

- `index.ts` - Main database interface with functions to interact with Oracle
- `example.ts` - Example usage of the database functions

## Using the Database

### Basic Query Example

```typescript
import { executeQuery } from '@/lib/db';

// Fetch all students
const students = await executeQuery('SELECT * FROM students');

// Fetch students with parameters
const sectionAStudents = await executeQuery(
  'SELECT * FROM students WHERE section = :1', 
  ['A']
);
```

### Transaction Example

```typescript
import { executeTransaction } from '@/lib/db';

await executeTransaction([
  {
    query: 'INSERT INTO students (student_id, name, section, email) VALUES (:1, :2, :3, :4)',
    params: [11, 'John Doe', 'A', 'john@example.com']
  },
  {
    query: 'INSERT INTO midsem_scores (student_id, es_score) VALUES (:1, :2)',
    params: [11, 25]
  }
]);
```

## Database Configuration

The database connection is configured using environment variables:

```env
DB_USER=system
DB_PASSWORD=oracle
DB_CONNECTION_STRING=localhost:1521/orcl
```

If not provided, these default values will be used.

## Database Schema

The database includes the following tables:

1. **classes** - Class information
   - section (VARCHAR(50) PRIMARY KEY)
   - room_number (VARCHAR(50))
   - building (VARCHAR(100))

2. **teachers** - Teacher information
   - teacher_id (INT PRIMARY KEY)
   - name (VARCHAR(100))
   - email (VARCHAR(100))
   - subject (VARCHAR(100))
   - section (VARCHAR(50))

3. **students** - Student information
   - student_id (INT PRIMARY KEY)
   - name (VARCHAR(100))
   - email (VARCHAR(100))
   - section (VARCHAR(50))

4. **midsem_scores** - Exam scores for students
   - student_id (INT PRIMARY KEY)
   - es_score (FLOAT)
   - flat_score (FLOAT)
   - dbms_score (FLOAT)
   - mathematics_score (FLOAT)
   - daa_score (FLOAT)
   - total_score (FLOAT)

## Features

1. **Connection Pooling**: Efficiently manages database connections
2. **Transaction Support**: Execute multiple queries in a single transaction
3. **Parameterized Queries**: Prevents SQL injection
4. **Error Handling**: Proper error handling and connection cleanup
5. **Type Safety**: TypeScript types for query parameters and results 