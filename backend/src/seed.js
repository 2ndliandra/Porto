import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';
import Experience from './models/Experience.js';
import Skill from './models/Skill.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const dummyProjects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-featured modern e-commerce platform built with React and Node.js.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000',
    link: 'https://github.com'
  },
  {
    title: 'Task Management System',
    description: 'A Kanban style project management tool inspired by Trello with real-time updates.',
    techStack: ['React', 'Express', 'Socket.io', 'Mongoose'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000',
    link: 'https://github.com'
  },
  {
    title: 'Weather App',
    description: 'A minimal weather application using the OpenWeather API with geolocation.',
    techStack: ['JavaScript', 'HTML5', 'CSS3', 'API'],
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=1000',
    link: 'https://github.com'
  }
];

const dummyExperiences = [
  {
    role: 'Fullstack Developer',
    company: 'Tech Solutions Inc',
    year: '2023 - Present',
    desc: 'Building modern web applications using the MERN stack with high performance and accessibility in mind.'
  },
  {
    role: 'Software Engineer',
    company: 'Creative Web Agency',
    year: '2021 - 2023',
    desc: 'Assisted in building UI components and implementing responsive designs for multiple client projects.'
  }
];

const dummySkills = [
  { name: 'React', iconName: 'Zap' },
  { name: 'Node.js', iconName: 'Target' },
  { name: 'Tailwind CSS', iconName: 'Zap' },
  { name: 'MongoDB', iconName: 'Activity' },
];

const importData = async () => {
  try {
    await Project.deleteMany();
    await Experience.deleteMany();
    await Skill.deleteMany();

    await Project.insertMany(dummyProjects);
    await Experience.insertMany(dummyExperiences);
    await Skill.insertMany(dummySkills);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

importData();
