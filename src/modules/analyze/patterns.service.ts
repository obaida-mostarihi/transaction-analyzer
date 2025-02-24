import { Injectable } from '@nestjs/common';
import { TransactionsDto } from './dto/transaction.dto';
import { LangChainService } from '../langchain/langchain.service';
import { TemplateBuilder } from '../langchain/langchain.templates';
import { PatternsType } from './types/pattern.type';

@Injectable()
export class PatternsService {
    constructor(
        private readonly langChainService: LangChainService
    ) { }

    async analyzePatterns(dto: TransactionsDto): Promise<PatternsType> {
        const patterns = await this.langChainService.invokeTemplateChain<PatternsType>(
            TemplateBuilder.transactionPatternDetectionTemplate,
            dto
        );
        return patterns;
    }
}
