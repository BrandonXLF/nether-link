import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nether Link",
  description: "Manage Minecraft Nether portal positions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="m-auto max-w-6xl">
          {children}
        </main>
      </body>
    </html>
  );
}
