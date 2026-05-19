import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "../components/navbar/Navbar";
import ThemeProvider from "../components/theme/ThemeProvider";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
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
        className={`${dmSans.className} ${dmSans.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
