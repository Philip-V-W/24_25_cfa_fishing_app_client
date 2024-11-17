export const formatContestStatus = (status: string): string => {
    const words = status.toLowerCase().split('_');

    return words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};