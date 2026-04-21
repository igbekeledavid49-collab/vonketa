import { useState } from 'react';
import { Plus, Search, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

type ProjectStatus = 'active' | 'paused' | 'completed';

interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  createdAt: string;
}

const INITIAL: Project[] = [
  { id: '1', title: 'SEO Revamp Q2', description: 'Full technical SEO audit and on-page optimisation.', status: 'active', createdAt: '2026-03-01' },
  { id: '2', title: 'Social Media Campaign', description: 'Multi-platform brand awareness push for Q2.', status: 'active', createdAt: '2026-03-10' },
  { id: '3', title: 'Email Newsletter Flow', description: 'Drip campaign for lead nurturing.', status: 'paused', createdAt: '2026-02-20' },
  { id: '4', title: 'PPC Google Ads', description: 'Paid search campaigns for product launches.', status: 'completed', createdAt: '2026-01-15' },
  { id: '5', title: 'Content Strategy 2026', description: 'Quarterly blog and video content roadmap.', status: 'active', createdAt: '2026-04-01' },
];

const STATUS_STYLES: Record<ProjectStatus, string> = {
  active: 'bg-primary/15 text-primary border-primary/30',
  paused: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  completed: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
};

const BLANK = { title: '', description: '', status: 'active' as ProjectStatus };

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(INITIAL);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<ProjectStatus | 'all'>('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(BLANK);

  const filtered = projects.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || p.status === filter;
    return matchSearch && matchFilter;
  });

  function openCreate() {
    setEditing(null);
    setForm(BLANK);
    setDialogOpen(true);
  }

  function openEdit(p: Project) {
    setEditing(p);
    setForm({ title: p.title, description: p.description, status: p.status });
    setDialogOpen(true);
  }

  function handleSave() {
    if (!form.title.trim()) { toast.error('Title is required'); return; }
    if (editing) {
      setProjects((prev) => prev.map((p) => p.id === editing.id ? { ...p, ...form } : p));
      toast.success('Project updated');
    } else {
      const newProject: Project = {
        id: Date.now().toString(),
        ...form,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setProjects((prev) => [newProject, ...prev]);
      toast.success('Project created');
    }
    setDialogOpen(false);
  }

  function handleDelete(id: string) {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    toast.success('Project deleted');
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{projects.length} total projects</p>
        </div>
        <Button onClick={openCreate} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-1.5" /> New Project
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-secondary border-border"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'active', 'paused', 'completed'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                filter === s ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Projects list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-sm">No projects found.</p>
          </div>
        ) : (
          filtered.map((project) => (
            <div
              key={project.id}
              className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:border-primary/30 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-foreground">{project.title}</p>
                  <Badge className={`text-xs border ${STATUS_STYLES[project.status]}`}>
                    {project.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{project.description}</p>
                <p className="text-xs text-muted-foreground/60 mt-1">Created {project.createdAt}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors shrink-0"
                  aria-label="Project options"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-36">
                  <DropdownMenuItem onClick={() => openEdit(project)} className="gap-2 cursor-pointer">
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDelete(project.id)}
                    className="gap-2 cursor-pointer text-destructive focus:text-destructive"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))
        )}
      </div>

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit Project' : 'New Project'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Title</Label>
              <Input
                placeholder="Project title"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="bg-secondary border-border"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Input
                placeholder="Brief description"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className="bg-secondary border-border"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Status</Label>
              <div className="flex gap-2">
                {(['active', 'paused', 'completed'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, status: s }))}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                      form.status === s ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} className="border-border">
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90">
              {editing ? 'Save changes' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
