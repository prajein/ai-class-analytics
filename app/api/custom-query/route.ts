import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";
import { sqlQuerySchema } from "@/lib/db/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the query using Zod
    const result = sqlQuerySchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid query format", details: result.error.format() },
        { status: 400 }
      );
    }
    
    // Check if query is SELECT only (for security)
    const query = result.data.query.trim();
    
    if (!query.toUpperCase().startsWith("SELECT")) {
      return NextResponse.json(
        { error: "Only SELECT queries are allowed" },
        { status: 403 }
      );
    }
    
    // Execute the query
    const data = await executeQuery(query);
    
    return NextResponse.json({ data });
  } catch (error: unknown) {
    console.error("Error executing custom query:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 