# Setup Guide

Quick setup guide for getting AI Job Assistance up and running locally.

## ⚡ Quick Start

Follow these steps to get the application running in under 5 minutes.

## 📋 Prerequisites Checklist

Before you begin, ensure you have:

- [ ] Python 3.8+ installed
- [ ] Node.js 16+ and npm installed
- [ ] Ollama installed and running
- [ ] Tavily API key (get one from [tavily.com](https://tavily.com))

## 🔧 Step-by-Step Setup

### Step 1: Install Ollama

1. **Download and Install Ollama**
   - Visit [ollama.ai](https://ollama.ai)
   - Download for your operating system
   - Install the application

2. **Pull the Llama 3 Model**
   ```bash
   ollama pull llama3
   ```

3. **Verify Installation**
   ```bash
   ollama run llama3
   # Type a test message and press Enter
   # Type /bye to exit
   ```

### Step 2: Get Tavily API Key

1. Visit [tavily.com](https://tavily.com)
2. Sign up for an account
3. Navigate to API settings
4. Copy your API key

### Step 3: Clone the Repository

```bash
git clone <repository-url>
cd AI-JOB-ASSISTANCE
```

### Step 4: Backend Setup

```bash
# Navigate to backend directory
cd ai-job-assistant

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set environment variable
# On Windows:
set TAVILY_API_KEY=your_api_key_here
# On macOS/Linux:
export TAVILY_API_KEY=your_api_key_here
```

**Alternative: Create .env file**

Create a `.env` file in `ai-job-assistant/`:

```env
TAVILY_API_KEY=your_api_key_here
```

Then load it in your script or use a library like `python-dotenv`.

### Step 5: Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install
```

### Step 6: Run the Application

#### Terminal 1: Start Backend

```bash
cd ai-job-assistant

# Make sure virtual environment is activated
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Start FastAPI server
uvicorn api_langgraph:app --reload --port 8000
```

You should see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

#### Terminal 2: Start Frontend

```bash
cd frontend

# Start development server
npm run dev
```

You should see:
```
VITE v6.2.0  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Step 7: Test the Application

1. Open your browser and go to `http://localhost:5173`
2. Enter a job role (e.g., "Frontend Developer")
3. Optionally enter a location (e.g., "India")
4. Click "Search Jobs"
5. Wait for results (typically 8-15 seconds)

## 🐛 Troubleshooting

### Backend Issues

#### Issue: `TAVILY_API_KEY not found`

**Solution**:
- Ensure environment variable is set
- Check that you're in the correct directory
- Restart your terminal/command prompt
- Try setting it directly in the command line before running

#### Issue: `Ollama connection error`

**Solution**:
- Ensure Ollama is running
- Check if Llama 3 model is pulled: `ollama list`
- Try running: `ollama run llama3`
- Restart Ollama service

#### Issue: `ModuleNotFoundError`

**Solution**:
- Ensure virtual environment is activated
- Reinstall dependencies: `pip install -r requirements.txt`
- Check Python version: `python --version` (should be 3.8+)

#### Issue: Port 8000 already in use

**Solution**:
- Find and stop the process using port 8000
- Or use a different port: `uvicorn api_langgraph:app --reload --port 8001`
- Update frontend API URL in `frontend/services/api.ts`

### Frontend Issues

#### Issue: `Cannot connect to API`

**Solution**:
- Ensure backend is running on port 8000
- Check API URL in `frontend/services/api.ts`
- Verify CORS is enabled in backend
- Check browser console for errors

#### Issue: `npm install fails`

**Solution**:
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node.js version: `node --version` (should be 16+)

#### Issue: Port 5173 already in use

**Solution**:
- Vite will automatically use the next available port
- Or specify a port: `npm run dev -- --port 3000`

### General Issues

#### Issue: Response takes too long

**Explanation**: This is normal for the first request. The pipeline:
1. Searches for jobs (3-5 seconds)
2. Analyzes role with Ollama (5-10 seconds)
3. Enriches roadmap with YouTube videos (5-10 seconds)

**Solution**:
- Be patient on first request
- Subsequent requests should be faster
- Check network connection
- Ensure Ollama is running on local machine (fast inference)

#### Issue: No jobs found

**Solution**:
- Try a different job role
- Try a different location
- Check Tavily API quota
- Verify Tavily API key is valid

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Backend server starts without errors
- [ ] Frontend development server starts without errors
- [ ] Can access frontend in browser
- [ ] API health check works: `curl http://127.0.0.1:8000/`
- [ ] Job search returns results
- [ ] Role analysis is generated
- [ ] YouTube videos are included in roadmap

## 🎯 Next Steps

Once setup is complete:

1. **Read the Documentation**
   - [README.md](README.md) - Project overview
   - [API.md](API.md) - API documentation
   - [ARCHITECTURE.md](ARCHITECTURE.md) - Architecture details

2. **Explore the Code**
   - Check out `ai-job-assistant/agents.py` for core logic
   - Review `frontend/App.tsx` for UI components
   - Examine `ai-job-assistant/langgraph_agent.py` for workflow

3. **Contribute**
   - Read [CONTRIBUTING.md](CONTRIBUTING.md)
   - Look for issues labeled "good first issue"
   - Submit your first PR!

## 🔄 Updating Dependencies

### Backend

```bash
cd ai-job-assistant
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install --upgrade -r requirements.txt
```

### Frontend

```bash
cd frontend
npm update
# Or for major updates:
npm install package@latest
```

## 📦 Production Deployment

For production deployment, see the main [README.md](README.md) for considerations:

- Environment variables
- CORS configuration
- Rate limiting
- Database setup (if needed)
- CDN for static assets
- Load balancing

---

**Need Help?** Open an issue on GitHub or check the [Troubleshooting](#-troubleshooting) section above.
