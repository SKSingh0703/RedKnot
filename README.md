# Internshala Assignment – Multi-Page Form Application

## ✨ Overview
This project is a full-stack multi-page form application built using **React (Vite)** for the frontend and **Node.js with Express and MongoDB** for the backend. It allows users to fill out multi-step forms with proper validation and state persistence.

## 📌 Features
- Multi-page form with personal info, education status, and projects.
- Navigation support with forward and backward transitions.
- Form state persisted in the backend via MongoDB.
- Dynamic project field additions and deletions.
- Full client-side and server-side validation.
- Authentication system (Login/Signup).
- Prefill form data upon login.

## 🛠 Tech Stack
**Frontend:** React, Vite, React Router, Redux, Tailwind CSS  
**Backend:** Node.js, Express, Prisma ORM, MongoDB  
**Authentication:** JWT-based  
**Validation:** Zod (client), Express-Validator (server)

## 🚀 How to Run Locally

### Frontend

cd client
npm install
npm run dev


### Backend
cd server
npm install
npx prisma generate
npm run dev
