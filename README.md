
# AI Job Assistance

<div align="center">

![AI Job Assistant](https://img.shields.io/badge/AI-Job%20Assistant-blue?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

A comprehensive AI-powered career assistance platform that helps job seekers find real job opportunities, analyze role requirements, and generate personalized learning roadmaps with curated resources.

</div>

## 🎯 Overview

AI Job Assistance is an intelligent career guidance platform that combines real-time job search, AI-powered role analysis, and personalized learning paths. The system uses LangGraph for workflow orchestration, Tavily for job search, and Ollama (Llama 3) for role analysis to provide users with:

- **Real-time Job Listings**: Search and discover job opportunities from major job boards (Greenhouse, Lever, Workday, SmartRecruiters)
- **Role Analysis**: Get comprehensive insights into job roles, responsibilities, and required skills
- **Learning Roadmaps**: AI-curated learning paths with YouTube resources
- **Interview Preparation**: Topics and areas to focus on for interviews

## ✨ Features

### 🎨 Frontend
- Modern, responsive React + TypeScript interface
- Real-time job search with location filtering
- Interactive skill visualization (Technical, Tools, Non-technical)
- Structured learning roadmap with YouTube video links
- Interview preparation topics
- Clean, intuitive UI with smooth animations

### 🔧 Backend
- FastAPI REST API with CORS support
- LangGraph-based workflow orchestration
- Tavily-powered real-time job search
- Ollama (Llama 3) for role analysis
- JSON-based structured responses
- Error handling and validation

## 🛠 Tech Stack

### Backend
- **Python 3.8+**
- **FastAPI** - Modern, fast web framework for building APIs
- **LangGraph** - Workflow orchestration for AI agents
- **LangChain Core** - LLM framework integration
- **Tavily Python** - Real-time web search API
- **Ollama** - Local LLM inference (Llama 3)
- **Uvicorn** - ASGI server

### Frontend
- **React 19.2** - UI library
- **TypeScript 5.8** - Type-safe JavaScript
- **Vite 6.2** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS (via inline styles)

## 📁 Project Structure

```
AI-JOB-ASSISTANCE/
│
├── ai-job-assistant/          # Backend Python application
│   ├── agents.py              # Core agent functions (job search, role analysis)
│   ├── langgraph_agent.py     # LangGraph workflow definition
│   ├── api_langgraph.py       # FastAPI application and endpoints
│   ├── run_langgraph.py       # Standalone script to test LangGraph agent
│   └── requirements.txt       # Python dependencies
│
├── frontend/                  # Frontend React application
│   ├── src/
│   │   ├── App.tsx            # Main application component
│   │   ├── index.tsx          # React entry point
│   │   ├── types.ts           # TypeScript type definitions
│   │   ├── components/        # React components
│   │   │   ├── JobCard.tsx    # Job listing card component
│   │   │   └── RoadmapCard.tsx # Learning roadmap item component
│   │   └── services/
│   │       └── api.ts         # API service layer
│   ├── package.json           # Node.js dependencies
│   ├── tsconfig.json          # TypeScript configuration
│   ├── vite.config.ts         # Vite configuration
│   └── README.md              # Frontend-specific documentation
│
└── README.md                  # This file
```

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8 or higher**
- **Node.js 16+ and npm** (or yarn/pnpm)
- **Ollama** installed and running with Llama 3 model
  ```bash
  # Install Ollama from https://ollama.ai
  # Pull the Llama 3 model
  ollama pull llama3
  ```
- **Tavily API Key** - Get one from [Tavily](https://tavily.com)

## 🚀 Quick Start

For detailed setup instructions, see [SETUP.md](SETUP.md).

Quick start:
```bash
# Backend
cd ai-job-assistant
python -m venv venv
venv\Scripts\activate  # or source venv/bin/activate on macOS/Linux
pip install -r requirements.txt
set TAVILY_API_KEY=your_key  # or export on macOS/Linux
uvicorn api_langgraph:app --reload

# Frontend (in another terminal)
cd frontend
npm install
npm run dev
```

## 📦 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd AI-JOB-ASSISTANCE
```

### 2. Backend Setup

```bash
cd ai-job-assistant

# Create a virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install
```

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `ai-job-assistant` directory (or set environment variables):

```bash
# Required
TAVILY_API_KEY=your_tavily_api_key_here
```

### Frontend Configuration

Update the API base URL in `frontend/services/api.ts` if your backend runs on a different port:

```typescript
const API_BASE_URL = 'http://127.0.0.1:8000'; // Default FastAPI port
```

## 🚀 Running the Application

### Start the Backend Server

```bash
cd ai-job-assistant

# Make sure Ollama is running
# On Windows, it should start automatically
# On macOS/Linux, you may need to start it manually

# Run the FastAPI server
uvicorn api_langgraph:app --reload --port 8000
```

The API will be available at `http://127.0.0.1:8000`

### Start the Frontend Development Server

```bash
cd frontend

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173` (or the port shown in terminal)

### Test the LangGraph Agent Standalone

```bash
cd ai-job-assistant
python run_langgraph.py
```

## 📚 Documentation

- **[SETUP.md](SETUP.md)** - Detailed setup and installation guide
- **[API.md](API.md)** - Complete API reference documentation
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture and design
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines

## 📚 API Documentation

### Base URL
```
http://127.0.0.1:8000
```

### Endpoints

#### 1. Health Check
```http
GET /
```

**Response:**
```json
{
  "message": "LangGraph AI Job Assistant running 🚀"
}
```

#### 2. Job Search
```http
POST /job-search
Content-Type: application/json
```

**Request Body:**
```json
{
  "role": "Frontend Developer",
  "location": "India"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "role": "Frontend Developer",
    "location": "India",
    "total_jobs": 5,
    "jobs": [
      {
        "company": "Company Name",
        "title": "Job Title",
        "url": "https://example.com/job"
      }
    ],
    "job_overview": {
      "summary": "Role description...",
      "responsibilities": ["Responsibility 1", "Responsibility 2"]
    },
    "job_required_skills": {
      "technical": ["React", "TypeScript", "JavaScript"],
      "non_technical": ["Communication", "Teamwork"],
      "tools": ["Git", "VS Code"]
    },
    "preparation_roadmap": {
      "fundamentals": [
        {
          "topic": "Topic name",
          "youtube_videos": [
            {
              "title": "Video Title",
              "url": "https://youtube.com/..."
            }
          ]
        }
      ],
      "advanced": [...],
      "projects": [...],
      "interview_topics": ["Topic 1", "Topic 2"]
    }
  }
}
```

## 🏗 Architecture

### Backend Architecture

The backend uses **LangGraph** for workflow orchestration:

1. **Job Search Node**: Searches for jobs using Tavily API
2. **Role Analysis Node**: Analyzes the role using Ollama (Llama 3)
3. **Roadmap Enrichment Node**: Enhances roadmap with YouTube videos
4. **Final Output Node**: Formats and returns the response

```
Entry Point → Job Search → Role Analysis → Roadmap Enrichment → Final Output → End
```

### Data Flow

```
User Input (Role, Location)
    ↓
Frontend (React)
    ↓
API Request (POST /job-search)
    ↓
LangGraph Agent
    ├─→ Tavily Job Search
    ├─→ Ollama Role Analysis
    └─→ Tavily YouTube Search
    ↓
Structured JSON Response
    ↓
Frontend Display
```

## 🔍 Key Components

### Backend Agents (`agents.py`)

- `tavily_job_search()`: Searches for jobs on major job boards
- `extract_top_jobs()`: Extracts and deduplicates top job listings
- `analyze_role_with_ollama()`: Analyzes job role and generates insights
- `tavily_youtube_search()`: Finds relevant YouTube learning videos
- `job_role_agent()`: Main orchestration function (legacy, replaced by LangGraph)

### Frontend Components

- **App.tsx**: Main application component with search form and results display
- **JobCard.tsx**: Displays individual job listings
- **RoadmapCard.tsx**: Displays learning roadmap items with YouTube videos

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Tavily** - Real-time search API
- **Ollama** - Local LLM inference
- **LangGraph** - Workflow orchestration
- **FastAPI** - Modern Python web framework
- **React** - UI library
- **Vite** - Build tool

## 📧 Contact

For questions or support, please open an issue on the GitHub repository.

---

**Made with ❤️ for job seekers**

<img width="1915" height="881" alt="image" src="https://github.com/user-attachments/assets/f4373481-e901-4435-9168-6b5133e23818" />
<img width="1908" height="872" alt="image (3)" src="https://github.com/user-attachments/assets/8a84c3fc-b312-4f5a-a9d5-1dca9c18d486" />
<img width="1909" height="867" alt="image (2)" src="https://github.com/user-attachments/assets/81767f59-993b-4d6f-9678-f99c204fa6aa" />
<img width="1899" height="887" alt="image (1)" src="https://github.com/user-attachments/assets/c8ac1e3b-a2ec-46f1-9d44-1d9411c6a52d" />
