import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "./components/site-frame";
import "./globals.css";
import { SITE_URL } from "./lib/skills";


export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Data Analyst Tools – AI Skills for Data Analysis | Data Analyst Toolkit",
    template: "%s | Data Analyst Toolkit",
  },
  description: "Explore reusable AI-agent skills for data analysts. Assess data quality, clean datasets, engineer features, write SQL, and prepare BI reporting workflows.",
  applicationName: "Data Analyst Toolkit",
  alternates: { canonical: "/" },
  icons: { icon: "/icon.svg", apple: "/icon.png" },
  openGraph: {
    title: "Data Analyst Toolkit — AI Skills for Data Analysts",
    description: "Reusable AI-agent skills for data quality, data cleaning, feature engineering, SQL, and BI reporting workflows.",
    type: "website",
    siteName: "Data Analyst Toolkit",
    locale: "en_US",
    url: "/",
    images: [{ url: "/social-media-preview.jpg", width: 1241, height: 620, alt: "Data Analyst Toolkit analysis route and six skills" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Analyst Toolkit — AI Skills for Data Analysts",
    description: "Reusable AI-agent skills for data quality, cleaning, feature engineering, SQL, and BI reporting.",
    images: ["/social-media-preview.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
