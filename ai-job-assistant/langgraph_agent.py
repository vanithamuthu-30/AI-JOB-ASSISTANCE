from typing import TypedDict, List, Dict
from langgraph.graph import StateGraph, END

from agents import (
    tavily_job_search,
    extract_top_jobs,
    analyze_role_with_ollama,
    tavily_youtube_search
)

# ---------------- STATE ---------------- #

class JobAgentState(TypedDict):
    role: str
    location: str
    jobs: List[Dict]
    role_analysis: Dict
    final_response: Dict


# ---------------- NODES ---------------- #

def job_search_node(state: JobAgentState) -> JobAgentState:
    results = tavily_job_search(state["role"], state["location"])
    state["jobs"] = extract_top_jobs(results, limit=5)
    return state


def role_analysis_node(state: JobAgentState) -> JobAgentState:
    state["role_analysis"] = analyze_role_with_ollama(state["role"])
    return state


def roadmap_enrichment_node(state: JobAgentState) -> JobAgentState:
    roadmap = state["role_analysis"].get("preparation_roadmap", {})

    for section in ["fundamentals", "advanced", "projects"]:
        enriched = []
        for topic in roadmap.get(section, []):
            enriched.append({
                "topic": topic,
                "youtube_videos": tavily_youtube_search(topic)
            })
        roadmap[section] = enriched

    state["role_analysis"]["preparation_roadmap"] = roadmap
    return state


def final_output_node(state: JobAgentState) -> JobAgentState:
    state["final_response"] = {
        "status": "success",
        "data": {
            "role": state["role"],
            "location": state["location"],
            "total_jobs": len(state["jobs"]),
            "jobs": state["jobs"],
            "job_overview": state["role_analysis"].get("job_overview", {}),
            "job_required_skills": state["role_analysis"].get("job_required_skills", {}),
            "preparation_roadmap": state["role_analysis"].get("preparation_roadmap", {})
        }
    }
    return state


# ---------------- GRAPH ---------------- #

def build_job_agent_graph():
    graph = StateGraph(JobAgentState)

    graph.add_node("job_search", job_search_node)
    graph.add_node("role_analysis", role_analysis_node)
    graph.add_node("roadmap_enrichment", roadmap_enrichment_node)
    graph.add_node("final_output", final_output_node)

    graph.set_entry_point("job_search")

    graph.add_edge("job_search", "role_analysis")
    graph.add_edge("role_analysis", "roadmap_enrichment")
    graph.add_edge("roadmap_enrichment", "final_output")
    graph.add_edge("final_output", END)

    return graph.compile()
