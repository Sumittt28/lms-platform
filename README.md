# EduPlatform - Learning Management System

A full-stack Learning Management System built with React, Express, PostgreSQL, Stripe, and Vimeo.

## 🚀 Features

- **User Authentication** - JWT-based auth with role-based access control (Student/Instructor/Admin)
- **Course Management** - Instructors can create, edit, publish, and manage courses
- **Video Lessons** - Vimeo integration for video hosting and streaming
- **Payments** - Stripe Checkout integration for course purchases
- **Progress Tracking** - Track student progress through courses
- **Responsive Design** - Works on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- React 19
- React Router v7
- Tailwind CSS
- Axios
- Lucide React Icons

### Backend
- Node.js + Express
- PostgreSQL
- JWT Authentication
- bcryptjs for password hashing
- Stripe SDK
- Vimeo API

### DevOps
- Docker + Docker Compose

## 📁 Project Structure

```
lms-platform/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Route pages
│   │   ├── context/          # React Context (Auth)
│   │   ├── services/         # API service layer
│   │   ├── hooks/            # Custom React hooks
│   │   └── layouts/          # Layout components
│   └── Dockerfile
│
├── backend/                  # Express API
│   ├── src/
│   │   ├── routes/           # API routes
│   │   ├── controllers/      # Request handlers
│   │   ├── services/         # Business logic
│   │   ├── middleware/       # Auth, validation, errors
│   │   ├── models/           # Database models
│   │   └── config/           # Configuration
│   └── Dockerfile
│
├── database/                 # Database migrations & seeds
├── docker-compose.yml
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Stripe Account (for payments)
- Vimeo Account (for videos)

### 1. Clone the repository
```bash
git clone https://github.com/Sumittt28/lms-platform.git
cd lms-platform
```

### 2. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your credentials
```

### 3. Start with Docker
```bash
docker-compose up -d
```

### 4. Run database migrations
```bash
docker-compose exec backend npm run migrate
```

### 5. Access the application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Database: localhost:5432

## 🔑 Environment Variables

```env
# Backend
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://lms:lms@db:5432/lms
JWT_SECRET=your-super-secret-jwt-key
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
VIMEO_ACCESS_TOKEN=your-vimeo-token
FRONTEND_URL=http://localhost:3000

# Frontend
VITE_API_URL=http://localhost:5000/api
```

## 📚 API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Courses
- `GET /api/courses` - List courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses` - Create course (instructor)
- `PUT /api/courses/:id` - Update course (instructor)
- `DELETE /api/courses/:id` - Delete course (instructor)

### Payments
- `POST /api/payments/create-checkout` - Create Stripe checkout session
- `POST /api/payments/webhook` - Stripe webhook handler

### Enrollments
- `GET /api/enrollments/my-courses` - Get enrolled courses

### Videos
- `GET /api/videos/:id` - Get video details
- `POST /api/videos/:id/progress` - Update watch progress

## 👤 Author

**Sumit Kumar Singh**
- GitHub: [@Sumittt28](https://github.com/Sumittt28)
- Email: singhsumit85422@gmail.com

## 📄 License

This project is licensed under the MIT License.
