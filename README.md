# 🥘 Meal Prep Tracker – Backend

A modern, scalable Node.js backend for managing user meal planning, ingredient tracking, and fridge inventory. Built with TypeScript, PostgreSQL, and a layered architecture to ensure clean, testable code.

---

## 📁 Project Structure

```
src/
├── config           # Configuration (swagger etc.)
├── database/        # TypeORM entities, data source config, migrations
├── logic/           # Business logic (services, utils, factories)
├── repositories/    # Data access layer
├── routes/          # Express route definitions
├── server.ts        # Entry point
├── dataSource.ts    # TypeORM Data Source configuraion
tests/
├── unit/            # Unit tests
├── integration/     # Integration tests
├── bdd/             # BDD (Cucumber-style) tests
```

---

## 🛠️ Tech Stack

| Tool                      | Purpose                            |
| ------------------------- | ---------------------------------- |
| **Node.js**               | Runtime                            |
| **TypeScript**            | Type safety                        |
| **Express.js**            | HTTP server                        |
| **TypeORM**               | ORM for PostgreSQL                 |
| **PostgreSQL**            | Relational database                |
| **Jest**                  | Unit testing                       |
| **ESLint** & **Prettier** | Code quality & formatting          |
| **TSUP**                  | Build bundler                      |
| **dotenv**                | Environment config                 |
| **JWT**                   | Auth (Token-based)                 |
| **bcryptjs**              | Password hashing                   |
| **Cucumber**              | BDD-style integration testing      |
| **Nodemon** / **tsx**     | Dev server                         |
| **GitHub Actions**        | CI/CD for testing, linting, deploy |
| **Render**                | Deployment                         |

---

## 📦 Installation

```bash
git clone https://github.com/YoUnGi102/MealPrepTrackerBusiness.git
cd meal-prep-tracker
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root:

```env
NODE_ENV=development
PORT=5000

FRONTEND_URL=
JWT_SECRET=

DB_USER=
DB_PASS=
DB_NAME=
DB_PORT=
```

---

## 🚀 Run Locally

```bash
npm run dev   # Starts dev server with tsx and nodemon
```

---

## 🧪 Testing

```bash
npm run test:unit    # Jest unit tests
npm run test:bdd     # Cucumber BDD tests
npm run lint         # Lint the codebase
npm run format       # Format the code with prettier
```

Tests use a separate `TestDataSource` to isolate test DB interactions.

---

## 🧱 CI/CD

GitHub Actions pipeline runs on every `push` or `pull_request` to `main`:

- ✅ Lint Check
- ✅ Unit Tests
- ✅ Build
- 🚀 Deployment (only on push to main)

---

## 📚 Architectural Highlights

- **Dependency Injection (DI)** via factory functions for all services
- **Repository Pattern** to abstract DB operations
- **Service Layer** for business logic
- **Typed Errors** via custom error classes and centralized error messages
- **Path Aliases** using `tsconfig.json` (e.g., `@src/logic/utils/...`)
- **TypeORM** migrations for version-controlled DB schema

---

## 🔒 Auth Strategy

- **JWT** for session management
- **bcryptjs** for hashing passwords
- Custom error responses with appropriate HTTP codes

---

## 🧪 Testing Strategy

- **Unit Tests** for logic and services
- **Integration Tests** for end-to-end flows
- **BDD Tests** using Cucumber to validate features from a user's perspective

---

## 📘 API Documentation with Swagger

This project uses [Swagger](https://swagger.io/) with [`swagger-autogen`](https://www.npmjs.com/package/swagger-autogen) to automatically generate API documentation from your defined routes.

**Configuration Highlights:**

- The documentation is generated from `src/endpoints/routes/index.ts`.
- Swagger metadata (title, version, description) is defined directly in the Swagger config file.
- Output is written to `swagger-output.json` and can be served with Swagger UI middleware.

```ts
const doc = {
  info: {
    version: 'v1.0.0',
    title: 'MealPrepTracker API',
    description:
      'MealPrepTracker is an app that allows you to create recipes, use them to create meals, and track daily caloric intake',
  },
  host: process.env.BASE_URL || `localhost:${process.env.PORT || 5000}`,
  schemes: ['http', 'https'],
};
```

To regenerate the Swagger spec:

```bash
npm run swagger
```

---

## 📊 Logging with Winston

This project uses [Winston](https://github.com/winstonjs/winston) for structured and flexible logging.

### Key Features:

- **Daily log rotation** with `winston-daily-rotate-file`
- **Environment-based log levels**: `debug` in development, `info` in production
- **Timestamped and formatted logs** for improved traceability
- **Output to both console and log files** stored in the `logs/` directory

```ts
const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    }),
  ),
  transports: [
    new winston.transports.Console({
      level: NODE_ENV === 'production' ? 'info' : 'debug',
    }),
    new winston.transports.DailyRotateFile({
      filename: 'logs/%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
      zippedArchive: true,
    }),
  ],
});
```

Logs are automatically rotated and stored under `logs/`, keeping the last 14 days compressed.

---

## 🚧 TODOs / Future Improvements

- Set up Intergration and Cucumber Tests
- Role-based access control (RBAC)
- Rate limiting and API throttling

---

## 🌐 Live Demo

### 🔧 Backend (API)

- **Base URL**: [`https://mealpreptracker.onrender.com/api/`](https://mealpreptracker.onrender.com/api/)
- **Swagger Docs**: [`https://mealpreptracker.onrender.com/api-docs/`](https://mealpreptracker.onrender.com/api-docs/)
  > Interactive API documentation auto-generated with Swagger.

### 🖥️ Frontend (Client)

- **Website**: [`https://mealpreptrackerfrontend.onrender.com/`](https://mealpreptrackerfrontend.onrender.com/)

---

## 👤 Author

**Tomáš Greš**  
[GitHub](https://github.com/YoUnGi102) · [LinkedIn](https://linkedin.com/in/tomas-gres)
