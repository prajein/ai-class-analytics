#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Setting up AI Class Analytics Database...${NC}"

# Check if SQL*Plus is installed
if ! command -v sqlplus &> /dev/null; then
    echo -e "${RED}Error: SQL*Plus is not installed. Please install Oracle Client.${NC}"
    exit 1
fi

# Database connection details
DB_USER=${DB_USER:-"system"}
DB_PASSWORD=${DB_PASSWORD:-"oracle"}
DB_CONNECTION_STRING=${DB_CONNECTION_STRING:-"localhost:1521/orcl"}

# Test database connection
echo "Testing database connection..."
if ! sqlplus -s "${DB_USER}/${DB_PASSWORD}@${DB_CONNECTION_STRING}" << EOF
exit;
EOF
then
    echo -e "${RED}Error: Could not connect to the database. Please check your credentials and make sure the database is running.${NC}"
    exit 1
fi

# Run the database setup script
echo "Running database setup script..."
if sqlplus -s "${DB_USER}/${DB_PASSWORD}@${DB_CONNECTION_STRING}" << EOF
@testDB.sql
exit;
EOF
then
    echo -e "${GREEN}Database setup completed successfully!${NC}"
else
    echo -e "${RED}Error: Failed to set up the database. Please check the error messages above.${NC}"
    exit 1
fi

# Test the database connection using our example script
echo "Testing database connection with example script..."
if pnpm tsx lib/db/example.ts; then
    echo -e "${GREEN}Database connection test successful!${NC}"
else
    echo -e "${RED}Error: Database connection test failed. Please check the error messages above.${NC}"
    exit 1
fi

echo -e "${GREEN}Setup completed successfully! You can now run the application with 'pnpm dev'${NC}" 