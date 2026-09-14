import type { Transaction } from "../types/transaction";

export type CsvColumn =
    | "id"
    | "date"
    | "amount"
    | "category"
    | "status"
    | "user_id";

export interface CsvColumnDefinition {
    key: CsvColumn;
    label: string;
}

export const CSV_COLUMNS: CsvColumnDefinition[] = [
    {
        key: "id",
        label: "ID",
    },
    {
        key: "date",
        label: "Date",
    },
    {
        key: "amount",
        label: "Amount",
    },
    {
        key: "category",
        label: "Category",
    },
    {
        key: "status",
        label: "Status",
    },
    {
        key: "user_id",
        label: "User ID",
    },
];

function escapeCsvValue(value: string): string {
    const escaped = value.replace(/"/g, '""');

    return `"${escaped}"`;
}

export function generateCsv(
    transactions: Transaction[],
    selectedColumns: CsvColumn[]
): string {
    const definitions = CSV_COLUMNS.filter(
        (column) =>
            selectedColumns.includes(column.key)
    );

    const header = definitions
        .map((column) =>
            escapeCsvValue(column.label)
        )
        .join(",");

    const rows = transactions.map(
        (transaction) => {
            return definitions
                .map((column) => {
                    let value = "";

                    switch (column.key) {
                        case "id":
                            value = String(transaction.id);
                            break;

                        case "date":
                            value = transaction.date;
                            break;

                        case "amount":
                            value = transaction.amount;
                            break;

                        case "category":
                            value = transaction.category;
                            break;

                        case "status":
                            value = transaction.status;
                            break;

                        case "user_id":
                            value = transaction.user_id;
                            break;
                    }

                    return escapeCsvValue(value);
                })
                .join(",");
        }
    );

    return [header, ...rows].join("\r\n");
}

export function downloadCsv(
    csv: string,
    filename: string
) {
    const blob = new Blob(
        [csv],
        {
            type: "text/csv;charset=utf-8;",
        }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);
}