
import React, { useState } from 'react';
import { searchJobs } from './services/api';
import { JobAssistantData } from './types';
import { JobCard } from './components/JobCard';
import { RoadmapCard } from './components/RoadmapCard';

const App: React.FC = () => {
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<JobAssistantData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return;

    setLoading(true);
    setError(null);
    try {
      const response = await searchJobs(role, location);
      setData(response.data);
    } catch (err) {
      setError('Failed to fetch data. Please make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">J</div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">AI Job Assistant</h1>
          </div>
          <div className="hidden md:flex items-center gap-4 text-sm font-medium text-slate-500">
            <span>Market Intelligence</span>
            <span>•</span> 
            <span>Skill Roadmaps</span>
            <span>•</span>
            <span>Direct Apply</span>
          </div>
        </div>
      </header>

      {/* Hero Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Find Your Next <span className="gradient-text">Dream Career</span>
        </h2>
        <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
          Get real-time job listings, required skills analysis, and a personalized learning roadmap curated by AI.
        </p>

        <form onSubmit={handleSearch} className="max-w-3xl mx-auto bg-white p-2 rounded-2xl shadow-xl border border-slate-100 flex flex-col md:flex-row gap-2">
          <div className="flex-1 flex items-center px-4 border-b md:border-b-0 md:border-r border-slate-100">
            <svg className="w-5 h-5 text-slate-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Enter Job Role (e.g. Frontend Developer)"
              className="w-full py-4 bg-transparent outline-none text-slate-700 font-medium"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>
          <div className="flex-1 flex items-center px-4">
            <svg className="w-5 h-5 text-slate-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input
              type="text"
              placeholder="Location (Optional)"
              className="w-full py-4 bg-transparent outline-none text-slate-700 font-medium"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Analyzing...
              </>
            ) : (
              'Search Jobs'
            )}
          </button>
        </form>
        {error && <p className="mt-4 text-red-500 font-medium">{error}</p>}
      </div>

      {data && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Job Overview & Skills */}
          <div className="lg:col-span-1 space-y-8">
            {/* Overview */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Role Overview
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">{data.job_overview.summary}</p>
              <h4 className="font-semibold text-slate-800 mb-3">Key Responsibilities</h4>
              <ul className="space-y-3">
                {data.job_overview.responsibilities.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Skills */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Required Skills
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Technical</h4>
                  <div className="flex flex-wrap gap-2">
                    {data.job_required_skills.technical.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-100">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Tools & Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {data.job_required_skills.tools.map((tool, idx) => (
                      <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Non-Technical</h4>
                  <div className="flex flex-wrap gap-2">
                    {data.job_required_skills.non_technical.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-semibold border border-purple-100">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Interview Topics */}
            <section className="bg-slate-900 rounded-2xl p-8 text-white shadow-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Interview Prep
              </h3>
              <ul className="space-y-3">
                {data.preparation_roadmap.interview_topics.map((topic, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="w-5 h-5 rounded flex items-center justify-center bg-slate-800 text-xs font-bold text-slate-400">?</div>
                    {topic}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right Column: Live Jobs & Roadmap */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Live Jobs */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Real-time Opportunities
                </h3>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {data.total_jobs} Live Links
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.jobs.map((job, idx) => (
                  <JobCard key={idx} job={job} />
                ))}
              </div>
            </section>

            {/* Preparation Roadmap */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                AI Curated Roadmap
              </h3>
              
              <div className="space-y-12">
                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">1</span>
                    Fundamentals
                  </h4>
                  <div className="space-y-4">
                    {data.preparation_roadmap.fundamentals.map((item, idx) => (
                      <RoadmapCard key={idx} item={item} index={idx} />
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm">2</span>
                    Advanced Proficiency
                  </h4>
                  <div className="space-y-4">
                    {data.preparation_roadmap.advanced.map((item, idx) => (
                      <RoadmapCard key={idx} item={item} index={idx} />
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm">3</span>
                    Hands-on Projects
                  </h4>
                  <div className="space-y-4">
                    {data.preparation_roadmap.projects.map((item, idx) => (
                      <RoadmapCard key={idx} item={item} index={idx} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      )}

      {/* Footer Branding */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 py-10 border-t border-slate-200 text-center">
        <p className="text-slate-400 text-sm">
          Powered by Gemini AI, Tavily Search & Llama 3
        </p>
      </footer>
    </div>
  );
};

export default App;
