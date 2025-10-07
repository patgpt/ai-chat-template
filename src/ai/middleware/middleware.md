
# Language Model Middleware

Language model middleware is a way to enhance the behavior of language models
by intercepting and modifying the calls to the language model.

It can be used to add features like guardrails, RAG, caching, and logging
in a language model agnostic way. Such middleware can be developed and
distributed independently from the language models that they are applied to.

## Using Language Model Middleware

You can use language model middleware with the `wrapLanguageModel` function.
It takes a language model and a language model middleware and returns a new
language model that incorporates the middleware.

```ts
import { wrapLanguageModel } from 'ai';

const wrappedLanguageModel = wrapLanguageModel({
  model: yourModel,
  middleware: yourLanguageModelMiddleware,
});
```

The wrapped language model can be used just like any other language model, e.g. in `streamText`:

```ts highlight="2"
const result = streamText({
  model: wrappedLanguageModel,
  prompt: 'What cities are in the United States?',
});
```

## Multiple middlewares

You can provide multiple middlewares to the `wrapLanguageModel` function.
The middlewares will be applied in the order they are provided.

```ts
const wrappedLanguageModel = wrapLanguageModel({
  model: yourModel,
  middleware: [firstMiddleware, secondMiddleware],
});

// applied as: firstMiddleware(secondMiddleware(yourModel))
```

## Built-in Middleware

The AI SDK comes with several built-in middlewares that you can use to configure language models:

- `extractReasoningMiddleware`: Extracts reasoning information from the generated text and exposes it as a `reasoning` property on the result.
- `simulateStreamingMiddleware`: Simulates streaming behavior with responses from non-streaming language models.
- `defaultSettingsMiddleware`: Applies default settings to a language model.

### Extract Reasoning

Some providers and models expose reasoning information in the generated text using special tags,
e.g. &lt;think&gt; and &lt;/think&gt;.

The `extractReasoningMiddleware` function can be used to extract this reasoning information and expose it as a `reasoning` property on the result.

```ts
import { wrapLanguageModel, extractReasoningMiddleware } from 'ai';

const model = wrapLanguageModel({
  model: yourModel,
  middleware: extractReasoningMiddleware({ tagName: 'think' }),
});
```

You can then use that enhanced model in functions like `generateText` and `streamText`.

The `extractReasoningMiddleware` function also includes a `startWithReasoning` option.
When set to `true`, the reasoning tag will be prepended to the generated text.
This is useful for models that do not include the reasoning tag at the beginning of the response.
For more details, see the [DeepSeek R1 guide](/docs/guides/r1#deepseek-r1-middleware).

### Simulate Streaming

The `simulateStreamingMiddleware` function can be used to simulate streaming behavior with responses from non-streaming language models.
This is useful when you want to maintain a consistent streaming interface even when using models that only provide complete responses.

```ts
import { wrapLanguageModel, simulateStreamingMiddleware } from 'ai';

const model = wrapLanguageModel({
  model: yourModel,
  middleware: simulateStreamingMiddleware(),
});
```

### Default Settings

The `defaultSettingsMiddleware` function can be used to apply default settings to a language model.

```ts
import { wrapLanguageModel, defaultSettingsMiddleware } from 'ai';

const model = wrapLanguageModel({
  model: yourModel,
  middleware: defaultSettingsMiddleware({
    settings: {
      temperature: 0.5,
      maxOutputTokens: 800,
      providerOptions: { openai: { store: false } },
    },
  }),
});
```

## Community Middleware

The AI SDK provides a Language Model Middleware specification. Community members can develop middleware that adheres to this specification, making it compatible with the AI SDK ecosystem.

Here are some community middlewares that you can explore:

### Custom tool call parser

The [Custom tool call parser](https://github.com/minpeter/ai-sdk-tool-call-middleware) middleware extends tool call capabilities to models that don't natively support the OpenAI-style `tools` parameter. This includes many self-hosted and third-party models that lack native function calling features.

<Note>
  Using this middleware on models that support native function calls may result
  in unintended performance degradation, so check whether your model supports
  native function calls before deciding to use it.
</Note>

This middleware enables function calling capabilities by converting function schemas into prompt instructions and parsing the model's responses into structured function calls. It works by transforming the JSON function definitions into natural language instructions the model can understand, then analyzing the generated text to extract function call attempts. This approach allows developers to use the same function calling API across different model providers, even with models that don't natively support the OpenAI-style function calling format, providing a consistent function calling experience regardless of the underlying model implementation.

The `@ai-sdk-tool/parser` package offers three middleware variants:

- `createToolMiddleware`: A flexible function for creating custom tool call middleware tailored to specific models
- `hermesToolMiddleware`: Ready-to-use middleware for Hermes & Qwen format function calls
- `gemmaToolMiddleware`: Pre-configured middleware for Gemma 3 model series function call format

Here's how you can enable function calls with Gemma models that don't support them natively:

```ts
import { wrapLanguageModel } from 'ai';
import { gemmaToolMiddleware } from '@ai-sdk-tool/parser';

const model = wrapLanguageModel({
  model: openrouter('google/gemma-3-27b-it'),
  middleware: gemmaToolMiddleware,
});
```

Find more examples at this [link](https://github.com/minpeter/ai-sdk-tool-call-middleware/tree/main/examples/core/src).

## Implementing Language Model Middleware

<Note>
  Implementing language model middleware is advanced functionality and requires
  a solid understanding of the [language model
  specification](https://github.com/vercel/ai/blob/v5/packages/provider/src/language-model/v2/language-model-v2.ts).
</Note>

You can implement any of the following three function to modify the behavior of the language model:

1. `transformParams`: Transforms the parameters before they are passed to the language model, for both `doGenerate` and `doStream`.
2. `wrapGenerate`: Wraps the `doGenerate` method of the [language model](https://github.com/vercel/ai/blob/v5/packages/provider/src/language-model/v2/language-model-v2.ts).
   You can modify the parameters, call the language model, and modify the result.
3. `wrapStream`: Wraps the `doStream` method of the [language model](https://github.com/vercel/ai/blob/v5/packages/provider/src/language-model/v2/language-model-v2.ts).
   You can modify the parameters, call the language model, and modify the result.

Here are some examples of how to implement language model middleware:

## Examples

<Note>
  These examples are not meant to be used in production. They are just to show
  how you can use middleware to enhance the behavior of language models.
</Note>

### Logging

This example shows how to log the parameters and generated text of a language model call.

```ts
import type {
  LanguageModelV2Middleware,
  LanguageModelV2StreamPart,
} from '@ai-sdk/provider';

export const yourLogMiddleware: LanguageModelV2Middleware = {
  wrapGenerate: async ({ doGenerate, params }) => {
    console.log('doGenerate called');
    console.log(`params: ${JSON.stringify(params, null, 2)}`);

    const result = await doGenerate();

    console.log('doGenerate finished');
    console.log(`generated text: ${result.text}`);

    return result;
  },

  wrapStream: async ({ doStream, params }) => {
    console.log('doStream called');
    console.log(`params: ${JSON.stringify(params, null, 2)}`);

    const { stream, ...rest } = await doStream();

    let generatedText = '';
    const textBlocks = new Map<string, string>();

    const transformStream = new TransformStream<
      LanguageModelV2StreamPart,
      LanguageModelV2StreamPart
    >({
      transform(chunk, controller) {
        switch (chunk.type) {
          case 'text-start': {
            textBlocks.set(chunk.id, '');
            break;
          }
          case 'text-delta': {
            const existing = textBlocks.get(chunk.id) || '';
            textBlocks.set(chunk.id, existing + chunk.delta);
            generatedText += chunk.delta;
            break;
          }
          case 'text-end': {
            console.log(
              `Text block ${chunk.id} completed:`,
              textBlocks.get(chunk.id),
            );
            break;
          }
        }

        controller.enqueue(chunk);
      },

      flush() {
        console.log('doStream finished');
        console.log(`generated text: ${generatedText}`);
      },
    });

    return {
      stream: stream.pipeThrough(transformStream),
      ...rest,
    };
  },
};
```

### Caching

This example shows how to build a simple cache for the generated text of a language model call.

```ts
import type { LanguageModelV2Middleware } from '@ai-sdk/provider';

const cache = new Map<string, any>();

export const yourCacheMiddleware: LanguageModelV2Middleware = {
  wrapGenerate: async ({ doGenerate, params }) => {
    const cacheKey = JSON.stringify(params);

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    const result = await doGenerate();

    cache.set(cacheKey, result);

    return result;
  },

  // here you would implement the caching logic for streaming
};
```

### Retrieval Augmented Generation (RAG)

This example shows how to use RAG as middleware.

<Note>
  Helper functions like `getLastUserMessageText` and `findSources` are not part
  of the AI SDK. They are just used in this example to illustrate the concept of
  RAG.
</Note>

```ts
import type { LanguageModelV2Middleware } from '@ai-sdk/provider';

export const yourRagMiddleware: LanguageModelV2Middleware = {
  transformParams: async ({ params }) => {
    const lastUserMessageText = getLastUserMessageText({
      prompt: params.prompt,
    });

    if (lastUserMessageText == null) {
      return params; // do not use RAG (send unmodified parameters)
    }

    const instruction =
      'Use the following information to answer the question:\n' +
      findSources({ text: lastUserMessageText })
        .map(chunk => JSON.stringify(chunk))
        .join('\n');

    return addToLastUserMessage({ params, text: instruction });
  },
};
```

### Guardrails

Guard rails are a way to ensure that the generated text of a language model call
is safe and appropriate. This example shows how to use guardrails as middleware.

```ts
import type { LanguageModelV2Middleware } from '@ai-sdk/provider';

export const yourGuardrailMiddleware: LanguageModelV2Middleware = {
  wrapGenerate: async ({ doGenerate }) => {
    const { text, ...rest } = await doGenerate();

    // filtering approach, e.g. for PII or other sensitive information:
    const cleanedText = text?.replace(/badword/g, '<REDACTED>');

    return { text: cleanedText, ...rest };
  },

  // here you would implement the guardrail logic for streaming
  // Note: streaming guardrails are difficult to implement, because
  // you do not know the full content of the stream until it's finished.
};
```

## Configuring Per Request Custom Metadata

To send and access custom metadata in Middleware, you can use `providerOptions`. This is useful when building logging middleware where you want to pass additional context like user IDs, timestamps, or other contextual data that can help with tracking and debugging.

```ts
import { openai } from '@ai-sdk/openai';
import { generateText, wrapLanguageModel } from 'ai';
import type { LanguageModelV2Middleware } from '@ai-sdk/provider';

export const yourLogMiddleware: LanguageModelV2Middleware = {
  wrapGenerate: async ({ doGenerate, params }) => {
    console.log('METADATA', params?.providerMetadata?.yourLogMiddleware);
    const result = await doGenerate();
    return result;
  },
};

const { text } = await generateText({
  model: wrapLanguageModel({
    model: openai('gpt-4o'),
    middleware: yourLogMiddleware,
  }),
  prompt: 'Invent a new holiday and describe its traditions.',
  providerOptions: {
    yourLogMiddleware: {
      hello: 'world',
    },
  },
});

console.log(text);
```

# `wrapLanguageModel()`

The `wrapLanguageModel` function provides a way to enhance the behavior of language models
by wrapping them with middleware.
See [Language Model Middleware](/docs/ai-sdk-core/middleware) for more information on middleware.

```ts
import { wrapLanguageModel } from 'ai';

const wrappedLanguageModel = wrapLanguageModel({
  model: 'openai/gpt-4.1',
  middleware: yourLanguageModelMiddleware,
});
```

## Import

<Snippet text={`import { wrapLanguageModel } from "ai"`} prompt={false} />

## API Signature

### Parameters

<PropertiesTable
  content={[
    {
      name: 'model',
      type: 'LanguageModelV2',
      description: 'The original LanguageModelV2 instance to be wrapped.',
    },
    {
      name: 'middleware',
      type: 'LanguageModelV2Middleware | LanguageModelV2Middleware[]',
      description:
        'The middleware to be applied to the language model. When multiple middlewares are provided, the first middleware will transform the input first, and the last middleware will be wrapped directly around the model.',
    },
    {
      name: 'modelId',
      type: 'string',
      description:
        "Optional custom model ID to override the original model's ID.",
    },
    {
      name: 'providerId',
      type: 'string',
      description:
        "Optional custom provider ID to override the original model's provider.",
    },
  ]}
/>

### Returns

A new `LanguageModelV2` instance with middleware applied.

# `LanguageModelV2Middleware`

<Note type="warning">
  Language model middleware is an experimental feature.
</Note>

Language model middleware provides a way to enhance the behavior of language models
by intercepting and modifying the calls to the language model. It can be used to add
features like guardrails, RAG, caching, and logging in a language model agnostic way.

See [Language Model Middleware](/docs/ai-sdk-core/middleware) for more information.

## Import

<Snippet
  text={`import { LanguageModelV2Middleware } from "ai"`}
  prompt={false}
/>

## API Signature

<PropertiesTable
  content={[
    {
      name: 'transformParams',
      type: '({ type: "generate" | "stream", params: LanguageModelV2CallOptions }) => Promise<LanguageModelV2CallOptions>',
      description:
        'Transforms the parameters before they are passed to the language model.',
    },
    {
      name: 'wrapGenerate',
      type: '({ doGenerate: DoGenerateFunction, params: LanguageModelV2CallOptions, model: LanguageModelV2 }) => Promise<DoGenerateResult>',
      description: 'Wraps the generate operation of the language model.',
    },
    {
      name: 'wrapStream',
      type: '({ doStream: DoStreamFunction, params: LanguageModelV2CallOptions, model: LanguageModelV2 }) => Promise<DoStreamResult>',
      description: 'Wraps the stream operation of the language model.',
    },
  ]}
/>

# `extractReasoningMiddleware()`

`extractReasoningMiddleware` is a middleware function that extracts XML-tagged reasoning sections from generated text and exposes them separately from the main text content. This is particularly useful when you want to separate an AI model's reasoning process from its final output.

```ts
import { extractReasoningMiddleware } from 'ai';

const middleware = extractReasoningMiddleware({
  tagName: 'reasoning',
  separator: '\n',
});
```

## Import

<Snippet
  text={`import { extractReasoningMiddleware } from "ai"`}
  prompt={false}
/>

## API Signature

### Parameters

<PropertiesTable
  content={[
    {
      name: 'tagName',
      type: 'string',
      isOptional: false,
      description:
        'The name of the XML tag to extract reasoning from (without angle brackets)',
    },
    {
      name: 'separator',
      type: 'string',
      isOptional: true,
      description:
        'The separator to use between reasoning and text sections. Defaults to "\\n"',
    },
    {
      name: 'startWithReasoning',
      type: 'boolean',
      isOptional: true,
      description:
        'Starts with reasoning tokens. Set to true when the response always starts with reasoning and the initial tag is omitted. Defaults to false.',
    },
  ]}
/>

### Returns

Returns a middleware object that:

- Processes both streaming and non-streaming responses
- Extracts content between specified XML tags as reasoning
- Removes the XML tags and reasoning from the main text
- Adds a `reasoning` property to the result containing the extracted content
- Maintains proper separation between text sections using the specified separator

### Type Parameters

The middleware works with the `LanguageModelV2StreamPart` type for streaming responses.

# `defaultSettingsMiddleware()`

`defaultSettingsMiddleware` is a middleware function that applies default settings to language model calls. This is useful when you want to establish consistent default parameters across multiple model invocations.

```ts
import { defaultSettingsMiddleware } from 'ai';

const middleware = defaultSettingsMiddleware({
  settings: {
    temperature: 0.7,
    maxOutputTokens: 1000,
    // other settings...
  },
});
```

## Import

<Snippet
  text={`import { defaultSettingsMiddleware } from "ai"`}
  prompt={false}
/>

## API Signature

### Parameters

The middleware accepts a configuration object with the following properties:

- `settings`: An object containing default parameter values to apply to language model calls. These can include any valid `LanguageModelV2CallOptions` properties and optional provider metadata.

### Returns

Returns a middleware object that:

- Merges the default settings with the parameters provided in each model call
- Ensures that explicitly provided parameters take precedence over defaults
- Merges provider metadata objects

### Usage Example

```ts
import { streamText } from 'ai';
import { wrapLanguageModel } from 'ai';
import { defaultSettingsMiddleware } from 'ai';
import { openai } from 'ai';

// Create a model with default settings
const modelWithDefaults = wrapLanguageModel({
  model: openai.ChatTextGenerator({ model: 'gpt-4' }),
  middleware: defaultSettingsMiddleware({
    settings: {
      temperature: 0.5,
      maxOutputTokens: 800,
      providerMetadata: {
        openai: {
          tags: ['production'],
        },
      },
    },
  }),
});

// Use the model - default settings will be applied
const result = await streamText({
  model: modelWithDefaults,
  prompt: 'Your prompt here',
  // These parameters will override the defaults
  temperature: 0.8,
});
```

## How It Works

The middleware:

1. Takes a set of default settings as configuration
2. Merges these defaults with the parameters provided in each model call
3. Ensures that explicitly provided parameters take precedence over defaults
4. Merges provider metadata objects from both sources
