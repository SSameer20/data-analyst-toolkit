import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "./components/site-frame";
import "./globals.css";


export const metadata: Metadata = {
  metadataBase: new URL("https://ssameer20.github.io/data-analyst-plugin/"),
  title: "Data Analyst Toolkit — Practical skills for better analysis",
  description: "Reusable skills for data quality, cleaning, feature engineering, SQL, and business intelligence reporting.",
  icons: { icon: "/icon.png" },
  openGraph: {
    title: "Data Analyst Toolkit",
    description: "Practical, reusable guidance for data analysis workflows.",
    type: "website",
    images: [{ url: "/social-media-preview.jpg", width: 1241, height: 620, alt: "Data Analyst Toolkit skills and analysis workflow" }],
  },
  twitter: {
    card: "summary_large_image",
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
