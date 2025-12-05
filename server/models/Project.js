import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [String],
    link: { type: String }, // Optional link to live demo or repo
    status: {
        type: String,
        enum: ['Concept', 'In Progress', 'Completed', 'On Hold'],
        default: 'In Progress'
    },
    createdAt: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
