import type { Metadata } from "next";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "PageGrade",
  description: "Structured landing page grading for clarity, conversion, and trust."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

