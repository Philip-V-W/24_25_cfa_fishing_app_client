import type {Metadata} from "next";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import {ThemeProvider} from "@/components/providers/ThemeProvider";
import localFont from "next/font/local";


const inter = localFont({
    src: "./fonts/Inter.ttf",
    variable: "--font-inter",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Fishing Store",
    description: "Your one-stop shop for fishing equipment",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} min-h-screen bg-white dark:bg-dark-bg 
                       text-gray-900 dark:text-gray-100`}>
        <ThemeProvider>
            <nav className="fixed top-0 left-0 right-0 z-50">
                <Navbar />
            </nav>

            <main className="container mx-auto px-4 pt-24 pb-8">
                {children}
            </main>

            <footer className="bg-gray-800 dark:bg-dark-card text-white">
            </footer>
        </ThemeProvider>
        </body>
        </html>
    );
}