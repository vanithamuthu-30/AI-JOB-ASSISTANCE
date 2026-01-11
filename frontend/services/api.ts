
import { ApiResponse } from '../types';

const API_BASE_URL = 'http://127.0.0.1:8000'; // Update with your actual FastAPI server URL

export const searchJobs = async (role: string, location?: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/job-search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role, location }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching job data:', error);
    throw error;
  }
};
