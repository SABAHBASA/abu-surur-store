# Digital Clock - Multi Timezone ⛰️

A beautiful and interactive digital clock application that displays the current time in multiple time zones around the world.

## Features

✨ **Features:**
- Real-time clock updates every second
- Display multiple time zones simultaneously
- Add/remove custom time zones
- 12-hour and 24-hour format toggle
- Show current date with day of week
- Display timezone offset and UTC time
- Search and filter time zones
- Save favorite time zones to localStorage
- Dark/Light mode toggle
- Responsive design for all devices
- No external API required - uses browser's Intl API
- Alarm functionality (optional)

## Supported Time Zones

**Americas:**
- America/New_York (EST/EDT)
- America/Los_Angeles (PST/PDT)
- America/Denver (MST/MDT)
- America/Chicago (CST/CDT)
- America/Mexico_City
- America/Toronto (EST/EDT)
- America/Vancouver (PST/PDT)
- America/Sao_Paulo (BRT)

**Europe:**
- Europe/London (GMT/BST)
- Europe/Paris (CET/CEST)
- Europe/Berlin (CET/CEST)
- Europe/Moscow (MSK)
- Europe/Istanbul (EET/EEST)
- Europe/Athens (EET/EEST)
- Europe/Amsterdam (CET/CEST)

**Asia:**
- Asia/Tokyo (JST)
- Asia/Shanghai (CST)
- Asia/Hong_Kong (HKT)
- Asia/Bangkok (ICT)
- Asia/Singapore (SGT)
- Asia/Dubai (GST)
- Asia/Kolkata (IST)
- Asia/Jakarta (WIB)
- Asia/Seoul (KST)

**Oceania:**
- Australia/Sydney (AEST/AEDT)
- Australia/Melbourne (AEST/AEDT)
- Australia/Perth (AWST)
- Pacific/Auckland (NZST/NZDT)
- Pacific/Fiji (FJT)
- Pacific/Honolulu (HST)

**Africa:**
- Africa/Cairo (EET)
- Africa/Johannesburg (SAST)
- Africa/Lagos (WAT)
- Africa/Nairobi (EAT)

## Installation

```bash
cd digital-clock
npm install
```

## Usage

### Basic Setup

```bash
# Install dependencies
npm install

# Start development server (optional)
npx http-server

# Or just open index.html in browser
```

### File Structure

```
digital-clock/
├── index.html           # Main HTML file
├── styles.css            # Styling and animations
├── script.js             # Main JavaScript logic
├── timezones.js          # Timezone data and utilities
├── package.json          # Project metadata
├── README.md             # Documentation
└── assets/               # Images and icons
    ├── clock-icon.png
    └── globe-icon.png
```

## Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Time Handling:** JavaScript Intl API
- **Storage:** LocalStorage API
- **No Dependencies:** Pure vanilla JavaScript

## Features Explained

### 1. Real-time Clock
- Updates every second
- Shows hours, minutes, and seconds
- Supports both 12-hour and 24-hour formats

### 2. Multiple Timezones
- Display any timezone from IANA timezone database
- Add/remove timezones on the fly
- Persistent storage of favorite timezones

### 3. Advanced Display
- Current date with full day name
- Timezone name and UTC offset
- Daylight Saving Time indicator
- 12/24 hour format toggle

### 4. User Interface
- Add timezone via dropdown or search
- Remove timezone with one click
- Favorite timezones (pin to top)
- Dark/Light mode
- Responsive grid layout

### 5. Timezone Search
- Real-time search filtering
- Search by city, timezone name, or offset
- Quick access to common timezones

## Usage Examples

### Add a Timezone
1. Click "Add Timezone" button
2. Search for city or timezone name
3. Click to add
4. Timezone appears in the list

### Set 24-Hour Format
1. Toggle "24H" button in header
2. All times display in 24-hour format
3. Setting is saved to localStorage

### Pin Favorite Timezone
1. Click the star icon on timezone card
2. Timezone moves to top
3. Favorites are persistent

### Dark Mode
1. Click moon icon in header
2. Interface switches to dark theme
3. Theme preference is saved

## Keyboard Shortcuts

```
A       - Add new timezone
R       - Remove last timezone
D       - Toggle dark mode
T       - Toggle 12/24 hour format
Esc     - Close timezone selector
```

## Default Timezones

By default, the clock displays:
- UTC (Coordinated Universal Time)
- America/New_York
- Europe/London
- Asia/Tokyo

## Browser Support

- Chrome 70+
- Firefox 68+
- Safari 13+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- ✅ No API calls required
- ✅ Lightweight (< 50KB total)
- ✅ Smooth 60 FPS animations
- ✅ Minimal memory footprint
- ✅ Fast timezone calculations

## Local Storage

The app saves to localStorage:
```javascript
{
  'digitalClock_timezones': [list of timezone names],
  'digitalClock_is24h': true/false,
  'digitalClock_darkMode': true/false,
  'digitalClock_favorites': [list of favorite timezones]
}
```

## Customization

### Add Custom Timezone
Edit `timezones.js` to add more timezones:

```javascript
TIMEZONES_CONFIG.push({
  name: 'Custom/Timezone',
  label: 'Custom City',
  region: 'Custom Region'
});
```

### Change Colors
Edit CSS variables in `styles.css`:

```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #ec4899;
  /* ... */
}
```

## License

MIT

## Author

Abu Surur Store

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Changelog

### v1.0.0
- Initial release
- Multi-timezone display
- Dark/Light mode
- Timezone management
- LocalStorage persistence
