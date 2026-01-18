import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider"; // Import the provider
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blogify | Portfolio",
  description: "A modern blogging platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Wrap everything in AuthProvider so Navbar and Pages can access session */}
        <AuthProvider>
          <Toaster
            toastOptions={{
              success: {
                style: {
                  background: "white",
                  // padding: "16px",
                  // color: "#FFA500",
                },
                iconTheme: {
                  primary: "#EF6C00",
                  secondary: "white",
                },
              },
              error: {
                style: {
                  background: "red",
                },
              },
            }}
          />
          <Navbar />
          <main>{children}</main>
          <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}
