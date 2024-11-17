interface HeroSectionProps {
    title: string;
    description: string;
    imageSrc: string;
}

export function HeroSection({title, description, imageSrc}: HeroSectionProps) {
    return (
        <div className="relative bg-gray-900 dark:bg-black py-24 px-6 sm:py-32 rounded-xl overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src={imageSrc}
                    alt="Fishing contest background"
                    className="h-full w-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-black/50"/>
            </div>
            <div className="relative mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                    {title}
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-300">
                    {description}
                </p>
            </div>
        </div>
    );
}