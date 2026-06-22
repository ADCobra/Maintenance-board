# Maintenance Board

A comprehensive, full-stack maintenance ticket management system built with the MERN stack (MongoDB, Express.js, React, Node.js). This system provides advanced features for managing maintenance tickets, tracking performance, and improving service quality.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Demo Credentials](#demo-credentials)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Features Documentation](#features-documentation)
- [License](#license)

## Features

### Core Ticket Management
- **Create, Read, Update, Delete Tickets** - Full CRUD operations
- **Ticket Assignment** - Assign tickets to agents
- **Status Management** - Customizable ticket statuses
- **Priority Levels** - Low, Medium, High, Urgent
- **Department Organization** - Organize tickets by departments
- **Ticket History** - Track all changes and updates
- **Internal Notes** - Private notes for agents
- **Ticket Merging** - Merge duplicate tickets
- **Ticket Dependencies** - Link related tickets

### Advanced Features
- **File Attachments** - Upload and manage files (images, PDFs, documents)
- **Saved Replies** - Quick response templates with variables
- **Ticket Templates** - Pre-defined ticket templates for common issues
- **CSAT Surveys** - Customer satisfaction surveys with NPS scoring
- **Collision Detection** - Prevent multiple agents from editing same ticket
- **Real-time Updates** - WebSocket-based live notifications
- **Escalation Rules** - Automatic ticket escalation based on rules
- **Auto-close Tickets** - Automatically close resolved tickets

### Analytics & Reporting
- **Dashboard Analytics** - Overview of ticket metrics
- **Advanced Analytics** - Detailed charts and graphs
- **Custom Dashboards** - Drag-and-drop widget customization
- **PDF Reports** - Generate and download PDF reports
- **Email Scheduling** - Schedule automated report emails
- **ML Predictions** - Machine learning-based predictions
- **Anomaly Detection** - Identify unusual patterns
- **Natural Language Queries** - Ask questions in plain English

### User Management
- **Role-Based Access Control** - Admin, Agent, User roles
- **Google OAuth** - Sign in with Google
- **Email Authentication** - Traditional email/password login
- **User Profiles** - Manage user information
- **Audit Logs** - Track all user actions

### Communication
- **Ticket Replies** - Comment on tickets
- **Email Notifications** - Automated email alerts
- **Real-time Notifications** - Instant updates via WebSocket
- **Mention System** - @mention users in comments

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Socket.io Client** - Real-time communication
- **Recharts** - Data visualization
- **Lucide React** - Icon library
- **React Hot Toast** - Notifications
- **Tailwind CSS** - Utility-first CSS framework

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Socket.io** - Real-time communication
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Node-cron** - Scheduled tasks
- **Nodemailer** - Email sending
- **PDFKit** - PDF generation

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **MongoDB** (v5 or higher) or use MongoDB Atlas
- **npm** or **yarn**

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/ajiteshdwivedi/maintenance-board.git
cd maintenance-board
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## Configuration

### Backend Configuration

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/maintenance-board

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Email Configuration (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
EMAIL_FROM=noreply@yourdomain.com

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback

# Escalation Job Configuration
ESCALATION_CHECK_INTERVAL=*/5 * * * *
```

### Frontend Configuration

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

## Running the Application

### Development Mode

#### Start Backend Server

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:5000`

#### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

### Production Mode

#### Build Frontend

```bash
cd frontend
npm run build
```

#### Start Backend in Production

```bash
cd backend
npm start
```

## Demo Credentials

### Admin Account
```
Email: admin@example.com
Password: admin123
Role: Admin
```

### Agent Account
```
Email: agent@example.com
Password: agent123
Role: Agent
```

### Customer Account
```
Email: user@example.com
Password: user123
Role: User
```

**Note**: Create these accounts after running the application for the first time, or use the seed script.

### Seed Database

```bash
cd backend
npm run seed
```

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login user | No |
| GET | `/auth/me` | Get current user | Yes |
| GET | `/auth/google` | Google OAuth login | No |
| GET | `/auth/google/callback` | Google OAuth callback | No |

### Ticket Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/tickets` | Get all tickets | Yes |
| GET | `/tickets/:id` | Get single ticket | Yes |
| POST | `/tickets` | Create ticket | Yes |
| PUT | `/tickets/:id` | Update ticket | Yes |
| DELETE | `/tickets/:id` | Delete ticket | Yes (Admin) |
| POST | `/tickets/:id/reply` | Add reply | Yes |
| PUT | `/tickets/:id/status` | Change status | Yes |
| PUT | `/tickets/:id/assign` | Assign ticket | Yes |
| POST | `/tickets/:id/merge` | Merge tickets | Yes |
| POST | `/tickets/:id/dependency` | Add dependency | Yes |

### Department Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/departments` | Get all departments | Yes |
| POST | `/departments` | Create department | Yes (Admin) |
| PUT | `/departments/:id` | Update department | Yes (Admin) |
| DELETE | `/departments/:id` | Delete department | Yes (Admin) |

### Analytics Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/analytics/overview` | Get overview stats | Yes |
| GET | `/analytics/tickets` | Get ticket analytics | Yes |
| GET | `/analytics/agents` | Get agent performance | Yes |
| POST | `/analytics/pdf` | Generate PDF report | Yes |
| POST | `/analytics/schedule` | Schedule email report | Yes |

## Project Structure

```
maintenance-board/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── scripts/
│   │   ├── services/
│   │   ├── utils/
│   │   └── server.js
│   ├── uploads/
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
└── README.md
```

## License

This project is licensed under the MIT License.

## Author

**Ajitesh Dwivedi** - [GitHub](https://github.com/ajiteshdwivedi)
