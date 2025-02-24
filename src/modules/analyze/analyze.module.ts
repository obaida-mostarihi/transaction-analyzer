import { Module } from '@nestjs/common';
import { PatternsService } from './patterns.service';
import { MerchantService } from './merchant.service';
import { LangChainModule } from '../langchain/langchain.module';
import { AnalyzeController } from './analyze.controller';

@Module({
  imports: [
    LangChainModule
  ],
  providers: [PatternsService, MerchantService],
  controllers: [AnalyzeController]
})
export class AnalyzeModule { }
