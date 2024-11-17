'use client';

import Link from "next/link";
import {useState, useEffect, useRef} from "react";
import {useTheme} from "@/components/providers/ThemeProvider";
import {useAuth} from "@/context/AuthContext";
import {useRouter} from "next/navigation";
import {useCart} from "@/context/CartContext";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
    const {theme, toggleTheme} = useTheme();
    const {user, logout, isAdmin} = useAuth();
    const router = useRouter();
    const {cart} = useCart();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsAccountDropdownOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        logout();
        router.push('/');
        setIsMenuOpen(false);
        setIsAccountDropdownOpen(false);
        window.location.href = '/';
    };

    const accountMenuItems = [
        {label: 'My Account', href: '/account'},
        {label: 'Addresses', href: '/account/addresses'},
        {label: 'Orders', href: '/account/orders'},
        {label: 'Permits', href: '/account/permits'},
        {label: 'Contests', href: '/account/contests'},
        {type: 'divider' as const},
        {label: 'Logout', onClick: handleLogout}
    ];

    return (
        <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled
                ? 'bg-white/80 dark:bg-dark-card/80 backdrop-blur-lg shadow-md'
                : 'bg-white dark:bg-dark-card'
        }`}>
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex">
                        <img src={'/images/logo.png'} alt="logo" className="h-6"/>
                        <Link href="/" className="text-xl font-bold text-primary-600 dark:text-primary-400 ml-1.5">
                            Fisherman's Depot
                        </Link>
                    </div>

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
                            href="/permits"
                            className="text-gray-700 dark:text-gray-300 hover:text-primary-600
                         dark:hover:text-primary-400 transition-colors"
                        >
                            Permits
                        </Link>
                        <Link
                            href="/contests"
                            className="text-gray-700 dark:text-gray-300 hover:text-primary-600
                         dark:hover:text-primary-400 transition-colors"
                        >
                            Contests
                        </Link>
                        {isAdmin && (
                            <Link
                                href="/admin"
                                className="text-red-700 dark:text-red-600 hover:text-gray-700
                         dark:hover:text-gray-300 transition-colors"
                            >
                                Admin
                            </Link>
                        )}
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <>
                                <Link
                                    href="/cart"
                                    className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600
                                                dark:hover:text-primary-400 transition-colors"
                                >
                                    My Cart
                                    {cart.items.length > 0 && (
                                        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary-600
                                                        flex items-center justify-center text-xs text-white">
                                            {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
                                        </span>
                                    )}
                                </Link>
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300
                                                 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                                    >
                                        <span>{user.email}</span>
                                        <svg
                                            className={`w-4 h-4 transition-transform ${isAccountDropdownOpen ? 'rotate-180' : ''}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M19 9l-7 7-7-7"/>
                                        </svg>
                                    </button>

                                    {/* Dropdown Menu */}
                                    {isAccountDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg
                                                      bg-white dark:bg-dark-card border dark:border-dark-border">
                                            <div className="py-1">
                                                {accountMenuItems.map((item, index) => (
                                                    item.type === 'divider' ? (
                                                        <div key={index}
                                                             className="h-px bg-gray-200 dark:bg-dark-border my-1"/>
                                                    ) : item.href ? (
                                                        <Link
                                                            key={index}
                                                            href={item.href}
                                                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300
                                                                     hover:bg-gray-100 dark:hover:bg-dark-bg"
                                                            onClick={() => setIsAccountDropdownOpen(false)}
                                                        >
                                                            {item.label}
                                                        </Link>
                                                    ) : (
                                                        <button
                                                            key={index}
                                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700
                                                                     dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-bg"
                                                            onClick={item.onClick}
                                                        >
                                                            {item.label}
                                                        </button>
                                                    )
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={toggleTheme}
                                    className="p-2 rounded-full"
                                    aria-label="Toggle theme"
                                >
                                    {theme === 'dark' ? '🌞' : '🌙'}
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/auth/login"
                                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600
                                    dark:hover:text-primary-400 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/auth/register"
                                    className="px-4 py-2 bg-primary-600 dark:bg-primary-500 text-white rounded-lg
                                    hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors"
                                >
                                    Register
                                </Link>
                                <button
                                    onClick={toggleTheme}
                                    className="p-2 rounded-full"
                                    aria-label="Toggle theme"
                                >
                                    {theme === 'dark' ? '🌞' : '🌙'}
                                </button>
                            </>
                        )}
                    </div>

                    <button
                        className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300"
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
                        {isAdmin && (
                            <Link
                                href="/admin"
                                className="block py-2 text-red-700 dark:text-red-600 hover:text-gray-700
                         dark:hover:text-gray-300 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Admin
                            </Link>
                        )}

                        {user ? (
                            <>
                                <Link
                                    href="/cart"
                                    className="flex items-center py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600
                                             dark:hover:text-primary-400"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    My Cart
                                    {cart.items.length > 0 && (
                                        <span className="ml-2 h-5 w-5 rounded-full bg-primary-600
                                                     flex items-center justify-center text-xs text-white">
                                            {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
                                        </span>
                                    )}
                                </Link>
                                {accountMenuItems.map((item, index) => (
                                    item.type === 'divider' ? (
                                        <div key={index} className="h-px bg-gray-200 dark:bg-dark-border"/>
                                    ) : item.href ? (
                                        <Link
                                            key={index}
                                            href={item.href}
                                            className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600
                                                     dark:hover:text-primary-400"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <button
                                            key={index}
                                            className="block w-full text-left py-2 text-gray-700 dark:text-gray-300
                                                     hover:text-primary-600 dark:hover:text-primary-400"
                                            onClick={item.onClick}
                                        >
                                            {item.label}
                                        </button>
                                    )
                                ))}
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/auth/login"
                                    className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600
                                    dark:hover:text-primary-400"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/auth/register"
                                    className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600
                                    dark:hover:text-primary-400"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Register
                                </Link>
                            </>
                        )}

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