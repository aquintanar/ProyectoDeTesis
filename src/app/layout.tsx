import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Nunito} from 'next/font/google'
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import Auth from "./pages/Auth";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AIESEC",
  description: "AIESEC Opportunities",
};
const font = Nunito({
  subsets:["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body
       
      >
        
        
        
          {children} 
        
      </body>
    </html>
  );
}
