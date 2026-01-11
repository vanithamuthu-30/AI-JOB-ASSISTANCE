# Contributing to AI Job Assistance

Thank you for your interest in contributing to AI Job Assistance! This document provides guidelines and instructions for contributing to the project.

## 🤝 How to Contribute

We welcome contributions of all kinds:

- 🐛 Bug reports
- 💡 Feature requests
- 📝 Documentation improvements
- 🔧 Code contributions
- 🎨 UI/UX improvements
- 🧪 Test additions

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)

## 📜 Code of Conduct

### Our Pledge

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Accept criticism gracefully
- Prioritize community well-being

### Our Standards

✅ **Examples of encouraged behavior**:
- Using welcoming and inclusive language
- Being respectful of different viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community

❌ **Examples of unacceptable behavior**:
- Harassment or discriminatory comments
- Personal attacks or trolling
- Publishing others' private information
- Other conduct that could reasonably be considered inappropriate

## 🚀 Getting Started

### 1. Fork the Repository

Click the "Fork" button on the GitHub repository page.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/AI-JOB-ASSISTANCE.git
cd AI-JOB-ASSISTANCE
```

### 3. Add Upstream Remote

```bash
git remote add upstream https://github.com/ORIGINAL_OWNER/AI-JOB-ASSISTANCE.git
```

### 4. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

**Branch Naming Conventions**:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Test additions/improvements
- `style/` - Code style changes (formatting, etc.)

## 💻 Development Workflow

### Backend Setup

```bash
cd ai-job-assistant

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Install development dependencies (if any)
pip install -r requirements-dev.txt
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install
```

### Running the Application

**Backend**:
```bash
cd ai-job-assistant
uvicorn api_langgraph:app --reload --port 8000
```

**Frontend**:
```bash
cd frontend
npm run dev
```

## 📝 Coding Standards

### Python (Backend)

- **Style**: Follow PEP 8
- **Formatting**: Use Black (if configured)
- **Type Hints**: Use type hints for function parameters and return types
- **Docstrings**: Use Google-style docstrings
- **Line Length**: Maximum 100 characters

**Example**:
```python
def analyze_role_with_ollama(role: str) -> Dict:
    """
    Analyze role using Ollama LLM.
    
    Args:
        role: The job role to analyze
        
    Returns:
        Dictionary containing role analysis
    """
    # Implementation
    pass
```

### TypeScript/React (Frontend)

- **Style**: Follow React best practices
- **Formatting**: Use Prettier (if configured)
- **Naming**: Use camelCase for variables/functions, PascalCase for components
- **Types**: Always define types/interfaces
- **Hooks**: Follow React hooks rules

**Example**:
```typescript
interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  // Implementation
  return <div>...</div>;
};
```

### General Guidelines

- Write clear, readable code
- Add comments for complex logic
- Keep functions small and focused
- Avoid code duplication
- Follow existing code patterns
- Update documentation for new features

## 📋 Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Test additions/changes
- `chore`: Maintenance tasks

### Examples

```
feat(backend): Add job search caching

Implement Redis caching for job search results to improve performance.

Closes #123
```

```
fix(frontend): Fix job card layout on mobile

Adjust flexbox layout to prevent overflow on small screens.

Fixes #456
```

```
docs(readme): Update installation instructions

Add Ollama setup steps and environment variable configuration.
```

### Best Practices

- Use imperative mood ("Add feature" not "Added feature")
- Keep subject line under 50 characters
- Capitalize first letter of subject
- Don't end subject with period
- Separate subject and body with blank line
- Reference issues/PRs in footer

## 🔄 Pull Request Process

### Before Submitting

1. ✅ Update documentation for new features
2. ✅ Add tests for new functionality
3. ✅ Ensure all tests pass
4. ✅ Check code formatting/style
5. ✅ Update CHANGELOG.md (if applicable)
6. ✅ Rebase on latest main branch

### Creating a Pull Request

1. Push your branch to your fork
2. Create a Pull Request on GitHub
3. Fill out the PR template (if available)
4. Link related issues
5. Request review from maintainers

### PR Title Format

Follow the same format as commit messages:
```
feat: Add job search caching
fix: Resolve mobile layout issue
docs: Update API documentation
```

### PR Description

Include:
- **Purpose**: What does this PR do?
- **Changes**: What changed?
- **Testing**: How was it tested?
- **Screenshots**: UI changes (if applicable)
- **Checklist**: Completion checklist

**Example**:
```markdown
## Purpose
Adds Redis caching for job search results to improve performance.

## Changes
- Implemented Redis cache in `agents.py`
- Added cache configuration
- Updated API endpoint to use cache

## Testing
- [x] Unit tests pass
- [x] Manual testing completed
- [x] Performance tested (response time reduced by 60%)

## Screenshots
[If applicable]
```

### Review Process

1. Maintainers will review your PR
2. Address any feedback or requested changes
3. Once approved, a maintainer will merge it
4. Thank you for contributing! 🎉

## 🧪 Testing

### Backend Testing

```bash
cd ai-job-assistant
pytest tests/
```

**Test Requirements**:
- Test all new functions
- Aim for >80% code coverage
- Include edge cases
- Mock external API calls

### Frontend Testing

```bash
cd frontend
npm test
```

**Test Requirements**:
- Test component rendering
- Test user interactions
- Test API integration (with mocks)
- Test error handling

### Manual Testing

- Test the full user flow
- Test on different browsers (Chrome, Firefox, Safari)
- Test on different screen sizes
- Test error scenarios

## 📚 Documentation

### Code Documentation

- Add docstrings to all functions/classes
- Document complex algorithms
- Include parameter and return type descriptions
- Add usage examples for public APIs

### README Updates

- Update README.md for new features
- Update installation instructions if dependencies change
- Update configuration examples
- Add examples/tutorials if helpful

### API Documentation

- Update API.md for endpoint changes
- Include request/response examples
- Document error codes
- Update version changelog

## 🐛 Reporting Bugs

### Before Reporting

1. Check if the bug has already been reported
2. Verify it occurs on the latest version
3. Try to reproduce it consistently

### Bug Report Template

```markdown
**Description**
Clear description of the bug

**Steps to Reproduce**
1. Step one
2. Step two
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Screenshots**
If applicable

**Environment**
- OS: [e.g., Windows 10]
- Python version: [e.g., 3.9]
- Node version: [e.g., 18.0]
- Browser: [e.g., Chrome 120]

**Additional Context**
Any other relevant information
```

## 💡 Suggesting Features

### Feature Request Template

```markdown
**Feature Description**
Clear description of the feature

**Use Case**
Why is this feature needed? What problem does it solve?

**Proposed Solution**
How should this feature work?

**Alternatives Considered**
Other solutions you've considered

**Additional Context**
Any other relevant information
```

## ❓ Questions?

- Open an issue for questions
- Check existing issues/PRs
- Review documentation
- Ask in discussions (if enabled)

## 🙏 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md (if applicable)
- Credited in release notes
- Thanked in the project README

---

**Thank you for contributing to AI Job Assistance!** 🎉
