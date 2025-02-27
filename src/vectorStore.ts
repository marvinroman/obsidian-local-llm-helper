import { Client } from '@elastic/elasticsearch';
import { ElasticVectorSearch } from '@langchain/community/vectorstores/elasticsearch';
export { ElasticVectorSearch } from '@langchain/community/vectorstores/elasticsearch';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
export { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OllamaEmbeddings, OpenAIEmbeddings } from './embeddings';
import { OLocalLLMSettings } from '../main';

export class VectorStoreManager {
	static createVectorStore(
		embeddings: OllamaEmbeddings | OpenAIEmbeddings,
		settings: OLocalLLMSettings
	) {
		if (settings.useElasticsearch) {
			const client = new Client({
				node: settings.elasticsearchNodeUrl,
				auth: {
					username: settings.elasticsearchUsername,
					password: settings.elasticsearchPassword,
				},
			});
			return new ElasticVectorSearch(embeddings, {
				client,
				indexName: settings.elasticsearchIndexName || 'obsidian-notes',
			});
		}
		return new MemoryVectorStore(embeddings);
	}
}
