import { NormalizedType } from "src/modules/analyze/types/normalized.type"

export type NormalizedTransactionsType = {
    normalized_transactions: [{
        original: string;
        normalized: NormalizedType;
    }]
}