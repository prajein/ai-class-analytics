# AI Class Analytics Dashboard

A Next.js 15 application for visualizing AI Department Midsem Scores from an Oracle SQL database.

## Features

- 📊 Comprehensive analytics dashboard for midsem scores
- 📈 Interactive charts using Recharts
- 📑 Data tables with server-side pagination using Tanstack Table
- 🔍 Advanced filtering and search functionality
- 💻 Custom SQL query capabilities with validation
- 🖥️ Beautiful UI with responsive design

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Oracle SQL
- **UI Components**: Custom components with Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: Tanstack Query
- **Visualization**: Recharts
- **Tables**: Tanstack Table
- **Validation**: Zod + React Hook Form
- **Styling**: Tailwind CSS

## Prerequisites

- Node.js 18.17 or later
- Oracle Database connection
- npm or pnpm

## Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/ai-class-analytics.git
cd ai-class-analytics
```

2. **Install dependencies**

```bash
pnpm install
# or
npm install
```

3. **Set up the environment variables**

Create a `.env.local` file in the root directory and add the following:

```
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_CONNECTION_STRING=your_connection_string
```

4. **Set up the database**

Run the SQL script in `scripts/setup-database.sql` on your Oracle database to create the necessary tables and sample data.

5. **Run the development server**

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Schema

The application uses the following database schema:

- **teachers**: Information about faculty members
- **classes**: Different AI classes
- **students**: Student information linked to classes
- **subjects**: Course subjects
- **scores**: Student midsem scores for each subject

## Project Structure

```
ai-class-analytics/
├── app/
│   ├── (dashboard)/ - Dashboard pages and layout
│   ├── api/ - API routes for data fetching
├── components/
│   ├── ui/ - UI components
│   │   ├── dashboard/ - Dashboard-specific components
│   │   ├── tables/ - Table components
│   │   ├── forms/ - Form components
├── lib/
│   ├── db/ - Database utilities
├── stores/ - Zustand state stores
├── scripts/ - Database setup scripts
├── types/ - TypeScript type definitions
```

## Main Pages

- **/** - Main dashboard with analytics
- **/query** - Custom SQL query interface

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
