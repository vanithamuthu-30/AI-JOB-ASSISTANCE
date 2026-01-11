# Architecture Documentation

This document provides a detailed overview of the AI Job Assistance architecture, including system design, data flow, and component interactions.

## 🏗 System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   App.tsx    │  │  JobCard.tsx │  │ RoadmapCard  │     │
│  └──────┬───────┘  └──────────────┘  └──────────────┘     │
│         │                                                  │
│         │ HTTP POST /job-search                            │
│         ▼                                                  │
└─────────┼──────────────────────────────────────────────────┘
          │
          │ JSON: { role, location }
          │
┌─────────▼──────────────────────────────────────────────────┐
│              Backend API (FastAPI)                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              api_langgraph.py                       │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │       POST /job-search endpoint              │  │   │
│  │  └──────────────┬───────────────────────────────┘  │   │
│  └─────────────────┼──────────────────────────────────┘   │
│                    │                                        │
│                    │ Invoke LangGraph Agent                │
│                    ▼                                        │
└────────────────────┼────────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
┌───────────────────┐    ┌─────────────────────┐
│  LangGraph Agent  │    │   External APIs     │
│  ┌─────────────┐  │    │  ┌───────────────┐ │
│  │ Job Search  │──┼────┼─▶│  Tavily API   │ │
│  │    Node     │  │    │  └───────────────┘ │
│  └─────────────┘  │    │  ┌───────────────┐ │
│  ┌─────────────┐  │    │  │   Ollama      │ │
│  │Role Analysis│──┼────┼─▶│  (Llama 3)    │ │
│  │    Node     │  │    │  └───────────────┘ │
│  └─────────────┘  │    │  ┌───────────────┐ │
│  ┌─────────────┐  │    │  │  Tavily API   │ │
│  │  Roadmap    │──┼────┼─▶│ (YouTube)     │ │
│  │ Enrichment  │  │    │  └───────────────┘ │
│  └─────────────┘  │    └─────────────────────┘
│  ┌─────────────┐  │
│  │ Final Output│  │
│  │    Node     │  │
│  └─────────────┘  │
└───────────────────┘
```

## 📊 Data Flow

### Request Flow

1. **User Input** → Frontend receives role and location
2. **API Call** → Frontend sends POST request to `/job-search`
3. **LangGraph Invocation** → FastAPI invokes the LangGraph agent
4. **Parallel Processing** → Agent executes nodes in sequence:
   - Job Search Node → Calls Tavily API
   - Role Analysis Node → Calls Ollama (Llama 3)
   - Roadmap Enrichment Node → Calls Tavily API for YouTube videos
   - Final Output Node → Formats response
5. **Response** → JSON response sent back to frontend
6. **Display** → Frontend renders the data in UI components

### Response Structure

```typescript
interface JobAssistantData {
  role: string;
  location: string;
  total_jobs: number;
  jobs: Job[];
  job_overview: {
    summary: string;
    responsibilities: string[];
  };
  job_required_skills: {
    technical: string[];
    non_technical: string[];
    tools: string[];
  };
  preparation_roadmap: {
    fundamentals: RoadmapItem[];
    advanced: RoadmapItem[];
    projects: RoadmapItem[];
    interview_topics: string[];
  };
}
```

## 🔄 LangGraph Workflow

### State Definition

```python
class JobAgentState(TypedDict):
    role: str                    # User input: job role
    location: str                # User input: location
    jobs: List[Dict]             # Job search results
    role_analysis: Dict          # AI-generated role analysis
    final_response: Dict         # Final formatted output
```

### Workflow Graph

```
Entry Point
    │
    ▼
┌─────────────────┐
│  Job Search     │  ← Searches Tavily for job listings
│     Node        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Role Analysis  │  ← Uses Ollama to analyze the role
│     Node        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Roadmap        │  ← Enriches roadmap with YouTube videos
│  Enrichment     │
│     Node        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Final Output   │  ← Formats and structures the response
│     Node        │
└────────┬────────┘
         │
         ▼
       END
```

### Node Details

#### 1. Job Search Node
- **Function**: `job_search_node(state: JobAgentState)`
- **Action**: 
  - Calls `tavily_job_search(role, location)`
  - Extracts top 5 unique jobs using `extract_top_jobs()`
  - Updates `state["jobs"]`
- **External API**: Tavily Search API
- **Output**: List of job objects with company, title, and URL

#### 2. Role Analysis Node
- **Function**: `role_analysis_node(state: JobAgentState)`
- **Action**:
  - Calls `analyze_role_with_ollama(role)`
  - Generates JSON structure with:
    - Job overview (summary, responsibilities)
    - Required skills (technical, non-technical, tools)
    - Preparation roadmap structure (fundamentals, advanced, projects, interview topics)
  - Updates `state["role_analysis"]`
- **External API**: Ollama (Llama 3 model)
- **Output**: Comprehensive role analysis dictionary

#### 3. Roadmap Enrichment Node
- **Function**: `roadmap_enrichment_node(state: JobAgentState)`
- **Action**:
  - Iterates through roadmap sections (fundamentals, advanced, projects)
  - For each topic, searches YouTube using `tavily_youtube_search()`
  - Enriches each topic with YouTube video links
  - Updates `state["role_analysis"]["preparation_roadmap"]`
- **External API**: Tavily Search API (YouTube-specific queries)
- **Output**: Enriched roadmap with video resources

#### 4. Final Output Node
- **Function**: `final_output_node(state: JobAgentState)`
- **Action**:
  - Structures all collected data into final response format
  - Adds status and metadata
  - Updates `state["final_response"]`
- **Output**: Complete formatted response ready for API

## 🔌 External Integrations

### Tavily API

**Purpose**: Real-time web search for jobs and YouTube videos

**Usage**:
1. **Job Search**: Searches major job boards (Greenhouse, Lever, Workday, SmartRecruiters)
   ```python
   query = f"{role} {location} site:greenhouse.io OR site:lever.co ..."
   ```

2. **YouTube Search**: Finds learning videos for roadmap topics
   ```python
   query = f"{topic} tutorial site:youtube.com"
   ```

**Configuration**: Requires `TAVILY_API_KEY` environment variable

### Ollama (Llama 3)

**Purpose**: Local LLM inference for role analysis

**Usage**:
- Analyzes job roles and generates structured insights
- Returns JSON-formatted role analysis
- Runs locally (no API key required, but model must be pulled)

**Configuration**:
```bash
ollama pull llama3
```

## 🎨 Frontend Architecture

### Component Hierarchy

```
App.tsx
├── Header
├── Hero Search Section
│   └── Search Form
├── Results Section (conditional)
│   ├── Left Column
│   │   ├── Role Overview
│   │   ├── Required Skills
│   │   └── Interview Prep
│   └── Right Column
│       ├── Live Jobs
│       │   └── JobCard (multiple)
│       └── Preparation Roadmap
│           └── RoadmapCard (multiple)
└── Footer
```

### State Management

- **Local State**: Uses React `useState` hooks
- **State Variables**:
  - `role`: Job role input
  - `location`: Location input
  - `loading`: Loading state
  - `data`: Job assistant data response
  - `error`: Error message

### API Integration

**Service Layer** (`services/api.ts`):
- Centralized API calls
- Error handling
- Type-safe requests/responses

## 🔐 Security Considerations

1. **API Keys**: Store in environment variables, never commit to repository
2. **CORS**: Configured for development (allows all origins), restrict in production
3. **Input Validation**: Pydantic models validate request data
4. **Error Handling**: Try-catch blocks prevent sensitive error exposure

## 🚀 Performance Optimizations

1. **Parallel Processing**: LangGraph nodes can be optimized for parallel execution
2. **Caching**: Consider caching role analysis for common roles
3. **Rate Limiting**: Implement rate limiting for API endpoints
4. **Frontend**: React optimizations (memoization, code splitting)

## 📈 Scalability

### Current Limitations

- Single server deployment
- Synchronous API calls
- No database persistence
- No user sessions

### Future Improvements

1. **Database**: Store job search results and role analyses
2. **Caching**: Redis for frequently accessed data
3. **Queue System**: Celery for background job processing
4. **Microservices**: Separate services for job search, analysis, and video search
5. **CDN**: Serve static frontend assets
6. **Load Balancing**: Multiple backend instances

## 🧪 Testing Strategy

### Backend Testing

1. **Unit Tests**: Test individual agent functions
2. **Integration Tests**: Test LangGraph workflow
3. **API Tests**: Test FastAPI endpoints

### Frontend Testing

1. **Component Tests**: Test React components
2. **Integration Tests**: Test API integration
3. **E2E Tests**: Test complete user flows

## 📝 Code Organization

### Backend Structure

```
ai-job-assistant/
├── agents.py              # Core business logic (agents, utilities)
├── langgraph_agent.py     # LangGraph workflow definition
├── api_langgraph.py       # FastAPI application (routes, middleware)
└── run_langgraph.py       # Standalone script for testing
```

### Frontend Structure

```
frontend/
├── App.tsx                # Main application component
├── index.tsx              # React entry point
├── types.ts               # TypeScript type definitions
├── components/            # Reusable UI components
│   ├── JobCard.tsx
│   └── RoadmapCard.tsx
└── services/              # API service layer
    └── api.ts
```

---

**Last Updated**: 2024
