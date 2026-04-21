# Positivus — Full-Stack Digital Marketing Site

A modern digital marketing agency website built with **React + Vite + Tailwind v4 + shadcn** on the frontend and **Node.js + Express + Prisma + PostgreSQL** on the backend.

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL 16+ (or Docker)
- npm 10+

---

### Frontend

```bash
# Install dependencies
npm install

# Copy env file
cp .env.example .env.local

# Start dev server
npm run dev
```

Runs at: `http://localhost:5173`

---

### Backend

```bash
cd backend

# Install dependencies
npm install

# Copy env file
cp .env.example .env

# Edit .env with your DATABASE_URL and JWT secrets

# Run database migrations
npm run db:migrate

# Start dev server
npm run dev
```

API runs at: `http://localhost:4000/api`

---

### Docker (Full-stack)

```bash
# Copy env files
cp .env.example .env.local
cp backend/.env.example backend/.env

# Start all services (PostgreSQL + API)
docker-compose up -d

# Run migrations
docker-compose exec api npx prisma migrate deploy
```

---

## 📁 Project Structure

```
├── src/                    # React frontend
│   ├── components/
│   │   ├── layout/         # Navbar, Footer
│   │   └── sections/       # Landing page sections
│   ├── pages/
│   │   ├── auth/           # Login, Register, ForgotPassword
│   │   └── dashboard/      # Protected dashboard pages
│   ├── store/              # Zustand auth store
│   ├── lib/                # API fetch wrapper
│   └── router/             # React Router + guards
├── backend/
│   ├── src/
│   │   ├── controllers/    # Auth, Project controllers
│   │   ├── middleware/     # JWT auth, Zod validation, error handler
│   │   ├── routes/         # Express routes
│   │   ├── schemas/        # Zod schemas
│   │   └── utils/          # JWT, bcrypt, email helpers
│   └── prisma/
│       └── schema.prisma   # DB models: User, RefreshToken, Project
├── docker-compose.yml
└── .env.example
```

---

## 🔐 Auth Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | — | Create account |
| POST | `/api/auth/login` | — | Login → access + refresh token |
| POST | `/api/auth/refresh` | refresh token | Rotate token pair |
| POST | `/api/auth/logout` | JWT | Invalidate refresh token |
| GET | `/api/auth/me` | JWT | Get current user |
| POST | `/api/auth/forgot-password` | — | Send reset email |
| POST | `/api/auth/reset-password` | — | Reset with token |

## 📊 Project Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/projects` | JWT | List user projects |
| POST | `/api/projects` | JWT | Create project |
| PATCH | `/api/projects/:id` | JWT | Update project |
| DELETE | `/api/projects/:id` | JWT | Delete project |

---

## 🎨 Design System

- **Primary**: `#B9FF66` (Acidic Green)
- **Background**: `#0A0A0A`
- **Cards**: `#141414`
- **Font**: Geist Variable
- **Component Library**: shadcn (Tailwind v4)
- **Animations**: Framer Motion (respects `prefers-reduced-motion`)

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + Vite + TypeScript |
| Styling | Tailwind CSS v4 + shadcn |
| Animation | Framer Motion |
| State | Zustand |
| Routing | React Router v7 |
| Backend | Node.js + Express |
| ORM | Prisma |
| Database | PostgreSQL |
| Auth | JWT + bcrypt + refresh token rotation |
| Validation | Zod |
| Email | Nodemailer |
| DevOps | Docker + docker-compose |
