import Navigation from "../component/navigation/Navigation";
import "../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spotieasy - Manage your Spotify playlists easily",
  description: "Easily manage your Spotify playlists",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <Navigation />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
