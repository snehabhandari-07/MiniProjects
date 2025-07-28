#  MyContacts Backend API

A simple RESTful API to manage contacts with user authentication.

---

##  Tech Stack

- **Backend:** Node.js + Express
- **Database:** MongoDB (MongoDB Atlas)
- **Authentication:** JWT (JSON Web Tokens)
- **Password Security:** bcrypt
- **API Testing:** Thunder Client (VS Code extension)

---
  
##  Features

- User registration & login
- Passwords hashed with `bcrypt`
- JWT-based authentication
- CRUD operations on contacts (only accessible to authenticated users)
- Centralized error handling middleware

---

##  API Testing

- API was tested using **Thunder Client** in VS Code.
---
##  Environment Variables

Create a `.env` file in the root:
  - PORT=5000
  - MONGO_URI=your_mongodb_atlas_connection_string
  - JWT_SECRET=your_jwt_secret

##  Installation & Running
    1. **Clone the repository**
    2. **Navigate to project**
    3. **Install dependencies**(npm install)
    4. **Create .env file and add your Mongo URI and JWT secret.**
    5. **Run the Server**

## By Sneha
