
import React from 'react';
import { RoadmapItem } from '../types';

interface RoadmapCardProps {
  item: RoadmapItem;
  index: number;
}

export const RoadmapCard: React.FC<RoadmapCardProps> = ({ item, index }) => {
  return (
    <div className="relative pl-8 pb-8 last:pb-0">
      <div className="absolute left-0 top-0 h-full w-px bg-slate-200"></div>
      <div className="absolute left-[-4px] top-0 h-2 w-2 rounded-full bg-indigo-500 ring-4 ring-indigo-50"></div>
      
      <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
        <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">Step {index + 1}</span>
        <h4 className="text-md font-semibold text-slate-800 mt-1 mb-3">{item.topic}</h4>
        
        <div className="space-y-3">
          {item.youtube_videos.map((video, idx) => (
            <a
              key={idx}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-3 bg-white rounded-lg border border-slate-200 hover:border-red-400 hover:shadow-md transition-all group"
            >
              <div className="p-2 bg-red-50 text-red-600 rounded-full mr-3 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-slate-700 truncate">{video.title}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
