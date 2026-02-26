import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create tags
  const tags = await Promise.all(
    ["React", "Next.js", "TypeScript", "Node.js", "Python", "AI/ML", "DevOps", "Database"].map(
      (name) =>
        prisma.tag.upsert({
          where: { slug: name.toLowerCase().replace(/[/\s]/g, "-") },
          update: {},
          create: {
            name,
            slug: name.toLowerCase().replace(/[/\s]/g, "-"),
          },
        })
    )
  );

  // Create projects
  await prisma.project.upsert({
    where: { slug: "ai-code-assistant" },
    update: {},
    create: {
      title: "AI Code Assistant",
      slug: "ai-code-assistant",
      description:
        "An intelligent code assistant powered by large language models that helps developers write, review, and debug code more efficiently.",
      image: "/images/projects/ai-assistant.png",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/datto/ai-code-assistant",
      techStack: ["Next.js", "TypeScript", "OpenAI", "Prisma", "PostgreSQL"],
      featured: true,
      order: 1,
      status: "published",
      tags: {
        create: [
          { tag: { connect: { slug: "react" } } },
          { tag: { connect: { slug: "next.js" } } },
          { tag: { connect: { slug: "typescript" } } },
          { tag: { connect: { slug: "ai-ml" } } },
        ],
      },
    },
  });

  await prisma.project.upsert({
    where: { slug: "devops-dashboard" },
    update: {},
    create: {
      title: "DevOps Dashboard",
      slug: "devops-dashboard",
      description:
        "A comprehensive monitoring dashboard for CI/CD pipelines, container orchestration, and infrastructure health metrics.",
      image: "/images/projects/devops-dashboard.png",
      githubUrl: "https://github.com/datto/devops-dashboard",
      techStack: ["React", "Node.js", "Docker", "Kubernetes", "Grafana"],
      featured: true,
      order: 2,
      status: "published",
      tags: {
        create: [
          { tag: { connect: { slug: "react" } } },
          { tag: { connect: { slug: "node.js" } } },
          { tag: { connect: { slug: "devops" } } },
        ],
      },
    },
  });

  await prisma.project.upsert({
    where: { slug: "data-pipeline-engine" },
    update: {},
    create: {
      title: "Data Pipeline Engine",
      slug: "data-pipeline-engine",
      description:
        "A scalable ETL pipeline engine for processing and transforming large datasets with real-time monitoring.",
      image: "/images/projects/data-pipeline.png",
      githubUrl: "https://github.com/datto/data-pipeline",
      techStack: ["Python", "Apache Kafka", "PostgreSQL", "Redis", "Docker"],
      featured: false,
      order: 3,
      status: "published",
      tags: {
        create: [
          { tag: { connect: { slug: "python" } } },
          { tag: { connect: { slug: "database" } } },
          { tag: { connect: { slug: "devops" } } },
        ],
      },
    },
  });

  // Create experience
  await prisma.experience.upsert({
    where: { id: "exp-1" },
    update: {},
    create: {
      id: "exp-1",
      company: "TechCorp AI",
      position: "Senior Software Engineer",
      location: "San Francisco, CA",
      startDate: new Date("2023-01-01"),
      current: true,
      description: "Leading development of AI-powered software solutions.",
      highlights: [
        "Led development of an AI code assistant serving 10k+ developers",
        "Architected microservices infrastructure reducing deployment time by 60%",
        "Mentored team of 5 junior engineers",
      ],
      techStack: ["Next.js", "TypeScript", "Python", "AWS", "Docker"],
      order: 1,
    },
  });

  await prisma.experience.upsert({
    where: { id: "exp-2" },
    update: {},
    create: {
      id: "exp-2",
      company: "StartupX",
      position: "Full Stack Developer",
      location: "Remote",
      startDate: new Date("2021-03-01"),
      endDate: new Date("2022-12-31"),
      description: "Built and maintained full-stack web applications.",
      highlights: [
        "Built real-time collaboration features using WebSocket",
        "Optimized database queries reducing page load by 40%",
        "Implemented CI/CD pipeline with automated testing",
      ],
      techStack: ["React", "Node.js", "PostgreSQL", "Redis", "GitHub Actions"],
      order: 2,
    },
  });

  await prisma.experience.upsert({
    where: { id: "exp-3" },
    update: {},
    create: {
      id: "exp-3",
      company: "WebDev Agency",
      position: "Junior Developer",
      location: "New York, NY",
      startDate: new Date("2019-06-01"),
      endDate: new Date("2021-02-28"),
      description: "Developed responsive web applications for various clients.",
      highlights: [
        "Delivered 15+ client projects on time and within budget",
        "Introduced component library reducing development time by 30%",
        "Migrated legacy jQuery applications to React",
      ],
      techStack: ["React", "JavaScript", "CSS", "Firebase", "Figma"],
      order: 3,
    },
  });

  // Create skills
  const skills = [
    { name: "React", category: "Frontend", level: 95, order: 1 },
    { name: "Next.js", category: "Frontend", level: 90, order: 2 },
    { name: "TypeScript", category: "Frontend", level: 92, order: 3 },
    { name: "Tailwind CSS", category: "Frontend", level: 88, order: 4 },
    { name: "Node.js", category: "Backend", level: 88, order: 5 },
    { name: "Python", category: "Backend", level: 80, order: 6 },
    { name: "PostgreSQL", category: "Backend", level: 85, order: 7 },
    { name: "Prisma", category: "Backend", level: 87, order: 8 },
    { name: "Docker", category: "DevOps", level: 78, order: 9 },
    { name: "AWS", category: "DevOps", level: 72, order: 10 },
    { name: "Git", category: "Tools", level: 90, order: 11 },
    { name: "Figma", category: "Tools", level: 65, order: 12 },
  ];

  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { id: `skill-${skill.order}` },
      update: skill,
      create: { id: `skill-${skill.order}`, ...skill },
    });
  }

  // Create sample post meta
  await prisma.postMeta.upsert({
    where: { slug: "blog/hello-world" },
    update: {},
    create: {
      slug: "blog/hello-world",
      views: 42,
      likes: 7,
    },
  });

  console.log("Seed data created successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
