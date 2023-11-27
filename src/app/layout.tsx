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
    url: "https://parkandrotela.com",
    type: "website",
    images: [
      {
        url: "https://parkandrotela.com/images/opengraph.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jiyoung & Rodrigo",
    description: "Jiyoung & Rodrigo Wedding Invitation",
    creator: "@Shaneinsane6",
    images: [
      {
        url: "https://parkandrotela.com/images/opengraph.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* below works, above doesn't work */}
      <meta property="og:image" content="/images/opengraph.webp" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
