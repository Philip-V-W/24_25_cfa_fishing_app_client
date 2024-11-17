interface DateRangePickerProps {
    startDate: string;
    endDate: string;
    onChange: (range: { startDate: string; endDate: string }) => void;
}

export function DateRangePicker({startDate, endDate, onChange}: DateRangePickerProps) {
    return (
        <div className="flex items-center space-x-4">
            <input
                type="date"
                value={startDate}
                onChange={(e) => onChange({startDate: e.target.value, endDate})}
                className="rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-card px-3 py-2"
            />
            <span className="text-gray-500">to</span>
            <input
                type="date"
                value={endDate}
                onChange={(e) => onChange({startDate, endDate: e.target.value})}
                className="rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-card px-3 py-2"
            />
        </div>
    );
}