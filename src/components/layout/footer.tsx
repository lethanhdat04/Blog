import Link from "next/link";
import { siteConfig } from "@/config/site";
import { socialLinks } from "@/config/social";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-8 md:py-12">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <Link href="/" className="text-lg font-bold">
              {siteConfig.name}
            </Link>
            <p className="text-sm text-muted-foreground">
              {siteConfig.author.bio}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{link.name}</span>
                </a>
              );
            })}
          </div>
        </div>
        <Separator className="my-6" />
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
