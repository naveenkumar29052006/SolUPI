import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Loader from '../components/ui/Loader';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import CursorGlow from '../components/ui/CursorGlow';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SolUPI - Buy Solana with UPI Instantly",
  description: "The fastest way to convert INR to SOL using UPI. Secure, private, and blazing fast. No KYC required for small amounts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Loader />
        <AnimatedBackground />
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
