const express = require('express');
const router = express.Router();

// In-memory storage for design sessions (in production, use a database)
let designSessions = [];
let sessionIdCounter = 1;

// GET /api/design/sessions
router.get('/sessions', (req, res) => {
  try {
    res.json({
      success: true,
      sessions: designSessions.map(session => ({
        id: session.id,
        name: session.name,
        createdAt: session.createdAt,
        lastModified: session.lastModified,
        status: session.status
      }))
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch design sessions',
      message: error.message
    });
  }
});

// POST /api/design/sessions
router.post('/sessions', (req, res) => {
  try {
    const { name, description, requirements } = req.body;

    if (!name) {
      return res.status(400).json({
        error: 'Session name is required'
      });
    }

    const newSession = {
      id: sessionIdCounter++,
      name,
      description: description || '',
      requirements: requirements || '',
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      status: 'active',
      analyses: [],
      architectures: []
    };

    designSessions.push(newSession);

    res.status(201).json({
      success: true,
      session: newSession,
      message: 'Design session created successfully'
    });

  } catch (error) {
    res.status(500).json({
      error: 'Failed to create design session',
      message: error.message
    });
  }
});

// GET /api/design/sessions/:id
router.get('/sessions/:id', (req, res) => {
  try {
    const sessionId = parseInt(req.params.id);
    const session = designSessions.find(s => s.id === sessionId);

    if (!session) {
      return res.status(404).json({
        error: 'Design session not found',
        message: `Session with ID ${sessionId} does not exist`
      });
    }

    res.json({
      success: true,
      session: session
    });

  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch design session',
      message: error.message
    });
  }
});

// PUT /api/design/sessions/:id
router.put('/sessions/:id', (req, res) => {
  try {
    const sessionId = parseInt(req.params.id);
    const sessionIndex = designSessions.findIndex(s => s.id === sessionId);

    if (sessionIndex === -1) {
      return res.status(404).json({
        error: 'Design session not found'
      });
    }

    const { name, description, requirements, status } = req.body;

    // Update session
    if (name) designSessions[sessionIndex].name = name;
    if (description) designSessions[sessionIndex].description = description;
    if (requirements) designSessions[sessionIndex].requirements = requirements;
    if (status) designSessions[sessionIndex].status = status;
    
    designSessions[sessionIndex].lastModified = new Date().toISOString();

    res.json({
      success: true,
      session: designSessions[sessionIndex],
      message: 'Design session updated successfully'
    });

  } catch (error) {
    res.status(500).json({
      error: 'Failed to update design session',
      message: error.message
    });
  }
});

// DELETE /api/design/sessions/:id
router.delete('/sessions/:id', (req, res) => {
  try {
    const sessionId = parseInt(req.params.id);
    const sessionIndex = designSessions.findIndex(s => s.id === sessionId);

    if (sessionIndex === -1) {
      return res.status(404).json({
        error: 'Design session not found'
      });
    }

    designSessions.splice(sessionIndex, 1);

    res.json({
      success: true,
      message: 'Design session deleted successfully'
    });

  } catch (error) {
    res.status(500).json({
      error: 'Failed to delete design session',
      message: error.message
    });
  }
});

// POST /api/design/sessions/:id/analysis
router.post('/sessions/:id/analysis', (req, res) => {
  try {
    const sessionId = parseInt(req.params.id);
    const sessionIndex = designSessions.findIndex(s => s.id === sessionId);

    if (sessionIndex === -1) {
      return res.status(404).json({
        error: 'Design session not found'
      });
    }

    const { analysis, type } = req.body;

    if (!analysis) {
      return res.status(400).json({
        error: 'Analysis content is required'
      });
    }

    const newAnalysis = {
      id: Date.now(),
      type: type || 'general',
      content: analysis,
      createdAt: new Date().toISOString()
    };

    designSessions[sessionIndex].analyses.push(newAnalysis);
    designSessions[sessionIndex].lastModified = new Date().toISOString();

    res.status(201).json({
      success: true,
      analysis: newAnalysis,
      message: 'Analysis added to design session'
    });

  } catch (error) {
    res.status(500).json({
      error: 'Failed to add analysis to session',
      message: error.message
    });
  }
});

// POST /api/design/sessions/:id/architecture
router.post('/sessions/:id/architecture', (req, res) => {
  try {
    const sessionId = parseInt(req.params.id);
    const sessionIndex = designSessions.findIndex(s => s.id === sessionId);

    if (sessionIndex === -1) {
      return res.status(404).json({
        error: 'Design session not found'
      });
    }

    const { architecture, name } = req.body;

    if (!architecture) {
      return res.status(400).json({
        error: 'Architecture content is required'
      });
    }

    const newArchitecture = {
      id: Date.now(),
      name: name || `Architecture ${designSessions[sessionIndex].architectures.length + 1}`,
      content: architecture,
      createdAt: new Date().toISOString()
    };

    designSessions[sessionIndex].architectures.push(newArchitecture);
    designSessions[sessionIndex].lastModified = new Date().toISOString();

    res.status(201).json({
      success: true,
      architecture: newArchitecture,
      message: 'Architecture added to design session'
    });

  } catch (error) {
    res.status(500).json({
      error: 'Failed to add architecture to session',
      message: error.message
    });
  }
});

module.exports = router;