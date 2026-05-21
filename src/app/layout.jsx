import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "../components/navbar/Navbar";
import ThemeProvider from "../components/theme/ThemeProvider";
import { Toaster } from "react-hot-toast";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "IdeaVault",
    template: "%s | IdeaVault",
  },
  description: "Share and discover startup ideas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.className} ${dmSans.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="relative min-h-screen bg-background text-foreground">
            <Navbar />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "rgba(17,17,27,0.95)",
                  color: "#fff",
                  border: "1px solid rgba(139,118,255,0.3)",
                  borderRadius: "14px",
                  backdropFilter: "blur(12px)",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  padding: "12px 16px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                },
                success: {
                  iconTheme: {
                    primary: "#8b76ff",
                    secondary: "#fff",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "#ef4444",
                    secondary: "#fff",
                  },
                },
              }}
            />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
