import { redirect } from "next/navigation";
import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import { navConfig } from "@/config/nav";
import { LogOut, Home } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-muted/30">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/admin" className="text-lg font-bold">
            Admin
          </Link>
        </div>
        <nav className="space-y-1 p-4">
          {navConfig.adminNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {item.title}
            </Link>
          ))}
          <hr className="my-4" />
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Home className="h-4 w-4" />
            View Site
          </Link>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </form>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1">
        <header className="flex h-16 items-center justify-between border-b px-6">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {session.user.email}
            </span>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
