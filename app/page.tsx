import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockDbService } from '@/lib/db/mockData';

export default function Home() {
  const stats = {
    totalStudents: mockDbService.getAllStudents().length,
    totalTeachers: mockDbService.getAllTeachers().length,
    totalSections: mockDbService.getAllClasses().length,
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
          AI Department Analytics
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Comprehensive analytics dashboard for monitoring student and teacher performance across different sections.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
          <CardHeader>
            <CardTitle className="text-blue-600 dark:text-blue-400">Total Students</CardTitle>
            <CardDescription>Across all sections</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalStudents}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900">
          <CardHeader>
            <CardTitle className="text-purple-600 dark:text-purple-400">Total Teachers</CardTitle>
            <CardDescription>Department faculty</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalTeachers}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900">
          <CardHeader>
            <CardTitle className="text-green-600 dark:text-green-400">Total Sections</CardTitle>
            <CardDescription>Active classes</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalSections}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900">
          <CardHeader>
            <CardTitle className="text-orange-600 dark:text-orange-400">Student Performance</CardTitle>
            <CardDescription>View detailed student analytics and scores</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard">
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                View Student Analytics
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-rose-50 to-red-50 dark:from-gray-800 dark:to-gray-900">
          <CardHeader>
            <CardTitle className="text-rose-600 dark:text-rose-400">Teacher Performance</CardTitle>
            <CardDescription>Monitor teacher effectiveness and class performance</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard">
              <Button className="w-full bg-rose-500 hover:bg-rose-600 text-white">
                View Teacher Analytics
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
