# Contact Manager API

A fully functional RESTful API built with Node.js, Express, and MongoDB. This application allows users to register, log in, and manage their own personal contacts securely. It features JWT-based authentication to ensure that users can only access and modify their own contact data.

## Features

- **User Authentication:** Secure user registration and login using encrypted passwords (`bcrypt`).
- **Authorization:** JWT (JSON Web Tokens) are used to protect routes and ensure data privacy.
- **CRUD Operations:** Create, Read, Update, and Delete contacts.
- **Data Privacy:** Contacts are strictly associated with the user who created them (One-to-Many relationship).
- **Centralized Error Handling:** All errors are caught and returned in a consistent, clean JSON format.
- **Input Validation:** Required fields are validated before processing requests.

## Tech Stack

- **Backend Framework:** Node.js with Express.js
- **Database:** MongoDB
- **Object Data Modeling (ODM):** Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **Password Hashing:** bcrypt
- **Async Handling:** express-async-handler
- **Environment Variables:** dotenv

## Prerequisites

Before running this project, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local instance or MongoDB Atlas URI)

## Installation & Setup

1. **Clone the repository (if applicable) or download the files:**
   ```bash
   git clone <your-github-repo-url>
   cd my-contact-manager
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT=5000
   CONNECTION_STRING=your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_super_secret_jwt_key
   ```
   *(Note: Replace `your_mongodb_connection_string` with your actual MongoDB URI, and create a strong, random string for `ACCESS_TOKEN_SECRET`)*

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   *(Assuming you have a dev script using nodemon in package.json, otherwise run `node server.js`)*

The server should now be running on `http://localhost:5000`.

## API Endpoints

### 👤 User Routes (`/api/users`)

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| **POST** | `/register` | Register a new user | Public |
| **POST** | `/login` | Authenticate a user and get a JWT token | Public |
| **GET** | `/current` | Get the currently logged-in user's details | **Private** |

### 📇 Contact Routes (`/api/contacts`)
*Note: All contact routes are **Private** and require a valid JWT token in the `Authorization` header as a Bearer token.*

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | Get all contacts belonging to the logged-in user | **Private** |
| **POST** | `/` | Create a new contact | **Private** |
| **GET** | `/:id` | Get a specific contact by its ID | **Private** |
| **PUT** | `/:id` | Update a specific contact | **Private** |
| **DELETE** | `/:id` | Delete a specific contact | **Private** |

## Example Request (Create Contact)

**Headers:**
```json
{
  "Authorization": "Bearer <your_jwt_token_here>"
}
```

**Body (JSON):**
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "phone": "1234567890"
}
```

## Example Response (Success)

```json
{
  "user_id": "64bc8... (User's ObjectId)",
  "name": "John Doe",
  "email": "johndoe@example.com",
  "phone": "1234567890",
  "_id": "64bc9... (Contact's ObjectId)",
  "createdAt": "2024-01-01T12:00:00.000Z",
  "updatedAt": "2024-01-01T12:00:00.000Z",
  "__v": 0
}
```