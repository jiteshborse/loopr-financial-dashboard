export function formatDate(dateString: string): string {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
        return dateString;
    }

    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export function formatMonth(yearMonth: string): string {
    const [year, month] = yearMonth.split("-");

    if (!year || !month) {
        return yearMonth;
    }

    const date = new Date(Number(year), Number(month) - 1, 1);

    return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    });
}
