export type PatternType = {
    type: string;
    merchant: string;
    amount: number;
    frequency: number;
    confidence: number;
    next_expected?: string;
    notes?: string;
};

export type PatternsType = {
    patterns: PatternType[];
}