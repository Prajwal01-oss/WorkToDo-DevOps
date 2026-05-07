# 🎓 WorkToDo – DevOps Enabled Task Manager

A professional, full-stack MERN (MongoDB, Express, React, Node.js) application built with a core focus on **DevOps best practices**. This project demonstrates containerization, automated CI/CD pipelines, and modern UI design.

---

## 🚀 Key Features

- **Authentication**: Secure JWT-based user login and registration.
- **Task Orchestration**: Full CRUD operations with due dates and descriptions.
- **Modern Dashboard**: Premium, glassmorphic UI built with React and Lucide icons.
- **Dockerized Architecture**: Fully containerized environment using Docker and Docker Compose.
- **CI/CD Pipeline**: Automated build, test, and container registry pushing via GitHub Actions.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, Vite, Axios, Lucide-React |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **DevOps** | Docker, Docker Compose, GitHub Actions, GHCR |

---

## 📦 Project Structure

```text
worktodo/
├── .github/workflows/  # CI/CD Pipeline Definitions
├── client/             # React.js UI & Components
├── server/             # Express.js Server & MongoDB Models
├── docker-compose.yml  # Multi-container Orchestration
└── README.md           # Documentation
```

---

## 🏃 Getting Started

### Prerequisites
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/) (for local development)

### Option 1: Docker (Quick Start)
1. Clone the repository.
2. Build and run the containers:
   ```bash
   docker-compose up --build
   ```
3. Access the app:
   - **Frontend**: `http://localhost:80`
   - **Backend API**: `http://localhost:5000`

### Option 2: Local Development
1. **Backend**:
   ```bash
   cd server && npm install && npm start
   ```
2. **Frontend**:
   ```bash
   cd client && npm install && npm run dev
   ```

---

## 👷 CI/CD Workflow

The project includes a robust GitHub Actions workflow that:
1. **Builds** both frontend and backend on every push.
2. **Lints** the code to ensure high quality.
3. **Packages** the application into Docker images.
4. **Pushes** the images to the **GitHub Container Registry (GHCR)**.

---

## 🤝 Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

---
*Created for the WorkToDo-DevOps project.*
