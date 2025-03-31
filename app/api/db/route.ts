import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function GET() {
  try {
    // Simple test query
    const result = await executeQuery("SELECT 1 as test FROM DUAL");
    return NextResponse.json({ status: "connected", result });
  } catch (error: unknown) {
    console.error("Database connection error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ status: "error", message: errorMessage }, { status: 500 });
  }
} 