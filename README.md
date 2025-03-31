# AI Class Analytics
A web application for analyzing class performance and student scores.

## Features

- 📊 Comprehensive analytics dashboard for midsem scores
- 📈 Interactive charts using Recharts
- 📑 Data tables with server-side pagination using Tanstack Table
- 🔍 Advanced filtering and search functionality
- 💻 Custom SQL query capabilities with validation
- 🖥️ Beautiful UI with responsive design

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: MySQL
- **UI Components**: Custom components with Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: Tanstack Query
- **Visualization**: Recharts
- **Tables**: Tanstack Table
- **Validation**: Zod + React Hook Form
- **Styling**: Tailwind CSS

## Prerequisites

1. MySQL Server (running on localhost:3306)
2. Node.js (v18 or higher)
3. pnpm (recommended) or npm

## Database Setup

1. Make sure your MySQL server is running on localhost:3306
2. Create a new database:
   ```sql
   CREATE DATABASE ai_class_analytics;
   ```
3. Run the database initialization script:
   ```bash
   pnpm tsx lib/db/init.ts
   ```

## Application Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-class-analytics.git
   cd ai-class-analytics
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create a `.env.local` file in the root directory with your database credentials:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=ai_class_analytics
   ```

## Running the Application

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Database Schema

The application uses the following tables:

1. **students** - Student information
   - student_id (INT AUTO_INCREMENT PRIMARY KEY)
   - name (VARCHAR(100))
   - section (VARCHAR(50))
   - email (VARCHAR(100) UNIQUE)

2. **teachers** - Teacher information
   - teacher_id (INT AUTO_INCREMENT PRIMARY KEY)
   - name (VARCHAR(100))
   - subject (VARCHAR(100))
   - section (VARCHAR(50))
   - email (VARCHAR(100) UNIQUE)

3. **midsem_scores** - Exam scores for students
   - id (INT AUTO_INCREMENT PRIMARY KEY)
   - student_id (INT)
   - es_score (INT)
   - flat_score (INT)
   - dbms_score (INT)
   - mathematics_score (INT)
   - daa_score (INT)

## Troubleshooting

### Database Connection Issues

1. Make sure MySQL server is running:
   ```bash
   # Check if MySQL service is running
   sudo service mysql status
   ```

2. Verify database credentials in `.env.local`

3. Test database connection:
   ```bash
   pnpm tsx lib/db/example.ts
   ```

### Common Issues

1. **Module not found: Can't resolve 'mysql2'**
   - Run `pnpm install` to install dependencies

2. **Connection refused**
   - Check if MySQL server is running
   - Verify port number (default: 3306)
   - Check firewall settings

3. **Invalid credentials**
   - Double-check username and password in `.env.local`
   - Verify user has necessary permissions

## Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run linter

### Project Structure

```
ai-class-analytics/
├── app/                    # Next.js app directory
├── components/            # React components
├── lib/                   # Utility functions and database
│   └── db/               # Database implementation
├── public/               # Static files
└── types/                # TypeScript type definitions
```

## Main Pages

- **/** - Main dashboard with analytics
- **/query** - Custom SQL query interface

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.
