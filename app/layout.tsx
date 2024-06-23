import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "./components/nav/Navbar";
import Footer from "./components/footer/Footer";
import { Toaster } from "react-hot-toast";
import CartProvider from "../Providers/CartProvider";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { safeUser } from "@/Types";
import OfflineDetector from "./components/OfflineDetector"
import ScrollHandler from "./components/nav/ScrollHandler";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Ecommerce Website",
  description: "Ecommerce App",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser: safeUser | null = await getCurrentUser();

  return (
    <html lang="en">
      <body className={`${poppins.className} text-slate-700`}>
        <Toaster
          toastOptions={{
            style: {
              background: "rgb(51 65 85)",
              color: "white",
            },
          }}
        />
        <OfflineDetector />
        <CartProvider currentUser={currentUser}>
          <div className="flex flex-col min-h-screen">
            <ScrollHandler>
              <Navbar />
            </ScrollHandler>
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
