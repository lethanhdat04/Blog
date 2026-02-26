import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { posts } from "#site/content";
import { FileText, FolderKanban, MessageSquare, Eye } from "lucide-react";

async function getStats() {
  try {
    const [projectCount, messageCount, totalViews] = await Promise.all([
      prisma.project.count(),
      prisma.contactSubmission.count(),
      prisma.postMeta.aggregate({ _sum: { views: true } }),
    ]);

    return {
      posts: posts.filter((p) => p.published).length,
      projects: projectCount,
      messages: messageCount,
      views: totalViews._sum.views || 0,
    };
  } catch {
    return {
      posts: posts.filter((p) => p.published).length,
      projects: 0,
      messages: 0,
      views: 0,
    };
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const statCards = [
    {
      title: "Blog Posts",
      value: stats.posts,
      icon: FileText,
      description: "Published posts",
    },
    {
      title: "Projects",
      value: stats.projects,
      icon: FolderKanban,
      description: "Total projects",
    },
    {
      title: "Messages",
      value: stats.messages,
      icon: MessageSquare,
      description: "Contact submissions",
    },
    {
      title: "Total Views",
      value: stats.views.toLocaleString(),
      icon: Eye,
      description: "All-time page views",
    },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
