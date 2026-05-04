# Interim Assessment: Full-Stack Integration – Coinbase Clone

**// NOTE THAT THIS IS A CLONE FOR AN ASSIGNMENT! NOT PHISHING**

This backend is a complete Node.js + Express + MongoDB API implementation for my DCIT 323 interim assessment.  
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
	"name": "Sigmund Freud",
	"email": "psycho@fraud.com",
	"password": "securepassword123"
}
```

Login body or query parameters:

```json
{
	"email": "psycho@fraud.com",
	"password": "securepassword123"
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

