# AI WeatherWise

RESTful backend that delivers real-time weather with AI-generated summaries and recommendations.
Built with Node.js, Express, MongoDB (Mongoose) and Google Gemini AI.

## Features
- JWT authentication with bcrypt password hashing
- Role-based access (user / admin)
- Favorite locations CRUD
- Public weather endpoint (OpenWeatherMap) and AI insights (Gemini)
- Fallback mode when API keys are missing
- Centralized error handling and request sanitization (XSS / NoSQL injection)

## Setup
```bash
npm install
cp .env.example .env   # then edit values
npm run dev
```
Requires Node.js 18+ and a running MongoDB.

## API
| Method | Endpoint | Access |
|---|---|---|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| GET/PUT | /api/auth/me | User |
| GET/POST | /api/locations | User |
| PUT/DELETE | /api/locations/:id | User |
| GET | /api/weather/:city | Public |
| GET | /api/weather/favorites | User |
| POST | /api/ai/insights `{ "city": "Chennai" }` | User |
| GET | /api/health | Public |
| GET | /api/admin/health, /api/admin/users | Admin |
| PATCH | /api/admin/users/:id/status `{ "isActive": false }` | Admin |
| DELETE | /api/admin/users/:id | Admin |

To create an admin, register normally, then change `role` to `admin` in MongoDB.
