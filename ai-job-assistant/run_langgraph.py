from langgraph_agent import build_job_agent_graph
import json

def main():
    agent = build_job_agent_graph()

    result = agent.invoke({
        "role": "Frontend Developer",
        "location": "India"
    })

    print(json.dumps(result["final_response"], indent=2))


if __name__ == "__main__":
    main()
