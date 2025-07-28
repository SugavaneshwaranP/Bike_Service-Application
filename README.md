# Bike_Service-Application


Bike Service App
================
A complete web application to manage bike service bookings with user authentication, admin management, service listings, email notifications, and MongoDB integration.

Project Structure
backend/ – Node.js + Express server
frontend/ – React.js + vite client
models/ – Mongoose schemas for users, bookings, and services
.env – Environment variables for Mail, DB, JWT

Features
----------------

User Registration & Login (JWT Auth)

Book Bike Service (User)

View Bookings (User & Admin)

Admin Panel to Update Booking Status

Email Notification on Booking (Mailtrap.io)

MongoDB Database (local)

Technologies Used
----------------

Backend: Node.js, Express, Mongoose, JWT, Bcrypt, Nodemailer
Frontend: React.js + vite
Database: MongoDB
Email: Mailtrap
Styling: Bootstrap & Bootstrap Icons

Bike Service Booking Application Documentation
==============================================

Project Overview
Project Name: Bike Service Booking Application
Backend Stack: Node.js, Express.js, MongoDB
Frontend: React.js with vite
Database: MongoDB
Email Service: Mailtrap (SMTP Testing)

This project provides a backend API for booking bike services. It includes user registration, login, service booking, status update (by admin), and email notifications.

Postman can be used for testing APIs.


Project Setup Instructions
---------------------------

Step 1: Clone the Repository
git clone https://github.com/SugavaneshwaranP/Bike_Service-Application.git
cd bike-service-app

Step 2: Install Backend Dependencies
npm install
npm install express mongoose bcrypt cors jsonwebtoken nodemailer mailtrap
This will install all backend packages.

Step 3: Create and Configure .env File
Create a .env file in the root directory with these variables:

PORT=5000
MONGO_URI=mongodb://localhost:27017/bikeservice
MAIL_USER=04049f8071a2f2
MAIL_PASS=425320546f1847
JWT_SECRET=supersecretjwtkey

MongoDB Database Setup
------------------------

Local MongoDB: mongodb://localhost:27017/bikeservice

Create a database named bikeservice with these collections:
users
bookings
services

Running the Backend Server
node server.js
Server runs at: http://localhost:5000

API Endpoints for Testing
-------------------------

POST /api/auth/register – Register new user
POST /api/auth/login – Login and receive JWT token

Bookings:

POST /api/bookings – Create new service booking
GET /api/bookings/user/:userId – Get user bookings
PUT /api/bookings/:id/status – Update booking status (admin)

Frontend Setup
----------------

Step 1: Navigate to frontend directory
cd frontend

Step 2: Install dependencies

npm install
npm install react-router-dom

Step 3: Adding Bootstrap and Icons (Frontend)
npm install bootstrap bootstrap-icons
add this line in index.html:

"<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css"
  integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7"
  crossorigin="anonymous"
/> "

Step 4: Run the React+vite app

npm run dev
App runs at: http://localhost:5173/

For MailService

Email notifications are implemented using Mailtrap.io, which allows safe testing in a development environment by capturing emails without actually delivering them to end users.

For verification, I am looking forward to share a screenshot if needed.

Thank you..!!