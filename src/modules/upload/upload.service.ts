import { Injectable } from '@nestjs/common';
import { LangChainService } from '../langchain/langchain.service';
import { TemplateBuilder } from '../langchain/langchain.templates';
import { NormalizedTransactionsType } from './types/normalized_transactions.type';

@Injectable()
export class UploadService {
    constructor(
        private readonly langChainService: LangChainService
    ) { }

    async analyzeFile(file: Express.Multer.File) {
        const docs = await this.langChainService.csvToDocuments(new Blob([file.buffer]));

        const normalizedTransactions = await this.langChainService.invokeTemplateChainFromDocuments<NormalizedTransactionsType>(
            TemplateBuilder.csvNormalizationTemplate,
            docs
        );

        const detectedPatterns = await this.langChainService.invokeTemplateChainFromDocuments<any>(
            TemplateBuilder.csvPatternDetectionTemplate,
            docs
        );
        const response = { ...normalizedTransactions, ...detectedPatterns };
        console.log(response);

        return { ...normalizedTransactions, ...detectedPatterns };
    }
}
