import { Client, ClientOptions } from '@elastic/elasticsearch';
import { ElasticVectorSearch, type ElasticClientArgs } from '@langchain/community/vectorstores/elasticsearch';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OllamaEmbeddings, OpenAIEmbeddings } from './embeddings';
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { OLocalLLMSettings } from '../main';

import * as fs from "node:fs";

export class VectorStoreManager {
	static createVectorStore(
		embeddings: OllamaEmbeddings | OpenAIEmbeddings,
		settings: OLocalLLMSettings
	) {
		if (settings.useChromadb) {
			const config = {
				collectionName: settings.chromadbCollection || "obsidian-notes", // Optional, will default to this value
				url: settings.chromadbUrl || "http://127.0.0.1:8000", // Optional, will default to this value
			}
			return new Chroma(embeddings, config);
		} else if (settings.useElasticsearch) {
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

			const vectorStore = new ElasticVectorSearch(embeddings, clientArgs);
		}
		return new MemoryVectorStore(embeddings);
	}
}
