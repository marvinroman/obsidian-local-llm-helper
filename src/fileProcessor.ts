import { TFile, Vault } from 'obsidian';
import { Document } from 'langchain/document';
import { MemoryVectorStore, ElasticVectorSearch } from './vectorStore';

const CHUNK_SIZE = 1000;

export class FileProcessor {
	constructor(
		private vault: Vault,
		private vectorStore: MemoryVectorStore | ElasticVectorSearch
	) { }

	async processFiles(files: TFile[], progressCallback: (progress: number) => void): Promise<string[]> {
		const indexedFiles: string[] = [];
		const totalFiles = files.length;

		for (let i = 0; i < totalFiles; i++) {
			const file = files[i];
			try {
				const content = await this.vault.cachedRead(file);
				const chunks = this.splitIntoChunks(content, CHUNK_SIZE);

				const docs = chunks.map((chunk, j) => new Document({
					pageContent: chunk,
					metadata: { source: file.path, chunk: j },
				}));

				await this.vectorStore.addDocuments(docs);
				indexedFiles.push(file.path);
			} catch (error) {
				console.error(`Error indexing file ${file.path}:`, error);
			}
			progressCallback((i + 1) / totalFiles);
		}
		return indexedFiles;
	}

	private splitIntoChunks(content: string, chunkSize: number): string[] {
		const chunks: string[] = [];
		let currentChunk = '';

		content.split(/\s+/).forEach((word) => {
			if (currentChunk.length + word.length + 1 <= chunkSize) {
				currentChunk += (currentChunk ? ' ' : '') + word;
			} else {
				chunks.push(currentChunk);
				currentChunk = word;
			}
		});

		if (currentChunk) {
			chunks.push(currentChunk);
		}

		return chunks;
	}
}
