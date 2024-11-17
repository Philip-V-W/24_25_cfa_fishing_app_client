'use client';

import {HeroSection} from '@/components/contests/HeroSection';
import {ContestSection} from '@/components/contests/ContestSection';
import {FeaturesSection} from '@/components/contests/FeaturesSection';
import {useContests} from '@/hooks/useContests';

export default function ContestsPage() {
    const {
        upcomingContests,
        ongoingContests,
        loading,
        error
    } = useContests();

    return (
        <div className="space-y-16">
            <HeroSection
                title="Fishing Contests"
                description="Join our exciting fishing competitions and showcase your skills. Register today and compete with fellow anglers."
                imageSrc="/images/contest-hero.jpeg"
            />
            <ContestSection
                title="Ongoing Contests"
                contests={ongoingContests}
                loading={loading}
                error={error}
            />
            <ContestSection
                title="Upcoming Contests"
                contests={upcomingContests}
                loading={loading}
                error={error}
            />
            <FeaturesSection/>
        </div>
    );
}