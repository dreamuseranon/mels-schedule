import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mel's Schedule",
  description: "Personal productivity dashboard for nursing school",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
