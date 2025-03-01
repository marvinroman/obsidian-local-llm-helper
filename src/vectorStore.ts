import { Client, ClientOptions } from '@elastic/elasticsearch';
import { ElasticVectorSearch, type ElasticClientArgs } from '@langchain/community/vectorstores/elasticsearch';
export { ElasticVectorSearch } from '@langchain/community/vectorstores/elasticsearch';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
export { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OllamaEmbeddings, OpenAIEmbeddings } from './embeddings';
import { OLocalLLMSettings } from '../main';

import * as fs from "node:fs";

export class VectorStoreManager {
	static createVectorStore(
		embeddings: OllamaEmbeddings | OpenAIEmbeddings,
		settings: OLocalLLMSettings
	) {
		if (settings.useElasticsearch) {
			const config: ClientOptions = {
				node: settings.elasticsearchNodeUrl ?? "https://127.0.0.1:9200",
			};
			if (settings.elasticsearchApiKey) {
				config.auth = {
					apiKey: settings.elasticsearchApiKey,
				};
			} else if (settings.elasticsearchUsername && settings.elasticsearchPassword) {
				config.auth = {
					username: settings.elasticsearchUsername,
					password: settings.elasticsearchPassword,
				};
			}

			const clientArgs: ElasticClientArgs = {
				client: new Client(config),
				indexName: settings.elasticsearchIndexName ?? "test_vectorstore",
			};

			return new ElasticVectorSearch(embeddings, clientArgs);
		}
		return new MemoryVectorStore(embeddings);
	}
}
