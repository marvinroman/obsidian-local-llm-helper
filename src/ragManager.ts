import { Vault } from 'obsidian';
import { OLocalLLMSettings } from '../main';
import { EmbeddingManager, OpenAIEmbeddings, OllamaEmbeddings } from './embeddings';
import { VectorStoreManager } from './vectorStore';
import { ElasticVectorSearch } from '@langchain/community/vectorstores/elasticsearch';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { FileProcessor } from './fileProcessor';
import { QueryHandler } from './queryHandler';

export class RAGManager {
	private vectorStore: MemoryVectorStore | ElasticVectorSearch | Chroma;
	private embeddings: OpenAIEmbeddings | OllamaEmbeddings;
	private indexedFiles: string[] = [];

	constructor(
		private vault: Vault,
		private settings: OLocalLLMSettings
	) {
		this.embeddings = EmbeddingManager.createEmbeddings(settings);
		this.vectorStore = VectorStoreManager.createVectorStore(this.embeddings, settings);
	}

	async getRAGResponse(query: string) {
		const llm = await QueryHandler.createLLM(this.settings);
		return QueryHandler.generateResponse(query, this.vectorStore, llm);
	}

	async indexNotes(progressCallback: (progress: number) => void) {
		const processor = new FileProcessor(this.vault, this.vectorStore);
		const files = this.vault.getFiles().filter(file => file.extension === 'md');
		this.indexedFiles = await processor.processFiles(files, progressCallback);
	}

	async findSimilarNotes(query: string): Promise<string> {
		try {
			const similarDocs = await this.vectorStore.similaritySearch(query, 5);
			console.log("Similar docs found:", similarDocs.length);

			if (similarDocs.length === 0) {
				return '';
			}

			const uniqueBacklinks = new Map<string, string>();

			similarDocs.forEach((doc, index) => {
				const backlink = `[[${doc.metadata.source}]]`;
				console.log(`Processing doc ${index + 1}:`, backlink);
				if (!uniqueBacklinks.has(backlink)) {
					const entry = `${backlink}: ${doc.pageContent.substring(0, 100)}...`;
					uniqueBacklinks.set(backlink, entry);
					console.log("Added unique backlink:", entry);
				} else {
					console.log("Duplicate backlink found:", backlink);
				}
			});

			console.log("Final unique backlinks:", Array.from(uniqueBacklinks.values()));
			return Array.from(uniqueBacklinks.values()).join('\n');
		} catch (error) {
			console.error('Error in findSimilarNotes:', error);
			return '';
		}
	}

	getIndexedFilesCount(): number {
		return this.indexedFiles.length;
	}
}
