import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import "./globals.css";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeRegistry from '@/components/ThemeRegistry';
import SmoothScroll from '@/components/SmoothScroll';
import AmbientCanvas from '@/components/AmbientCanvas';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "A cinematic, interactive portfolio of Natthariga Somit (Noey), Software Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeRegistry>
          <AmbientCanvas />
          <CustomCursor />
          <ScrollProgress />
          <SmoothScroll>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <Navbar />
              <Toolbar />
              <Box component="main" sx={{ flexGrow: 1 }}>
                {children}
              </Box>
              <Footer />
            </Box>
          </SmoothScroll>
        </ThemeRegistry>
      </body>
    </html>
  );
}
