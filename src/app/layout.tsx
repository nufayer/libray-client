import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LibRay - Your Digital Bookstore",
  description: "Discover, browse, and order your favorite books from our curated collection.",
  keywords: ["books", "bookstore", "online bookstore", "ebooks", "reading"],
  authors: [{ name: "LibRay" }],
  creator: "LibRay",
  publisher: "LibRay",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://libray.com",
    title: "LibRay - Your Digital Bookstore",
    description: "Discover, browse, and order your favorite books from our curated collection.",
    siteName: "LibRay",
  },
  twitter: {
    card: "summary_large_image",
    title: "LibRay - Your Digital Bookstore",
    description: "Discover, browse, and order your favorite books from our curated collection.",
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}