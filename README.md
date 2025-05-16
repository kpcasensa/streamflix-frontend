# 🎥 StreamFlix App Frontend

A simple React frontend for the Movie App, styled with **Tailwind CSS** and containerized using **Docker**.

## 🛠 Tech Stack

- React (CRA)
- Tailwind CSS
- Docker & Docker Compose

## 🚀 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/kpcasensa/streamflix-frontend.git
cd streamflix-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run in Development Mode
```bash
npm start
```

### 4. Environment Variables
```ini
REACT_APP_API_BASE_URL=http://127.0.0.1:8000/api/movies
```

### 5. Build & Run with Docker
```bash
docker compose up --build
```

### 6. Features
- Responsive UI with Tailwind CSS
- API integration with backend (Django DRF)
- Dockerized frontend for easy deployment
- Environment-based configuration for API endpoints

### 7. Future Improvements
- Authentication integration
- State management (Redux, Zustand, etc.)
- CI/CD pipeline