// Mock data based on DBMSproj.sql
export const mockData = {
  classes: [
    { section: 'A', room_number: '101', building: 'Main Building' },
    { section: 'B', room_number: '102', building: 'Main Building' },
    { section: 'C', room_number: '201', building: 'Science Block' },
    { section: 'D', room_number: '202', building: 'Science Block' },
    { section: 'E', room_number: '301', building: 'Arts Block' }
  ],
  teachers: [
    { teacher_id: 1, name: 'Aditi Sharma', email: 'aditi.sharma@example.com', subject: 'ES', section: 'A' },
    { teacher_id: 2, name: 'Ravi Kumar', email: 'ravi.kumar@example.com', subject: 'FLAT', section: 'A' },
    { teacher_id: 3, name: 'Priya Singh', email: 'priya.singh@example.com', subject: 'DBMS', section: 'A' },
    { teacher_id: 4, name: 'Rahul Verma', email: 'rahul.verma@example.com', subject: 'Mathematics', section: 'A' },
    { teacher_id: 5, name: 'Sneha Gupta', email: 'sneha.gupta@example.com', subject: 'DAA', section: 'A' },
    { teacher_id: 6, name: 'Arun Patel', email: 'arun.patel@example.com', subject: 'ES', section: 'B' },
    { teacher_id: 7, name: 'Meera Reddy', email: 'meera.reddy@example.com', subject: 'FLAT', section: 'B' },
    { teacher_id: 8, name: 'Vikram Singh', email: 'vikram.singh@example.com', subject: 'DBMS', section: 'B' },
    { teacher_id: 9, name: 'Anjali Sharma', email: 'anjali.sharma@example.com', subject: 'Mathematics', section: 'B' },
    { teacher_id: 10, name: 'Rajesh Kumar', email: 'rajesh.kumar@example.com', subject: 'DAA', section: 'B' }
  ],
  students: [
    { student_id: 1, name: 'Aarav Mehta', email: 'aarav.mehta@example.com', section: 'A' },
    { student_id: 2, name: 'Vivaan Sharma', email: 'vivaan.sharma@example.com', section: 'A' },
    { student_id: 3, name: 'Aditya Rao', email: 'aditya.rao@example.com', section: 'B' },
    { student_id: 4, name: 'Ananya Iyer', email: 'ananya.iyer@example.com', section: 'C' },
    { student_id: 5, name: 'Diya Patel', email: 'diya.patel@example.com', section: 'D' },
    { student_id: 6, name: 'Rahul Verma', email: 'rahul.verma@example.com', section: 'A' },
    { student_id: 7, name: 'Priya Singh', email: 'priya.singh@example.com', section: 'B' },
    { student_id: 8, name: 'Arjun Kumar', email: 'arjun.kumar@example.com', section: 'C' },
    { student_id: 9, name: 'Zara Khan', email: 'zara.khan@example.com', section: 'D' },
    { student_id: 10, name: 'Aisha Gupta', email: 'aisha.gupta@example.com', section: 'E' }
  ],
  scores: [
    // Section A scores
    { student_id: 1, teacher_id: 1, subject: 'ES', section: 'A', score: 28 },
    { student_id: 1, teacher_id: 2, subject: 'FLAT', section: 'A', score: 30 },
    { student_id: 1, teacher_id: 3, subject: 'DBMS', section: 'A', score: 25 },
    { student_id: 1, teacher_id: 4, subject: 'Mathematics', section: 'A', score: 27 },
    { student_id: 1, teacher_id: 5, subject: 'DAA', section: 'A', score: 29 },
    { student_id: 2, teacher_id: 1, subject: 'ES', section: 'A', score: 22 },
    { student_id: 2, teacher_id: 2, subject: 'FLAT', section: 'A', score: 25 },
    { student_id: 2, teacher_id: 3, subject: 'DBMS', section: 'A', score: 20 },
    { student_id: 2, teacher_id: 4, subject: 'Mathematics', section: 'A', score: 18 },
    { student_id: 2, teacher_id: 5, subject: 'DAA', section: 'A', score: 24 },
    { student_id: 6, teacher_id: 1, subject: 'ES', section: 'A', score: 26 },
    { student_id: 6, teacher_id: 2, subject: 'FLAT', section: 'A', score: 28 },
    { student_id: 6, teacher_id: 3, subject: 'DBMS', section: 'A', score: 23 },
    { student_id: 6, teacher_id: 4, subject: 'Mathematics', section: 'A', score: 25 },
    { student_id: 6, teacher_id: 5, subject: 'DAA', section: 'A', score: 27 },
    
    // Section B scores
    { student_id: 3, teacher_id: 6, subject: 'ES', section: 'B', score: 25 },
    { student_id: 3, teacher_id: 7, subject: 'FLAT', section: 'B', score: 27 },
    { student_id: 3, teacher_id: 8, subject: 'DBMS', section: 'B', score: 22 },
    { student_id: 3, teacher_id: 9, subject: 'Mathematics', section: 'B', score: 24 },
    { student_id: 3, teacher_id: 10, subject: 'DAA', section: 'B', score: 26 },
    { student_id: 7, teacher_id: 6, subject: 'ES', section: 'B', score: 23 },
    { student_id: 7, teacher_id: 7, subject: 'FLAT', section: 'B', score: 25 },
    { student_id: 7, teacher_id: 8, subject: 'DBMS', section: 'B', score: 20 },
    { student_id: 7, teacher_id: 9, subject: 'Mathematics', section: 'B', score: 22 },
    { student_id: 7, teacher_id: 10, subject: 'DAA', section: 'B', score: 24 },
    
    // Section C scores
    { student_id: 4, teacher_id: 1, subject: 'ES', section: 'C', score: 24 },
    { student_id: 4, teacher_id: 2, subject: 'FLAT', section: 'C', score: 26 },
    { student_id: 4, teacher_id: 3, subject: 'DBMS', section: 'C', score: 21 },
    { student_id: 4, teacher_id: 4, subject: 'Mathematics', section: 'C', score: 23 },
    { student_id: 4, teacher_id: 5, subject: 'DAA', section: 'C', score: 25 },
    { student_id: 8, teacher_id: 1, subject: 'ES', section: 'C', score: 22 },
    { student_id: 8, teacher_id: 2, subject: 'FLAT', section: 'C', score: 24 },
    { student_id: 8, teacher_id: 3, subject: 'DBMS', section: 'C', score: 19 },
    { student_id: 8, teacher_id: 4, subject: 'Mathematics', section: 'C', score: 21 },
    { student_id: 8, teacher_id: 5, subject: 'DAA', section: 'C', score: 23 },
    
    // Section D scores
    { student_id: 5, teacher_id: 6, subject: 'ES', section: 'D', score: 23 },
    { student_id: 5, teacher_id: 7, subject: 'FLAT', section: 'D', score: 25 },
    { student_id: 5, teacher_id: 8, subject: 'DBMS', section: 'D', score: 20 },
    { student_id: 5, teacher_id: 9, subject: 'Mathematics', section: 'D', score: 22 },
    { student_id: 5, teacher_id: 10, subject: 'DAA', section: 'D', score: 24 },
    { student_id: 9, teacher_id: 6, subject: 'ES', section: 'D', score: 21 },
    { student_id: 9, teacher_id: 7, subject: 'FLAT', section: 'D', score: 23 },
    { student_id: 9, teacher_id: 8, subject: 'DBMS', section: 'D', score: 18 },
    { student_id: 9, teacher_id: 9, subject: 'Mathematics', section: 'D', score: 20 },
    { student_id: 9, teacher_id: 10, subject: 'DAA', section: 'D', score: 22 },
    
    // Section E scores
    { student_id: 10, teacher_id: 1, subject: 'ES', section: 'E', score: 22 },
    { student_id: 10, teacher_id: 2, subject: 'FLAT', section: 'E', score: 24 },
    { student_id: 10, teacher_id: 3, subject: 'DBMS', section: 'E', score: 19 },
    { student_id: 10, teacher_id: 4, subject: 'Mathematics', section: 'E', score: 21 },
    { student_id: 10, teacher_id: 5, subject: 'DAA', section: 'E', score: 23 }
  ]
};

// Mock database service functions
export const mockDbService = {
  getAllStudents: () => mockData.students,
  getAllTeachers: () => mockData.teachers,
  getAllClasses: () => mockData.classes,

  getStudentPerformanceBySection: (section: string) => {
    return mockData.students
      .filter(student => student.section === section)
      .map(student => {
        const scores = mockData.scores.filter(s => s.student_id === student.student_id);
        return {
          student_id: student.student_id,
          name: student.name,
          section: student.section,
          es_score: scores.find(s => s.subject === 'ES')?.score || 0,
          flat_score: scores.find(s => s.subject === 'FLAT')?.score || 0,
          dbms_score: scores.find(s => s.subject === 'DBMS')?.score || 0,
          mathematics_score: scores.find(s => s.subject === 'Mathematics')?.score || 0,
          daa_score: scores.find(s => s.subject === 'DAA')?.score || 0,
          average_score: scores.length > 0 
            ? scores.reduce((acc, curr) => acc + curr.score, 0) / scores.length 
            : 0
        };
      });
  },

  getTeacherPerformance: (subject: string) => {
    return mockData.teachers
      .filter(teacher => subject === 'all' || teacher.subject === subject)
      .map(teacher => {
        const scores = mockData.scores.filter(s => s.teacher_id === teacher.teacher_id);
        return {
          teacher_id: teacher.teacher_id,
          name: teacher.name,
          subject: teacher.subject,
          section: teacher.section,
          avg_score: scores.length > 0 
            ? scores.reduce((acc, curr) => acc + curr.score, 0) / scores.length 
            : 0
        };
      });
  },

  getTopStudents: (limit: number = 5) => {
    return mockData.students
      .map(student => {
        const scores = mockData.scores.filter(s => s.student_id === student.student_id);
        return {
          student_id: student.student_id,
          name: student.name,
          section: student.section,
          average_score: scores.length > 0 
            ? scores.reduce((acc, curr) => acc + curr.score, 0) / scores.length 
            : 0
        };
      })
      .sort((a, b) => b.average_score - a.average_score)
      .slice(0, limit);
  },

  getClassesMissingInfo: () => {
    const sections = mockData.classes.map(c => c.section);
    return sections.map(section => {
      const students = mockData.students.filter(s => s.section === section);
      const missingScores = students.filter(student => {
        const scores = mockData.scores.filter(s => s.student_id === student.student_id);
        return scores.length < 5; // Assuming 5 subjects
      });
      return {
        section,
        missing_info: missingScores.length > 0 
          ? `${missingScores.length} students missing scores` 
          : 'All information complete'
      };
    });
  },

  getSubjectPerformance: () => {
    const subjects = ['ES', 'FLAT', 'DBMS', 'Mathematics', 'DAA'];
    const result: Record<string, { best: { section: string; score: number }; worst: { section: string; score: number } }> = {};

    subjects.forEach(subject => {
      const sectionScores = mockData.classes.map(c => {
        const scores = mockData.scores.filter(s => s.subject === subject && s.section === c.section);
        return {
          section: c.section,
          score: scores.length > 0 
            ? scores.reduce((acc, curr) => acc + curr.score, 0) / scores.length 
            : 0
        };
      });

      const best = sectionScores.reduce((a, b) => a.score > b.score ? a : b);
      const worst = sectionScores.reduce((a, b) => a.score < b.score ? a : b);

      result[subject] = { best, worst };
    });

    return result;
  },

  getSubjectScoreRanges: () => {
    const subjects = ['ES', 'FLAT', 'DBMS', 'Mathematics', 'DAA'];
    const result: Record<string, { best: number; worst: number }> = {};

    subjects.forEach(subject => {
      const scores = mockData.scores
        .filter(s => s.subject === subject)
        .map(s => s.score);
      result[subject] = {
        best: scores.length > 0 ? Math.max(...scores) : 0,
        worst: scores.length > 0 ? Math.min(...scores) : 0
      };
    });

    return result;
  },

  getTopStudentsByTeacher: (teacherId: string, limit: number = 5) => {
    const teacher = mockData.teachers.find(t => t.teacher_id.toString() === teacherId);
    if (!teacher) return [];

    return mockData.students
      .filter(student => student.section === teacher.section)
      .map(student => {
        const scores = mockData.scores.filter(s => s.student_id === student.student_id && s.subject === teacher.subject);
        return {
          student_id: student.student_id,
          name: student.name,
          section: student.section,
          average_score: scores.length > 0 
            ? scores.reduce((acc, curr) => acc + curr.score, 0) / scores.length 
            : 0
        };
      })
      .sort((a, b) => b.average_score - a.average_score)
      .slice(0, limit);
  }
}; 