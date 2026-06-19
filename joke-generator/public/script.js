/**
 * Random Joke Generator Frontend
 * Main client-side logic
 */

const API_BASE_URL = 'http://localhost:3001';

// DOM Elements
const randomBtn = document.getElementById('randomBtn');
const programmingBtn = document.getElementById('programmingBtn');
const dadBtn = document.getElementById('dadBtn');
const knockBtn = document.getElementById('knockBtn');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const jokeDisplay = document.getElementById('jokeDisplay');
const loading = document.getElementById('loading');
const errorDisplay = document.getElementById('errorDisplay');
const errorMessage = document.getElementById('errorMessage');
const jokeSetup = document.getElementById('jokeSetup');
const jokePunchline = document.getElementById('jokePunchline');
const jokeSource = document.getElementById('jokeSource');
const copyBtn = document.getElementById('copyBtn');
const shareBtn = document.getElementById('shareBtn');
const likeBtn = document.getElementById('likeBtn');
const themeToggle = document.getElementById('themeToggle');
const jokesLoadedCount = document.getElementById('jokesLoaded');
const likesCountElement = document.getElementById('likesCount');

// State
let currentJoke = null;
let jokesLoaded = 0;
let likes = 0;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  attachEventListeners();
  loadStats();
});

/**
 * Initialize theme
 */
function initializeTheme() {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
}

/**
 * Toggle theme
 */
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
  themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

/**
 * Attach event listeners
 */
function attachEventListeners() {
  randomBtn.addEventListener('click', () => fetchRandomJoke());
  programmingBtn.addEventListener('click', () => fetchJokeByType('programming'));
  dadBtn.addEventListener('click', () => fetchJokeByType('dad'));
  knockBtn.addEventListener('click', () => fetchJokeByType('knock-knock'));
  searchBtn.addEventListener('click', searchJokes);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchJokes();
  });
  
  copyBtn.addEventListener('click', copyJokeToClipboard);
  shareBtn.addEventListener('click', shareJoke);
  likeBtn.addEventListener('click', likeJoke);
}

/**
 * Fetch random joke
 */
async function fetchRandomJoke() {
  try {
    showLoading();
    const response = await fetch(`${API_BASE_URL}/api/jokes/random`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.success) {
      displayJoke(data.data);
      jokesLoaded++;
      updateStats();
    } else {
      showError('Failed to fetch joke');
    }
  } catch (error) {
    console.error('Error fetching joke:', error);
    showError(error.message || 'Failed to fetch joke. Please try again.');
  }
}

/**
 * Fetch joke by type
 */
async function fetchJokeByType(type) {
  try {
    showLoading();
    const response = await fetch(`${API_BASE_URL}/api/jokes/type/${type}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.success) {
      displayJoke(data.data);
      jokesLoaded++;
      updateStats();
    } else {
      showError(`No ${type} jokes found`);
    }
  } catch (error) {
    console.error('Error fetching joke:', error);
    showError(error.message || 'Failed to fetch joke. Please try again.');
  }
}

/**
 * Search jokes
 */
async function searchJokes() {
  const query = searchInput.value.trim();
  
  if (!query) {
    showError('Please enter a search term');
    return;
  }
  
  try {
    showLoading();
    const response = await fetch(`${API_BASE_URL}/api/jokes/search?q=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.success && data.data.length > 0) {
      const randomJoke = data.data[Math.floor(Math.random() * data.data.length)];
      displayJoke(randomJoke);
      jokesLoaded++;
      updateStats();
    } else {
      showError('No jokes found matching your search');
    }
  } catch (error) {
    console.error('Error searching jokes:', error);
    showError(error.message || 'Failed to search jokes. Please try again.');
  }
}

/**
 * Display joke
 */
function displayJoke(joke) {
  currentJoke = joke;
  jokeSetup.textContent = joke.setup;
  jokePunchline.textContent = joke.punchline || '';
  jokeSource.textContent = `Source: ${joke.source}`;
  
  showJokeDisplay();
}

/**
 * Show joke display
 */
function showJokeDisplay() {
  loading.style.display = 'none';
  errorDisplay.style.display = 'none';
  jokeDisplay.style.display = 'block';
}

/**
 * Show loading
 */
function showLoading() {
  loading.style.display = 'block';
  errorDisplay.style.display = 'none';
  jokeDisplay.style.display = 'none';
}

/**
 * Show error
 */
function showError(message) {
  errorMessage.textContent = message;
  errorDisplay.style.display = 'block';
  jokeDisplay.style.display = 'none';
  loading.style.display = 'none';
}

/**
 * Copy joke to clipboard
 */
async function copyJokeToClipboard() {
  if (!currentJoke) return;
  
  const joke = `${currentJoke.setup}\n${currentJoke.punchline}`;
  
  try {
    await navigator.clipboard.writeText(joke);
    
    const originalText = copyBtn.innerHTML;
    copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    copyBtn.style.background = '#10b981';
    copyBtn.style.color = 'white';
    
    setTimeout(() => {
      copyBtn.innerHTML = originalText;
      copyBtn.style.background = '';
      copyBtn.style.color = '';
    }, 2000);
  } catch (error) {
    console.error('Failed to copy joke:', error);
    alert('Failed to copy joke to clipboard');
  }
}

/**
 * Share joke
 */
function shareJoke() {
  if (!currentJoke) return;
  
  const joke = `${currentJoke.setup}\n${currentJoke.punchline}`;
  const text = `Check out this joke! 😂\n\n${joke}`;
  
  if (navigator.share) {
    navigator.share({
      title: 'Check out this joke!',
      text: joke
    }).catch(err => console.log('Error sharing:', err));
  } else {
    // Fallback: copy to clipboard
    copyJokeToClipboard();
    alert('Joke copied! Share it however you like.');
  }
}

/**
 * Like joke
 */
function likeJoke() {
  likes++;
  updateStats();
  
  const originalHTML = likeBtn.innerHTML;
  likeBtn.style.color = '#ef4444';
  
  setTimeout(() => {
    likeBtn.style.color = '';
  }, 500);
}

/**
 * Update stats
 */
function updateStats() {
  jokesLoadedCount.textContent = jokesLoaded;
  likesCountElement.textContent = likes;
  localStorage.setItem('jokesLoaded', jokesLoaded);
  localStorage.setItem('likes', likes);
}

/**
 * Load stats from localStorage
 */
function loadStats() {
  jokesLoaded = parseInt(localStorage.getItem('jokesLoaded') || '0');
  likes = parseInt(localStorage.getItem('likes') || '0');
  updateStats();
}

// Auto-load first joke on page load
fetchRandomJoke();
