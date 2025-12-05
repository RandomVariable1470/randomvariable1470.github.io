import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Github, GitCommit, GitPullRequest, Star, Zap, Users, FolderOpen } from "lucide-react";
import { api } from "@/services/api";

// Use a simplified contributions visual for now or keep mock if API doesn't provide it easily. 
// We will keep the mock generation for the visual effect but update other stats.
const generateContributions = () => {
  const data: number[][] = [];
  for (let week = 0; week < 52; week++) {
    const weekData: number[] = [];
    for (let day = 0; day < 7; day++) {
      const baseChance = Math.random();
      const isBusyWeek = week % 8 < 3;
      const contribution = isBusyWeek
        ? Math.floor(Math.random() * 8)
        : baseChance > 0.4
          ? Math.floor(Math.random() * 4)
          : 0;
      weekData.push(contribution);
    }
    data.push(weekData);
  }
  return data;
};

const contributions = generateContributions();

const getContributionColor = (count: number) => {
  if (count === 0) return "bg-muted/30";
  if (count <= 2) return "bg-primary/30";
  if (count <= 4) return "bg-primary/50";
  if (count <= 6) return "bg-primary/70";
  return "bg-primary";
};

const GithubActivity = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredCell, setHoveredCell] = useState<{ week: number; day: number } | null>(null);

  const [stats, setStats] = useState([
    { label: "Public Repos", value: "--", icon: FolderOpen, subtext: "Source code" },
    { label: "Followers", value: "--", icon: Users, subtext: "Community" },
    { label: "Following", value: "--", icon: Users, subtext: "Network" },
    { label: "Total Commits", value: "800+", icon: GitCommit, subtext: "Estimated" },
  ]);

  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await api.getGitHubProfile();
        setStats([
          { label: "Public Repos", value: String(profile.public_repos), icon: FolderOpen, subtext: "Source code" },
          { label: "Followers", value: String(profile.followers), icon: Users, subtext: "Community" },
          { label: "Following", value: String(profile.following), icon: Users, subtext: "Network" },
          { label: "Joined", value: new Date(profile.created_at).getFullYear().toString(), icon: Star, subtext: "Veteran" },
        ]);

        const repos = await api.getGitHubRepos();
        // Transform repos to activity for display
        const activity = repos.slice(0, 4).map((repo: any) => ({
          type: "commit", // using repo update mostly
          message: `Updated ${repo.name}`,
          time: new Date(repo.updated_at).toLocaleDateString(),
          repo: repo.language || "Code"
        }));
        setRecentActivity(activity);
      } catch (e) {
        console.error("Failed to fetch GitHub data", e);
      }
    };
    fetchData();
  }, []);

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="text-primary font-mono text-sm tracking-wider">// CONTRIBUTIONS</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Code <span className="text-primary">Activity</span>
          </h2>
          <p className="text-muted-foreground mt-2">Where bugs become features</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Contribution Heatmap */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-colors group"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <Github className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Contribution Graph</h3>
                <p className="text-xs text-muted-foreground font-mono">Visualized activity (Mock)</p>
              </div>
            </div>

            {/* Heatmap grid */}
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-[3px] min-w-[700px]">
                {contributions.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-[3px]">
                    {week.map((count, dayIndex) => (
                      <motion.div
                        key={`${weekIndex}-${dayIndex}`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : {}}
                        transition={{ delay: 0.3 + weekIndex * 0.01 + dayIndex * 0.005 }}
                        className={`w-[10px] h-[10px] rounded-sm ${getContributionColor(count)} cursor-pointer transition-all hover:ring-2 hover:ring-primary/50 hover:scale-150`}
                        onMouseEnter={() => setHoveredCell({ week: weekIndex, day: dayIndex })}
                        onMouseLeave={() => setHoveredCell(null)}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
              <span className="font-mono">Less</span>
              <div className="flex gap-1">
                {[0, 2, 4, 6, 8].map((level) => (
                  <div
                    key={level}
                    className={`w-[10px] h-[10px] rounded-sm ${getContributionColor(level)}`}
                  />
                ))}
              </div>
              <span className="font-mono">More</span>
            </div>

            {hoveredCell && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-center text-xs text-muted-foreground font-mono"
              >
                {contributions[hoveredCell.week][hoveredCell.day]} contributions
              </motion.div>
            )}
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: -5 }}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 hover:border-primary/30 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <stat.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                      <span className="text-xl font-bold font-mono text-foreground">{stat.value}</span>
                    </div>
                    <p className="text-xs text-muted-foreground/60 font-mono mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {stat.subtext}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-colors"
        >
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            Recent Updates
            <span className="text-xs text-muted-foreground font-mono ml-2">// GitHub Repos</span>
          </h3>
          <div className="space-y-3">
            {recentActivity.length > 0 ? recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-sm group cursor-pointer"
              >
                <div className={`w-2 h-2 rounded-full ${activity.type === "commit" ? "bg-primary" : "bg-accent"}`} />
                <span className="text-muted-foreground font-mono text-xs">{activity.time}</span>
                <span className="text-foreground group-hover:text-primary transition-colors truncate flex-1">
                  {activity.message}
                </span>
                <span className="text-xs text-muted-foreground/60 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                  {activity.repo}
                </span>
              </motion.div>
            )) : <p className="text-sm text-muted-foreground">Loading activity...</p>}
          </div>
        </motion.div>

        {/* Fun footer text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-xs text-muted-foreground/40 font-mono mt-6"
        >
          * Activity visuals are simulated. Stats are real from GitHub.
        </motion.p>
      </div>
    </section>
  );
};

export default GithubActivity;
