export type NormalizedType = {
    normalized: {
        merchant: string;
        category: string;
        sub_category: string;
        confidence: number;
        is_subscription: boolean;
        flags: string[];
    };
}