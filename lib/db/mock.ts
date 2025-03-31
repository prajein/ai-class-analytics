// Mock data for development
const mockData = {
  students: [
    { student_id: 1, name: "John Doe", section: "A", email: "john@example.com" },
    { student_id: 2, name: "Jane Smith", section: "B", email: "jane@example.com" },
    { student_id: 3, name: "Bob Johnson", section: "A", email: "bob@example.com" },
  ],
  teachers: [
    { teacher_id: 1, name: "Dr. Alice Brown", subject: "ES", section: "A", email: "alice@example.com" },
    { teacher_id: 2, name: "Prof. Charlie Davis", subject: "FLAT", section: "B", email: "charlie@example.com" },
  ],
  midsem_scores: [
    { student_id: 1, es_score: 25, flat_score: 28, dbms_score: 22, mathematics_score: 27, daa_score: 24 },
    { student_id: 2, es_score: 23, flat_score: 25, dbms_score: 28, mathematics_score: 24, daa_score: 26 },
    { student_id: 3, es_score: 27, flat_score: 22, dbms_score: 25, mathematics_score: 26, daa_score: 23 },
  ],
};

// Define types
export type QueryParam = string | number | boolean | null | undefined;
export type QueryResult = { rows: Array<Record<string, unknown>> };

// Mock database functions
export async function executeQuery(query: string, params: QueryParam[] = []) {
  // Simple query parsing for development
  const queryLower = query.toLowerCase();
  
  if (queryLower.includes("select * from students")) {
    return mockData.students;
  }
  
  if (queryLower.includes("select * from teachers")) {
    return mockData.teachers;
  }
  
  if (queryLower.includes("select * from midsem_scores")) {
    return mockData.midsem_scores;
  }
  
  // Add more mock query handlers as needed
  
  return [];
}

// Mock connection pool functions
export async function createPool() {
  console.log("Mock connection pool created");
}

export async function closePool() {
  console.log("Mock connection pool closed");
}

export async function getConnection() {
  return {
    execute: executeQuery,
    close: async () => {},
  };
} 