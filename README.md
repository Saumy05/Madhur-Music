# Madhur – Melodic Music Experience 🎵

Enterprise-grade, scalable full-stack music streaming application monorepo setup.

## 🚀 Workspace Overview

```text
madhur/
├── apps/
│   ├── web/           # React 19 + Vite + Tailwind CSS v4 + Zustand + TanStack Query
│   └── server/        # Node.js + Express + Prisma ORM + Redis + Socket.IO
├── packages/
│   ├── config/        # Centralized ESLint, Prettier, TypeScript, Tailwind tokens
│   ├── constants/     # Shared domain constants, HTTP status, socket events
│   ├── shared/        # Shared domain logic & Zod validation schemas
│   ├── types/         # TypeScript definitions & API DTO contracts
│   ├── ui/            # Shared React UI component library (shadcn/ui base)
│   └── utils/         # Cross-cutting utility helpers
├── docs/              # Architectural diagrams and API documentation
└── scripts/           # Automation scripts
```

## 🛠 Tech Stack

### Frontend (`apps/web`)
- **Core**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, shadcn/ui, Framer Motion
- **State & Data Fetching**: Zustand, TanStack Query, Axios
- **Form & Validation**: React Hook Form, Zod
- **Icons**: Lucide React

### Backend (`apps/server`)
- **Core**: Node.js, Express.js, TypeScript
- **Database & Cache**: PostgreSQL, Prisma ORM, Redis
- **Auth & Real-time**: JWT Authentication, Socket.IO
- **Media & File Handling**: Cloudinary, Multer
- **Logging & Docs**: Winston/Pino, Swagger/OpenAPI

## 📖 Getting Started

```bash
# Install dependencies across monorepo
pnpm install

# Start web and server in development mode
pnpm dev

# Run web app only
pnpm dev:web

# Run server app only
pnpm dev:server
```
