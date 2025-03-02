import { createRetrievalChain } from "langchain/chains/retrieval";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { PromptTemplate } from "@langchain/core/prompts";
import { Document } from 'langchain/document';
import { Ollama } from "@langchain/ollama";
import { OpenAI } from "@langchain/openai";
import { OLocalLLMSettings } from '../main';
import { ElasticVectorSearch } from '@langchain/community/vectorstores/elasticsearch';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { Chroma } from "@langchain/community/vectorstores/chroma";

export class QueryHandler {
	static async createLLM(settings: OLocalLLMSettings) {
		return settings.providerType === 'ollama'
			? new Ollama({
				baseUrl: settings.serverAddress,
				model: settings.llmModel,
				temperature: settings.temperature,
			})
			: new OpenAI({
				openAIApiKey: settings.openAIApiKey || 'lm-studio',
				modelName: settings.llmModel,
				temperature: settings.temperature,
				configuration: { baseURL: `${settings.serverAddress}/v1` },
			});
	}

	static async generateResponse(
		query: string,
		vectorStore: MemoryVectorStore | ElasticVectorSearch | Chroma,
		llm: Ollama | OpenAI
	) {
		const promptTemplate = PromptTemplate.fromTemplate(
			`Answer the following question based on the context:\n\nContext: {context}\nQuestion: {input}\nAnswer:`
		);

		const documentChain = await createStuffDocumentsChain({ llm, prompt: promptTemplate });
		const retrievalChain = await createRetrievalChain({
			combineDocsChain: documentChain,
			retriever: vectorStore.asRetriever(4),
		});

		const result = await retrievalChain.invoke({ input: query });
		const sources = [...new Set(result.context.map((doc: Document) => doc.metadata.source))];

		return {
			response: result.answer as string,
			sources: sources
		};
	}
}
