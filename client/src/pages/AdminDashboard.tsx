import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '../hooks/use-toast';
import { Trash2, Plus, LogOut } from 'lucide-react';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const [projects, setProjects] = useState<any[]>([]);
    const [contacts, setContacts] = useState<any[]>([]);
    const { toast } = useToast();

    // New Project Form State
    const [newProject, setNewProject] = useState({ title: '', description: '', tags: '', link: '', status: 'In Progress' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const p = await api.getProjects(); // Public endpoint for now, or protected if we changed it.
                const c = await api.getContacts(token);
                setProjects(p);
                setContacts(c);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteProject = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await api.deleteProject(id, token);
                toast({ title: 'Project deleted' });
                fetchData();
            }
        } catch (e) {
            toast({ variant: 'destructive', title: 'Failed to delete' });
        }
    };

    const handleCreateProject = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const tagsArray = newProject.tags.split(',').map(t => t.trim());
                await api.createProject({ ...newProject, tags: tagsArray }, token);
                toast({ title: 'Project created' });
                setNewProject({ title: '', description: '', tags: '', link: '', status: 'In Progress' });
                fetchData();
            }
        } catch (e) {
            toast({ variant: 'destructive', title: 'Failed to create' });
        }
    };

    return (
        <div className="min-h-screen p-8 pt-24 container mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <div className="flex items-center gap-4">
                    <span>Welcome, {user?.username}</span>
                    <button onClick={logout} className="p-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20">
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <Tabs defaultValue="projects">
                <TabsList>
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="contacts">Messages</TabsTrigger>
                </TabsList>

                <TabsContent value="projects" className="space-y-6">
                    {/* Create Project Form */}
                    <div className="bg-card/30 p-6 rounded-xl border border-border/50">
                        <h3 className="font-semibold mb-4 flex items-center gap-2"><Plus className="w-4 h-4" /> Add New Project</h3>
                        <form onSubmit={handleCreateProject} className="grid gap-4 md:grid-cols-2">
                            <input placeholder="Title" value={newProject.title} onChange={e => setNewProject({ ...newProject, title: e.target.value })} className="px-4 py-2 rounded-lg bg-background/50 border" required />
                            <input placeholder="Link" value={newProject.link} onChange={e => setNewProject({ ...newProject, link: e.target.value })} className="px-4 py-2 rounded-lg bg-background/50 border" />
                            <input placeholder="Tags (comma separated)" value={newProject.tags} onChange={e => setNewProject({ ...newProject, tags: e.target.value })} className="px-4 py-2 rounded-lg bg-background/50 border md:col-span-2" />
                            <textarea placeholder="Description" value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })} className="px-4 py-2 rounded-lg bg-background/50 border md:col-span-2" required />
                            <select value={newProject.status} onChange={e => setNewProject({ ...newProject, status: e.target.value })} className="px-4 py-2 rounded-lg bg-background/50 border">
                                <option value="Concept">Concept</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                                <option value="On Hold">On Hold</option>
                            </select>
                            <button type="submit" className="bg-primary text-primary-foreground py-2 rounded-lg">Create Project</button>
                        </form>
                    </div>

                    {/* List */}
                    <div className="grid gap-4">
                        {projects.map((p: any) => (
                            <div key={p._id} className="flex justify-between items-center p-4 bg-card/50 rounded-lg border border-border/50">
                                <div>
                                    <h4 className="font-bold">{p.title}</h4>
                                    <p className="text-sm text-muted-foreground">{p.status}</p>
                                </div>
                                <button onClick={() => handleDeleteProject(p._id)} className="text-destructive hover:bg-destructive/10 p-2 rounded">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="contacts">
                    <div className="grid gap-4">
                        {contacts.map((c: any) => (
                            <div key={c._id} className="p-4 bg-card/50 rounded-lg border border-border/50">
                                <div className="flex justify-between mb-2">
                                    <h4 className="font-bold">{c.name}</h4>
                                    <span className="text-xs text-muted-foreground">{new Date(c.createdAt).toLocaleDateString()}</span>
                                </div>
                                <p className="text-sm text-primary mb-2">{c.email}</p>
                                <p className="text-sm bg-background/50 p-3 rounded">{c.message}</p>
                            </div>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AdminDashboard;
