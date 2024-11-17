import type {Metadata} from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import {ThemeProvider} from "@/components/providers/ThemeProvider";
import localFont from "next/font/local";
import {AuthProvider} from "@/context/AuthContext";
import React from "react";
import {CartProvider} from "@/context/CartContext";
import {Footer} from "@/components/layout/Footer";

const inter = localFont({
    src: "../public/fonts/Inter.ttf",
    variable: "--font-inter",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Fisherman's Depot",
    description: "Your premier fishing store",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} min-h-screen bg-white dark:bg-dark-bg 
                text-gray-900 dark:text-gray-100 flex flex-col`}>
        <AuthProvider>
            <ThemeProvider>
                <CartProvider>
                    <nav className="fixed top-0 left-0 right-0 z-50">
                        <Navbar/>
                    </nav>
                    <main className="flex-1 container mx-auto px-4 pt-24 pb-8">
                        {children}
                    </main>
                    <Footer/>
                </CartProvider>
            </ThemeProvider>
        </AuthProvider>
        </body>
        </html>
    );
}