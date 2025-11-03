import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GlobalCursorEffect } from "@/components/GlobalCursorEffect";
import { GlobalSpaceshipEffect } from "@/components/GlobalSpaceshipEffect";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Devspec | Fullstack Developer",
  description: "Modern portfolio showcasing creative frontend development with premium design and smooth interactions.",
  keywords: ["frontend developer", "web developer", "portfolio", "React", "Next.js"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Devspec | Fullstack Developer",
    description: "Modern portfolio with premium design and smooth interactions",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          {/* Global Cursor Effect */}
          <GlobalCursorEffect />
          {/* Global Spaceship Effect */}
          <GlobalSpaceshipEffect />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
