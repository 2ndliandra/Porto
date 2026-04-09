# Modern Portfolio Application Documentation

## 1. Full Folder Structure

### Root Directory: `c:\Porto`

```text
/frontend
  ├── /src
  │    ├── /assets
  │    ├── /components
  │    │    ├── Navbar.jsx
  │    │    └── ProjectFormModal.jsx
  │    ├── /layouts  (Implicit within App.jsx/Pages)
  │    ├── /hooks    (Available for future custom hooks)
  │    ├── /pages
  │    │    ├── Admin.jsx
  │    │    └── Portfolio.jsx
  │    ├── /services
  │    │    └── api.js
  │    ├── App.jsx
  │    ├── index.css
  │    └── main.jsx
  ├── index.html
  ├── package.json
  ├── postcss.config.js
  ├── tailwind.config.js
  └── vite.config.js

/backend
  ├── /src
  │    ├── /config
  │    │    └── db.js
  │    ├── /controllers
  │    │    └── projectController.js
  │    ├── /middlewares (e.g. error handling, integrated in server.js)
  │    ├── /models
  │    │    └── Project.js
  │    ├── /routes
  │    │    └── projectRoutes.js
  │    ├── server.js
  │    └── seed.js
  ├── .env
  └── package.json
```

---

## 2. Setup Instructions

Make sure you have Node.js and MongoDB installed and running on your local machine. 
You can use `mongodb://localhost:27017/portfolio` or a MongoDB Atlas URI.

### Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd c:\Porto\backend
   ```
2. Install the necessary dependencies:
   ```bash
   npm install express mongoose cors dotenv nodemon
   ```
3. Seed the initial database with dummy projects:
   ```bash
   npm run seed
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
   *The server will start at `http://localhost:5000`.*

### Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd c:\Porto\frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite React development server:
   ```bash
   npm run dev
   ```
   *The client will start at `http://localhost:5173`.*

---

## 3. Sample Code Highlights

### MongoDB Connection (`backend/src/config/db.js`)
```javascript
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
export default connectDB;
```

### Express Server (`backend/src/server.js`)
```javascript
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import projectRoutes from './routes/projectRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/projects', projectRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### React Component snippet (`frontend/src/pages/Portfolio.jsx`)
```jsx
// Simplified example of the Home Hero Section
<section id="home" className="min-h-[90vh] flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
  <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight z-10">
    Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">John Doe</span>
  </h1>
  <p className="text-xl md:text-2xl text-text-muted mb-10 max-w-2xl z-10">
    A passionate Fullstack Developer crafting beautiful, interactive, and high-performance digital experiences.
  </p>
  <button className="z-10 bg-white text-secondary px-8 py-3 rounded-full font-semibold text-lg hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
    <a href="#projects">View Projects</a>
  </button>
</section>
```

### Tailwind Config (`frontend/tailwind.config.js`)
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#0f172a', light: '#1e3a8a' },
        secondary: '#020617',
        text: { DEFAULT: '#e5e7eb', muted: '#9ca3af' }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
}
```

---

## 4. Example API Usage

The backend exposes a REST API at `/api/projects`:

- **Get All Projects**: `GET http://localhost:5000/api/projects`
- **Get Single Project**: `GET http://localhost:5000/api/projects/651f8a8b...`
- **Create Project**: `POST http://localhost:5000/api/projects`
  - Body:
    ```json
    {
      "title": "New Awesome Platform",
      "description": "An incredible platform for awesome users.",
      "techStack": ["Vue", "Express", "PostgreSQL"],
      "image": "https://example.com/image.jpg",
      "link": "https://example.com"
    }
    ```
- **Update Project**: `PUT http://localhost:5000/api/projects/651f8a8b...`
  - Body: (Any properties to update)
- **Delete Project**: `DELETE http://localhost:5000/api/projects/651f8a8b...`

This handles all CRUD operations required by the CRM module.

---

## 5. Example Project Data (Dummy Seed)

Run the seeder with `npm run seed` in your backend folder. This creates three projects:

1. **E-Commerce Platform**
   - *Description*: A full-featured modern e-commerce platform built with React and Node.js.
   - *Tech Stack*: React, Node.js, MongoDB, Tailwind

2. **Task Management System**
   - *Description*: A Kanban style project management tool inspired by Trello with real-time updates.
   - *Tech Stack*: React, Express, Socket.io, Mongoose

3. **Weather App**
   - *Description*: A minimal weather application using the OpenWeather API with geolocation.
   - *Tech Stack*: JavaScript, HTML5, CSS3, API
