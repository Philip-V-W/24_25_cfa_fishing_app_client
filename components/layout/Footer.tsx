import Link from 'next/link';

const footerSections = {
    shop: {
        title: 'Shop',
        links: [
            {label: 'All Products', href: '/products'},
            {label: 'Categories', href: '/products/categories'},
            {label: 'Featured', href: '/products/featured'},
            {label: 'New Arrivals', href: '/products/new'}
        ]
    },
    permits: {
        title: 'Permits & Events',
        links: [
            {label: 'Fishing Permits', href: '/permits'},
            {label: 'Contests', href: '/contests'},
            {label: 'Rules & Regulations', href: '/permits/rules'},
            {label: 'Locations', href: '/permits/locations'}
        ]
    },
    account: {
        title: 'Account',
        links: [
            {label: 'My Account', href: '/account'},
            {label: 'Order History', href: '/account/orders'},
            {label: 'My Permits', href: '/account/permits'},
            {label: 'My Contests', href: '/account/contests'}
        ]
    },
    support: {
        title: 'Support',
        links: [
            {label: 'Contact Us', href: '/support'},
            {label: 'FAQ', href: '/support/faq'},
            {label: 'Shipping', href: '/support/shipping'},
            {label: 'Returns', href: '/support/returns'}
        ]
    }
};

export function Footer() {
    return (
        <footer className="mt-8 bg-white dark:bg-dark-card border-t dark:border-dark-border">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 text-center md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {Object.values(footerSections).map((section) => (
                        <div key={section.title}>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                                {section.title}
                            </h3>
                            <ul className="mt-4 space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-base text-gray-600 dark:text-gray-400
                                                     hover:text-primary-600 dark:hover:text-primary-400"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 pt-8 border-t dark:border-dark-border">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <img src={'/images/logo.png'} alt="logo" className="h-6"/>
                            <Link href="/"
                                  className="text-xl font-bold text-primary-600 dark:text-primary-400 ml-1.5">
                                Fisherman's Depot
                            </Link>
                        </div>
                        <div className="mt-4 md:mt-0 flex flex-col md:flex-row md:items-center md:space-x-6">
                            <div className="flex space-x-6">
                                <Link
                                    href="/privacy"
                                    className="text-sm text-gray-600 dark:text-gray-400
                                             hover:text-primary-600 dark:hover:text-primary-400"
                                >
                                    Privacy Policy
                                </Link>
                                <Link
                                    href="/terms"
                                    className="text-sm text-gray-600 dark:text-gray-400
                                             hover:text-primary-600 dark:hover:text-primary-400"
                                >
                                    Terms of Service
                                </Link>
                            </div>
                            <p className="mt-4 md:mt-0 text-sm text-gray-600 dark:text-gray-400">
                                © {new Date().getFullYear()} Fisherman's Depot. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}