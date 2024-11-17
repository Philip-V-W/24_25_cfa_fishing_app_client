'use client';

import Link from "next/link";
import {Button} from "@/components/ui/Button";
import {SuccessMessage} from "@/components/ui/SuccessMessage";
import {useAutoRedirect} from "@/hooks/permit/useAutoRedirect";

export default function PermitSuccessPage() {
    const secondsRemaining = useAutoRedirect('/permits');

    const actions = (
        <>
            <Link href="/permits">
                <Button variant="primary" className="w-fit mr-3">
                    View Your Permits
                </Button>
            </Link>
            <Link href="/">
                <Button variant="outline" className="w-fit mb-2">
                    Return to Home
                </Button>
            </Link>
        </>
    );

    const footer = (
        <p>You will be redirected automatically in {secondsRemaining} seconds...</p>
    );

    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            <SuccessMessage
                title="Application Submitted Successfully"
                message="Your permit application has been received and is being reviewed.
                        You will be notified once it has been processed."
                actions={actions}
                footer={footer}
            />
        </div>
    );
}