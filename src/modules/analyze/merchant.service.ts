import { Injectable } from '@nestjs/common';
import { LangChainService } from '../langchain/langchain.service';
import { TransactionDto } from './dto/transaction.dto';
import { NormalizedType } from './types/normalized.type';
import { TemplateBuilder } from '../langchain/langchain.templates';

@Injectable()
export class MerchantService {

    constructor(
        private readonly langChainService: LangChainService
    ) { }

    async analyzeTransaction(dto: TransactionDto): Promise<NormalizedType> {
        const normalizedTransaction = await this.langChainService.invokeTemplateChain<NormalizedType>(
            TemplateBuilder.transactionNormalizationTemplate,
            dto
        );
        return normalizedTransaction;
    }
}
