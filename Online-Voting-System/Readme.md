# Voting Application

A backend application for an online voting system where users can vote for candidates.  
This API supports **user authentication**, **candidate management**, and **secure voting**.  
Built with **Node.js**, **Express.js**, and **MongoDB**.

---

## Features

- **User Authentication**
  - Sign up & login with **Aadhar Card Number** and password
  - JWT-based authentication

- **Voting System**
  - Users can view the list of candidates
  - Users can vote for **only one candidate**
  - Admin **cannot vote**

- **Admin Panel**
  - Add, update, and delete candidates

---

## Technologies Used
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JSON Web Tokens (JWT)](https://jwt.io/)

---

## API Endpoints

### Authentication
- **POST** `/signup` — Sign up a new user  
- **POST** `/login` — Login a user  

---

### Candidates
- **GET** `/candidates` — Get list of candidates  
- **POST** `/candidates` — Add a candidate *(Admin only)*  
- **PUT** `/candidates/:candidateId` — Update a candidate *(Admin only)*  
- **DELETE** `/candidates/:candidateId` — Delete a candidate *(Admin only)*  

---

### Voting
- **GET** `/candidates/vote/count` — Get vote count for all candidates  
- **POST** `/candidates/vote/:candidateId` — Vote for a candidate *(User only)*  

---

### User Profile
- **GET** `/users/profile` — Get user profile  
- **PUT** `/users/profile/password` — Change password 

## Security Features

- Passwords are hashed before storing

- JWT tokens for authentication

- Role-based access control (Admin/User)

- One vote per user limit

## Created By
Sneha Bhandari – for practice!!