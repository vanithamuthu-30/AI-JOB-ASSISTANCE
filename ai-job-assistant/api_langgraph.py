from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

from langgraph_agent import build_job_agent_graph

app = FastAPI(
    title="AI Job Assistant (LangGraph)",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

agent = build_job_agent_graph()


class JobRequest(BaseModel):
    role: str
    location: Optional[str] = ""


@app.post("/job-search")
def job_search(request: JobRequest):
    try:
        result = agent.invoke({
            "role": request.role,
            "location": request.location
        })
        return result["final_response"]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/")
def health():
    return {"message": "LangGraph AI Job Assistant running 🚀"}
