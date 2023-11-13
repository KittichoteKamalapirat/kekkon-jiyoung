import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jiyoung & Rodrigo",
  description: "Jiyoung & Rodrigo Wedding Invitation",

  openGraph: {
    title: "Jiyoung & Rodrigo",
    description: "Jiyoung & Rodrigo Wedding Invitation",
    url: "https://kekkon-jiyoung.vercel.app",
    type: "website",
    images: "/images/logo/android-chrome-512x512.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jiyoung & Rodrigo",
    description: "Jiyoung & Rodrigo Wedding Invitation",
    creator: "@Shaneinsane6",
    images: "/images/logo/android-chrome-512x512.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
