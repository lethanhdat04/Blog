import { NextResponse } from "next/server";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME;

  if (!token || !username) {
    // Return placeholder data
    return NextResponse.json(generatePlaceholderData());
  }

  try {
    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                  contributionLevel
                }
              }
            }
          }
        }
      }
    `;

    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { username } }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json(generatePlaceholderData());
    }

    const data = await res.json();
    const calendar =
      data.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      return NextResponse.json(generatePlaceholderData());
    }

    const levelMap: Record<string, 0 | 1 | 2 | 3 | 4> = {
      NONE: 0,
      FIRST_QUARTILE: 1,
      SECOND_QUARTILE: 2,
      THIRD_QUARTILE: 3,
      FOURTH_QUARTILE: 4,
    };

    const contributions: ContributionDay[] = calendar.weeks.flatMap(
      (week: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }) =>
        week.contributionDays.map(
          (day: { date: string; contributionCount: number; contributionLevel: string }) => ({
            date: day.date,
            count: day.contributionCount,
            level: levelMap[day.contributionLevel] || 0,
          })
        )
    );

    return NextResponse.json({
      contributions,
      total: calendar.totalContributions,
    });
  } catch {
    return NextResponse.json(generatePlaceholderData());
  }
}

function generatePlaceholderData() {
  const contributions: ContributionDay[] = [];
  const today = new Date();
  let total = 0;

  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const rand = Math.random();
    const level = (rand < 0.3 ? 0 : rand < 0.5 ? 1 : rand < 0.7 ? 2 : rand < 0.9 ? 3 : 4) as 0 | 1 | 2 | 3 | 4;
    const count = level * Math.floor(Math.random() * 5 + 1);
    total += count;
    contributions.push({
      date: date.toISOString().split("T")[0],
      count,
      level,
    });
  }

  return { contributions, total };
}
