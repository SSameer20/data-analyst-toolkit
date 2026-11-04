import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "./components/site-frame";
import "./globals.css";


export const metadata: Metadata = {
  title: "Data Analyst Toolkit — Practical skills for better analysis",
  description: "Reusable skills for data quality, cleaning, feature engineering, SQL, and business intelligence reporting.",
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
