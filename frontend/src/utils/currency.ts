const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export function formatCurrency(value: string | number): string {
    const numericValue =
        typeof value === "string" ? Number(value) : value;

    return currencyFormatter.format(numericValue);
}