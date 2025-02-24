import { ChatOpenAI } from '@langchain/openai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { Document } from "@langchain/core/documents";
import { Template } from './langchain.templates';
import { JsonOutputParser } from '@langchain/core/output_parsers';
import { CSVLoader, } from "@langchain/community/document_loaders/fs/csv";

@Injectable()
export class LangChainService {
    private chatModel: ChatOpenAI;

    constructor(readonly configService: ConfigService) {
        this.chatModel = new ChatOpenAI({
            apiKey: configService.get("OPENAI_API_KEY"),
            model: configService.get("OPENAI_MODEL")
        });
    }

    async invokeTemplateChain<T>(template: Template, context: object): Promise<T> {
        const json = this.convertJsonToString(context);

        const chain = await createStuffDocumentsChain({
            llm: this.chatModel,
            prompt: template
        });

        const runnable = chain
            .pipe(new JsonOutputParser<T>({ diff: false }));


        const response = await runnable.invoke({
            context: [
                this.createDocumentFromText(json)
            ]
        });

        return response;
    }

    async invokeTemplateChainFromDocuments<T>(template: Template, documents: Document[]): Promise<T> {
        const chain = await createStuffDocumentsChain({
            llm: this.chatModel,
            prompt: template
        });

        const runnable = chain
            .pipe(new JsonOutputParser<T>({ diff: false }));

        const response = await runnable.invoke({
            context: documents
        });

        return response;
    }

    async csvToDocuments(file: Blob): Promise<Document[]> {
        const loader = new CSVLoader(file);
        return await loader.load();
    }

    private convertJsonToString(json: object): string {
        return JSON.stringify(json).replace("{", "{{").replace("}", "}}");
    }

    private createDocumentFromText(text: string): Document {
        return new Document({
            pageContent: text,
        })
    }
}
