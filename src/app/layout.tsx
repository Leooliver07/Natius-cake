import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "./components/header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { OrderCar } from "./components/order";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NatiusCake ",
  description: "Painel de gerenciamento ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
           <Header/>
        <SidebarProvider>
          <AppSidebar/>
          <SidebarTrigger className="cursor-pointer"/>
          <main className="mx-auto">
            
            {children}
          </main>
          <div className="hidden md:inline-flex">
            <OrderCar/>
          </div>
        </SidebarProvider>
        </CartProvider>
       
      
      </body>
    </html>
  );
}
