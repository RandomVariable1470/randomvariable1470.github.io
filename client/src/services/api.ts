export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
    contact: async (data: any) => {
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
    getProjects: async () => {
        const response = await fetch(`${API_URL}/projects`);
        if (!response.ok) throw new Error('Failed to fetch projects');
        return response.json();
    },
    createProject: async (project: any, token: string) => {
        const response = await fetch(`${API_URL}/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(project)
        });
        if (!response.ok) throw new Error('Failed to create project');
        return response.json();
    },
    deleteProject: async (id: string, token: string) => {
        const response = await fetch(`${API_URL}/projects/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to delete project');
        return response.json();
    },
    getContacts: async (token: string) => {
        const response = await fetch(`${API_URL}/contact`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch contacts');
        return response.json();
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
