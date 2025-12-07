import { useRef, useState, useEffect } from "react";
import { GitCommit, Users, FolderOpen, Star, GitBranch } from "lucide-react";
import { api } from "@/services/api";

const GithubActivity = () => {
  const [stats, setStats] = useState([
    { label: "Repos", value: "--", icon: FolderOpen },
    { label: "Followers", value: "--", icon: Users },
    { label: "Following", value: "--", icon: Users },
    { label: "Total Commits", value: "--", icon: GitCommit },
  ]);

  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await api.getGitHubProfile();
        // Estimate total commits based on public data or keep mock/static if unavailable via simple API
        // For now, we'll keep a static "800+" or derived value if possible.
        setStats([
          { label: "Repos", value: String(profile.public_repos), icon: FolderOpen },
          { label: "Followers", value: String(profile.followers), icon: Users },
          { label: "Following", value: String(profile.following), icon: Users },
          { label: "Created", value: new Date(profile.created_at).getFullYear().toString(), icon: Star },
        ]);

        const repos = await api.getGitHubRepos();
        // Get last 3 active repos
        const activity = repos.slice(0, 3).map((repo: any) => ({
          type: "push",
          message: `Pushed to ${repo.name}`,
          time: new Date(repo.updated_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
          repo: repo.language
        }));
        setRecentActivity(activity);
      } catch (e) {
        console.error("Failed to fetch GitHub data", e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, i) => (
          <div key={i} className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-3 flex flex-col justify-between hover:border-primary/30 transition-colors group">
            <div className="flex items-start justify-between">
              <stat.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              {i === 0 && <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />}
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold font-mono text-foreground tracking-tight">{stat.value}</span>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity List */}
      <div className="flex-1 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 hover:border-primary/30 transition-colors overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-primary flex items-center gap-2">
            <GitBranch className="w-3 h-3" />
            Latest Activity
          </h3>
        </div>

        <div className="space-y-3">
          {recentActivity.length > 0 ? recentActivity.map((item, i) => (
            <div key={i} className="flex gap-3 group/item">
              <div className="relative mt-1">
                <div className="w-2 h-2 rounded-full bg-primary/20 group-hover/item:bg-primary transition-colors" />
                {i !== recentActivity.length - 1 && <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[1px] h-full bg-border" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">{item.message}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-muted-foreground font-mono">{item.time}</span>
                  {item.repo && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">{item.repo}</span>}
                </div>
              </div>
            </div>
          )) : (
            <div className="text-xs text-muted-foreground text-center py-4">Loading data...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GithubActivity;
