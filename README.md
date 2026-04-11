# Porto - Modern Portfolio Website

A sophisticated, full-stack portfolio website built with React, Node.js, and MongoDB. Features a beautiful UI with 3D elements, smooth animations, and a comprehensive admin panel for content management.

## 🌟 Features

### Frontend
- **Modern UI Design** - Clean, gradient-based design with smooth transitions
- **3D Components** - Interactive 3D Lanyard card using Three.js and React Three Fiber
- **Smooth Scrolling** - Lenis-powered smooth scroll experience
- **Animations** - Framer Motion animations for engaging interactions
- **Theme Support** - Light/Dark mode toggle
- **Responsive Design** - Mobile-friendly layout with TailwindCSS
- **Admin Dashboard** - Secure admin panel for content management

### Backend
- **RESTful API** - Express.js API with MongoDB integration
- **Authentication** - Secure authentication system
- **CRM Features** - Contact management and tracking
- **Image Upload** - File upload functionality
- **Database** - MongoDB integration with Mongoose

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **Lenis** - Smooth scroll library
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Dotenv** - Environment variable management

## 📋 Project Structure

```
Porto/
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── HeroSection.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Lanyard/     # 3D Lanyard component
│   │   │   └── ...
│   │   ├── pages/           # Page components
│   │   │   ├── Portfolio.jsx
│   │   │   └── Admin.jsx
│   │   ├── services/        # API services
│   │   └── context/         # React context (Theme)
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   ├── config/          # Configuration
│   │   ├── server.js        # Entry point
│   │   └── seed.js          # Database seeding
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/2ndliandra/Porto.git
cd Porto
```

2. **Backend Setup**
```bash
cd backend
npm install
# Create .env file with your configuration
# MONGODB_URI=your_mongodb_connection_string
npm start
```

The backend server will run on `http://localhost:5000`

3. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

The frontend development server will run on `http://localhost:5173`

## 📦 Installation Dependencies

The project uses the following key packages:

```bash
# Frontend
npm install lenis framer-motion clsx tailwind-merge lucide-react
npm install three @react-three/fiber @react-three/drei @react-three/rapier meshline
npm install vite @vitejs/plugin-react

# Backend
npm install express mongoose dotenv cors
```

## 🏗️ Building for Production

### Frontend Build
```bash
cd frontend
npm run build
```

Output files will be in `frontend/dist/`

### Backend
Production-ready with proper error handling and environment configuration

## 🎨 Color Scheme

The project features a modern color palette:
- Primary: Blue (`#2563eb`)
- Secondary: Indigo (`#4f46e5`)
- Accent: Fuchsia (`#d946ef`)
- Light Mode: Slate (`#f8fafc`)
- Dark Mode: Deep slate (`#070b14`)

## 📝 Available Routes

### Frontend Routes
- `/` - Portfolio home page
- `/admin` - Admin dashboard (protected)

### API Endpoints

**Projects**
- GET `/api/projects` - Get all projects
- POST `/api/projects` - Create project (admin)
- PUT `/api/projects/:id` - Update project (admin)
- DELETE `/api/projects/:id` - Delete project (admin)

**Skills**
- GET `/api/skills` - Get all skills
- POST `/api/skills` - Create skill (admin)

**Experience**
- GET `/api/experiences` - Get all experiences
- POST `/api/experiences` - Create experience (admin)

**Academics**
- GET `/api/academics` - Get academic information
- POST `/api/academics` - Add academic record (admin)

**Contacts & Organizations**
- GET `/api/contacts` - Get contacts
- GET `/api/organizations` - Get organizations

And more endpoints for soft skills, internships, and learnings.

## 🔧 Environment Configuration

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/porto
PORT=5000
NODE_ENV=development
```

## 🎯 Key Features Explained

### 3D Lanyard Component
- Interactive 3D card model using Three.js
- Located in `frontend/src/components/Lanyard/`
- Integrates Rapier physics engine for realistic interactions

### Admin Panel
- Secure dashboard for managing portfolio content
- Add/edit/delete projects, skills, experiences, and more
- Triple-click easter egg on profile image to access admin

### Smooth Scroll
- Lenis-powered smooth scrolling throughout the site
- Configurable easing and duration

### Theme System
- React Context-based theme management
- Dark/Light mode support
- Persisted user preference

## 📱 Responsive Design

The site is fully responsive:
- Mobile (< 640px)
- Tablet (640px - 1024px)
- Desktop (> 1024px)

## 🚧 Development

### Running Dev Servers

Terminal 1 - Backend:
```bash
cd backend
npm start
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

### Hot Reload
Both servers support hot module replacement for quick development iteration

## 🐛 Debugging

### Frontend Issues
- Check browser console for React errors
- Verify Vite dev server is running on port 5173
- Clear cache with hard refresh (Ctrl+Shift+R)

### Backend Issues
- Check MongoDB connection in terminal output
- Verify `.env` file with correct credentials
- Check API logs on port 5000

## 📚 Project Information

**Developer**: Moch Novaliandra  
**Repository**: https://github.com/2ndliandra/Porto  
**Portfolio**: Built with React.js, Tailwind CSS, Framer Motion and CRM features

## 🤝 Contributing

This is a personal portfolio project. For modifications or questions, feel free to reach out.

## 📄 License

This project is personal work. All rights reserved.

---

**Last Updated**: April 11, 2026

For more information about specific features or setup, refer to the inline code comments or documentation within each folder.
