import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/src/Provider/ReduxProvider";
import { GlobalLoginToast } from "@/src/components/GlobalLoginToast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Haven Estates | Premium Real Estate Properties",
  description: "Discover exceptional homes and investment opportunities with Haven Estates. Find your dream property in the most sought-after locations. Professional real estate services with transparency and excellence.",
  icons: {
    icon: "/favicon.ico", // Default favicon
    shortcut: "/favicon-16x16.png", // 16x16 icon
    apple: "/apple-touch-icon.png", // Apple touch icon
  },
  keywords: ["real estate", "properties", "homes for sale", "investment properties", "luxury homes", "Bangladesh property", "Dhaka real estate"],
  authors: [{ name: "Haven Estates", url: "https://www.havenestates.com" }],
  creator: "Haven Estates",
  publisher: "Haven Estates",
  openGraph: {
    title: "Haven Estates | Premium Real Estate Properties",
    description: "Discover exceptional homes and investment opportunities with Haven Estates. Find your dream property in the most sought-after locations.",
    url: "https://www.havenestates.com",
    siteName: "Haven Estates",
    images: [
      {
        url: "/api/placeholder/1200/630", // Placeholder for actual image
        width: 1200,
        height: 630,
        alt: "Haven Estates - Premium Real Estate",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Haven Estates | Premium Real Estate Properties",
    description: "Discover exceptional homes and investment opportunities with Haven Estates. Find your dream property in the most sought-after locations.",
    images: ["/api/placeholder/1200/630"], // Placeholder for actual image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://www.havenestates.com/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          {children}
          <GlobalLoginToast />
        </ReduxProvider>
      </body>
    </html>
  );
}
