export function formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EURO',
    }).format(price);
}

export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}