# Interim Assessment: Full-Stack Integration – Coinbase Clone

**// NOTE THAT THIS IS A CLONE FOR AN ASSIGNMENT! NOT PHISHING**

This backend is a complete Node.js + Express + MongoDB API implementation for the interim assessment.  
It follows a clean `models / controllers / routes / middleware` architecture and exposes all required REST endpoints for frontend integration.

## Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- JWT authentication
- HTTP-only cookie session support
- CORS, Helmet, Morgan

## Project Structure

```
src/
	config/
		database.js
		environment.js
	controllers/
		authController.js
		cryptoController.js
		profileController.js
	middleware/
		authenticate.js
		errorHandler.js
	models/
		CryptoAsset.js
		User.js
	routes/
		authRoutes.js
		cryptoRoutes.js
		healthRoutes.js
		profileRoutes.js
	scripts/
		seedCrypto.js
	utils/
		asyncHandler.js
		token.js
	app.js
	server.js
```

## Environment Setup

1. Copy `.env.example` to `.env`
2. Set required values

Required environment variables:

- `MONGODB_URI`
- `JWT_SECRET`

Optional variables:

- `PORT` (default `5000`)
- `JWT_EXPIRES_IN` (default `7d`)
- `COOKIE_NAME` (default `authToken`)
- `COOKIE_SECURE` (default `false`)
- `CLIENT_ORIGIN` (default `http://localhost:5173`)

## Install and Run

```bash
npm install
npm run dev
```

Production run:

```bash
npm start
```

Seed starter crypto data:

```bash
npm run seed
```

## Base URL

`http://localhost:5000/api`

## API Endpoints

### Health

- `GET /health`

### Authentication

Assessment wording requests `GET /register` and `GET /login`. This backend supports both `GET` and `POST` for compatibility with that requirement and standard API usage.

- `GET /register`
- `POST /register`
- `GET /login`
- `POST /login`
- `POST /logout`

Register body or query parameters:

```json
{
	"name": "Ada Lovelace",
	"email": "ada@example.com",
	"password": "securepass123"
}
```

Login body or query parameters:

```json
{
	"email": "ada@example.com",
	"password": "securepass123"
}
```

Auth response includes:

- user info
- JWT token
- secure HTTP-only cookie

### Protected Profile

- `GET /profile`

Requires valid JWT via:

- HTTP-only cookie, or
- `Authorization: Bearer <token>` header

Returns:

- user `id`
- `name`
- `email`
- `createdAt`
- `updatedAt`

### Crypto Data

- `GET /crypto` → all tradable assets
- `GET /crypto/gainers` → sorted by highest `change24h`
- `GET /crypto/new` → sorted by newest created
- `POST /crypto` → create a new crypto asset

Create crypto request body:

```json
{
	"name": "Chainlink",
	"symbol": "LINK",
	"price": 16.47,
	"image": "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png",
	"change24h": 3.82
}
```

## Frontend Integration Notes

- Set frontend API base URL to the deployed backend URL or `http://localhost:5000/api` locally.
- Enable `credentials: "include"` in frontend requests when using cookie auth.
- Protect frontend profile route by checking auth state and redirecting unauthenticated users to login.

## Rubric Checklist

### 1) Authentication System (JWT-Based)

- [x] Register endpoint implemented (`GET/POST /register`)
- [x] Accepts name, email, password
- [x] Password is hashed before storing
- [x] User persisted to MongoDB
- [x] Clear success and validation/error responses
- [x] Login endpoint implemented (`GET/POST /login`)
- [x] Validates email/password credentials
- [x] Returns JWT and sets HTTP-only cookie

### 2) Protected User Profile Page Support

- [x] Protected profile endpoint implemented (`GET /profile`)
- [x] JWT verification middleware implemented
- [x] Unauthorized access returns `401`
- [x] Authenticated response includes user name and email

### 3) Crypto Data Integration

- [x] `GET /crypto` implemented
- [x] `GET /crypto/gainers` implemented with descending sort on 24h change
- [x] `GET /crypto/new` implemented with newest-first sorting
- [x] `POST /crypto` implemented
- [x] Accepts name, symbol, price, image, change24h
- [x] Stores crypto assets in MongoDB
- [x] Returns clear success and error responses

### 4) Backend Quality and Structure

- [x] Node.js + MongoDB used
- [x] Mongoose schemas and models created
- [x] Controllers, routes, middleware are separated
- [x] Centralized error handling added
- [x] Environment-based configuration added
- [x] Ready for deployment on Render or similar platforms
