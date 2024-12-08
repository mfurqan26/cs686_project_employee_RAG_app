# Employee Role Suggestion Application

This full-stack application that uses AI to suggest employee roles and their wage information based on business type and industry classification. The application uses NOC (National Occupational Classification) and NAICS (North American Industry Classification System) data to provide suggestions for hiring employees for your business.

## Technology Stack

### Backend

- NestJS framework
- Apollo GraphQL Server
- Prisma ORM
- PostgreSQL database
- OpenAI integration for AI suggestions with LangChain

### Frontend

- React
- Material-UI (MUI) components
- Apollo GraphQL Client
- TypeScript

## Prerequisites

- Node.js (v16 or higher)
- Docker Desktop
- npm or yarn package manager

## Project Structure

```
project-root/
├── server/ # NestJS backend
│ ├── src/
│ │ ├── llm/ # AI/LLM integration
│ │ ├── business/ # Business logic
│ │ └── data/ # CSV data files
│ └── prisma/ # Database schema
├── client/ # React frontend
│ └── src/
│ └── pages/ # React components
└── api-access/ # Shared GraphQL types
```

## Setup Instructions

1. Clone the repository

2. Install dependencies for all packages:

```
bash
npm install
cd server && npm install
cd ../client && npm install
cd ../api-access && npm install
```

3. Set up the local database using Docker:

```
bash
docker-compose up -d
```

4. Create a `.env` file in the server directory:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432 employee_suggestion_db"
OPENAI_API_KEY="your-openai-api-key"
```

5. Using VS Code Run Tasks (Recommended):
   - Open the project in VS Code
   - Press `Ctrl/Cmd + Shift + P`
   - Type "Tasks: Run Task"
   - Select "Prisma Generate & Push & Seed"
   - After completion, select run task "Run Dev Environment"

## Available VS Code Tasks

- **Prisma Generate & Push & Seed**: Sets up database schema and loads initial data
- **Run Dev Environment**: Starts both frontend and backend development servers

## Features

- Business profile creation and management
- AI-powered employee role suggestions based on NAICS codes
- Wage information from Canadian labor market data
- Interactive data grid for viewing suggestions
- Multi-level NOC code selection process
- Real-time updates and status tracking
