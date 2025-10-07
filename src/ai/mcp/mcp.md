
# Model Context Protocol (MCP) Tools

<Note type="warning">
  The MCP tools feature is experimental and may change in the future.
</Note>

The AI SDK supports connecting to [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) servers to access their tools.
This enables your AI applications to discover and use tools across various services through a standardized interface.

## Initializing an MCP Client

We recommend using HTTP transport (like `StreamableHTTPClientTransport`) for production deployments. The stdio transport should only be used for connecting to local servers as it cannot be deployed to production environments.

Create an MCP client using one of the following transport options:

- **HTTP transport (Recommended)**: Use transports from MCP's official TypeScript SDK like `StreamableHTTPClientTransport` for production deployments
- SSE (Server-Sent Events): An alternative HTTP-based transport
- `stdio`: For local development only. Uses standard input/output streams for local MCP servers

### HTTP Transport (Recommended)

For production deployments, we recommend using HTTP transports like `StreamableHTTPClientTransport` from MCP's official TypeScript SDK:

```typescript
import { experimental_createMCPClient as createMCPClient } from 'ai';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

const url = new URL('https://your-server.com/mcp');
const mcpClient = await createMCPClient({
  transport: new StreamableHTTPClientTransport(url, {
    sessionId: 'session_123',
  }),
});
```

### SSE Transport

SSE provides an alternative HTTP-based transport option. Configure it with a `type` and `url` property:

```typescript
import { experimental_createMCPClient as createMCPClient } from 'ai';

const mcpClient = await createMCPClient({
  transport: {
    type: 'sse',
    url: 'https://my-server.com/sse',

    // optional: configure HTTP headers, e.g. for authentication
    headers: {
      Authorization: 'Bearer my-api-key',
    },
  },
});
```

### Stdio Transport (Local Servers)

<Note type="warning">
  The stdio transport should only be used for local servers.
</Note>

The Stdio transport can be imported from either the MCP SDK or the AI SDK:

```typescript
import { experimental_createMCPClient as createMCPClient } from 'ai';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
// Or use the AI SDK's stdio transport:
// import { Experimental_StdioMCPTransport as StdioClientTransport } from 'ai/mcp-stdio';

const mcpClient = await createMCPClient({
  transport: new StdioClientTransport({
    command: 'node',
    args: ['src/stdio/dist/server.js'],
  }),
});
```

### Custom Transport

You can also bring your own transport by implementing the `MCPTransport` interface for specific requirements not covered by the standard transports.

<Note>
  The client returned by the `experimental_createMCPClient` function is a
  lightweight client intended for use in tool conversion. It currently does not
  support all features of the full MCP client, such as: authorization, session
  management, resumable streams, and receiving notifications.
</Note>

### Closing the MCP Client

After initialization, you should close the MCP client based on your usage pattern:

- For short-lived usage (e.g., single requests), close the client when the response is finished
- For long-running clients (e.g., command line apps), keep the client open but ensure it's closed when the application terminates

When streaming responses, you can close the client when the LLM response has finished. For example, when using `streamText`, you should use the `onFinish` callback:

```typescript
const mcpClient = await experimental_createMCPClient({
  // ...
});

const tools = await mcpClient.tools();

const result = await streamText({
  model: 'openai/gpt-4.1',
  tools,
  prompt: 'What is the weather in Brooklyn, New York?',
  onFinish: async () => {
    await mcpClient.close();
  },
});
```

When generating responses without streaming, you can use try/finally or cleanup functions in your framework:

```typescript
let mcpClient: MCPClient | undefined;

try {
  mcpClient = await experimental_createMCPClient({
    // ...
  });
} finally {
  await mcpClient?.close();
}
```

## Using MCP Tools

The client's `tools` method acts as an adapter between MCP tools and AI SDK tools. It supports two approaches for working with tool schemas:

### Schema Discovery

With schema discovery, all tools offered by the server are automatically listed, and input parameter types are inferred based on the schemas provided by the server:

```typescript
const tools = await mcpClient.tools();
```

This approach is simpler to implement and automatically stays in sync with server changes. However, you won't have TypeScript type safety during development, and all tools from the server will be loaded

### Schema Definition

For better type safety and control, you can define the tools and their input schemas explicitly in your client code:

```typescript
import { z } from 'zod';

const tools = await mcpClient.tools({
  schemas: {
    'get-data': {
      inputSchema: z.object({
        query: z.string().describe('The data query'),
        format: z.enum(['json', 'text']).optional(),
      }),
    },
    // For tools with zero inputs, you should use an empty object:
    'tool-with-no-args': {
      inputSchema: z.object({}),
    },
  },
});
```

This approach provides full TypeScript type safety and IDE autocompletion, letting you catch parameter mismatches during development. When you define `schemas`, the client only pulls the explicitly defined tools, keeping your application focused on the tools it needs

## Examples

You can see MCP tools in action in the following example:

<ExampleLinks
  examples={[
    {
      title: 'Learn to use MCP tools in Node.js',
      link: '/cookbook/node/mcp-tools',
    },
  ]}
/>

# MCP Tools

The AI SDK supports Model Context Protocol (MCP) tools by offering a lightweight client that exposes a `tools` method for retrieving tools from a MCP server. After use, the client should always be closed to release resources.

Use the official Model Context Protocol Typescript SDK to create the connection to the MCP server.

<Snippet text="pnpm install @modelcontextprotocol/sdk" />

```ts
import { experimental_createMCPClient, generateText, stepCountIs } from 'ai';
import { Experimental_StdioMCPTransport } from 'ai/mcp-stdio';
import { openai } from '@ai-sdk/openai';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio';
import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp';

let clientOne;
let clientTwo;
let clientThree;

try {
  // Initialize an MCP client to connect to a `stdio` MCP server:
  const transport = new StdioClientTransport({
    command: 'node',
    args: ['src/stdio/dist/server.js'],
  });

  const clientOne = await experimental_createMCPClient({
    transport,
  });

  // You can also connect to StreamableHTTP MCP servers
  const httpTransport = new StreamableHTTPClientTransport(
    new URL('http://localhost:3000/mcp'),
  );
  const clientTwo = await experimental_createMCPClient({
    transport: httpTransport,
  });

  // Alternatively, you can connect to a Server-Sent Events (SSE) MCP server:
  const sseTransport = new SSEClientTransport(
    new URL('http://localhost:3000/sse'),
  );
  const clientThree = await experimental_createMCPClient({
    transport: sseTransport,
  });

  const toolSetOne = await clientOne.tools();
  const toolSetTwo = await clientTwo.tools();
  const toolSetThree = await clientThree.tools();
  const tools = {
    ...toolSetOne,
    ...toolSetTwo,
    ...toolSetThree, // note: this approach causes subsequent tool sets to override tools with the same name
  };

  const response = await generateText({
    model: openai('gpt-4o'),
    tools,
    stopWhen: stepCountIs(5),
    messages: [
      {
        role: 'user',
        content: [{ type: 'text', text: 'Find products under $100' }],
      },
    ],
  });

  console.log(response.text);
} catch (error) {
  console.error(error);
} finally {
  await Promise.all([
    clientOne.close(),
    clientTwo.close(),
    clientThree.close(),
  ]);
}
```

# `experimental_createMCPClient()`

Creates a lightweight Model Context Protocol (MCP) client that connects to an MCP server. The client's primary purpose is tool conversion between MCP tools and AI SDK tools.

It currently does not support accepting notifications from an MCP server, and custom configuration of the client.

This feature is experimental and may change or be removed in the future.

## Import

<Snippet
  text={`import { experimental_createMCPClient } from "ai"`}
  prompt={false}
/>

## API Signature

### Parameters

<PropertiesTable
  content={[
    {
      name: 'config',
      type: 'MCPClientConfig',
      description: 'Configuration for the MCP client.',
      properties: [
        {
          type: 'MCPClientConfig',
          parameters: [
            {
              name: 'transport',
              type: 'TransportConfig = MCPTransport | McpSSEServerConfig',
              description: 'Configuration for the message transport layer.',
              properties: [
                {
                  type: 'MCPTransport',
                  description:
                    'A client transport instance, used explicitly for stdio or custom transports',
                  parameters: [
                    {
                      name: 'start',
                      type: '() => Promise<void>',
                      description: 'A method that starts the transport',
                    },
                    {
                      name: 'send',
                      type: '(message: JSONRPCMessage) => Promise<void>',
                      description:
                        'A method that sends a message through the transport',
                    },
                    {
                      name: 'close',
                      type: '() => Promise<void>',
                      description: 'A method that closes the transport',
                    },
                    {
                      name: 'onclose',
                      type: '() => void',
                      description:
                        'A method that is called when the transport is closed',
                    },
                    {
                      name: 'onerror',
                      type: '(error: Error) => void',
                      description:
                        'A method that is called when the transport encounters an error',
                    },
                    {
                      name: 'onmessage',
                      type: '(message: JSONRPCMessage) => void',
                      description:
                        'A method that is called when the transport receives a message',
                    },
                  ],
                },
                {
                  type: 'McpSSEServerConfig',
                  parameters: [
                    {
                      name: 'type',
                      type: "'sse'",
                      description: 'Use Server-Sent Events for communication',
                    },
                    {
                      name: 'url',
                      type: 'string',
                      description: 'URL of the MCP server',
                    },
                    {
                      name: 'headers',
                      type: 'Record<string, string>',
                      isOptional: true,
                      description:
                        'Additional HTTP headers to be sent with requests.',
                    },
                  ],
                },
              ],
            },
            {
              name: 'name',
              type: 'string',
              isOptional: true,
              description: 'Client name. Defaults to "ai-sdk-mcp-client"',
            },
            {
              name: 'onUncaughtError',
              type: '(error: unknown) => void',
              isOptional: true,
              description: 'Handler for uncaught errors',
            },
          ],
        },
      ],
    },
  ]}
/>

### Returns

Returns a Promise that resolves to an `MCPClient` with the following methods:

<PropertiesTable
  content={[
    {
      name: 'tools',
      type: `async (options?: {
        schemas?: TOOL_SCHEMAS
      }) => Promise<McpToolSet<TOOL_SCHEMAS>>`,
      description: 'Gets the tools available from the MCP server.',
      properties: [
        {
          type: 'options',
          parameters: [
            {
              name: 'schemas',
              type: 'TOOL_SCHEMAS',
              isOptional: true,
              description:
                'Schema definitions for compile-time type checking. When not provided, schemas are inferred from the server.',
            },
          ],
        },
      ],
    },
    {
      name: 'close',
      type: 'async () => void',
      description:
        'Closes the connection to the MCP server and cleans up resources.',
    },
  ]}
/>

## Example

```typescript
import { experimental_createMCPClient, generateText } from 'ai';
import { Experimental_StdioMCPTransport } from 'ai/mcp-stdio';
import { openai } from '@ai-sdk/openai';

let client;

try {
  client = await experimental_createMCPClient({
    transport: new Experimental_StdioMCPTransport({
      command: 'node server.js',
    }),
  });

  const tools = await client.tools();

  const response = await generateText({
    model: openai('gpt-4o-mini'),
    tools,
    messages: [{ role: 'user', content: 'Query the data' }],
  });

  console.log(response);
} catch (error) {
  console.error('Error:', error);
} finally {
  // ensure the client is closed even if an error occurs
  if (client) {
    await client.close();
  }
}
```

## Error Handling

The client throws `MCPClientError` for:

- Client initialization failures
- Protocol version mismatches
- Missing server capabilities
- Connection failures

For tool execution, errors are propagated as `CallToolError` errors.

For unknown errors, the client exposes an `onUncaughtError` callback that can be used to manually log or handle errors that are not covered by known error types.

# `Experimental_StdioMCPTransport`

Creates a transport for Model Context Protocol (MCP) clients to communicate with MCP servers using standard input and output streams. This transport is only supported in Node.js environments.

This feature is experimental and may change or be removed in the future.

## Import

<Snippet
  text={`import { Experimental_StdioMCPTransport } from "ai/mcp-stdio"`}
  prompt={false}
/>

## API Signature

### Parameters

<PropertiesTable
  content={[
    {
      name: 'config',
      type: 'StdioConfig',
      description: 'Configuration for the MCP client.',
      properties: [
        {
          type: 'StdioConfig',
          parameters: [
            {
              name: 'command',
              type: 'string',
              description: 'The command to run the MCP server.',
            },
            {
              name: 'args',
              type: 'string[]',
              isOptional: true,
              description: 'The arguments to pass to the MCP server.',
            },
            {
              name: 'env',
              type: 'Record<string, string>',
              isOptional: true,
              description:
                'The environment variables to set for the MCP server.',
            },
            {
              name: 'stderr',
              type: 'IOType | Stream | number',
              isOptional: true,
              description: "The stream to write the MCP server's stderr to.",
            },
            {
              name: 'cwd',
              type: 'string',
              isOptional: true,
              description: 'The current working directory for the MCP server.',
            },
          ],
        },
      ],
    },
  ]}
/>
