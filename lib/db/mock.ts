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

// Mock executeQuery function (aligned with the SQLite implementation)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function executeQuery_MOCK(query: string, _params: unknown[] = []) {
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
  
  // For insert/update/delete operations
  if (queryLower.startsWith("insert") || queryLower.startsWith("update") || queryLower.startsWith("delete")) {
    return [{ changes: 1, lastInsertRowid: 1 }];
  }
  
  // Default empty result
  return [];
}

// Add mock flag to enable mocking even with SQLite
let MOCK_ENABLED = process.env.NODE_ENV === 'test' || process.env.USE_MOCK_DB === 'true';

// Override the actual executeQuery when mocking is enabled
export const executeQuery = MOCK_ENABLED ? executeQuery_MOCK : undefined;

// Toggle mocking on/off
export function enableMocking(enable: boolean) {
  MOCK_ENABLED = enable;
} 