interface DateRangeSelectorProps {
    dateRange: {
        startDate: string;
        endDate: string;
    };
    onChange: (range: { startDate: string; endDate: string }) => void;
}

export function DateRangeSelector({dateRange, onChange}: DateRangeSelectorProps) {
    return (
        <div className="flex items-center space-x-4">
            <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => onChange({...dateRange, startDate: e.target.value})}
                className="rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-card px-3 py-2"
            />
            <span className="text-gray-500">to</span>
            <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => onChange({...dateRange, endDate: e.target.value})}
                className="rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-card px-3 py-2"
            />
        </div>
    );
}