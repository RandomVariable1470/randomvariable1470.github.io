import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './db.js';
import User from './models/User.js';

dotenv.config();

const seedAuth = async () => {
    try {
        await connectDB();

        await User.deleteMany();

        const result = await User.create({
            username: 'admin',
            password: process.env.ADMIN_PASSWORD || 'adminpassword123', // Safer: set ADMIN_PASSWORD in .env
            isAdmin: true
        });

        console.log('Admin user created:', result.username);
        process.exit();
    } catch (error) {
        console.error('Error seeding auth:', error);
        process.exit(1);
    }
};

seedAuth();
