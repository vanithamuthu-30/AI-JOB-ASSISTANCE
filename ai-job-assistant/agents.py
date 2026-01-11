import os
import json
from typing import List, Dict
from tavily import TavilyClient
import ollama

# ---------------- CONFIG ---------------- #

TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")
if not TAVILY_API_KEY:
    raise EnvironmentError("❌ TAVILY_API_KEY not found")

tavily = TavilyClient(api_key=TAVILY_API_KEY)

# ---------------- UTILS ---------------- #

def safe_json_parse(text: str) -> Dict:
    if not text:
        return {}

    if "```" in text:
        for part in text.split("```"):
            if part.strip().startswith("{"):
                text = part
                break

    start = text.find("{")
    if start == -1:
        return {}

    cleaned = text[start:]
    diff = cleaned.count("{") - cleaned.count("}")
    if diff > 0:
        cleaned += "}" * diff

    try:
        return json.loads(cleaned)
    except:
        return {}

# ---------------- TAVILY JOB SEARCH ---------------- #

def tavily_job_search(role: str, location: str) -> List[Dict]:
    """
    Fetch REAL job apply links
    """

    query = f"""
    {role} {location}
    site:greenhouse.io OR
    site:lever.co OR
    site:workdayjobs.com OR
    site:smartrecruiters.com
    """

    response = tavily.search(
        query=query,
        search_depth="basic",
        max_results=15
    )

    return response.get("results", [])

# ---------------- EXTRACT TOP 5 JOBS ---------------- #

def extract_top_jobs(results: List[Dict], limit: int = 5) -> List[Dict]:
    jobs = []
    seen_companies = set()

    for r in results:
        title = r.get("title", "").strip()
        url = r.get("url", "").strip()

        if not title or not url:
            continue

        company = title.split("-")[0].strip()

        if company.lower() in seen_companies:
            continue

        jobs.append({
            "company": company,
            "title": title,
            "url": url
        })

        seen_companies.add(company.lower())

        if len(jobs) == limit:
            break

    return jobs

# ---------------- TAVILY YOUTUBE SEARCH ---------------- #

def tavily_youtube_search(topic: str, limit: int = 2) -> List[Dict]:
    """
    Fetch YouTube learning videos
    """

    query = f"{topic} tutorial site:youtube.com"

    response = tavily.search(
        query=query,
        search_depth="basic",
        max_results=limit
    )

    videos = []

    for r in response.get("results", []):
        if "youtube.com" in r.get("url", ""):
            videos.append({
                "title": r.get("title"),
                "url": r.get("url")
            })

    return videos

# ---------------- ROLE ANALYSIS (ONCE) ---------------- #

def analyze_role_with_ollama(role: str) -> Dict:
    """
    Analyze role ONLY ONCE (fast)
    """

    prompt = f"""
Analyze the role: {role}

Return ONLY valid JSON.

FORMAT:
{{
  "job_overview": {{
    "summary": "",
    "responsibilities": []
  }},
  "job_required_skills": {{
    "technical": [],
    "non_technical": [],
    "tools": []
  }},
  "preparation_roadmap": {{
    "fundamentals": [],
    "advanced": [],
    "projects": [],
    "interview_topics": []
  }}
}}
"""

    response = ollama.chat(
        model="llama3",
        messages=[
            {"role": "system", "content": "Return ONLY JSON"},
            {"role": "user", "content": prompt}
        ],
        options={"temperature": 0}
    )

    return safe_json_parse(response["message"]["content"])

# ---------------- FINAL AGENT ---------------- #

def job_role_agent(role: str, location: str) -> Dict:
    """
    FINAL JOB + LEARNING AGENT
    """

    # 1️⃣ Job search
    search_results = tavily_job_search(role, location)
    jobs = extract_top_jobs(search_results, limit=5)

    # 2️⃣ Role analysis (once)
    role_analysis = analyze_role_with_ollama(role)

    # 3️⃣ Add YouTube videos to roadmap
    roadmap = role_analysis.get("preparation_roadmap", {})

    for section in ["fundamentals", "advanced", "projects"]:
        enriched = []
        for topic in roadmap.get(section, []):
            enriched.append({
                "topic": topic,
                "youtube_videos": tavily_youtube_search(topic)
            })
        roadmap[section] = enriched

    role_analysis["preparation_roadmap"] = roadmap

    # 4️⃣ Final output (ORDER IMPORTANT)
    return {
        "status": "success",
        "data": {
            "role": role,
            "location": location,
            "total_jobs": len(jobs),
            "jobs": jobs,
            "job_overview": role_analysis.get("job_overview", {}),
            "job_required_skills": role_analysis.get("job_required_skills", {}),
            "preparation_roadmap": role_analysis.get("preparation_roadmap", {})
        }
    }

# ---------------- RUN ---------------- #

if __name__ == "__main__":
    result = job_role_agent("Frontend Developer", "India")
    print(json.dumps(result, indent=2))
