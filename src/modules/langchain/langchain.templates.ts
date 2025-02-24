import { ChatPromptTemplate } from "@langchain/core/prompts";

export type Template = ChatPromptTemplate;

export class TemplateBuilder {
    constructor() { }

    static transactionNormalizationTemplate: Template = ChatPromptTemplate.fromTemplate(
        `Normalize this transaction description: "{context}" Keep them in the same order and do not miss anything. 
            Respond with JSON format: {{ "normalized": {{
            "merchant": "Normalized Name", // The normalized name of the merchant
            "category": "Category", The category of the transaction
            "sub_category": "Subcategory", The subcategory of the transaction
            "confidence": 0.0-1.0, // Your confidence level
            "is_subscription": boolean, // If it's a subscription
            "flags": ["array", "of", "flags"] // Generate flags here related to the transaction
            }}
        }}`
    );

    static transactionPatternDetectionTemplate: Template = ChatPromptTemplate.fromTemplate(
        `Analyze the given transactions and detect recurring patterns: "{context}" Keep them in the same order and do not miss anything. 
        Respond with JSON format: {{ "patterns": [
            {{
                "type": "Pattern Type", // e.g., "subscription", "recurring", "one-time"
                "merchant": "Merchant Name", // Standardized merchant name
                "amount": "Transaction Amount", // Standardized amount (can include "~" for estimates)
                "frequency": "Frequency of occurrence", // e.g., "monthly", "weekly", "irregular"
                "confidence": 0.0-1.0, // Confidence level in pattern detection
                "next_expected": "YYYY-MM-DD" // (Optional) Predicted next occurrence according to the last dated transaction from the same merchant(NOT THE FIRST TRANSACTION)
                "notes": "Additional Notes" // (Optional) Explanation if next_expected is missing
            }}
        ]}}`
    );

    static csvNormalizationTemplate: Template = ChatPromptTemplate.fromTemplate(
        `Analyze the given transactions for normalization  "{context}" Keep them in the same order and do not miss anything. 
        Respond with JSON format: {{ 
            "normalized_transactions": [
                {{
                    "original": "Original Transaction name", // Raw transaction text without date and "discription" and amount just the raw name
                    "normalized": {{
                        "merchant": "Normalized Name", // Standardized merchant name
                        "category": "Category", // Main category (e.g., "Entertainment")
                        "sub_category": "Subcategory", // Specific category (e.g., "Streaming Service")
                        "confidence": 0.0-1.0, // Confidence level
                        "is_subscription": boolean, // Whether it's a subscription
                        "flags": ["array", "of", "flags"] // Relevant tags for the transaction
                    }}
                }}
            ]
        }}`
    );

    static csvPatternDetectionTemplate: Template = ChatPromptTemplate.fromTemplate(
        `Analyze the given transactions for pattern detection  "{context}" Keep them in the same order and do not miss anything, write them all even if duplicated. 
        Respond with JSON format: {{ 
        "detected_patterns": [
                {{
                    "type": "Pattern Type", // e.g., "subscription", "recurring", "one-time"
                    "merchant": "Merchant Name", // Standardized merchant name
                    "amount": "Transaction Amount", // Standardized amount (can include "~" for estimates)
                    "frequency": "Frequency of occurrence", // e.g., "monthly", "weekly", "irregular"
                    "confidence": 0.0-1.0, // Confidence level in pattern detection
                    "next_expected": "YYYY-MM-DD" // (Optional) Predicted next occurrence according to the last dated transaction from the same merchant(NOT THE FIRST TRANSACTION)
                    "notes": "Additional Notes" // (Optional) Explanation if next_expected is missing
                }}
            ]
        }}`
    );


}
