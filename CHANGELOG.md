## [2.7.0](https://github.com/marvinroman/obsidian-local-llm-helper/compare/v2.6.0...v2.7.0) (2025-03-02)

### ⚠ BREAKING CHANGES

* **vectorstore:** Vector store implementations now include ChromaDB option
* **settings:** Vector store implementations now include ChromaDB option

### Features

* **settings:** add ChromaDB integration for RAG ([3150733](https://github.com/marvinroman/obsidian-local-llm-helper/commit/31507337d07eeee077fcbc4599c53d3631113b60))
* **vectorstore:** add ChromaDB integration and update dependencies ([b413146](https://github.com/marvinroman/obsidian-local-llm-helper/commit/b4131463a065c22eed510506ea89266748d3c059))

## [2.6.0](https://github.com/marvinroman/obsidian-local-llm-helper/compare/v2.5.0...v2.6.0) (2025-03-02)

### ⚠ BREAKING CHANGES

* **deps:** Node.js version requirement increased to >=18 for several packages

### Features

* **deps:** update dependencies and add new packages ([9537b59](https://github.com/marvinroman/obsidian-local-llm-helper/commit/9537b59eeba683580666cfecfaebad96937dbdd4))
* **devops:** add docker-compose and env template for elasticsearch ([6c215fa](https://github.com/marvinroman/obsidian-local-llm-helper/commit/6c215fa3791f26814b8dcf21a8bda17c5d449783))
* **rag:** add Elasticsearch vector store support ([57e4436](https://github.com/marvinroman/obsidian-local-llm-helper/commit/57e4436151eb4db4d63578fb74c559f7b6f922c9))
* **settings:** add elasticsearch api key support ([8435727](https://github.com/marvinroman/obsidian-local-llm-helper/commit/843572753dad2683525f7165219fde9ad55bbce4))
* **settings:** add Elasticsearch configuration settings ([49ee7c0](https://github.com/marvinroman/obsidian-local-llm-helper/commit/49ee7c00f8090a4fa72331f2c3ecbcc7208d686d))

### Bug Fixes

* :bug: elastic vector store wasn't returning ([9dce2ef](https://github.com/marvinroman/obsidian-local-llm-helper/commit/9dce2ef3324fe839cc0f540504a4d6ce9f369b5a))

### Code Refactoring

* **backlink-generator:** update imports and improve modularity ([ca3f2cd](https://github.com/marvinroman/obsidian-local-llm-helper/commit/ca3f2cdbadbba756efcb0cf92d39d34503fba766))
* **ragManager:** modularize RAGManager into specialized components ([c36d860](https://github.com/marvinroman/obsidian-local-llm-helper/commit/c36d86028dff476945d65b115bffc4f6ed8b86bd))

## [2.5.0](https://github.com/marvinroman/obsidian-local-llm-helper/compare/v2.4.2...v2.5.0) (2025-03-02)

### Features

* **embeddings:** add OpenAIEmbeddings class ([5e19252](https://github.com/marvinroman/obsidian-local-llm-helper/commit/5e192525198b31c83caafb098bfbf04e9792c79e))
* **rag:** add OpenAI support and refactor RAGManager ([7041c21](https://github.com/marvinroman/obsidian-local-llm-helper/commit/7041c219e62cbc51c65cb8da449213b9d5e45570))
* **settings:** add OpenAI provider support and enhance LLM configuration ([3037d31](https://github.com/marvinroman/obsidian-local-llm-helper/commit/3037d31ac250253cd672a8f02481d0b76ba54045))

### Bug Fixes

* inital semantic release had wrong version ([f8151f6](https://github.com/marvinroman/obsidian-local-llm-helper/commit/f8151f6e493978346130b2e249de06d0af579e3d))

### Code Refactoring

* **autoTagger:** move autoTagger to src directory ([f7604a3](https://github.com/marvinroman/obsidian-local-llm-helper/commit/f7604a3e67de2479e50648ed9e6fd1105882e7ab))
* **autoTagger:** use settings for temperature and max tokens ([0d984f5](https://github.com/marvinroman/obsidian-local-llm-helper/commit/0d984f550952826516a68dba3eb12bdd37be43ce))
* **backlinkGenerator:** move backlinkGenerator to src directory ([555cfb8](https://github.com/marvinroman/obsidian-local-llm-helper/commit/555cfb8bf19516955fafb5035e877ecdaa941300))
* **embeddings:** rename and move localEmbeddings to src directory ([62b8d88](https://github.com/marvinroman/obsidian-local-llm-helper/commit/62b8d88e3983e79540d79a570dd36913539cf9d9))
* **main:** update import paths and RAGManager initialization ([9be0305](https://github.com/marvinroman/obsidian-local-llm-helper/commit/9be0305a1a20c0123b5b96a9e506ba9d1dcf4b11))
* **ragChatModal:** move RAGChatModal to src directory ([b72ad64](https://github.com/marvinroman/obsidian-local-llm-helper/commit/b72ad64898ee7f69599254dd73a282f06ccfaf3a))
* **rag:** update RAGManager and move to src directory ([2198590](https://github.com/marvinroman/obsidian-local-llm-helper/commit/2198590ac2f0ba504f10207e9f30ba2991e2e643))
* **updateNoticeModal:** move updateNoticeModal to src directory ([5ce8245](https://github.com/marvinroman/obsidian-local-llm-helper/commit/5ce8245f91071f883256a6285206442ad26fb191))

## 2.4.2 (2025-03-02)

### Features

* :sparkles: moved to semantic release for automated releases ([b17e42d](https://github.com/marvinroman/obsidian-local-llm-helper/commit/b17e42d30cfacf958f8a7ed4f6b05eca0a67de0f))
