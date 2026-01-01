Animal NGO Platform

A full-stack platform built to connect donors, volunteers, NGOs, and animal owners to support animal welfare through rescue operations, donations, and lost-pet reporting.

🚀 Features
👤 User Roles

Donor

Request donations

Report animal rescue cases

Volunteer

View nearby rescue cases

Accept and manage rescue missions

NGO

Register & login separately

Manage NGO profile

View reported cases

Admin

Manage users and NGOs

💰 Donations

Donation requests with title, description, and amount

Razorpay payment gateway integration

Secure order creation and payment flow

🐕 Lost Pets

Report lost pets with:

Owner name

Phone number

Last seen location

Image upload

Description

Public feed showing all reported lost pets

Images served from backend uploads directory

🚨 Rescue System

Report injured/stray animals

Assign volunteers to rescue cases

Track rescue status

🧱 Tech Stack
Frontend

React (Vite)

Tailwind CSS

Axios

React Router

Backend

Node.js

Express.js

PostgreSQL

PostGIS (for geolocation features)

Multer (image uploads)

JWT Authentication

Payments

Razorpay (Test & Live modes)

Deployment

Render (Backend, Frontend, PostgreSQL)


PROJECT STRUCTURE

animal-ngo-project/
│
├── animal-ngo-backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── data/
│   │   └── config/
│   ├── uploads/        # ignored in git
│   ├── index.js
│   └── package.json
│
├── animal-ngo-frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api/
│   │   ├── context/
│   │   └── stores/
│   ├── index.html
│   └── package.json
│
└── README.md


Running Locally
1️⃣ Backend
cd animal-ngo-backend
npm install
npm run dev


Backend runs on:

http://localhost:5000

2️⃣ Frontend
cd animal-ngo-frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173

🔐 Security Notes

Razorpay keys are stored only in environment variables

Uploaded images are excluded from Git

JWT-based authentication

CORS configured per environment

📦 Deployment Notes

Backend deployed as Render Web Service

Frontend deployed as Render Static Site

PostgreSQL with PostGIS enabled

Image uploads are ephemeral on Render (recommended: Cloudinary/S3 for production)