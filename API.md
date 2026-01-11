# API Documentation

Complete API reference for the AI Job Assistance backend.

## Base URL

```
http://127.0.0.1:8000
```

## Authentication

Currently, no authentication is required. In production, implement API key authentication or OAuth2.

## Endpoints

### 1. Health Check

Check if the API is running.

**Endpoint**: `GET /`

**Request**:
```http
GET / HTTP/1.1
Host: 127.0.0.1:8000
```

**Response**:
```json
{
  "message": "LangGraph AI Job Assistant running 🚀"
}
```

**Status Codes**:
- `200 OK`: Service is running

---

### 2. Job Search

Search for jobs, analyze role requirements, and generate a learning roadmap.

**Endpoint**: `POST /job-search`

**Request Headers**:
```http
Content-Type: application/json
```

**Request Body**:
```json
{
  "role": "Frontend Developer",
  "location": "India"
}
```

**Request Schema**:
```typescript
interface JobRequest {
  role: string;           // Required: Job role to search for
  location?: string;      // Optional: Location filter (default: "")
}
```

**Example Request** (cURL):
```bash
curl -X POST "http://127.0.0.1:8000/job-search" \
  -H "Content-Type: application/json" \
  -d '{
    "role": "Frontend Developer",
    "location": "India"
  }'
```

**Response**:
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
        "title": "Senior Frontend Developer - Company Name",
        "url": "https://company.greenhouse.io/jobs/12345"
      }
    ],
    "job_overview": {
      "summary": "A comprehensive overview of the Frontend Developer role, including typical responsibilities and career path...",
      "responsibilities": [
        "Develop and maintain user-facing features",
        "Build reusable components and libraries",
        "Optimize applications for maximum speed and scalability",
        "Collaborate with backend developers and designers"
      ]
    },
    "job_required_skills": {
      "technical": [
        "React",
        "TypeScript",
        "JavaScript",
        "HTML",
        "CSS",
        "Git"
      ],
      "non_technical": [
        "Communication",
        "Problem-solving",
        "Team collaboration",
        "Time management"
      ],
      "tools": [
        "VS Code",
        "Chrome DevTools",
        "Webpack",
        "Jest",
        "Figma"
      ]
    },
    "preparation_roadmap": {
      "fundamentals": [
        {
          "topic": "JavaScript Fundamentals",
          "youtube_videos": [
            {
              "title": "JavaScript Crash Course for Beginners",
              "url": "https://www.youtube.com/watch?v=..."
            },
            {
              "title": "Modern JavaScript Tutorial",
              "url": "https://www.youtube.com/watch?v=..."
            }
          ]
        },
        {
          "topic": "React Basics",
          "youtube_videos": [
            {
              "title": "React Tutorial for Beginners",
              "url": "https://www.youtube.com/watch?v=..."
            }
          ]
        }
      ],
      "advanced": [
        {
          "topic": "State Management with Redux",
          "youtube_videos": [
            {
              "title": "Redux Complete Tutorial",
              "url": "https://www.youtube.com/watch?v=..."
            }
          ]
        }
      ],
      "projects": [
        {
          "topic": "Build a Todo App",
          "youtube_videos": [
            {
              "title": "React Todo App Tutorial",
              "url": "https://www.youtube.com/watch?v=..."
            }
          ]
        }
      ],
      "interview_topics": [
        "React component lifecycle",
        "State vs Props",
        "Virtual DOM",
        "Performance optimization",
        "CSS Grid and Flexbox"
      ]
    }
  }
}
```

**Response Schema**:
```typescript
interface JobSearchResponse {
  status: "success" | "error";
  data: {
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
  };
}

interface Job {
  company: string;
  title: string;
  url: string;
}

interface RoadmapItem {
  topic: string;
  youtube_videos: YouTubeVideo[];
}

interface YouTubeVideo {
  title: string;
  url: string;
}
```

**Status Codes**:
- `200 OK`: Request successful
- `422 Unprocessable Entity`: Invalid request body (validation error)
- `500 Internal Server Error`: Server error (check error message)

**Error Response**:
```json
{
  "detail": "Error message describing what went wrong"
}
```

**Example Error Response**:
```json
{
  "detail": "TAVILY_API_KEY not found"
}
```

---

## Request/Response Examples

### Example 1: Search for Software Engineer Role

**Request**:
```json
{
  "role": "Software Engineer",
  "location": "San Francisco"
}
```

**Response**: Returns job listings, role analysis, skills, and roadmap for Software Engineer positions in San Francisco.

### Example 2: Search with Empty Location

**Request**:
```json
{
  "role": "Data Scientist",
  "location": ""
}
```

**Response**: Returns global job listings and analysis for Data Scientist role.

### Example 3: Minimal Request

**Request**:
```json
{
  "role": "Product Manager"
}
```

**Response**: Returns analysis for Product Manager role (location defaults to empty string).

---

## Rate Limiting

Currently, no rate limiting is implemented. Consider implementing rate limiting in production:

- Recommended: 10 requests per minute per IP
- Burst: Allow 5 requests in quick succession

---

## Error Handling

### Common Error Codes

| Status Code | Meaning | Solution |
|------------|---------|----------|
| `400` | Bad Request | Check request body format |
| `422` | Validation Error | Ensure required fields are provided |
| `500` | Server Error | Check server logs, verify API keys |

### Common Error Messages

1. **`TAVILY_API_KEY not found`**
   - **Cause**: Tavily API key not set in environment
   - **Solution**: Set `TAVILY_API_KEY` environment variable

2. **`Ollama connection error`**
   - **Cause**: Ollama service not running
   - **Solution**: Start Ollama service and ensure Llama 3 model is pulled

3. **`Invalid role parameter`**
   - **Cause**: Role field is empty or missing
   - **Solution**: Provide a valid role string

---

## Response Time

Typical response times:
- **Fast**: 3-5 seconds (cached or simple queries)
- **Average**: 8-15 seconds (full pipeline execution)
- **Slow**: 20-30 seconds (complex role analysis with many roadmap items)

**Factors affecting response time**:
- Tavily API response time
- Ollama inference time (depends on hardware)
- Number of roadmap topics to enrich
- Network latency

---

## CORS

CORS is configured to allow all origins in development:

```python
allow_origins=["*"]
```

**⚠️ Production Warning**: Restrict CORS to specific domains in production:

```python
allow_origins=["https://yourdomain.com", "https://www.yourdomain.com"]
```

---

## Webhooks

Currently, no webhook support. For long-running requests, consider:
1. Async processing with job IDs
2. Webhook notifications on completion
3. Polling endpoint for job status

---

## Versioning

Current API version: **2.0.0**

API versioning strategy:
- Include version in URL: `/v2/job-search`
- Or use header: `X-API-Version: 2.0`

---

## Changelog

### Version 2.0.0
- Implemented LangGraph workflow orchestration
- Added YouTube video enrichment to roadmap
- Improved error handling
- Enhanced response structure

---

**Last Updated**: 2024
