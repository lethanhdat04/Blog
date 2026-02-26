import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "@/providers";
import { BackToTop } from "@/components/shared/back-to-top";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Datto - AI-powered Software",
    template: "%s | Datto",
  },
  description:
    "Developer portfolio and blog by Datto. Showcasing projects, technical articles, and experience in AI-powered software development.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    title: "Datto - AI-powered Software",
    description:
      "Developer portfolio and blog by Datto. Showcasing projects, technical articles, and experience in AI-powered software development.",
    type: "website",
    locale: "en_US",
    siteName: "Datto",
  },
  twitter: {
    card: "summary_large_image",
    title: "Datto - AI-powered Software",
    description:
      "Developer portfolio and blog by Datto.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Providers>
          {children}
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
