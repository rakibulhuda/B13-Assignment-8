import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "BoiGhor – Your Digital Library",
  description: "Explore, discover, and borrow books digitally. A seamless modern library experience.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en">
      <body>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#17171f",
              color: "#f4f3ff",
              border: "1px solid rgba(79,57,246,0.3)",
              borderRadius: "10px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.875rem",
            },
            success: { iconTheme: { primary: "#4f39f6", secondary: "#f4f3ff" } },
            error: { iconTheme: { primary: "#f87171", secondary: "#f4f3ff" } },
          }}
      />
      </body>
      </html>
  );
}
