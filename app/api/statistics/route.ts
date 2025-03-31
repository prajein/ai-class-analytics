import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function GET() {
  try {
    // Fetch key dashboard statistics in one API call
    const statsQueries = [
      // Failed to report scores - classes without any score entries
      `
        SELECT COUNT(DISTINCT c.section) as failed_classes_count
        FROM classes c
        LEFT JOIN students s ON s.section = c.section
        LEFT JOIN midsem_scores m ON s.student_id = m.student_id
        WHERE m.student_id IS NULL
      `,
      
      // Best performing class per subject (ES)
      `
        SELECT 
            s.section,
            'ES' as subject,
            AVG(m.es_score) AS avg_score
        FROM midsem_scores m
        JOIN students s ON s.student_id = m.student_id
        GROUP BY s.section
        ORDER BY avg_score DESC
      `,
      
      // Best performing class per subject (FLAT)
      `
        SELECT 
            s.section,
            'FLAT' as subject,
            AVG(m.flat_score) AS avg_score
        FROM midsem_scores m
        JOIN students s ON s.student_id = m.student_id
        GROUP BY s.section
        ORDER BY avg_score DESC
      `,
      
      // Best performing class per subject (DBMS)
      `
        SELECT 
            s.section,
            'DBMS' as subject,
            AVG(m.dbms_score) AS avg_score
        FROM midsem_scores m
        JOIN students s ON s.student_id = m.student_id
        GROUP BY s.section
        ORDER BY avg_score DESC
      `,
      
      // Best performing class per subject (Mathematics)
      `
        SELECT 
            s.section,
            'Mathematics' as subject,
            AVG(m.mathematics_score) AS avg_score
        FROM midsem_scores m
        JOIN students s ON s.student_id = m.student_id
        GROUP BY s.section
        ORDER BY avg_score DESC
      `,
      
      // Best performing class per subject (DAA)
      `
        SELECT 
            s.section,
            'DAA' as subject,
            AVG(m.daa_score) AS avg_score
        FROM midsem_scores m
        JOIN students s ON s.student_id = m.student_id
        GROUP BY s.section
        ORDER BY avg_score DESC
      `,
      
      // Worst performing class per subject (ES)
      `
        SELECT 
            s.section,
            'ES' as subject,
            AVG(m.es_score) AS avg_score
        FROM midsem_scores m
        JOIN students s ON s.student_id = m.student_id
        GROUP BY s.section
        ORDER BY avg_score ASC
      `,
      
      // Worst performing class per subject (FLAT)
      `
        SELECT 
            s.section,
            'FLAT' as subject,
            AVG(m.flat_score) AS avg_score
        FROM midsem_scores m
        JOIN students s ON s.student_id = m.student_id
        GROUP BY s.section
        ORDER BY avg_score ASC
      `,
      
      // Best individual subject scores
      `
        SELECT 
          s.student_id, 
          s.name as student_name, 
          s.section,
          'ES' as subject,
          m.es_score as score
        FROM midsem_scores m
        JOIN students s ON s.student_id = m.student_id
        WHERE m.es_score = (SELECT MAX(es_score) FROM midsem_scores)
        
        UNION ALL
        
        SELECT 
          s.student_id, 
          s.name as student_name, 
          s.section,
          'FLAT' as subject,
          m.flat_score as score
        FROM midsem_scores m
        JOIN students s ON s.student_id = m.student_id
        WHERE m.flat_score = (SELECT MAX(flat_score) FROM midsem_scores)
        
        UNION ALL
        
        SELECT 
          s.student_id, 
          s.name as student_name, 
          s.section,
          'DBMS' as subject,
          m.dbms_score as score
        FROM midsem_scores m
        JOIN students s ON s.student_id = m.student_id
        WHERE m.dbms_score = (SELECT MAX(dbms_score) FROM midsem_scores)
        
        UNION ALL
        
        SELECT 
          s.student_id, 
          s.name as student_name, 
          s.section,
          'Mathematics' as subject,
          m.mathematics_score as score
        FROM midsem_scores m
        JOIN students s ON s.student_id = m.student_id
        WHERE m.mathematics_score = (SELECT MAX(mathematics_score) FROM midsem_scores)
        
        UNION ALL
        
        SELECT 
          s.student_id, 
          s.name as student_name, 
          s.section,
          'DAA' as subject,
          m.daa_score as score
        FROM midsem_scores m
        JOIN students s ON s.student_id = m.student_id
        WHERE m.daa_score = (SELECT MAX(daa_score) FROM midsem_scores)
      `,
      
      // Worst individual subject scores
      `
        SELECT 
          s.student_id, 
          s.name as student_name, 
          s.section,
          'ES' as subject,
          m.es_score as score
        FROM midsem_scores m
        JOIN students s ON s.student_id = m.student_id
        WHERE m.es_score = (SELECT MIN(es_score) FROM midsem_scores)
        
        UNION ALL
        
        SELECT 
          s.student_id, 
          s.name as student_name, 
          s.section,
          'FLAT' as subject,
          m.flat_score as score
        FROM midsem_scores m
        JOIN students s ON s.student_id = m.student_id
        WHERE m.flat_score = (SELECT MIN(flat_score) FROM midsem_scores)
        
        UNION ALL
        
        SELECT 
          s.student_id, 
          s.name as student_name, 
          s.section,
          'DBMS' as subject,
          m.dbms_score as score
        FROM midsem_scores m
        JOIN students s ON s.student_id = m.student_id
        WHERE m.dbms_score = (SELECT MIN(dbms_score) FROM midsem_scores)
        
        UNION ALL
        
        SELECT 
          s.student_id, 
          s.name as student_name, 
          s.section,
          'Mathematics' as subject,
          m.mathematics_score as score
        FROM midsem_scores m
        JOIN students s ON s.student_id = m.student_id
        WHERE m.mathematics_score = (SELECT MIN(mathematics_score) FROM midsem_scores)
        
        UNION ALL
        
        SELECT 
          s.student_id, 
          s.name as student_name, 
          s.section,
          'DAA' as subject,
          m.daa_score as score
        FROM midsem_scores m
        JOIN students s ON s.student_id = m.student_id
        WHERE m.daa_score = (SELECT MIN(daa_score) FROM midsem_scores)
      `,
      
      // Top 10 students by midsem average
      `
        SELECT 
          s.student_id, 
          s.name as student_name, 
          s.section,
          t.name as teacher_name,
          (m.es_score + m.flat_score + m.dbms_score + m.mathematics_score + m.daa_score) / 5.0 as average_score
        FROM students s
        JOIN midsem_scores m ON m.student_id = s.student_id
        JOIN teachers t ON t.section = s.section AND t.subject = 'ES'
        ORDER BY average_score DESC
        FETCH FIRST 10 ROWS ONLY
      `,
      
      // Performance breakdown by teacher
      `
        SELECT 
          t.teacher_id, 
          t.name as teacher_name, 
          t.subject,
          t.section,
          COUNT(s.student_id) as student_count,
          CASE 
            WHEN t.subject = 'ES' THEN AVG(m.es_score)
            WHEN t.subject = 'FLAT' THEN AVG(m.flat_score)
            WHEN t.subject = 'DBMS' THEN AVG(m.dbms_score)
            WHEN t.subject = 'Mathematics' THEN AVG(m.mathematics_score)
            WHEN t.subject = 'DAA' THEN AVG(m.daa_score)
            ELSE 0
          END as avg_score
        FROM teachers t
        JOIN students s ON s.section = t.section
        JOIN midsem_scores m ON m.student_id = s.student_id
        GROUP BY t.teacher_id, t.name, t.subject, t.section
        ORDER BY avg_score DESC
      `
    ];
    
    // Execute all queries and collect results
    const results = await Promise.all(
      statsQueries.map(query => executeQuery(query))
    );
    
    // Process and organize the results
    const bestClassesPerSubject = [
      ...results[1] || [], // ES
      ...results[2] || [], // FLAT
      ...results[3] || [], // DBMS
      ...results[4] || [], // Mathematics
      ...results[5] || []  // DAA
    ];
    
    const worstClassesPerSubject = [
      ...results[6] || [], // ES
      ...results[7] || [], // FLAT
    ];
    
    return NextResponse.json({
      failedClassesCount: results[0]?.[0]?.failed_classes_count || 0,
      bestClassesPerSubject,
      worstClassesPerSubject,
      bestIndividualScores: results[8] || [],
      worstIndividualScores: results[9] || [],
      topStudents: results[10] || [],
      teacherPerformance: results[11] || []
    });
  } catch (error: unknown) {
    console.error("Error fetching statistics:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 