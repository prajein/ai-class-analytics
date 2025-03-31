'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockDbService } from '@/lib/db/mockData';

export default function CustomQueryPage() {
  const [selectedQuery, setSelectedQuery] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedTeacher, setSelectedTeacher] = useState<string>('');

  const sections = mockDbService.getAllClasses().map(c => c.section);
  const subjects = ['ES', 'FLAT', 'DBMS', 'Mathematics', 'DAA'];
  const teachers = mockDbService.getAllTeachers();

  const renderQueryResult = () => {
    switch (selectedQuery) {
      case 'student-performance':
        if (!selectedSection) return null;
        const studentPerformance = mockDbService.getStudentPerformanceBySection(selectedSection);
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>ES</TableHead>
                <TableHead>FLAT</TableHead>
                <TableHead>DBMS</TableHead>
                <TableHead>Mathematics</TableHead>
                <TableHead>DAA</TableHead>
                <TableHead>Average</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentPerformance.map(student => (
                <TableRow key={student.student_id}>
                  <TableCell>{student.student_id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.es_score}</TableCell>
                  <TableCell>{student.flat_score}</TableCell>
                  <TableCell>{student.dbms_score}</TableCell>
                  <TableCell>{student.mathematics_score}</TableCell>
                  <TableCell>{student.daa_score}</TableCell>
                  <TableCell>{student.average_score.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );

      case 'teacher-performance':
        if (!selectedSubject) return null;
        const teacherPerformance = mockDbService.getTeacherPerformance(selectedSubject);
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Teacher ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Average Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teacherPerformance.map(teacher => (
                <TableRow key={teacher.teacher_id}>
                  <TableCell>{teacher.teacher_id}</TableCell>
                  <TableCell>{teacher.name}</TableCell>
                  <TableCell>{teacher.subject}</TableCell>
                  <TableCell>{teacher.section}</TableCell>
                  <TableCell>{teacher.avg_score.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );

      case 'top-students':
        const topStudents = mockDbService.getTopStudents();
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Average Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topStudents.map(student => (
                <TableRow key={student.student_id}>
                  <TableCell>{student.student_id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.section}</TableCell>
                  <TableCell>{student.average_score.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );

      case 'missing-info':
        const missingInfo = mockDbService.getClassesMissingInfo();
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Section</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {missingInfo.map(info => (
                <TableRow key={info.section}>
                  <TableCell>{info.section}</TableCell>
                  <TableCell>{info.missing_info}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );

      case 'subject-performance':
        const subjectPerformance = mockDbService.getSubjectPerformance();
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Best Section</TableHead>
                <TableHead>Best Score</TableHead>
                <TableHead>Worst Section</TableHead>
                <TableHead>Worst Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(subjectPerformance).map(([subject, data]) => (
                <TableRow key={subject}>
                  <TableCell>{subject}</TableCell>
                  <TableCell>{data.best.section}</TableCell>
                  <TableCell>{data.best.score.toFixed(2)}</TableCell>
                  <TableCell>{data.worst.section}</TableCell>
                  <TableCell>{data.worst.score.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );

      case 'score-ranges':
        const scoreRanges = mockDbService.getSubjectScoreRanges();
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Best Score</TableHead>
                <TableHead>Worst Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(scoreRanges).map(([subject, data]) => (
                <TableRow key={subject}>
                  <TableCell>{subject}</TableCell>
                  <TableCell>{data.best}</TableCell>
                  <TableCell>{data.worst}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );

      case 'top-by-teacher':
        if (!selectedTeacher) return null;
        const topByTeacher = mockDbService.getTopStudentsByTeacher(selectedTeacher);
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Average Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topByTeacher.map(student => (
                <TableRow key={student.student_id}>
                  <TableCell>{student.student_id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.section}</TableCell>
                  <TableCell>{student.average_score.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Custom Queries</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader>
            <CardTitle>Select Query</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedQuery} onValueChange={setSelectedQuery}>
              <SelectTrigger>
                <SelectValue placeholder="Select a query" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student-performance">Student Performance by Section</SelectItem>
                <SelectItem value="teacher-performance">Teacher Performance</SelectItem>
                <SelectItem value="top-students">Top Students</SelectItem>
                <SelectItem value="missing-info">Classes Missing Information</SelectItem>
                <SelectItem value="subject-performance">Subject Performance by Section</SelectItem>
                <SelectItem value="score-ranges">Subject Score Ranges</SelectItem>
                <SelectItem value="top-by-teacher">Top Students by Teacher</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {selectedQuery === 'student-performance' && (
          <Card>
            <CardHeader>
              <CardTitle>Select Section</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedSection} onValueChange={setSelectedSection}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a section" />
                </SelectTrigger>
                <SelectContent>
                  {sections.map(section => (
                    <SelectItem key={section} value={section}>
                      Section {section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        )}

        {selectedQuery === 'teacher-performance' && (
          <Card>
            <CardHeader>
              <CardTitle>Select Subject</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map(subject => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        )}

        {selectedQuery === 'top-by-teacher' && (
          <Card>
            <CardHeader>
              <CardTitle>Select Teacher</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a teacher" />
                </SelectTrigger>
                <SelectContent>
                  {teachers.map(teacher => (
                    <SelectItem key={teacher.teacher_id} value={teacher.teacher_id.toString()}>
                      {teacher.name} ({teacher.subject})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Results</CardTitle>
        </CardHeader>
        <CardContent>
          {renderQueryResult()}
        </CardContent>
      </Card>
    </div>
  );
} 