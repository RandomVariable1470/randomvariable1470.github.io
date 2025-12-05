import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './db.js';
import Project from './models/Project.js';

dotenv.config();

const seeds = [
    {
        title: "Game Engine",
        description: "A custom 2D/3D game engine built from scratch. Because why use Unity when you can suffer?",
        tags: ["C++", "OpenGL", "Physics"],
        status: "In Progress",
    },
    {
        title: "Physics Simulation",
        description: "Real-time fluid dynamics and particle systems. Very satisfying to watch, painful to debug.",
        tags: ["Rust", "WGPU", "Math"],
        status: "Concept",
    },
    {
        title: "Multiplayer Game",
        description: "Fast-paced multiplayer racing game. Currently just cubes racing, but it's a start.",
        tags: ["Unity", "C#", "Networking"],
        status: "In Progress",
    },
];

const seedProjects = async () => {
    try {
        await connectDB();
        await Project.deleteMany();
        await Project.insertMany(seeds);
        console.log('Projects Seeding Complete');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedProjects();
