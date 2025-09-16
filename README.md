# Fullstack CRUD Application

A fullstack CRUD application with **authentication** and **user management**, built using **Node.js (backend)** and **React + Material UI (frontend)**.  
Users must **register** and **login** before accessing the protected pages where they can perform CRUD operations.

---

## 🚀 Features

### 🔹 Backend (Node.js + Express + Database)
- User **Register** & **Login** with authentication.
- JWT-based authentication for secure routes.
- User can:
  - **Add** new user details.
  - **Get All Users**.
  - **Update** existing user.
  - **Delete** a user.

### 🔹 Frontend (React + MUI)
- Register and Login forms with validation.
- After login, users can access protected pages:
  - **Add User Page**
  - **Get All Users Page**
  - **Update User Page**
  - **Delete User Option**
- UI built with **Material UI** components.

---

## 🛠️ Tech Stack

**Frontend:**
- React.js  
- Material UI (MUI)  
- Axios (for API requests)  

**Backend:**
- Node.js  
- Express.js  
- JWT Authentication  
- Database (MySQL / PostgreSQL / MongoDB) – depending on your setup  

---

## 📂 Project Structure
Fullstack-CRUD/
│
├── backend/ # Node.js backend
│ ├── controllers/ # Business logic
│ ├── routes/ # API routes
│ ├── models/ # Database models
│ ├── middlewares/ # Authentication middleware
│ ├── server.js # Entry point
│
├── frontend/ # React frontend
│ ├── src/
│ │ ├── components/ # Reusable components
│ │ ├── pages/ # Pages (Login, Register, Users CRUD)
│ │ ├── App.js # Main app
│ │ └── index.js
│
└── README.md
