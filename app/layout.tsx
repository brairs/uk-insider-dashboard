import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "UK Market Dashboard",
  description:
    "Track UK stocks, ETFs, director dealings and hedge-fund short interest.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-slate-950 text-slate-50">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
