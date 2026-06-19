/**
 * Digital Clock - Multi Timezone
 * Main JavaScript Logic
 */

// DOM Elements
const clocksGrid = document.getElementById('clocksGrid');
const emptyState = document.getElementById('emptyState');
const timezoneSearch = document.getElementById('timezoneSearch');
const addTimezoneBtn = document.getElementById('addTimezoneBtn');
const timezoneDropdown = document.getElementById('timezoneDropdown');
const dropdownList = document.getElementById('dropdownList');
const closeDropdownBtn = document.getElementById('closeDropdown');
const formatToggle = document.getElementById('formatToggle');
const themeToggle = document.getElementById('themeToggle');
const timezoneCount = document.getElementById('timezoneCount');
const currentDate = document.getElementById('currentDate');
const utcOffsetDisplay = document.getElementById('utcOffset');

// State
let selectedTimezones = [];
let is24hFormat = true;
let isDarkMode = false;
let updateInterval = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  initializeTheme();
  attachEventListeners();
  loadTimezones();
  updateClock();
  startClockUpdate();
});

/**
 * Initialize theme
 */
function initializeTheme() {
  const savedDarkMode = localStorage.getItem('digitalClock_darkMode') === 'true';
  if (savedDarkMode) {
    document.body.classList.add('dark-mode');
    isDarkMode = true;
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

/**
 * Attach event listeners
 */
function attachEventListeners() {
  addTimezoneBtn.addEventListener('click', openTimezoneSelector);
  closeDropdownBtn.addEventListener('click', closeTimezoneSelector);
  timezoneSearch.addEventListener('input', filterTimezones);
  timezoneSearch.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') closeTimezoneSelector();
  });

  formatToggle.addEventListener('click', toggleFormat);
  themeToggle.addEventListener('click', toggleTheme);

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.target === timezoneSearch) return;
    switch (e.key.toLowerCase()) {
      case 'a':
        openTimezoneSelector();
        break;
      case 'd':
        toggleTheme();
        break;
      case 't':
        toggleFormat();
        break;
      case 'escape':
        closeTimezoneSelector();
        break;
    }
  });
}

/**
 * Load settings from localStorage
 */
function loadSettings() {
  const savedTimezones = localStorage.getItem('digitalClock_timezones');
  const savedFormat = localStorage.getItem('digitalClock_is24h');

  if (savedTimezones) {
    selectedTimezones = JSON.parse(savedTimezones);
  } else {
    selectedTimezones = ['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo'];
  }

  is24hFormat = savedFormat !== 'false';
}

/**
 * Save settings to localStorage
 */
function saveSettings() {
  localStorage.setItem('digitalClock_timezones', JSON.stringify(selectedTimezones));
  localStorage.setItem('digitalClock_is24h', is24hFormat);
  localStorage.setItem('digitalClock_darkMode', isDarkMode);
}

/**
 * Load timezones
 */
function loadTimezones() {
  populateDropdownList();
}

/**
 * Populate timezone dropdown
 */
function populateDropdownList(searchTerm = '') {
  dropdownList.innerHTML = '';

  const grouped = {};
  const filteredTimezones = TIMEZONES_CONFIG.filter(tz => {
    const search = searchTerm.toLowerCase();
    return (
      tz.label.toLowerCase().includes(search) ||
      tz.name.toLowerCase().includes(search) ||
      tz.region.toLowerCase().includes(search)
    );
  });

  // Group by region
  filteredTimezones.forEach(tz => {
    if (!grouped[tz.region]) {
      grouped[tz.region] = [];
    }
    grouped[tz.region].push(tz);
  });

  // Create groups
  Object.keys(grouped).sort().forEach(region => {
    const group = document.createElement('div');
    group.className = 'timezone-group';

    const groupTitle = document.createElement('div');
    groupTitle.className = 'group-title';
    groupTitle.textContent = region;
    group.appendChild(groupTitle);

    grouped[region].forEach(tz => {
      const item = document.createElement('div');
      item.className = 'timezone-item';
      if (selectedTimezones.includes(tz.name)) {
        item.classList.add('selected');
      }

      const offset = getTimezoneOffset(tz.name);
      item.innerHTML = `
        <div class="timezone-item-content">
          <div class="timezone-label">${tz.label}</div>
          <div class="timezone-meta">${tz.name} (${offset})</div>
        </div>
        <i class="fas fa-check"></i>
      `;

      item.addEventListener('click', () => {
        if (selectedTimezones.includes(tz.name)) {
          selectedTimezones = selectedTimezones.filter(t => t !== tz.name);
        } else {
          selectedTimezones.push(tz.name);
        }
        saveSettings();
        updateClocks();
        populateDropdownList(searchTerm);
      });

      group.appendChild(item);
    });

    dropdownList.appendChild(group);
  });
}

/**
 * Filter timezones
 */
function filterTimezones(e) {
  const searchTerm = e.target.value;
  populateDropdownList(searchTerm);
}

/**
 * Open timezone selector
 */
function openTimezoneSelector() {
  timezoneDropdown.style.display = 'block';
  timezoneSearch.focus();
  populateDropdownList();
}

/**
 * Close timezone selector
 */
function closeTimezoneSelector() {
  timezoneDropdown.style.display = 'none';
  timezoneSearch.value = '';
}

/**
 * Toggle 12/24 hour format
 */
function toggleFormat() {
  is24hFormat = !is24hFormat;
  formatToggle.querySelector('span').textContent = is24hFormat ? '24H' : '12H';
  saveSettings();
  updateClock();
}

/**
 * Toggle dark mode
 */
function toggleTheme() {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle('dark-mode');
  themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  saveSettings();
}

/**
 * Start clock update interval
 */
function startClockUpdate() {
  if (updateInterval) clearInterval(updateInterval);
  updateInterval = setInterval(updateClock, 1000);
}

/**
 * Update clock display
 */
function updateClock() {
  const now = new Date();

  // Update individual timezone clocks
  updateClocks();

  // Update footer stats
  timezoneCount.textContent = selectedTimezones.length;
  const utcOffset = getTimezoneOffset('UTC');
  utcOffsetDisplay.textContent = utcOffset;

  // Update current date
  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  currentDate.textContent = dateFormatter.format(now);
}

/**
 * Update all timezone clocks
 */
function updateClocks() {
  const now = new Date();

  if (selectedTimezones.length === 0) {
    clocksGrid.innerHTML = '';
    emptyState.style.display = 'flex';
    return;
  }

  emptyState.style.display = 'none';

  selectedTimezones.forEach((timezone, index) => {
    let card = document.getElementById(`clock-${timezone}`);

    if (!card) {
      card = createClockCard(timezone);
      clocksGrid.appendChild(card);
    }

    // Update time
    const time = formatTime(now, timezone, is24hFormat);
    const timeElement = card.querySelector('.clock-time');
    timeElement.textContent = time;

    // Update date
    const date = formatDate(now, timezone);
    const dateElement = card.querySelector('.clock-date');
    dateElement.textContent = date;

    // Update offset
    const offset = getTimezoneOffset(timezone);
    const offsetElement = card.querySelector('.clock-offset');
    offsetElement.textContent = offset;

    // Update DST indicator
    const isDST = observesDST(timezone);
    const dstElement = card.querySelector('.dst-indicator');
    if (isDST) {
      dstElement.style.display = 'block';
      const isSummerTime = isSummerTimeNow(timezone);
      dstElement.textContent = isSummerTime ? 'DST' : 'STD';
    } else {
      dstElement.style.display = 'none';
    }
  });
}

/**
 * Create clock card
 */
function createClockCard(timezone) {
  const tzConfig = TIMEZONES_CONFIG.find(t => t.name === timezone);
  const offset = getTimezoneOffset(timezone);
  const isDST = observesDST(timezone);

  const card = document.createElement('div');
  card.className = 'clock-card';
  card.id = `clock-${timezone}`;

  const labelText = tzConfig ? tzConfig.label : timezone;

  card.innerHTML = `
    <div class="clock-header">
      <div class="clock-title">
        <h3>${labelText}</h3>
        <p class="timezone-name">${timezone}</p>
      </div>
      <button class="remove-btn" title="Remove timezone">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="clock-display">
      <div class="clock-time">--:--:--</div>
      <div class="clock-info">
        <div class="clock-date">-</div>
        <div class="clock-meta">
          <span class="clock-offset">UTC${offset}</span>
          ${isDST ? '<span class="dst-indicator" style="display:none;">DST</span>' : ''}
        </div>
      </div>
    </div>
    <div class="clock-footer">
      <button class="edit-btn" title="Edit">
        <i class="fas fa-edit"></i>
      </button>
    </div>
  `;

  // Add event listener to remove button
  card.querySelector('.remove-btn').addEventListener('click', () => {
    removeTimezone(timezone);
  });

  return card;
}

/**
 * Remove timezone
 */
function removeTimezone(timezone) {
  selectedTimezones = selectedTimezones.filter(t => t !== timezone);
  saveSettings();
  updateClocks();
  populateDropdownList();
}

/**
 * Check if timezone is in summer time now
 */
function isSummerTimeNow(timezone) {
  const now = new Date();
  const january = new Date(now.getFullYear(), 0, 1);
  const july = new Date(now.getFullYear(), 6, 1);

  const formatTime = (date) => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    return new Date(formatter.format(date));
  };

  const janTime = formatTime(january);
  const julTime = formatTime(july);
  const nowTime = formatTime(now);

  const janOffset = january - janTime;
  const julOffset = july - julTime;
  const nowOffset = now - nowTime;

  return Math.abs(nowOffset - julOffset) < Math.abs(nowOffset - janOffset);
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (updateInterval) clearInterval(updateInterval);
});
