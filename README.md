# ✨ Full Stack Realtime Chat App

A real-time full-stack chat application built with **MERN**, **Socket.io**, **TailwindCSS**, and **DaisyUI**, featuring user authentication, live messaging, online user status, and seamless deployment.

---

## 🚀 Features

* 🌟 **Tech Stack**: MongoDB, Express.js, React, Node.js (MERN)
* 👾 **Real-time Messaging**: Using **Socket.io**
* 🎃 **Authentication & Authorization**: JWT-based secure login/signup
* 🟢 **Online Status Tracking**
* 🌐 **Global State Management**: With **Zustand**
* 🎨 **Styling**: TailwindCSS + DaisyUI for beautiful UI
* 🛡️ **Robust Error Handling**: Both on client and server sides
* ⚙️ **Environment-specific Configurations**

---

## 📁 Folder Structure

```
.
├── client      # React frontend
├── server      # Node.js backend
├── .env        # Environment variables
├── README.md
```

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/realtime-chat-app.git
cd realtime-chat-app
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=5000
MongoUrl=your_mongo_db_connection_string
accessToken=your_jwt_secret
accessTokenExpiration=1d
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
NODE_ENV=development
```

Start the backend server:

```bash
npm start
```

---

### 3. Frontend Setup

```bash
cd ../client
npm install
npm run build
npm start
```

---



## 📸 Screenshots

(Add some cool UI screenshots of your app here)


