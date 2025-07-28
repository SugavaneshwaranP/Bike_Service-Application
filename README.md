# Bike_Service-Application


#  Bike Service App

A complete web application to manage bike service bookings with user authentication, admin management, service listings, email notifications, and MongoDB integration.

##  Project Structure

- `backend/` – Node.js + Express server
- `frontend/` – React.js + vite client
- `models/` – Mongoose schemas for users, bookings, and services
- `.env` – Environment variables for Mail, DB, JWT

---

##  Features

- User Registration & Login (JWT Auth)
- Book Bike Service (User)
- View Bookings (User & Admin)
- Admin Panel to Update Booking Status
- Email Notification on Booking (Mailtrap.io)
- MongoDB Database (local)

---

##  Technologies Used

- **Backend**: Node.js, Express, Mongoose, JWT, Bcrypt, Nodemailer
- **Frontend**: React.js + vite
- **Database**: MongoDB
- **Email**: Mailtrap
- **Styling**: Bootstrap & Bootstrap Icons

---

Bike Service Booking Application Documentation

1. Project Overview
--------------------

Project Name: Bike Service Booking Application
Backend Stack: Node.js, Express.js, MongoDB
Frontend : React.js with vite
Database: MongoDB 
Email Service: Mailtrap (SMTP Testing)

This project provides a backend API for booking bike services. It includes user registration, login, service booking, status update (by admin), and email notifications.

Postman (for testing APIs)

2. Project Setup Instructions

Step 1: Clone the Repository

git clone https://github.com/SugavaneshwaranP/Bike_Service-Application.git
cd bike-service-app

Step 2: Install Backend Dependencies

npm install
npm install express mongoose bcrypt cors jsonwebtoken nodemailer mailtrap
This will install all backend packages.


Step 3: Create and Configure .env File
--------------------------------------

Create a .env file in the root directory with these variables:


PORT=5000
MONGO_URI=mongodb://localhost:27017/bikeservice
MAIL_USER=04049f8071a2f2    
MAIL_PASS=425320546f1847
JWT_SECRET=supersecretjwtkey


4. MongoDB Database Setup
---------------------------

Local MongoDB: mongodb://localhost:27017/bikeservice

Create a database named bikeservice with these collections:

users

bookings

services

5. Running the Backend Server
------------------------------

node server.js
Server runs at: http://localhost:5000

6. API Endpoints for Testing
--------------------------------

POST /api/auth/register – Register new user

POST /api/auth/login – Login and receive JWT token

Bookings:

POST /api/bookings – Create new service booking

GET /api/bookings/user/:userId – Get user bookings

PUT /api/bookings/:id/status – Update booking status (admin)



7. Frontend Setup
------------------

Step 1: Navigate to frontend directory

cd frontend

Step 2: Install dependencies
----------------------------

npm install
npm install react-router-dom

Step 3: Adding Bootstrap and Icons (Frontend)
--------------------------------------------
Install dependencies:
npm install bootstrap bootstrap-icons

Step 4: Run the React+vite app
------------------------------

npm run dev
App runs at: http://localhost:5173/


For MailService :

Email notifications are implemented using Mailtrap.io, which allows safe testing in a development
environment by capturing emails without actually delivering them to end users.

For Verification, I am looking forward to share a Screenshot If needed.

Thank You..!


