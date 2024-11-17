export function ContestRules() {
    return (
        <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
                By registering for this contest, you agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Follow all contest rules and regulations</li>
                <li>Arrive on time at the specified location</li>
                <li>Bring valid identification and fishing license</li>
                <li>Accept the judges decisions as final</li>
            </ul>
        </div>
    );
}