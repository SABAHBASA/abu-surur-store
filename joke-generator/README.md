# Random Joke Generator 😂

A simple and fun application that generates random jokes using external APIs.

## Features

✨ **Features:**
- Fetch random jokes from multiple sources
- Support for different joke types (general, programming, knock-knock)
- Display jokes with smooth animations
- Copy joke to clipboard
- Share jokes on social media
- Dark/Light mode toggle
- No database required - uses free external APIs

## Supported APIs

1. **JokeAPI** - General, Programming, Knock-Knock jokes
   - URL: https://jokeapi.dev/
   - Free tier: ✅ Yes

2. **Official Joke API** - Clean jokes
   - URL: https://official-joke-api.appspot.com/
   - Free tier: ✅ Yes

3. **Dad Jokes API** - Dad jokes
   - URL: https://icanhazdadjoke.com/
   - Free tier: ✅ Yes

## Installation

```bash
cd joke-generator
npm install
```

## Usage

### Backend

```bash
node server.js
```

Server runs on `http://localhost:3001`

### Frontend

Open `index.html` in your browser or serve it:

```bash
python -m http.server 8000
# or
npx http-server
```

## API Endpoints

```
GET  /api/jokes/random        - Get a random joke
GET  /api/jokes/type/:type    - Get joke by type (general, programming, knock-knock)
GET  /api/jokes/search?q=     - Search for jokes
GET  /api/jokes/daily         - Get joke of the day
```

## File Structure

```
joke-generator/
├── server.js              # Node.js backend server
├── jokeService.js         # Joke fetching service
├── index.html             # Frontend HTML
├── style.css              # Styling
├── script.js              # Frontend JavaScript
├── package.json           # Dependencies
└── README.md              # Documentation
```

## Technologies Used

- **Backend:** Node.js, Express
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **APIs:** JokeAPI, Official Joke API, Dad Jokes API
- **Other:** Fetch API, Local Storage

## Example Requests

### Get a Random Joke
```bash
curl http://localhost:3001/api/jokes/random
```

### Get Programming Joke
```bash
curl http://localhost:3001/api/jokes/type/programming
```

### Get General Joke
```bash
curl http://localhost:3001/api/jokes/type/general
```

## Response Format

```json
{
  "success": true,
  "data": {
    "id": 1,
    "type": "general",
    "setup": "Why did the scarecrow win an award?",
    "punchline": "He was outstanding in his field!",
    "source": "JokeAPI"
  }
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Author

Abu Surur Store
