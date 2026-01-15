import SuspenseWrapper from './SuspenseWrapper';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Haven Estates | Premium Real Estate Properties",
  description: "Discover exceptional homes and investment opportunities with Haven Estates. Find your dream property in the most sought-after locations. Professional real estate services with transparency and excellence.",
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
  verification: {
    google: 'google-site-verification-token', // Replace with actual token
    yahoo: 'yahoo-site-verification-token',   // Replace with actual token
    other: {
      'msvalidate.01': 'bing-verification-token', // Replace with actual token
    },
  },
};

export default function Home() {
  return <SuspenseWrapper />;
}
