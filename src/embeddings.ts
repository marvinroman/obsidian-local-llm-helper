import { OLocalLLMSettings } from '../main';
import { OllamaEmbeddings } from './ollamaEmbeddings';
import { OpenAIEmbeddings } from './openAIEmbeddings';
export { OllamaEmbeddings } from './ollamaEmbeddings';
export { OpenAIEmbeddings } from './openAIEmbeddings';

export class EmbeddingManager {
	static createEmbeddings(settings: OLocalLLMSettings): OllamaEmbeddings | OpenAIEmbeddings {
		return settings.providerType === 'ollama'
			? new OllamaEmbeddings(settings.serverAddress, settings.embeddingModelName)
			: new OpenAIEmbeddings(settings.openAIApiKey, settings.embeddingModelName, settings.serverAddress);
	}
}
