
# Embeddings

Embeddings are a way to represent words, phrases, or images as vectors in a high-dimensional space.
In this space, similar words are close to each other, and the distance between words can be used to measure their similarity.

## Embedding a Single Value

The AI SDK provides the [`embed`](/docs/reference/ai-sdk-core/embed) function to embed single values, which is useful for tasks such as finding similar words
or phrases or clustering text.
You can use it with embeddings models, e.g. `openai.textEmbeddingModel('text-embedding-3-large')` or `mistral.textEmbeddingModel('mistral-embed')`.

```tsx
import { embed } from 'ai';
import { openai } from '@ai-sdk/openai';

// 'embedding' is a single embedding object (number[])
const { embedding } = await embed({
  model: openai.textEmbeddingModel('text-embedding-3-small'),
  value: 'sunny day at the beach',
});
```

## Embedding Many Values

When loading data, e.g. when preparing a data store for retrieval-augmented generation (RAG),
it is often useful to embed many values at once (batch embedding).

The AI SDK provides the [`embedMany`](/docs/reference/ai-sdk-core/embed-many) function for this purpose.
Similar to `embed`, you can use it with embeddings models,
e.g. `openai.textEmbeddingModel('text-embedding-3-large')` or `mistral.textEmbeddingModel('mistral-embed')`.

```tsx
import { openai } from '@ai-sdk/openai';
import { embedMany } from 'ai';

// 'embeddings' is an array of embedding objects (number[][]).
// It is sorted in the same order as the input values.
const { embeddings } = await embedMany({
  model: openai.textEmbeddingModel('text-embedding-3-small'),
  values: [
    'sunny day at the beach',
    'rainy afternoon in the city',
    'snowy night in the mountains',
  ],
});
```

## Embedding Similarity

After embedding values, you can calculate the similarity between them using the [`cosineSimilarity`](/docs/reference/ai-sdk-core/cosine-similarity) function.
This is useful to e.g. find similar words or phrases in a dataset.
You can also rank and filter related items based on their similarity.

```ts highlight={"2,10"}
import { openai } from '@ai-sdk/openai';
import { cosineSimilarity, embedMany } from 'ai';

const { embeddings } = await embedMany({
  model: openai.textEmbeddingModel('text-embedding-3-small'),
  values: ['sunny day at the beach', 'rainy afternoon in the city'],
});

console.log(
  `cosine similarity: ${cosineSimilarity(embeddings[0], embeddings[1])}`,
);
```

## Token Usage

Many providers charge based on the number of tokens used to generate embeddings.
Both `embed` and `embedMany` provide token usage information in the `usage` property of the result object:

```ts highlight={"4,9"}
import { openai } from '@ai-sdk/openai';
import { embed } from 'ai';

const { embedding, usage } = await embed({
  model: openai.textEmbeddingModel('text-embedding-3-small'),
  value: 'sunny day at the beach',
});

console.log(usage); // { tokens: 10 }
```

## Settings

### Provider Options

Embedding model settings can be configured using `providerOptions` for provider-specific parameters:

```ts highlight={"5-9"}
import { openai } from '@ai-sdk/openai';
import { embed } from 'ai';

const { embedding } = await embed({
  model: openai.textEmbeddingModel('text-embedding-3-small'),
  value: 'sunny day at the beach',
  providerOptions: {
    openai: {
      dimensions: 512, // Reduce embedding dimensions
    },
  },
});
```

### Parallel Requests

The `embedMany` function now supports parallel processing with configurable `maxParallelCalls` to optimize performance:

```ts highlight={"4"}
import { openai } from '@ai-sdk/openai';
import { embedMany } from 'ai';

const { embeddings, usage } = await embedMany({
  maxParallelCalls: 2, // Limit parallel requests
  model: openai.textEmbeddingModel('text-embedding-3-small'),
  values: [
    'sunny day at the beach',
    'rainy afternoon in the city',
    'snowy night in the mountains',
  ],
});
```

### Retries

Both `embed` and `embedMany` accept an optional `maxRetries` parameter of type `number`
that you can use to set the maximum number of retries for the embedding process.
It defaults to `2` retries (3 attempts in total). You can set it to `0` to disable retries.

```ts highlight={"7"}
import { openai } from '@ai-sdk/openai';
import { embed } from 'ai';

const { embedding } = await embed({
  model: openai.textEmbeddingModel('text-embedding-3-small'),
  value: 'sunny day at the beach',
  maxRetries: 0, // Disable retries
});
```

### Abort Signals and Timeouts

Both `embed` and `embedMany` accept an optional `abortSignal` parameter of
type [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)
that you can use to abort the embedding process or set a timeout.

```ts highlight={"7"}
import { openai } from '@ai-sdk/openai';
import { embed } from 'ai';

const { embedding } = await embed({
  model: openai.textEmbeddingModel('text-embedding-3-small'),
  value: 'sunny day at the beach',
  abortSignal: AbortSignal.timeout(1000), // Abort after 1 second
});
```

### Custom Headers

Both `embed` and `embedMany` accept an optional `headers` parameter of type `Record<string, string>`
that you can use to add custom headers to the embedding request.

```ts highlight={"7"}
import { openai } from '@ai-sdk/openai';
import { embed } from 'ai';

const { embedding } = await embed({
  model: openai.textEmbeddingModel('text-embedding-3-small'),
  value: 'sunny day at the beach',
  headers: { 'X-Custom-Header': 'custom-value' },
});
```

## Response Information

Both `embed` and `embedMany` return response information that includes the raw provider response:

```ts highlight={"4,9"}
import { openai } from '@ai-sdk/openai';
import { embed } from 'ai';

const { embedding, response } = await embed({
  model: openai.textEmbeddingModel('text-embedding-3-small'),
  value: 'sunny day at the beach',
});

console.log(response); // Raw provider response
```

## Embedding Providers & Models

Several providers offer embedding models:

| Provider                                                                                  | Model                           | Embedding Dimensions |
| ----------------------------------------------------------------------------------------- | ------------------------------- | -------------------- |
| [OpenAI](/providers/ai-sdk-providers/openai#embedding-models)                             | `text-embedding-3-large`        | 3072                 |
| [OpenAI](/providers/ai-sdk-providers/openai#embedding-models)                             | `text-embedding-3-small`        | 1536                 |
| [OpenAI](/providers/ai-sdk-providers/openai#embedding-models)                             | `text-embedding-ada-002`        | 1536                 |
| [Google Generative AI](/providers/ai-sdk-providers/google-generative-ai#embedding-models) | `gemini-embedding-001`          | 3072                 |
| [Google Generative AI](/providers/ai-sdk-providers/google-generative-ai#embedding-models) | `text-embedding-004`            | 768                  |
| [Mistral](/providers/ai-sdk-providers/mistral#embedding-models)                           | `mistral-embed`                 | 1024                 |
| [Cohere](/providers/ai-sdk-providers/cohere#embedding-models)                             | `embed-english-v3.0`            | 1024                 |
| [Cohere](/providers/ai-sdk-providers/cohere#embedding-models)                             | `embed-multilingual-v3.0`       | 1024                 |
| [Cohere](/providers/ai-sdk-providers/cohere#embedding-models)                             | `embed-english-light-v3.0`      | 384                  |
| [Cohere](/providers/ai-sdk-providers/cohere#embedding-models)                             | `embed-multilingual-light-v3.0` | 384                  |
| [Cohere](/providers/ai-sdk-providers/cohere#embedding-models)                             | `embed-english-v2.0`            | 4096                 |
| [Cohere](/providers/ai-sdk-providers/cohere#embedding-models)                             | `embed-english-light-v2.0`      | 1024                 |
| [Cohere](/providers/ai-sdk-providers/cohere#embedding-models)                             | `embed-multilingual-v2.0`       | 768                  |
| [Amazon Bedrock](/providers/ai-sdk-providers/amazon-bedrock#embedding-models)             | `amazon.titan-embed-text-v1`    | 1536                 |
| [Amazon Bedrock](/providers/ai-sdk-providers/amazon-bedrock#embedding-models)             | `amazon.titan-embed-text-v2:0`  | 1024                 |



# `cosineSimilarity()`

When you want to compare the similarity of embeddings, standard vector similarity metrics
like cosine similarity are often used.

`cosineSimilarity` calculates the cosine similarity between two vectors.
A high value (close to 1) indicates that the vectors are very similar, while a low value (close to -1) indicates that they are different.

```ts
import { openai } from '@ai-sdk/openai';
import { cosineSimilarity, embedMany } from 'ai';

const { embeddings } = await embedMany({
  model: openai.textEmbeddingModel('text-embedding-3-small'),
  values: ['sunny day at the beach', 'rainy afternoon in the city'],
});

console.log(
  `cosine similarity: ${cosineSimilarity(embeddings[0], embeddings[1])}`,
);
```

## Import

<Snippet text={`import { cosineSimilarity } from "ai"`} prompt={false} />

## API Signature

### Parameters

<PropertiesTable
  content={[
    {
      name: 'vector1',
      type: 'number[]',
      description: 'The first vector to compare',
    },
    {
      name: 'vector2',
      type: 'number[]',
      description: 'The second vector to compare',
    },
  ]}
/>

### Returns

A number between -1 and 1 representing the cosine similarity between the two vectors.

# `embed()`

Generate an embedding for a single value using an embedding model.

This is ideal for use cases where you need to embed a single value to e.g. retrieve similar items or to use the embedding in a downstream task.

```ts
import { openai } from '@ai-sdk/openai';
import { embed } from 'ai';

const { embedding } = await embed({
  model: openai.textEmbeddingModel('text-embedding-3-small'),
  value: 'sunny day at the beach',
});
```

## Import

<Snippet text={`import { embed } from "ai"`} prompt={false} />

## API Signature

### Parameters

<PropertiesTable
  content={[
    {
      name: 'model',
      type: 'EmbeddingModel',
      description:
        "The embedding model to use. Example: openai.textEmbeddingModel('text-embedding-3-small')",
    },
    {
      name: 'value',
      type: 'VALUE',
      description: 'The value to embed. The type depends on the model.',
    },
    {
      name: 'maxRetries',
      type: 'number',
      isOptional: true,
      description:
        'Maximum number of retries. Set to 0 to disable retries. Default: 2.',
    },
    {
      name: 'abortSignal',
      type: 'AbortSignal',
      isOptional: true,
      description:
        'An optional abort signal that can be used to cancel the call.',
    },
    {
      name: 'headers',
      type: 'Record<string, string>',
      isOptional: true,
      description:
        'Additional HTTP headers to be sent with the request. Only applicable for HTTP-based providers.',
    },
    {
      name: 'experimental_telemetry',
      type: 'TelemetrySettings',
      isOptional: true,
      description: 'Telemetry configuration. Experimental feature.',
      properties: [
        {
          type: 'TelemetrySettings',
          parameters: [
            {
              name: 'isEnabled',
              type: 'boolean',
              isOptional: true,
              description:
                'Enable or disable telemetry. Disabled by default while experimental.',
            },
            {
              name: 'recordInputs',
              type: 'boolean',
              isOptional: true,
              description:
                'Enable or disable input recording. Enabled by default.',
            },
            {
              name: 'recordOutputs',
              type: 'boolean',
              isOptional: true,
              description:
                'Enable or disable output recording. Enabled by default.',
            },
            {
              name: 'functionId',
              type: 'string',
              isOptional: true,
              description:
                'Identifier for this function. Used to group telemetry data by function.',
            },
            {
              name: 'metadata',
              isOptional: true,
              type: 'Record<string, string | number | boolean | Array<null | undefined | string> | Array<null | undefined | number> | Array<null | undefined | boolean>>',
              description:
                'Additional information to include in the telemetry data.',
            },
            {
              name: 'tracer',
              type: 'Tracer',
              isOptional: true,
              description: 'A custom tracer to use for the telemetry data.',
            },
          ],
        },
      ],
    },
  ]}
/>

### Returns

<PropertiesTable
  content={[
    {
      name: 'value',
      type: 'VALUE',
      description: 'The value that was embedded.',
    },
    {
      name: 'embedding',
      type: 'number[]',
      description: 'The embedding of the value.',
    },
    {
      name: 'usage',
      type: 'EmbeddingModelUsage',
      description: 'The token usage for generating the embeddings.',
      properties: [
        {
          type: 'EmbeddingModelUsage',
          parameters: [
            {
              name: 'tokens',
              type: 'number',
              description: 'The number of tokens used in the embedding.',
            },
          ],
        },
      ],
    },
    {
      name: 'response',
      type: 'Response',
      isOptional: true,
      description: 'Optional response data.',
      properties: [
        {
          type: 'Response',
          parameters: [
            {
              name: 'headers',
              isOptional: true,
              type: 'Record<string, string>',
              description: 'Response headers.',
            },
            {
              name: 'body',
              type: 'unknown',
              isOptional: true,
              description: 'The response body.',
            },
          ],
        },
      ],
    },
    {
      name: 'providerMetadata',
      type: 'ProviderMetadata | undefined',
      isOptional: true,
      description:
        'Optional metadata from the provider. The outer key is the provider name. The inner values are the metadata. Details depend on the provider.',
    },
  ]}
/>

# `embedMany()`

Embed several values using an embedding model. The type of the value is defined
by the embedding model.

`embedMany` automatically splits large requests into smaller chunks if the model
has a limit on how many embeddings can be generated in a single call.

```ts
import { openai } from '@ai-sdk/openai';
import { embedMany } from 'ai';

const { embeddings } = await embedMany({
  model: openai.textEmbeddingModel('text-embedding-3-small'),
  values: [
    'sunny day at the beach',
    'rainy afternoon in the city',
    'snowy night in the mountains',
  ],
});
```

## Import

<Snippet text={`import { embedMany } from "ai"`} prompt={false} />

## API Signature

### Parameters

<PropertiesTable
  content={[
    {
      name: 'model',
      type: 'EmbeddingModel',
      description:
        "The embedding model to use. Example: openai.textEmbeddingModel('text-embedding-3-small')",
    },
    {
      name: 'values',
      type: 'Array<VALUE>',
      description: 'The values to embed. The type depends on the model.',
    },
    {
      name: 'maxRetries',
      type: 'number',
      isOptional: true,
      description:
        'Maximum number of retries. Set to 0 to disable retries. Default: 2.',
    },
    {
      name: 'abortSignal',
      type: 'AbortSignal',
      isOptional: true,
      description:
        'An optional abort signal that can be used to cancel the call.',
    },
    {
      name: 'headers',
      type: 'Record<string, string>',
      isOptional: true,
      description:
        'Additional HTTP headers to be sent with the request. Only applicable for HTTP-based providers.',
    },
    {
      name: 'experimental_telemetry',
      type: 'TelemetrySettings',
      isOptional: true,
      description: 'Telemetry configuration. Experimental feature.',
      properties: [
        {
          type: 'TelemetrySettings',
          parameters: [
            {
              name: 'isEnabled',
              type: 'boolean',
              isOptional: true,
              description:
                'Enable or disable telemetry. Disabled by default while experimental.',
            },
            {
              name: 'recordInputs',
              type: 'boolean',
              isOptional: true,
              description:
                'Enable or disable input recording. Enabled by default.',
            },
            {
              name: 'recordOutputs',
              type: 'boolean',
              isOptional: true,
              description:
                'Enable or disable output recording. Enabled by default.',
            },
            {
              name: 'functionId',
              type: 'string',
              isOptional: true,
              description:
                'Identifier for this function. Used to group telemetry data by function.',
            },
            {
              name: 'metadata',
              isOptional: true,
              type: 'Record<string, string | number | boolean | Array<null | undefined | string> | Array<null | undefined | number> | Array<null | undefined | boolean>>',
              description:
                'Additional information to include in the telemetry data.',
            },
            {
              name: 'tracer',
              type: 'Tracer',
              isOptional: true,
              description: 'A custom tracer to use for the telemetry data.',
            },
          ],
        },
      ],
    },
  ]}
/>

### Returns

<PropertiesTable
  content={[
    {
      name: 'values',
      type: 'Array<VALUE>',
      description: 'The values that were embedded.',
    },
    {
      name: 'embeddings',
      type: 'number[][]',
      description: 'The embeddings. They are in the same order as the values.',
    },
    {
      name: 'usage',
      type: 'EmbeddingModelUsage',
      description: 'The token usage for generating the embeddings.',
      properties: [
        {
          type: 'EmbeddingModelUsage',
          parameters: [
            {
              name: 'tokens',
              type: 'number',
              description: 'The total number of input tokens.',
            },
            {
              name: 'body',
              type: 'unknown',
              isOptional: true,
              description: 'The response body.',
            },
          ],
        },
      ],
    },
    {
      name: 'providerMetadata',
      type: 'ProviderMetadata | undefined',
      isOptional: true,
      description:
        'Optional metadata from the provider. The outer key is the provider name. The inner values are the metadata. Details depend on the provider.',
    },
  ]}
/>
