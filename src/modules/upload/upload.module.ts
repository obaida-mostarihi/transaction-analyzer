import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { LangChainModule } from '../langchain/langchain.module';

@Module({
  imports: [LangChainModule],
  providers: [UploadService],
  controllers: [UploadController]
})
export class UploadModule { }
