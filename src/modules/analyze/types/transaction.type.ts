export type TransactionItem = {
    description: string;
    amount: number;
    date: string;
};

export type TransactionType = {
    transaction?: TransactionItem;
    transactions?: TransactionItem[];
};