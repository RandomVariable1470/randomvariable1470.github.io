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
