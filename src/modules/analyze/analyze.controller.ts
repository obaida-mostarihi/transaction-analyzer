import { Body, Controller, Post } from '@nestjs/common';
import { TransactionDto, TransactionsDto } from './dto/transaction.dto';
import { MerchantService } from './merchant.service';
import { PatternsService } from './patterns.service';
import { NormalizedType } from './types/normalized.type';
import { PatternsType } from './types/pattern.type';

@Controller('analyze')
export class AnalyzeController {
    constructor(
        private readonly merchantService: MerchantService,
        private readonly patternService: PatternsService
    ) { }

    @Post("merchant")
    async analyzeMerchant(
        @Body() dto: TransactionDto
    ): Promise<NormalizedType> {
        return this.merchantService.analyzeTransaction(dto);
    }

    @Post("patterns")
    async analyzePatterns(
        @Body() dto: TransactionsDto
    ): Promise<PatternsType> {
        return this.patternService.analyzePatterns(dto);
    }
}
