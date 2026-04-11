import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

async function migrateImages() {
    try {
        // Find all projects that don't have images array or have empty images array
        const projects = await Project.find({
            $or: [
                { images: { $exists: false } },
                { images: [] }
            ]
        });

        console.log(`Found ${projects.length} projects to migrate`);

        for (const project of projects) {
            if (project.image && project.image.trim() !== '') {
                // Populate images array with the existing single image
                project.images = [project.image];
                await project.save();
                console.log(`✓ Migrated project: ${project.title}`);
            }
        }

        console.log('Migration completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Migration error:', error);
        process.exit(1);
    }
}

migrateImages();
