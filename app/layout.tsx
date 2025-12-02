// layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import BackgroundChart from "./components/BackgroundChart";

export const metadata: Metadata = {
  title: "Market Dashboard",
  description: "Track UK stocks, ETFs & insider activity",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#020617] text-white relative overflow-hidden">
        {/* waves only */}
        <BackgroundChart />
        {children}
      </body>
    </html>
  );
}
