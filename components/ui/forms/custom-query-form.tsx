"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { sqlQuerySchema } from "@/lib/db/schema";

type FormData = z.infer<typeof sqlQuerySchema>;

// Define a generic Record type for query results
type QueryResult = Record<string, string | number | boolean | null>;

export function CustomQueryForm() {
  const [results, setResults] = useState<QueryResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  
  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch("/api/custom-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || "Failed to execute query");
      }
      
      setResults(result.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      setResults(null);
    } finally {
      setLoading(false);
    }
  };
  
  // Helper function to get column names from result
  const getColumnNames = (results: QueryResult[] | null): string[] => {
    if (!results || results.length === 0) return [];
    return Object.keys(results[0]);
  };
  
  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-4">
        <h3 className="text-lg font-medium mb-4">Custom SQL Query</h3>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="query" className="text-sm font-medium">
              SQL Query
            </label>
            <div className="relative">
              <textarea
                id="query"
                className={`w-full min-h-[150px] rounded-md border px-3 py-2 text-sm font-mono ${
                  errors.query ? "border-red-500" : "border-input"
                }`}
                placeholder="SELECT * FROM students LIMIT 10"
                {...register("query", { required: "SQL query is required" })}
              />
            </div>
            {errors.query && (
              <p className="text-sm text-red-500">{errors.query.message}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Only SELECT queries are allowed for security reasons.
            </p>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting || loading ? "Running..." : "Run Query"}
            </button>
          </div>
        </form>
      </div>
      
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">{error}</div>
        </div>
      )}
      
      {results && results.length > 0 && (
        <div className="rounded-lg border overflow-hidden">
          <div className="bg-muted/50 p-4 flex justify-between">
            <h3 className="font-medium">Query Results</h3>
            <span className="text-sm text-muted-foreground">
              {results.length} row{results.length === 1 ? "" : "s"}
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/20">
                  {getColumnNames(results).map((column) => (
                    <th key={column} className="px-4 py-2 text-left text-sm font-medium">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.map((row, rowIndex) => (
                  <tr 
                    key={rowIndex} 
                    className={rowIndex % 2 === 0 ? "bg-background" : "bg-muted/5"}
                  >
                    {getColumnNames(results).map((column) => (
                      <td key={`${rowIndex}-${column}`} className="px-4 py-2 text-sm">
                        {row[column] !== null ? String(row[column]) : "NULL"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {results && results.length === 0 && (
        <div className="rounded-md bg-muted p-8 text-center">
          <p className="text-muted-foreground">No results found for this query.</p>
        </div>
      )}
    </div>
  );
} 