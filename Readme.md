# 🚀 Node.js E-Commerce API

This is a simple **E-Commerce Authentication API** built using **Node.js**, **Express.js**, and **MongoDB**. The API includes:

✅ User Registration (with password hashing) 🔐  
✅ User Login (JWT authentication) 🔑  
✅ Get User Profile (Protected Route) 🛡️  
✅ JWT Middleware for Securing Routes 🔍  
✅ MongoDB for Data Storage 🗄️  
✅ Proper Error Handling & Validation ⚠️  

---

## 📌 **Tech Stack**
- **Node.js** - Backend runtime
- **Express.js** - Web framework for Node.js
- **MongoDB** - Database for storing user data
- **Mongoose** - ODM for MongoDB
- **Bcrypt.js** - Password hashing
- **JWT (jsonwebtoken)** - Authentication
- **Dotenv** - Manage environment variables

---

## 🛠️ **Installation & Setup**

### 1️⃣ **Clone the Repository**
```bash
 git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git
 cd YOUR_REPOSITORY_NAME
```

### 2️⃣ **Install Dependencies**
```bash
 npm install
```

### 3️⃣ **Set Up Environment Variables**
Create a **.env** file in the project root and add:
```
MONGO_URI=mongodb+srv://snehpnp:snehpnp@newsmartalgo.n5bxaxz.mongodb.net/
JWT_SECRET="asdfghjkl"
```

### 4️⃣ **Start the Server**
```bash
 npm start
```

The API will be running at **http://localhost:5000** 🎯

---

## 📌 **API Endpoints**

### 🔹 1️⃣ **User Registration**
- **Endpoint:** `POST /auth/register`
- **Description:** Register a new user.
- **Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```
- **Response:**
```json
{
  "status": true,
  "message": "User registered successfully",
  "data": {
    "id": "64b4a1c95a4c1d8b9f01aabc",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

### 🔹 2️⃣ **User Login**
- **Endpoint:** `POST /auth/login`
- **Description:** Authenticate user and return a JWT token.
- **Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response:**
```json
{
  "status": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1...",
    "user": {
      "id": "64b4a1c95a4c1d8b9f01aabc",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

---

### 🔹 3️⃣ **Get User Profile (Protected Route)**
- **Endpoint:** `GET /auth/profile`
- **Description:** Retrieve user details (Requires JWT Token)
- **Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```
- **Response:**
```json
{
  "status": true,
  "message": "User profile fetched successfully",
  "data": {
    "id": "64b4a1c95a4c1d8b9f01aabc",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

## 🔒 **Middleware (JWT Authentication)**
To protect routes, a **middleware** checks if a valid JWT token is provided.

**Middleware Code (`middleware/auth.js`):**
```javascript
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ status: false, message: "Access denied. No token provided.", data: [] });
    }
    
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request
        next();
    } catch (error) {
        return res.status(400).json({ status: false, message: "Invalid token.", data: [] });
    }
};
```

---

## 🔥 **Testing with Postman**
1️⃣ **Import Postman Collection**  
- Open Postman → Click **Import** → Select the exported collection file.
- The Postman collection includes all API requests.

2️⃣ **Register a User**  
- Send a **POST** request to `http://localhost:5000/auth/register`

3️⃣ **Login and Get JWT Token**  
- Send a **POST** request to `http://localhost:5000/auth/login`
- Copy the `token` from the response.

4️⃣ **Fetch User Profile** (Protected Route)  
- Send a **GET** request to `http://localhost:5000/auth/profile`
- Add **Authorization Header**: `Bearer YOUR_JWT_TOKEN`

---

## 📜 **Project Structure**
```
📂 ecommerce-api
 ┣ 📂 models
 ┃ ┗ 📜 User.js
 ┣ 📂 routes
 ┃ ┗ 📜 authRoutes.js
 ┣ 📂 middleware
 ┃ ┗ 📜 auth.js
 ┣ 📂 controllers
 ┃ ┗ 📜 authController.js
 ┣ 📜 .env
 ┣ 📜 server.js
 ┣ 📜 package.json
 ┗ 📜 README.md
```

---

## ✨ **Future Enhancements**
🚀 Add email verification 📧  
🚀 Implement role-based access control (RBAC) 🏢  
🚀 Add logout and token blacklist functionality 🛑  

---

## 🙌 **Contributors**
- Developed by **[Your Name]**  

---

## 📝 **License**
This project is licensed under the **MIT License** 📜.

