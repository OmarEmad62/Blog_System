# 📝 Blog_System

A full-featured, single-user blog application built with **React**, **TypeScript**, **Node.js**, and **PWA** capabilities. It supports rich text editing, offline access, drag-and-drop reordering, and complete blog CRUD operations.

## 🚀 Live Demo

👉 [https://blogify-gvp0.onrender.com](https://blogify-gvp0.onrender.com)

---

## 🔧 Core Features

- **📝 Blog CRUD Operations**  
  Create, read, update, and delete blog posts.

- **🕒 Drafting Capability**  
  Save blog posts as drafts to continue editing later before publishing.

- **✍️ Rich Text Editor with Image Support**  
  Format text, insert images, and craft blog content using a WYSIWYG editor powered by **React Quill**.

- **📦 Drag-and-Drop Blog Card Reordering**  
  Reorder blog posts via drag-and-drop using `@dnd-kit`.

- **👤 Single User Mode**  
  No authentication required. The system is designed for a single user with full access.

- **📱 Progressive Web App (PWA)**  
  - Installable on devices  
  - Works offline with cached blog data  
  - Contains `manifest.json` with app name, icons, and theme colors  
  - Registers a service worker that caches essential assets  
  - Passes Lighthouse's PWA audit

---

## 🛠 Tech Stack

### 📦 Frontend
- **React 18** + **TypeScript**
- **Vite** – Lightning-fast development and build tool
- **Tailwind CSS** – Utility-first styling
- **React Router v6** – Client-side routing
- **React Toastify** – Toast notifications
- **React Quill** – Rich text editor
- **@dnd-kit** – Drag-and-drop functionality
- **Dexie / idb** – IndexedDB support for offline drafts

### 📦 Backend
- **Node.js** + **Express**
- **MongoDB Atlas** – Document-based database

---

## 📦 Project Structure

```

Blog\_System/
│
├── BlogSystem-Frontend/     # Vite + React + Tailwind + PWA
├── BlogSystemBackend/       # Express server + MongoDB
└── README.md                # You're here!

````

---

## 💻 Setup Instructions

### Prerequisites
- Node.js (v18 or above)
- MongoDB Atlas or local MongoDB setup

### 1. Clone the Repo

```bash
git clone https://github.com/OmarEmad62/Blog_System.git
cd Blog_System
````

### 2. Start the Backend

```bash
cd BlogSystemBackend
npm install
# Add your .env file with PORT and MONGO_URI
npm run dev
```

### 3. Start the Frontend

```bash
cd BlogSystem-Frontend
npm install
npm run dev
```

---




