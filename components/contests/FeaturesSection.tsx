import {Card} from "@/components/ui/Card";
import {TrophyIcon, ScaleIcon, UsersIcon} from "@/components/icons";

const features = [
    {
        title: 'Great Prizes',
        description: 'Win exciting prizes and earn recognition in the fishing community.',
        icon: <TrophyIcon/>
    },
    {
        title: 'Fair Competition',
        description: 'Professionally organized events with clear rules and experienced judges.',
        icon: <ScaleIcon/>
    },
    {
        title: 'Community Spirit',
        description: 'Meet fellow anglers and share your passion for fishing.',
        icon: <UsersIcon/>
    }
];

export function FeaturesSection() {
    return (
        <section className="bg-gray-50 dark:bg-dark-card px-4 py-12 rounded-xl">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
                Why Participate?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
                {features.map((feature) => (
                    <Card key={feature.title}
                          className="text-center p-6 bg-white dark:bg-dark-bg border dark:border-dark-border">
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
    );
}