import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { SectionHeading } from "@/components/layout/section-heading";
import { siteConfig } from "@/config/site";
import { socialLinks } from "@/config/social";
import { FadeIn } from "@/components/motion/fade-in";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with me. I'd love to hear from you!",
};

export default function ContactPage() {
  return (
    <div className="container py-12 md:py-24">
      <SectionHeading
        title="Contact"
        description="Have a question or want to work together? Drop me a message!"
      />

      <div className="mx-auto mt-12 grid max-w-5xl gap-12 lg:grid-cols-2">
        <FadeIn direction="left">
          <ContactForm />
        </FadeIn>

        <FadeIn direction="right" delay={0.2}>
          <div className="space-y-8">
            <div>
              <h3 className="mb-4 text-xl font-semibold">Get in Touch</h3>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5" />
                  <a
                    href={`mailto:${siteConfig.author.email}`}
                    className="hover:text-foreground"
                  >
                    {siteConfig.author.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5" />
                  <span>{siteConfig.author.location}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold">Social</h3>
              <div className="flex gap-4">
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
                      <Icon className="h-6 w-6" />
                      <span className="sr-only">{link.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold">Availability</h3>
              <p className="text-muted-foreground">
                I&apos;m currently open to freelance projects, consulting, and
                full-time opportunities. Feel free to reach out to discuss how
                we can work together.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
