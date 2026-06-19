/**
 * Timezone Data and Configuration
 */

const TIMEZONES_CONFIG = [
  // Americas
  { name: 'America/New_York', label: 'New York', region: 'Americas' },
  { name: 'America/Los_Angeles', label: 'Los Angeles', region: 'Americas' },
  { name: 'America/Denver', label: 'Denver', region: 'Americas' },
  { name: 'America/Chicago', label: 'Chicago', region: 'Americas' },
  { name: 'America/Mexico_City', label: 'Mexico City', region: 'Americas' },
  { name: 'America/Toronto', label: 'Toronto', region: 'Americas' },
  { name: 'America/Vancouver', label: 'Vancouver', region: 'Americas' },
  { name: 'America/Sao_Paulo', label: 'São Paulo', region: 'Americas' },
  { name: 'America/Buenos_Aires', label: 'Buenos Aires', region: 'Americas' },
  { name: 'America/Anchorage', label: 'Anchorage', region: 'Americas' },

  // Europe
  { name: 'Europe/London', label: 'London', region: 'Europe' },
  { name: 'Europe/Paris', label: 'Paris', region: 'Europe' },
  { name: 'Europe/Berlin', label: 'Berlin', region: 'Europe' },
  { name: 'Europe/Moscow', label: 'Moscow', region: 'Europe' },
  { name: 'Europe/Istanbul', label: 'Istanbul', region: 'Europe' },
  { name: 'Europe/Athens', label: 'Athens', region: 'Europe' },
  { name: 'Europe/Amsterdam', label: 'Amsterdam', region: 'Europe' },
  { name: 'Europe/Rome', label: 'Rome', region: 'Europe' },
  { name: 'Europe/Madrid', label: 'Madrid', region: 'Europe' },
  { name: 'Europe/Prague', label: 'Prague', region: 'Europe' },
  { name: 'Europe/Vienna', label: 'Vienna', region: 'Europe' },
  { name: 'Europe/Zurich', label: 'Zurich', region: 'Europe' },
  { name: 'Europe/Stockholm', label: 'Stockholm', region: 'Europe' },
  { name: 'Europe/Dublin', label: 'Dublin', region: 'Europe' },

  // Asia
  { name: 'Asia/Tokyo', label: 'Tokyo', region: 'Asia' },
  { name: 'Asia/Shanghai', label: 'Shanghai', region: 'Asia' },
  { name: 'Asia/Hong_Kong', label: 'Hong Kong', region: 'Asia' },
  { name: 'Asia/Bangkok', label: 'Bangkok', region: 'Asia' },
  { name: 'Asia/Singapore', label: 'Singapore', region: 'Asia' },
  { name: 'Asia/Dubai', label: 'Dubai', region: 'Asia' },
  { name: 'Asia/Kolkata', label: 'New Delhi', region: 'Asia' },
  { name: 'Asia/Jakarta', label: 'Jakarta', region: 'Asia' },
  { name: 'Asia/Seoul', label: 'Seoul', region: 'Asia' },
  { name: 'Asia/Manila', label: 'Manila', region: 'Asia' },
  { name: 'Asia/Karachi', label: 'Karachi', region: 'Asia' },
  { name: 'Asia/Dhaka', label: 'Dhaka', region: 'Asia' },
  { name: 'Asia/Ho_Chi_Minh', label: 'Ho Chi Minh City', region: 'Asia' },
  { name: 'Asia/Kuala_Lumpur', label: 'Kuala Lumpur', region: 'Asia' },

  // Oceania
  { name: 'Australia/Sydney', label: 'Sydney', region: 'Oceania' },
  { name: 'Australia/Melbourne', label: 'Melbourne', region: 'Oceania' },
  { name: 'Australia/Perth', label: 'Perth', region: 'Oceania' },
  { name: 'Australia/Brisbane', label: 'Brisbane', region: 'Oceania' },
  { name: 'Pacific/Auckland', label: 'Auckland', region: 'Oceania' },
  { name: 'Pacific/Fiji', label: 'Fiji', region: 'Oceania' },
  { name: 'Pacific/Honolulu', label: 'Honolulu', region: 'Oceania' },

  // Africa
  { name: 'Africa/Cairo', label: 'Cairo', region: 'Africa' },
  { name: 'Africa/Johannesburg', label: 'Johannesburg', region: 'Africa' },
  { name: 'Africa/Lagos', label: 'Lagos', region: 'Africa' },
  { name: 'Africa/Nairobi', label: 'Nairobi', region: 'Africa' },
  { name: 'Africa/Casablanca', label: 'Casablanca', region: 'Africa' },
  { name: 'Africa/Algiers', label: 'Algiers', region: 'Africa' },
  { name: 'Africa/Addis_Ababa', label: 'Addis Ababa', region: 'Africa' },

  // UTC
  { name: 'UTC', label: 'Coordinated Universal Time', region: 'UTC' }
];

/**
 * Get timezone offset string
 */
function getTimezoneOffset(timezone) {
  const date = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
  const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
  const offset = tzDate - utcDate;
  const hours = Math.floor(Math.abs(offset) / 3600000);
  const minutes = Math.floor((Math.abs(offset) % 3600000) / 60000);
  const sign = offset >= 0 ? '+' : '-';

  return `${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

/**
 * Check if timezone observes DST
 */
function observesDST(timezone) {
  const now = new Date();
  const january = new Date(now.getFullYear(), 0, 1);
  const july = new Date(now.getFullYear(), 6, 1);

  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  });

  const janOffset = new Date(january.toLocaleString('en-US', { timeZone: timezone })) - january;
  const julOffset = new Date(july.toLocaleString('en-US', { timeZone: timezone })) - july;

  return janOffset !== julOffset;
}

/**
 * Format time for display
 */
function formatTime(date, timezone, is24h = true) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: is24h ? '2-digit' : 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: !is24h
  });

  return formatter.format(date);
}

/**
 * Format date for display
 */
function formatDate(date, timezone) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return formatter.format(date);
}
