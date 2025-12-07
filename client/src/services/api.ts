/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
    contact: async (data: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        const response = await fetch(`${API_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Failed to submit contact form');
        }
        return response.json();
    },
    login: async (credentials: any) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        if (!response.ok) throw new Error('Login failed');
        return response.json();
    },
    // Projects
    getProjects: async () => {
        const response = await axios.get(`${API_URL}/projects`);
        return response.data;
    },

    getProject: async (id: string) => {
        const response = await axios.get(`${API_URL}/projects/${id}`);
        return response.data;
    },

    createProject: async (project: any, token: string) => {
        const response = await axios.post(`${API_URL}/projects`, project, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    updateProject: async (id: string, project: any, token: string) => {
        const response = await axios.put(`${API_URL}/projects/${id}`, project, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    deleteProject: async (id: string, token: string) => {
        const response = await axios.delete(`${API_URL}/projects/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    // Notes
    getNotes: async () => {
        const response = await axios.get(`${API_URL}/notes`);
        return response.data;
    },

    createNote: async (note: any, token: string) => {
        const response = await axios.post(`${API_URL}/notes`, note, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    deleteNote: async (id: string, token: string) => {
        const response = await axios.delete(`${API_URL}/notes/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    // Contact (Admin)
    getContacts: async (token: string) => {
        const response = await axios.get(`${API_URL}/contact`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },
    getGitHubProfile: async () => {
        const response = await fetch(`${API_URL}/github/profile`);
        if (!response.ok) {
            throw new Error('Failed to fetch GitHub profile');
        }
        return response.json();
    },
    getGitHubRepos: async () => {
        const response = await fetch(`${API_URL}/github/repos`);
        if (!response.ok) {
            throw new Error('Failed to fetch GitHub repos');
        }
        return response.json();
    }
};
