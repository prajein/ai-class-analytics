import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const section = searchParams.get("section");
    const teacherId = searchParams.get("teacherId");
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);
    
    let query = `
      SELECT s.student_id, s.name, s.email, s.section,
             t.teacher_id, t.name as teacher_name, t.subject,
             m.es_score, m.flat_score, m.dbms_score, m.mathematics_score, m.daa_score, m.total_score,
             (m.es_score + m.flat_score + m.dbms_score + m.mathematics_score + m.daa_score) / 5.0 as average_score
      FROM students s
      JOIN teachers t ON s.section = t.section
      JOIN midsem_scores m ON s.student_id = m.student_id
    `;
    
    const whereConditions = [];
    const params: (string | number)[] = [];
    
    if (section) {
      whereConditions.push("s.section = :section");
      params.push(section);
    }
    
    if (teacherId) {
      whereConditions.push("t.teacher_id = :teacherId");
      params.push(parseInt(teacherId, 10));
    }
    
    if (whereConditions.length > 0) {
      query += " WHERE " + whereConditions.join(" AND ");
    }
    
    query += `
      ORDER BY average_score DESC
      OFFSET :offset ROWS FETCH NEXT :limit ROWS ONLY
    `;
    
    params.push(offset);
    params.push(limit);
    
    const students = await executeQuery(query, params);
    
    // Get total count for pagination
    let countQuery = `
      SELECT COUNT(*) as total 
      FROM students s
      JOIN teachers t ON s.section = t.section
      JOIN midsem_scores m ON s.student_id = m.student_id
    `;
    
    if (whereConditions.length > 0) {
      countQuery += " WHERE " + whereConditions.join(" AND ");
    }
    
    const countResult = await executeQuery(countQuery, params.slice(0, -2));
    const total = Number(countResult[0]?.total || 0);
    
    return NextResponse.json({
      students,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error: unknown) {
    console.error("Error fetching students:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 