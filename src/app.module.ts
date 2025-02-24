import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LangChainModule } from './modules/langchain/langchain.module';
import { AnalyzeModule } from './modules/analyze/analyze.module';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LangChainModule,
    AnalyzeModule,
    UploadModule,
  ],
  controllers: [],
})
export class AppModule { }
