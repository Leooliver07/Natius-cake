import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "./components/header";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { OrderCar } from "@/app/components/Order/OrderCar";
import { CartProvider } from "@/context/CartContext";
import { UIProvider } from "@/context/UIContext";
import { Toaster } from "sonner";

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
          <UIProvider>
            <AppSidebar />
              <div className="flex">
                <div className="flex-1">
                  <Header />
                  <main>
                    {children}
                  <Toaster richColors/>
                  </main>

                </div>
                <div className="hidden md:inline-flex">
                  <OrderCar />
                
                </div>
                
              </div>

              
        
          </UIProvider> 
        </CartProvider>
       
      
      </body>
    </html>
  );
}
