# BTC Guessing Game

A simple web application where players predict the price movement of Bitcoin (BTC) in real time. The app fetches the current BTC price every minute, and players can make a guess whether the price will go up or down. The game tracks players' scores and updates them based on whether their guesses were correct.

## Features
- Players can log in with a player ID.
- Players make guesses on whether Bitcoin's price will go up or down.
- Real-time Bitcoin price is fetched every minute from the CoinGecko API.
- Players' scores are updated based on the accuracy of their guesses.
- Game logic includes a 60-second delay before resolving guesses.
- Players can log out and return to the login page.

## Tech Stack
- **Frontend**: React, TypeScript
- **Backend**: Node.js, Express, TypeScript
- **Database**: AWS DynamoDB
- **APIs**: CoinGecko API for BTC price fetching
- **Testing**: Jest, Supertest (for API testing)

## Installation

### Prerequisites
Make sure you have the following installed:
- Node.js (v14.x or higher)
- npm (v7.x or higher)


### Steps to Install

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/btc-guessing-game.git
   
2. Navigate to the project folder:
  cd btc-guessing-game

3. Install backend dependencies:
  cd backend
  npm install

4. Install frontend dependencies:
  cd ../frontend
  npm install

5. Create a .env file in the backend directory and add your environment variables (e.g., database connection string, API keys).
  Example .env file:
    AWS_ACCESS_KEY_ID = xxxxxxxxxxxxxxx
    AWS_SECRET_ACCESS_KEY = xxxxxxxxxxxxxxxxx
    AWS_REGION=us-east-1

6. To run the project in development mode, start both the backend and frontend:
  cd backend
  npm start
  cd frontend
  npm start

## Usage

1. **Login**: Enter any unique player ID to start playing.
2. **Make a Guess**: After logging in, you can make a guess on whether the price of Bitcoin will go up or down.
3. **Score Tracking**: The game will display your score, which is updated based on your guesses. The score changes after a guess is resolved.
4. **Logout**: Click the "Logout" button to return to the login page.

## API Endpoints

### `/price`
- **GET**: Fetches the current Bitcoin price from the CoinGecko API. If the service is unavailable, it returns a `503` status.

### `/guess`
- **POST**: Submits a guess for a player (either "up" or "down") and records the price at the time of the guess.
  
  **Request body**:
  ```json
  {
    "playerId": "player123",
    "guess": "up",
    "priceAtGuess": 54000
  }

### `/guess/resolve/:playerId`
- **GET**: Resolves the player's guess after 30 seconds and updates their score.
  
  **Response**:
  ```json
  {
    "message": "Correct! Your guess was right.",
    "scoreChange": 1,
    "newScore": 10,
    "lastGuessTimestamp": 1639426800000
  }

### `/score/:playerId`
- **GET**: Retrieves the score for the given player ID.
  
  **Response**:
  ```json
  {
    "score": 10
  }

## Tests

### Frontend Tests:
1. Navigate to the `backend` directory:
   ```bash
   cd backend

2. Run the frontend tests:
  npm test

These tests will ensure that the API endpoints function correctly, particularly the logic for handling price fetching, guess submission, and score calculation.

## Acknowledgments

- **CoinGecko**: For providing free access to Bitcoin price data via their API.
- **Open Source Community**: For providing various useful libraries and tools used in this project.
