"use client"

// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import { Providers } from "./providers";
import NavbarComponent from "@/components/Navbar/page";

const inter = Inter({ subsets: ["latin"] });

const disableNavbar = ['/login', '/register'];

// export const metadata: Metadata = {
//   title: "Transmedic",
//   description: "Car Rental App",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <html lang="en" className='dark'>
      <body className={inter.className}>
        <Providers>
          { !disableNavbar.includes(pathname) && <NavbarComponent /> }
          { children }
        </Providers>
      </body>
    </html>
  );
}
