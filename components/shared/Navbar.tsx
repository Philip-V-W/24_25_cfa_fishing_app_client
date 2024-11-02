"use client";

import Link from "next/link";
import {useState, useEffect} from "react";
import {useTheme} from "@/components/providers/ThemeProvider";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const {theme, toggleTheme} = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled
                ? 'bg-white/80 dark:bg-dark-card/80 backdrop-blur-lg shadow-md'
                : 'bg-white dark:bg-dark-card'
        }`}>
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="text-xl font-bold text-primary-600 dark:text-primary-400">
                        Fishing Store
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/products"
                            className="text-gray-700 dark:text-gray-300 hover:text-primary-600
                         dark:hover:text-primary-400 transition-colors"
                        >
                            Shop
                        </Link>
                        <Link
                            href="/contests"
                            className="text-gray-700 dark:text-gray-300 hover:text-primary-600
                         dark:hover:text-primary-400 transition-colors"
                        >
                            Contests
                        </Link>
                        <Link
                            href="/permits"
                            className="text-gray-700 dark:text-gray-300 hover:text-primary-600
                         dark:hover:text-primary-400 transition-colors"
                        >
                            Permits
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? '🌞' : '🌙'}
                        </button>
                        <Link
                            href="/login"
                            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600
                         dark:hover:text-primary-400 transition-colors"
                        >
                            Login
                        </Link>
                        <Link
                            href="/register"
                            className="px-4 py-2 bg-primary-600 dark:bg-primary-500 text-white rounded-lg
                         hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors"
                        >
                            Register
                        </Link>
                    </div>

                    <button
                        className="md:hidden p-2 rounded-lg"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}/>
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden pb-4 space-y-4">
                        <Link
                            href="/products"
                            className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600
                         dark:hover:text-primary-400"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Shop
                        </Link>
                        <Link
                            href="/contests"
                            className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600
                         dark:hover:text-primary-400"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Contests
                        </Link>
                        <Link
                            href="/permits"
                            className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600
                         dark:hover:text-primary-400"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Permits
                        </Link>
                        <Link
                            href="/login"
                            className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600
                         dark:hover:text-primary-400"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Login
                        </Link>
                        <Link
                            href="/register"
                            className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600
                         dark:hover:text-primary-400"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Register
                        </Link>
                        <button
                            onClick={() => {
                                toggleTheme();
                                setIsMenuOpen(false);
                            }}
                            className="w-full text-left py-2 text-gray-700 dark:text-gray-300
                         hover:text-primary-600 dark:hover:text-primary-400"
                        >
                            {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}