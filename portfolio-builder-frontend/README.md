# Portfolio Builder

A Full Stack Portfolio Builder web application built using the MERN stack (MongoDB, Express.js, React, and Node.js). This application allows users to create and manage their personal portfolios, with customizable sections, themes, and social media links. Users can register, log in, and save their portfolios, which are stored securely in a MongoDB database.

## Features

- User Authentication: Secure registration and login with JWT-based authentication.
- Portfolio Builder: Create, update, and delete a fully customizable portfolio with sections like personal info, skills, projects, and more.
- Custom Themes: Choose or create custom themes with configurable colors and fonts.
- Real-Time Data: Save portfolios to MongoDB and retrieve them in real-time.
- Responsive Design: Fully responsive user interface built with React for seamless use on any device.

## Tech Stack

- MongoDB: Document database for storing user data and portfolios.
- Express.js: Web framework for handling requests and creating the API.
- React: Front-end library for building the user interface.
- Node.js: JavaScript runtime for handling server-side logic.
- JWT: JSON Web Tokens for secure user authentication.
- Bcrypt.js: Password hashing for secure user registration and login.
- Mongoose: ORM for interacting with MongoDB.

## Usage

Once the application is running, follow these steps:

1. Register a new user account.
2. Log in to your account using the credentials.
3. After logging in, you'll be able to:
   - Create a personal portfolio by providing personal info, skills, and projects.
   - Customize the look and feel of your portfolio by selecting a theme (colors, fonts, etc.).
   - View your portfolio or make edits as needed.
   - Delete your portfolio if no longer needed.
4. Access your portfolio anytime by logging into your account.

## API Endpoints

The application offers the following API endpoints:

### User Routes

- POST /api/users/register: Register a new user.
- POST /api/users/login: Log in and receive a JWT token.

### Portfolio Routes (Protected)

- POST /api/portfolio: Create or update a portfolio for the authenticated user.
- GET /api/portfolio: Retrieve the authenticated user's portfolio.
- DELETE /api/portfolio: Delete the authenticated user's portfolio.
