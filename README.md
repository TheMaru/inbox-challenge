# Full-Stack Inbox Challenge

A simple inbox application where users can create, view and delete messages.

## 🚀 Tech Stack

- **Backend:** Java 21, Spring Boot 4.0.1, Spring Data JPA
- **Database:** H2 (In-memory)
- **Frontend:** React 19, TypeScript, Vite (React SWC), React Router
- **Package Manager:** pnpm

## 🛠️ Getting Started

### Prerequisites

- Java 21 JDK
- Node.js v25 (lower may work as well)
- pnpm (`npm install -g pnpm`)

### 1. Run the Backend

```bash
cd backend
./mvnw spring-boot:run
```

The server will start on <http://localhost:8080>. You can access the H2 Console
at [/h2-console](http://localhost:8080/h2-console) (JDBC URL: `jdbc:h2:mem:inboxdb`, User: `sa`, Pass: `password`).

### 2. Run the Frontend

Open a new shell

```bash
cd frontend
pnpm install
pnpm dev
```

The app will be available at <http://localhost:5173>.

### 3. Running Tests

Again from project root

```bash
cd backend
./mvnw test
```
