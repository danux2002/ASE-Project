const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const router = express.Router();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// POST /api/ai/analyze-requirements
router.post('/analyze-requirements', async (req, res) => {
  try {
    const { requirements, projectType, constraints } = req.body;

    if (!requirements) {
      return res.status(400).json({
        error: 'Requirements are required',
        message: 'Please provide project requirements'
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `
    As a senior software architect, analyze the following project requirements and provide a comprehensive solution architecture:

    Requirements: ${requirements}
    Project Type: ${projectType || 'Not specified'}
    Constraints: ${constraints || 'None specified'}

    Please provide a detailed analysis covering:
    1. High-level system architecture overview
    2. Technology stack recommendations with reasons
    3. Database design suggestions
    4. API design patterns
    5. Security considerations
    6. Scalability recommendations
    7. Potential challenges and mitigation strategies
    8. Development timeline estimate
    9. Team structure recommendations

    Format your response in clear, well-structured sections with headers and bullet points.
    Use markdown formatting for better readability. Make it professional and comprehensive.
    Focus on practical, actionable recommendations.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysis = response.text();

    res.json({
      success: true,
      analysis: analysis,
      timestamp: new Date().toISOString(),
      input: {
        requirements,
        projectType,
        constraints
      }
    });

  } catch (error) {
    console.error('Error analyzing requirements:', error);
    res.status(500).json({
      error: 'Failed to analyze requirements',
      message: error.message
    });
  }
});

// POST /api/ai/generate-architecture
router.post('/generate-architecture', async (req, res) => {
  try {
    const { projectName, description, features, scalabilityNeeds } = req.body;

    if (!projectName || !description) {
      return res.status(400).json({
        error: 'Project name and description are required'
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `
    Generate a detailed software architecture for the following project:

    Project Name: ${projectName}
    Description: ${description}
    Features: ${features ? features.join(', ') : 'Not specified'}
    Scalability Needs: ${scalabilityNeeds || 'Standard'}

    Please provide:
    1. System Architecture Diagram (in text/ASCII format)
    2. Component breakdown with responsibilities
    3. Data flow description
    4. Technology stack with specific versions
    5. Database schema suggestions
    6. API endpoints structure
    7. Deployment strategy
    8. Monitoring and logging setup
    9. Testing strategy
    10. Risk assessment

    Format as a comprehensive architectural document.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const architecture = response.text();

    res.json({
      success: true,
      architecture: architecture,
      projectInfo: {
        name: projectName,
        description,
        features,
        scalabilityNeeds
      },
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error generating architecture:', error);
    res.status(500).json({
      error: 'Failed to generate architecture',
      message: error.message
    });
  }
});

// POST /api/ai/suggest-improvements
router.post('/suggest-improvements', async (req, res) => {
  try {
    const { currentArchitecture, painPoints, goals } = req.body;

    if (!currentArchitecture) {
      return res.status(400).json({
        error: 'Current architecture description is required'
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `
    Analyze the following existing architecture and suggest improvements:

    Current Architecture: ${currentArchitecture}
    Pain Points: ${painPoints || 'None specified'}
    Goals: ${goals || 'General improvement'}

    Please provide:
    1. Architecture analysis and weaknesses identification
    2. Specific improvement recommendations
    3. Migration strategy if major changes are needed
    4. Cost-benefit analysis of improvements
    5. Priority ranking of suggested changes
    6. Implementation timeline
    7. Risk mitigation for proposed changes

    Focus on practical, implementable solutions.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const suggestions = response.text();

    res.json({
      success: true,
      suggestions: suggestions,
      input: {
        currentArchitecture,
        painPoints,
        goals
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error generating suggestions:', error);
    res.status(500).json({
      error: 'Failed to generate suggestions',
      message: error.message
    });
  }
});

module.exports = router;