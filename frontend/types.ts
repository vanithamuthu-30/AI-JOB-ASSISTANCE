
export interface YouTubeVideo {
  title: string;
  url: string;
}

export interface RoadmapItem {
  topic: string;
  youtube_videos: YouTubeVideo[];
}

export interface Job {
  company: string;
  title: string;
  url: string;
}

export interface JobAssistantData {
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

export interface ApiResponse {
  status: string;
  data: {
    status: string;
    data: JobAssistantData;
  };
}
