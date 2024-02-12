import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import "../styles/globals.css";
import Navbar from "../components/Navbar";

const title = "Business Idea Generator";
const description = "Quickly  Formulate Your Business Vision.";

export const metadata: Metadata = {
  metadataBase: new URL("https://twitter.com"),
  title,
  description,
  openGraph: {
    title,
    description,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}

        <Analytics />
      </body>
    </html>
  );
}
