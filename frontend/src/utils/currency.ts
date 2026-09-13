export function formatCurrency(
    value: string | number
): string {
    const numericValue =
        typeof value === "number"
            ? value
            : Number(value);

    return new Intl.NumberFormat(
        "en-US",
        {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    ).format(numericValue);
}