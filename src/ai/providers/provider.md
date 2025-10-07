
# Providers and Models

Companies such as OpenAI and Anthropic (providers) offer access to a range of large language models (LLMs) with differing strengths and capabilities through their own APIs.

Each provider typically has its own unique method for interfacing with their models, complicating the process of switching providers and increasing the risk of vendor lock-in.

To solve these challenges, AI SDK Core offers a standardized approach to interacting with LLMs through a [language model specification](https://github.com/vercel/ai/tree/main/packages/provider/src/language-model/v2) that abstracts differences between providers. This unified interface allows you to switch between providers with ease while using the same API for all providers.

Here is an overview of the AI SDK Provider Architecture:

<MDXImage
  srcLight="/images/ai-sdk-diagram.png"
  srcDark="/images/ai-sdk-diagram-dark.png"
  width={800}
  height={800}
/>

## AI SDK Providers

The AI SDK comes with a wide range of providers that you can use to interact with different language models:

- [xAI Grok Provider](/providers/ai-sdk-providers/xai) (`@ai-sdk/xai`)
- [OpenAI Provider](/providers/ai-sdk-providers/openai) (`@ai-sdk/openai`)
- [Azure OpenAI Provider](/providers/ai-sdk-providers/azure) (`@ai-sdk/azure`)
- [Anthropic Provider](/providers/ai-sdk-providers/anthropic) (`@ai-sdk/anthropic`)
- [Amazon Bedrock Provider](/providers/ai-sdk-providers/amazon-bedrock) (`@ai-sdk/amazon-bedrock`)
- [Google Generative AI Provider](/providers/ai-sdk-providers/google-generative-ai) (`@ai-sdk/google`)
- [Google Vertex Provider](/providers/ai-sdk-providers/google-vertex) (`@ai-sdk/google-vertex`)
- [Mistral Provider](/providers/ai-sdk-providers/mistral) (`@ai-sdk/mistral`)
- [Together.ai Provider](/providers/ai-sdk-providers/togetherai) (`@ai-sdk/togetherai`)
- [Cohere Provider](/providers/ai-sdk-providers/cohere) (`@ai-sdk/cohere`)
- [Fireworks Provider](/providers/ai-sdk-providers/fireworks) (`@ai-sdk/fireworks`)
- [DeepInfra Provider](/providers/ai-sdk-providers/deepinfra) (`@ai-sdk/deepinfra`)
- [DeepSeek Provider](/providers/ai-sdk-providers/deepseek) (`@ai-sdk/deepseek`)
- [Cerebras Provider](/providers/ai-sdk-providers/cerebras) (`@ai-sdk/cerebras`)
- [Groq Provider](/providers/ai-sdk-providers/groq) (`@ai-sdk/groq`)
- [Perplexity Provider](/providers/ai-sdk-providers/perplexity) (`@ai-sdk/perplexity`)
- [ElevenLabs Provider](/providers/ai-sdk-providers/elevenlabs) (`@ai-sdk/elevenlabs`)
- [LMNT Provider](/providers/ai-sdk-providers/lmnt) (`@ai-sdk/lmnt`)
- [Hume Provider](/providers/ai-sdk-providers/hume) (`@ai-sdk/hume`)
- [Rev.ai Provider](/providers/ai-sdk-providers/revai) (`@ai-sdk/revai`)
- [Deepgram Provider](/providers/ai-sdk-providers/deepgram) (`@ai-sdk/deepgram`)
- [Gladia Provider](/providers/ai-sdk-providers/gladia) (`@ai-sdk/gladia`)
- [LMNT Provider](/providers/ai-sdk-providers/lmnt) (`@ai-sdk/lmnt`)
- [AssemblyAI Provider](/providers/ai-sdk-providers/assemblyai) (`@ai-sdk/assemblyai`)
- [Baseten](/providers/ai-sdk-providers/baseten)

You can also use the [OpenAI Compatible provider](/providers/openai-compatible-providers) with OpenAI-compatible APIs:

- [LM Studio](/providers/openai-compatible-providers/lmstudio)
- [Heroku](/providers/openai-compatible-providers/heroku)

Our [language model specification](https://github.com/vercel/ai/tree/main/packages/provider/src/language-model/v2) is published as an open-source package, which you can use to create [custom providers](/providers/community-providers/custom-providers).

The open-source community has created the following providers:

- [Ollama Provider](/providers/community-providers/ollama) (`ollama-ai-provider`)
- [FriendliAI Provider](/providers/community-providers/friendliai) (`@friendliai/ai-provider`)
- [Portkey Provider](/providers/community-providers/portkey) (`@portkey-ai/vercel-provider`)
- [Cloudflare Workers AI Provider](/providers/community-providers/cloudflare-workers-ai) (`workers-ai-provider`)
- [OpenRouter Provider](/providers/community-providers/openrouter) (`@openrouter/ai-sdk-provider`)
- [Requesty Provider](/providers/community-providers/requesty) (`@requesty/ai-sdk`)
- [Crosshatch Provider](/providers/community-providers/crosshatch) (`@crosshatch/ai-provider`)
- [Mixedbread Provider](/providers/community-providers/mixedbread) (`mixedbread-ai-provider`)
- [Voyage AI Provider](/providers/community-providers/voyage-ai) (`voyage-ai-provider`)
- [Mem0 Provider](/providers/community-providers/mem0)(`@mem0/vercel-ai-provider`)
- [Letta Provider](/providers/community-providers/letta)(`@letta-ai/vercel-ai-sdk-provider`)
- [Supermemory Provider](/providers/community-providers/supermemory)(`@supermemory/tools`)
- [Spark Provider](/providers/community-providers/spark) (`spark-ai-provider`)
- [AnthropicVertex Provider](/providers/community-providers/anthropic-vertex-ai) (`anthropic-vertex-ai`)
- [LangDB Provider](/providers/community-providers/langdb) (`@langdb/vercel-provider`)
- [Dify Provider](/providers/community-providers/dify) (`dify-ai-provider`)
- [Sarvam Provider](/providers/community-providers/sarvam) (`sarvam-ai-provider`)
- [Claude Code Provider](/providers/community-providers/claude-code) (`ai-sdk-provider-claude-code`)
- [Built-in AI Provider](/providers/community-providers/built-in-ai) (`built-in-ai`)
- [Gemini CLI Provider](/providers/community-providers/gemini-cli) (`ai-sdk-provider-gemini-cli`)
- [A2A Provider](/providers/community-providers/a2a) (`a2a-ai-provider`)
- [SAP-AI Provider](/providers/community-providers/sap-ai) (`@mymediset/sap-ai-provider`)
- [AI/ML API Provider](/providers/community-providers/aimlapi) (`@ai-ml.api/aimlapi-vercel-ai`)

## Self-Hosted Models

You can access self-hosted models with the following providers:

- [Ollama Provider](/providers/community-providers/ollama)
- [LM Studio](/providers/openai-compatible-providers/lmstudio)
- [Baseten](/providers/ai-sdk-providers/baseten)
- [Built-in AI](/providers/community-providers/built-in-ai)

Additionally, any self-hosted provider that supports the OpenAI specification can be used with the [OpenAI Compatible Provider](/providers/openai-compatible-providers).

## Model Capabilities

The AI providers support different language models with various capabilities.
Here are the capabilities of popular models:

| Provider                                                                 | Model                                       | Image Input         | Object Generation   | Tool Usage          | Tool Streaming      |
| ------------------------------------------------------------------------ | ------------------------------------------- | ------------------- | ------------------- | ------------------- | ------------------- |
| [xAI Grok](/providers/ai-sdk-providers/xai)                              | `grok-4`                                    | <Cross size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [xAI Grok](/providers/ai-sdk-providers/xai)                              | `grok-3`                                    | <Cross size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [xAI Grok](/providers/ai-sdk-providers/xai)                              | `grok-3-fast`                               | <Cross size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [xAI Grok](/providers/ai-sdk-providers/xai)                              | `grok-3-mini`                               | <Cross size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [xAI Grok](/providers/ai-sdk-providers/xai)                              | `grok-3-mini-fast`                          | <Cross size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [xAI Grok](/providers/ai-sdk-providers/xai)                              | `grok-2-1212`                               | <Cross size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [xAI Grok](/providers/ai-sdk-providers/xai)                              | `grok-2-vision-1212`                        | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [xAI Grok](/providers/ai-sdk-providers/xai)                              | `grok-beta`                                 | <Cross size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [xAI Grok](/providers/ai-sdk-providers/xai)                              | `grok-vision-beta`                          | <Check size={18} /> | <Cross size={18} /> | <Cross size={18} /> | <Cross size={18} /> |
| [Vercel](/providers/ai-sdk-providers/vercel)                             | `v0-1.0-md`                                 | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [OpenAI](/providers/ai-sdk-providers/openai)                             | `gpt-5`                                     | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [OpenAI](/providers/ai-sdk-providers/openai)                             | `gpt-5-mini`                                | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [OpenAI](/providers/ai-sdk-providers/openai)                             | `gpt-5-nano`                                | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [OpenAI](/providers/ai-sdk-providers/openai)                             | `gpt-5-codex`                               | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [OpenAI](/providers/ai-sdk-providers/openai)                             | `gpt-5-chat-latest`                         | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [Anthropic](/providers/ai-sdk-providers/anthropic)                       | `claude-opus-4-1`                           | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [Anthropic](/providers/ai-sdk-providers/anthropic)                       | `claude-opus-4-0`                           | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [Anthropic](/providers/ai-sdk-providers/anthropic)                       | `claude-sonnet-4-0`                         | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [Anthropic](/providers/ai-sdk-providers/anthropic)                       | `claude-3-7-sonnet-latest`                  | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [Anthropic](/providers/ai-sdk-providers/anthropic)                       | `claude-3-5-haiku-latest`                   | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [Mistral](/providers/ai-sdk-providers/mistral)                           | `pixtral-large-latest`                      | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [Mistral](/providers/ai-sdk-providers/mistral)                           | `mistral-large-latest`                      | <Cross size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [Mistral](/providers/ai-sdk-providers/mistral)                           | `mistral-medium-latest`                     | <Cross size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [Mistral](/providers/ai-sdk-providers/mistral)                           | `mistral-medium-2505`                       | <Cross size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [Mistral](/providers/ai-sdk-providers/mistral)                           | `mistral-small-latest`                      | <Cross size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [Mistral](/providers/ai-sdk-providers/mistral)                           | `pixtral-12b-2409`                          | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [Google Generative AI](/providers/ai-sdk-providers/google-generative-ai) | `gemini-2.0-flash-exp`                      | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [Google Generative AI](/providers/ai-sdk-providers/google-generative-ai) | `gemini-1.5-flash`                          | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [Google Generative AI](/providers/ai-sdk-providers/google-generative-ai) | `gemini-1.5-pro`                            | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [Google Vertex](/providers/ai-sdk-providers/google-vertex)               | `gemini-2.0-flash-exp`                      | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [Google Vertex](/providers/ai-sdk-providers/google-vertex)               | `gemini-1.5-flash`                          | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [Google Vertex](/providers/ai-sdk-providers/google-vertex)               | `gemini-1.5-pro`                            | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [DeepSeek](/providers/ai-sdk-providers/deepseek)                         | `deepseek-chat`                             | <Cross size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [DeepSeek](/providers/ai-sdk-providers/deepseek)                         | `deepseek-reasoner`                         | <Cross size={18} /> | <Cross size={18} /> | <Cross size={18} /> | <Cross size={18} /> |
| [Cerebras](/providers/ai-sdk-providers/cerebras)                         | `llama3.1-8b`                               | <Cross size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [Cerebras](/providers/ai-sdk-providers/cerebras)                         | `llama3.1-70b`                              | <Cross size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [Cerebras](/providers/ai-sdk-providers/cerebras)                         | `llama3.3-70b`                              | <Cross size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [Groq](/providers/ai-sdk-providers/groq)                                 | `meta-llama/llama-4-scout-17b-16e-instruct` | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [Groq](/providers/ai-sdk-providers/groq)                                 | `llama-3.3-70b-versatile`                   | <Cross size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [Groq](/providers/ai-sdk-providers/groq)                                 | `llama-3.1-8b-instant`                      | <Cross size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [Groq](/providers/ai-sdk-providers/groq)                                 | `mixtral-8x7b-32768`                        | <Cross size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |
| [Groq](/providers/ai-sdk-providers/groq)                                 | `gemma2-9b-it`                              | <Cross size={18} /> | <Check size={18} /> | <Check size={18} /> | <Check size={18} /> |

<Note>
  This table is not exhaustive. Additional models can be found in the provider
  documentation pages and on the provider websites.
</Note>

# Provider & Model Management

When you work with multiple providers and models, it is often desirable to manage them in a central place
and access the models through simple string ids.

The AI SDK offers [custom providers](/docs/reference/ai-sdk-core/custom-provider) and
a [provider registry](/docs/reference/ai-sdk-core/provider-registry) for this purpose:

- With **custom providers**, you can pre-configure model settings, provide model name aliases,
  and limit the available models.
- The **provider registry** lets you mix multiple providers and access them through simple string ids.

You can mix and match custom providers, the provider registry, and [middleware](/docs/ai-sdk-core/middleware) in your application.

## Custom Providers

You can create a [custom provider](/docs/reference/ai-sdk-core/custom-provider) using `customProvider`.

### Example: custom model settings

You might want to override the default model settings for a provider or provide model name aliases
with pre-configured settings.

```ts
import { openai as originalOpenAI } from '@ai-sdk/openai';
import {
  customProvider,
  defaultSettingsMiddleware,
  wrapLanguageModel,
} from 'ai';

// custom provider with different provider options:
export const openai = customProvider({
  languageModels: {
    // replacement model with custom provider options:
    'gpt-4o': wrapLanguageModel({
      model: originalOpenAI('gpt-4o'),
      middleware: defaultSettingsMiddleware({
        settings: {
          providerOptions: {
            openai: {
              reasoningEffort: 'high',
            },
          },
        },
      }),
    }),
    // alias model with custom provider options:
    'gpt-4o-mini-high-reasoning': wrapLanguageModel({
      model: originalOpenAI('gpt-4o-mini'),
      middleware: defaultSettingsMiddleware({
        settings: {
          providerOptions: {
            openai: {
              reasoningEffort: 'high',
            },
          },
        },
      }),
    }),
  },
  fallbackProvider: originalOpenAI,
});
```

### Example: model name alias

You can also provide model name aliases, so you can update the model version in one place in the future:

```ts
import { anthropic as originalAnthropic } from '@ai-sdk/anthropic';
import { customProvider } from 'ai';

// custom provider with alias names:
export const anthropic = customProvider({
  languageModels: {
    opus: originalAnthropic('claude-3-opus-20240229'),
    sonnet: originalAnthropic('claude-3-5-sonnet-20240620'),
    haiku: originalAnthropic('claude-3-haiku-20240307'),
  },
  fallbackProvider: originalAnthropic,
});
```

### Example: limit available models

You can limit the available models in the system, even if you have multiple providers.

```ts
import { anthropic } from '@ai-sdk/anthropic';
import { openai } from '@ai-sdk/openai';
import {
  customProvider,
  defaultSettingsMiddleware,
  wrapLanguageModel,
} from 'ai';

export const myProvider = customProvider({
  languageModels: {
    'text-medium': anthropic('claude-3-5-sonnet-20240620'),
    'text-small': openai('gpt-4o-mini'),
    'reasoning-medium': wrapLanguageModel({
      model: openai('gpt-4o'),
      middleware: defaultSettingsMiddleware({
        settings: {
          providerOptions: {
            openai: {
              reasoningEffort: 'high',
            },
          },
        },
      }),
    }),
    'reasoning-fast': wrapLanguageModel({
      model: openai('gpt-4o-mini'),
      middleware: defaultSettingsMiddleware({
        settings: {
          providerOptions: {
            openai: {
              reasoningEffort: 'high',
            },
          },
        },
      }),
    }),
  },
  embeddingModels: {
    embedding: openai.textEmbeddingModel('text-embedding-3-small'),
  },
  // no fallback provider
});
```

## Provider Registry

You can create a [provider registry](/docs/reference/ai-sdk-core/provider-registry) with multiple providers and models using `createProviderRegistry`.

### Setup

```ts filename={"registry.ts"}
import { anthropic } from '@ai-sdk/anthropic';
import { createOpenAI } from '@ai-sdk/openai';
import { createProviderRegistry } from 'ai';

export const registry = createProviderRegistry({
  // register provider with prefix and default setup:
  anthropic,

  // register provider with prefix and custom setup:
  openai: createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  }),
});
```

### Setup with Custom Separator

By default, the registry uses `:` as the separator between provider and model IDs. You can customize this separator:

```ts filename={"registry.ts"}
import { createProviderRegistry } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { openai } from '@ai-sdk/openai';

export const customSeparatorRegistry = createProviderRegistry(
  {
    anthropic,
    openai,
  },
  { separator: ' > ' },
);
```

### Example: Use language models

You can access language models by using the `languageModel` method on the registry.
The provider id will become the prefix of the model id: `providerId:modelId`.

```ts highlight={"5"}
import { generateText } from 'ai';
import { registry } from './registry';

const { text } = await generateText({
  model: registry.languageModel('openai:gpt-4.1'), // default separator
  // or with custom separator:
  // model: customSeparatorRegistry.languageModel('openai > gpt-4.1'),
  prompt: 'Invent a new holiday and describe its traditions.',
});
```

### Example: Use text embedding models

You can access text embedding models by using the `textEmbeddingModel` method on the registry.
The provider id will become the prefix of the model id: `providerId:modelId`.

```ts highlight={"5"}
import { embed } from 'ai';
import { registry } from './registry';

const { embedding } = await embed({
  model: registry.textEmbeddingModel('openai:text-embedding-3-small'),
  value: 'sunny day at the beach',
});
```

### Example: Use image models

You can access image models by using the `imageModel` method on the registry.
The provider id will become the prefix of the model id: `providerId:modelId`.

```ts highlight={"5"}
import { generateImage } from 'ai';
import { registry } from './registry';

const { image } = await generateImage({
  model: registry.imageModel('openai:dall-e-3'),
  prompt: 'A beautiful sunset over a calm ocean',
});
```

## Combining Custom Providers, Provider Registry, and Middleware

The central idea of provider management is to set up a file that contains all the providers and models you want to use.
You may want to pre-configure model settings, provide model name aliases, limit the available models, and more.

Here is an example that implements the following concepts:

- pass through a full provider with a namespace prefix (here: `xai > *`)
- setup an OpenAI-compatible provider with custom api key and base URL (here: `custom > *`)
- setup model name aliases (here: `anthropic > fast`, `anthropic > writing`, `anthropic > reasoning`)
- pre-configure model settings (here: `anthropic > reasoning`)
- validate the provider-specific options (here: `AnthropicProviderOptions`)
- use a fallback provider (here: `anthropic > *`)
- limit a provider to certain models without a fallback (here: `groq > gemma2-9b-it`, `groq > qwen-qwq-32b`)
- define a custom separator for the provider registry (here: `>`)

```ts
import { anthropic, AnthropicProviderOptions } from '@ai-sdk/anthropic';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { xai } from '@ai-sdk/xai';
import { groq } from '@ai-sdk/groq';
import {
  createProviderRegistry,
  customProvider,
  defaultSettingsMiddleware,
  wrapLanguageModel,
} from 'ai';

export const registry = createProviderRegistry(
  {
    // pass through a full provider with a namespace prefix
    xai,

    // access an OpenAI-compatible provider with custom setup
    custom: createOpenAICompatible({
      name: 'provider-name',
      apiKey: process.env.CUSTOM_API_KEY,
      baseURL: 'https://api.custom.com/v1',
    }),

    // setup model name aliases
    anthropic: customProvider({
      languageModels: {
        fast: anthropic('claude-3-haiku-20240307'),

        // simple model
        writing: anthropic('claude-3-7-sonnet-20250219'),

        // extended reasoning model configuration:
        reasoning: wrapLanguageModel({
          model: anthropic('claude-3-7-sonnet-20250219'),
          middleware: defaultSettingsMiddleware({
            settings: {
              maxOutputTokens: 100000, // example default setting
              providerOptions: {
                anthropic: {
                  thinking: {
                    type: 'enabled',
                    budgetTokens: 32000,
                  },
                } satisfies AnthropicProviderOptions,
              },
            },
          }),
        }),
      },
      fallbackProvider: anthropic,
    }),

    // limit a provider to certain models without a fallback
    groq: customProvider({
      languageModels: {
        'gemma2-9b-it': groq('gemma2-9b-it'),
        'qwen-qwq-32b': groq('qwen-qwq-32b'),
      },
    }),
  },
  { separator: ' > ' },
);

// usage:
const model = registry.languageModel('anthropic > reasoning');
```

## Global Provider Configuration

The AI SDK 5 includes a global provider feature that allows you to specify a model using just a plain model ID string:

```ts
import { streamText } from 'ai';

const result = await streamText({
  model: 'openai/gpt-4o', // Uses the global provider (defaults to AI Gateway)
  prompt: 'Invent a new holiday and describe its traditions.',
});
```

By default, the global provider is set to the Vercel AI Gateway.

### Customizing the Global Provider

You can set your own preferred global provider:

```ts filename="setup.ts"
import { openai } from '@ai-sdk/openai';

// Initialize once during startup:
globalThis.AI_SDK_DEFAULT_PROVIDER = openai;
```

```ts filename="app.ts"
import { streamText } from 'ai';

const result = await streamText({
  model: 'gpt-4o', // Uses OpenAI provider without prefix
  prompt: 'Invent a new holiday and describe its traditions.',
});
```

This simplifies provider usage and makes it easier to switch between providers without changing your model references throughout your codebase.

# `customProvider()`

With a custom provider, you can map ids to any model.
This allows you to set up custom model configurations, alias names, and more.
The custom provider also supports a fallback provider, which is useful for
wrapping existing providers and adding additional functionality.

### Example: custom model settings

You can create a custom provider using `customProvider`.

```ts
import { openai } from '@ai-sdk/openai';
import { customProvider } from 'ai';

// custom provider with different model settings:
export const myOpenAI = customProvider({
  languageModels: {
    // replacement model with custom settings:
    'gpt-4': wrapLanguageModel({
      model: openai('gpt-4'),
      middleware: defaultSettingsMiddleware({
        settings: {
          providerOptions: {
            openai: {
              reasoningEffort: 'high',
            },
          },
        },
      }),
    }),
    // alias model with custom settings:
    'gpt-4o-reasoning-high': wrapLanguageModel({
      model: openai('gpt-4o'),
      middleware: defaultSettingsMiddleware({
        settings: {
          providerOptions: {
            openai: {
              reasoningEffort: 'high',
            },
          },
        },
      }),
    }),
  },
  fallbackProvider: openai,
});
```

## Import

<Snippet text={`import {  customProvider } from "ai"`} prompt={false} />

## API Signature

### Parameters

<PropertiesTable
  content={[
    {
      name: 'languageModels',
      type: 'Record<string, LanguageModel>',
      isOptional: true,
      description:
        'A record of language models, where keys are model IDs and values are LanguageModel instances.',
    },
    {
      name: 'textEmbeddingModels',
      type: 'Record<string, EmbeddingModel<string>>',
      isOptional: true,
      description:
        'A record of text embedding models, where keys are model IDs and values are EmbeddingModel<string> instances.',
    },
    {
      name: 'imageModels',
      type: 'Record<string, ImageModel>',
      isOptional: true,
      description:
        'A record of image models, where keys are model IDs and values are ImageModelV2 instances.',
    },
    {
      name: 'fallbackProvider',
      type: 'Provider',
      isOptional: true,
      description:
        'An optional fallback provider to use when a requested model is not found in the custom provider.',
    },
  ]}
/>

### Returns

The `customProvider` function returns a `Provider` instance. It has the following methods:

<PropertiesTable
  content={[
    {
      name: 'languageModel',
      type: '(id: string) => LanguageModel',
      description:
        'A function that returns a language model by its id (format: providerId:modelId)',
    },
    {
      name: 'textEmbeddingModel',
      type: '(id: string) => EmbeddingModel<string>',
      description:
        'A function that returns a text embedding model by its id (format: providerId:modelId)',
    },
    {
      name: 'imageModel',
      type: '(id: string) => ImageModel',
      description:
        'A function that returns an image model by its id (format: providerId:modelId)',
    },
  ]}
/>

# `createProviderRegistry()`

When you work with multiple providers and models, it is often desirable to manage them
in a central place and access the models through simple string ids.

`createProviderRegistry` lets you create a registry with multiple providers that you
can access by their ids in the format `providerId:modelId`.

### Setup

You can create a registry with multiple providers and models using `createProviderRegistry`.

```ts
import { anthropic } from '@ai-sdk/anthropic';
import { createOpenAI } from '@ai-sdk/openai';
import { createProviderRegistry } from 'ai';

export const registry = createProviderRegistry({
  // register provider with prefix and default setup:
  anthropic,

  // register provider with prefix and custom setup:
  openai: createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  }),
});
```

### Custom Separator

By default, the registry uses `:` as the separator between provider and model IDs. You can customize this separator by passing a `separator` option:

```ts
const registry = createProviderRegistry(
  {
    anthropic,
    openai,
  },
  { separator: ' > ' },
);

// Now you can use the custom separator
const model = registry.languageModel('anthropic > claude-3-opus-20240229');
```

### Language models

You can access language models by using the `languageModel` method on the registry.
The provider id will become the prefix of the model id: `providerId:modelId`.

```ts highlight={"5"}
import { generateText } from 'ai';
import { registry } from './registry';

const { text } = await generateText({
  model: registry.languageModel('openai:gpt-4.1'),
  prompt: 'Invent a new holiday and describe its traditions.',
});
```

### Text embedding models

You can access text embedding models by using the `textEmbeddingModel` method on the registry.
The provider id will become the prefix of the model id: `providerId:modelId`.

```ts highlight={"5"}
import { embed } from 'ai';
import { registry } from './registry';

const { embedding } = await embed({
  model: registry.textEmbeddingModel('openai:text-embedding-3-small'),
  value: 'sunny day at the beach',
});
```

### Image models

You can access image models by using the `imageModel` method on the registry.
The provider id will become the prefix of the model id: `providerId:modelId`.

```ts highlight={"5"}
import { generateImage } from 'ai';
import { registry } from './registry';

const { image } = await generateImage({
  model: registry.imageModel('openai:dall-e-3'),
  prompt: 'A beautiful sunset over a calm ocean',
});
```

## Import

<Snippet text={`import { createProviderRegistry } from "ai"`} prompt={false} />

## API Signature

### Parameters

<PropertiesTable
  content={[
    {
      name: 'providers',
      type: 'Record<string, Provider>',
      description:
        'The unique identifier for the provider. It should be unique within the registry.',
      properties: [
        {
          type: 'Provider',
          parameters: [
            {
              name: 'languageModel',
              type: '(id: string) => LanguageModel',
              description:
                'A function that returns a language model by its id.',
            },
            {
              name: 'textEmbeddingModel',
              type: '(id: string) => EmbeddingModel<string>',
              description:
                'A function that returns a text embedding model by its id.',
            },
            {
              name: 'imageModel',
              type: '(id: string) => ImageModel',
              description: 'A function that returns an image model by its id.',
            },
          ],
        },
      ],
    },
    {
      name: 'options',
      type: 'object',
      description: 'Optional configuration for the registry.',
      properties: [
        {
          type: 'Options',
          parameters: [
            {
              name: 'separator',
              type: 'string',
              description:
                'Custom separator between provider and model IDs. Defaults to ":".',
            },
          ],
        },
      ],
    },
  ]}
/>

### Returns

The `createProviderRegistry` function returns a `Provider` instance. It has the following methods:

<PropertiesTable
  content={[
    {
      name: 'languageModel',
      type: '(id: string) => LanguageModel',
      description:
        'A function that returns a language model by its id (format: providerId:modelId)',
    },
    {
      name: 'textEmbeddingModel',
      type: '(id: string) => EmbeddingModel<string>',
      description:
        'A function that returns a text embedding model by its id (format: providerId:modelId)',
    },
    {
      name: 'imageModel',
      type: '(id: string) => ImageModel',
      description:
        'A function that returns an image model by its id (format: providerId:modelId)',
    },
  ]}
/>
