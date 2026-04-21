import { motion } from 'framer-motion';
import { TrendingUp, Users, FolderKanban, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/store/useAuthStore';

const STATS = [
  { label: 'Total Projects', value: '12', change: '+2 this month', icon: FolderKanban, color: 'text-primary' },
  { label: 'Active Campaigns', value: '5', change: '3 completing soon', icon: TrendingUp, color: 'text-blue-400' },
  { label: 'Team Members', value: '8', change: '+1 new member', icon: Users, color: 'text-violet-400' },
  { label: 'Tasks Completed', value: '94%', change: 'Last 30 days', icon: CheckCircle2, color: 'text-emerald-400' },
];

const RECENT = [
  { name: 'SEO Revamp Q2', status: 'active', progress: 72 },
  { name: 'Social Media Campaign', status: 'active', progress: 45 },
  { name: 'Email Newsletter Flow', status: 'paused', progress: 30 },
  { name: 'PPC Google Ads', status: 'completed', progress: 100 },
];

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-primary/20 text-primary',
  paused: 'bg-yellow-500/20 text-yellow-400',
  completed: 'bg-emerald-500/20 text-emerald-400',
};

export default function DashboardHome() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Good morning, {user?.name?.split(' ')[0] ?? 'there'} 👋
        </h1>
        <p className="text-muted-foreground mt-1">Here's what's happening with your campaigns today.</p>
      </div>

      {/* Stats bento grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, ease: 'easeOut', duration: 0.4 }}
            >
              <Card className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Recent projects */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold text-foreground">Recent Projects</CardTitle>
          <a href="/dashboard/projects" className="flex items-center gap-1 text-xs text-primary hover:underline">
            View all <ArrowUpRight className="w-3 h-3" />
          </a>
        </CardHeader>
        <CardContent className="space-y-4">
          {RECENT.map((project) => (
            <div key={project.name} className="flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-sm font-medium text-foreground truncate">{project.name}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-2 shrink-0 ${STATUS_COLORS[project.status]}`}>
                    {project.status}
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5">
                  <div
                    className="bg-primary h-1.5 rounded-full transition-all duration-700"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
              <span className="text-xs text-muted-foreground w-9 text-right shrink-0">{project.progress}%</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
