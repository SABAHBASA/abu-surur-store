/**
 * Joke Service
 * Handles fetching jokes from multiple external APIs
 */

const axios = require('axios');

class JokeService {
  constructor() {
    this.jokesCache = {};
    this.cacheExpiry = 60 * 60 * 1000; // 1 hour
  }

  /**
   * Get a random joke from any source
   */
  async getRandomJoke() {
    try {
      const sources = [
        this.getFromJokeAPI(),
        this.getFromOfficialJokeAPI(),
        this.getDadJoke()
      ];

      const results = await Promise.allSettled(sources);
      const successfulJokes = results
        .filter(r => r.status === 'fulfilled' && r.value)
        .map(r => r.value);

      if (successfulJokes.length === 0) {
        throw new Error('Failed to fetch jokes from all sources');
      }

      const randomJoke = successfulJokes[Math.floor(Math.random() * successfulJokes.length)];
      return randomJoke;
    } catch (error) {
      console.error('Error in getRandomJoke:', error);
      throw error;
    }
  }

  /**
   * Get joke by type (general, programming, knock-knock)
   */
  async getJokeByType(type) {
    try {
      if (type === 'dad') {
        return await this.getDadJoke();
      }

      const response = await axios.get('https://jokeapi.dev/random/joke', {
        params: {
          type: type.toLowerCase(),
          format: 'json'
        },
        timeout: 5000
      });

      if (response.data.error) {
        throw new Error('Error from JokeAPI');
      }

      return this.formatJokeAPIResponse(response.data, type);
    } catch (error) {
      console.error(`Error fetching ${type} joke:`, error);
      throw error;
    }
  }

  /**
   * Fetch from JokeAPI
   */
  async getFromJokeAPI() {
    try {
      const response = await axios.get('https://jokeapi.dev/random/joke', {
        params: {
          type: 'single',
          format: 'json'
        },
        timeout: 5000
      });

      return this.formatJokeAPIResponse(response.data, 'general');
    } catch (error) {
      console.error('Error fetching from JokeAPI:', error);
      return null;
    }
  }

  /**
   * Fetch from Official Joke API
   */
  async getFromOfficialJokeAPI() {
    try {
      const response = await axios.get('https://official-joke-api.appspot.com/random_joke', {
        timeout: 5000
      });

      return {
        id: response.data.id,
        type: 'general',
        setup: response.data.setup,
        punchline: response.data.punchline,
        source: 'Official Joke API'
      };
    } catch (error) {
      console.error('Error fetching from Official Joke API:', error);
      return null;
    }
  }

  /**
   * Fetch dad joke
   */
  async getDadJoke() {
    try {
      const response = await axios.get('https://icanhazdadjoke.com/', {
        headers: {
          'Accept': 'application/json'
        },
        timeout: 5000
      });

      return {
        id: response.data.joke_sid,
        type: 'dad',
        setup: response.data.joke,
        punchline: '',
        source: 'Dad Jokes API'
      };
    } catch (error) {
      console.error('Error fetching dad joke:', error);
      return null;
    }
  }

  /**
   * Get joke of the day
   */
  async getJokeOfTheDay() {
    try {
      const today = new Date().toDateString();
      
      if (this.jokesCache.jokeOfTheDay && this.jokesCache.jokeOfTheDay.date === today) {
        return this.jokesCache.jokeOfTheDay.joke;
      }

      const joke = await this.getRandomJoke();
      
      this.jokesCache.jokeOfTheDay = {
        date: today,
        joke: joke
      };

      return joke;
    } catch (error) {
      console.error('Error getting joke of the day:', error);
      throw error;
    }
  }

  /**
   * Search for jokes (using Official Joke API)
   */
  async searchJokes(query) {
    try {
      const response = await axios.get(`https://official-joke-api.appspot.com/jokes/search`, {
        params: { query: query },
        timeout: 5000
      });

      return response.data.map(joke => ({
        id: joke.id,
        type: 'general',
        setup: joke.setup,
        punchline: joke.punchline,
        source: 'Official Joke API'
      }));
    } catch (error) {
      console.error('Error searching jokes:', error);
      return [];
    }
  }

  /**
   * Format JokeAPI response
   */
  formatJokeAPIResponse(data, type) {
    if (data.type === 'twopart') {
      return {
        id: data.id,
        type: type,
        setup: data.setup,
        punchline: data.delivery,
        source: 'JokeAPI'
      };
    } else {
      return {
        id: data.id,
        type: type,
        setup: data.joke,
        punchline: '',
        source: 'JokeAPI'
      };
    }
  }
}

module.exports = new JokeService();
