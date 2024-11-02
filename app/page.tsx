import {Card} from "@/components/ui/Card";
import Link from "next/link";
import {Button} from "@/components/ui/Button";
import {CommunityIcon, ExpertIcon, QualityIcon} from "@/components/icons";

export default function Home() {
    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <div className="relative bg-gray-900 dark:bg-black py-24 px-6 sm:py-32 rounded-xl overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/images/hero-fishing.jpg"
                        alt="Fishing background"
                        className="h-full w-full object-cover opacity-25"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-black/50"/>
                </div>
                <div className="relative mx-auto max-w-2xl text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        Your Premier Fishing Store
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-300">
                        Discover top-quality fishing gear, get your permits, and join exciting fishing contests.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link href="/products">
                            <Button variant="primary">
                                Shop Now
                            </Button>
                        </Link>
                        <Link href="/contests">
                            <Button variant="outline" className="text-white border-white hover:bg-white/10">
                                View Contests
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Featured Products */}
            <section>
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Featured Products
                    </h2>
                    <Link href="/products">
                        <Button variant="outline">View All</Button>
                    </Link>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
                </div>
            </section>

            {/* Categories */}
            <section className="bg-gray-50 dark:bg-dark-card -mx-4 px-4 py-12 rounded-xl">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
                    Shop by Category
                </h2>
                <div className="mt-6 grid gap-6 lg:grid-cols-4">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            href={`/products?category=${category.slug}`}
                            className="group relative overflow-hidden rounded-lg"
                        >
                            <div className="relative h-64 w-full overflow-hidden rounded-lg bg-white dark:bg-dark-bg">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
                                />
                            </div>
                            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                                {category.name}
                            </h3>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
                    Why Choose Us
                </h2>
                <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
                    {features.map((feature) => (
                        <Card key={feature.title} className="text-center">
                            <div className="mx-auto h-12 w-12 text-primary-600 dark:text-primary-400">
                                {feature.icon}
                            </div>
                            <h3 className="mt-6 text-lg font-medium text-gray-900 dark:text-white">
                                {feature.title}
                            </h3>
                            <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                                {feature.description}
                            </p>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}

const categories = [
    // TODO: Replace the image paths with the actual category images
    {
        name: 'Fishing Rods',
        slug: 'fishing-rods',
        // image: '/images/categories/rods.jpg'
        image: '/images/temp.jpg'
    },
    {
        name: 'Reels',
        slug: 'reels',
        // image: '/images/categories/reels.jpg'
        image: '/images/temp.jpg'
    },
    {
        name: 'Lures & Baits',
        slug: 'lures-baits',
        // image: '/images/categories/lures.jpg'
        image: '/images/temp.jpg'
    },
    {
        name: 'Accessories',
        slug: 'accessories',
        // image: '/images/categories/accessories.jpg'
        image: '/images/temp.jpg'
    }
];

const features = [
    {
        title: 'Quality Products',
        description: 'Curated selection of premium fishing gear from trusted brands.',
        icon: <QualityIcon/>
    },
    {
        title: 'Expert Advice',
        description: 'Get guidance from our experienced fishing enthusiasts.',
        icon: <ExpertIcon/>
    },
    {
        title: 'Local Community',
        description: 'Join our fishing contests and connect with fellow anglers.',
        icon: <CommunityIcon/>
    }
];