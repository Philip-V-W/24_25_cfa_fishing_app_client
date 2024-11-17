import {DateRangePicker} from "@/components/admin/analytics/DateRangePicker";

interface AnalyticsHeaderProps {
    dateRange: {
        startDate: string;
        endDate: string;
    };
    onDateRangeChange: (dateRange: { startDate: string; endDate: string }) => void;
}

export function AnalyticsHeader({dateRange, onDateRangeChange}: AnalyticsHeaderProps) {
    return (
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Analytics Dashboard
            </h1>
            <DateRangePicker
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
                onChange={onDateRangeChange}
            />
        </div>
    );
}