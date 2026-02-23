import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "VELOCITA — Mission Control",
  description:
    "A cinematic journey through code. Java, Spring Boot, AI integration, and interactive web technologies — all aboard one vessel.",
  keywords: ["Java", "Spring Boot", "Next.js", "Three.js", "GSAP", "AI", "Velocita"],
  openGraph: {
    title: "VELOCITA — Mission Control",
    description: "A cinematic journey through code. Enter the cockpit.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
