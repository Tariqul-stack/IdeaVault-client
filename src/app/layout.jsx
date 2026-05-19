import { Geist, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar/Navbar";
import ThemeProvider from "../components/theme/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata = {
  title: "IdeaVault",
  description: "Share and discover startup ideas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
            <Navbar />
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
