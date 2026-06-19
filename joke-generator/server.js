/**
 * Random Joke Generator Server
 * Main Express server for joke API
 */

const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Import joke service
const jokeService = require('./jokeService');

/**
 * GET /api/jokes/random
 * Get a random joke from any source
 */
app.get('/api/jokes/random', async (req, res) => {
  try {
    const joke = await jokeService.getRandomJoke();
    res.json({
      success: true,
      data: joke
    });
  } catch (error) {
    console.error('Error fetching random joke:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch joke',
      message: error.message
    });
  }
});

/**
 * GET /api/jokes/type/:type
 * Get a joke by type (general, programming, knock-knock)
 */
app.get('/api/jokes/type/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const joke = await jokeService.getJokeByType(type);
    
    if (!joke) {
      return res.status(404).json({
        success: false,
        error: 'No jokes found for this type'
      });
    }

    res.json({
      success: true,
      data: joke
    });
  } catch (error) {
    console.error('Error fetching joke by type:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch joke',
      message: error.message
    });
  }
});

/**
 * GET /api/jokes/search?q=keyword
 * Search for jokes
 */
app.get('/api/jokes/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
    }

    const jokes = await jokeService.searchJokes(q);
    res.json({
      success: true,
      data: jokes,
      count: jokes.length
    });
  } catch (error) {
    console.error('Error searching jokes:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search jokes',
      message: error.message
    });
  }
});

/**
 * GET /api/jokes/daily
 * Get joke of the day
 */
app.get('/api/jokes/daily', async (req, res) => {
  try {
    const joke = await jokeService.getJokeOfTheDay();
    res.json({
      success: true,
      data: joke
    });
  } catch (error) {
    console.error('Error fetching daily joke:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch daily joke',
      message: error.message
    });
  }
});

/**
 * GET /api/jokes/dad
 * Get a dad joke
 */
app.get('/api/jokes/dad', async (req, res) => {
  try {
    const joke = await jokeService.getDadJoke();
    res.json({
      success: true,
      data: joke
    });
  } catch (error) {
    console.error('Error fetching dad joke:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dad joke',
      message: error.message
    });
  }
});

/**
 * GET /api/health
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date(),
    uptime: process.uptime()
  });
});

/**
 * 404 Handler
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.path
  });
});

/**
 * Error Handler
 */
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🎭 Joke Generator Server running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api/jokes`);
});

module.exports = app;
