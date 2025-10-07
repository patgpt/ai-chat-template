# RAG Chatbot Template

A production-ready starter template for building AI-powered RAG (Retrieval-Augmented Generation) chatbots using Next.js, AI SDK, and modern web technologies.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)](https://nextjs.org/)
[![AI SDK](https://img.shields.io/badge/AI%20SDK-5.0.60-blue)](https://sdk.vercel.ai/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC)](https://tailwindcss.com/)
[![Bun](https://img.shields.io/badge/Bun-1.0+-FBF0DF)](https://bun.sh/)

## 🌟 Features

### Core AI Capabilities
- **Multi-Model Support**: OpenAI GPT-4o, Google Gemini, DeepSeek R1
- **Streaming Responses**: Real-time text streaming for better UX
- **Tool Integration**: Extensible tool system for RAG functionality
- **Agent Framework**: Built-in agent patterns for complex workflows
- **File Attachments**: Support for document uploads and processing
- **Web Search Integration**: Optional web search for enhanced responses

### Developer Experience
- **TypeScript**: Full type safety throughout the application
- **Modern React**: React 19 with latest hooks and patterns
- **Component Library**: shadcn/ui for consistent, accessible UI
- **Code Quality**: Biome for linting and formatting
- **Package Manager**: Bun for fast installs and builds
- **Hot Reload**: Turbopack for lightning-fast development

### Production Ready
- **Optimized Performance**: Built with Next.js 15 and React 19
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Error Handling**: Comprehensive error boundaries and fallbacks
- **Security**: Input validation and sanitization
- **Scalable Architecture**: Modular design for easy extension

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** or **Bun**
- **Package Manager**: Bun (recommended) or npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/patgpt/rag-template.git
   cd rag-template
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Add your API keys to `.env.local`:
   ```env
   # OpenAI API Key
   OPENAI_API_KEY=your_openai_api_key_here

   # Google AI API Key (optional)
   GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key_here

   # DeepSeek API Key (optional)
   DEEPSEEK_API_KEY=your_deepseek_api_key_here
   ```

4. **Start development server**
   ```bash
   bun run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3001](http://localhost:3001) to see the chat interface.

## 📁 Project Structure

```
rag-template/
├── src/
│   ├── ai/                    # AI-specific modules
│   │   ├── agents/           # Agent implementations
│   │   ├── embedding/        # Vector embeddings
│   │   ├── mcp/             # Model Context Protocol
│   │   ├── middleware/      # AI request middleware
│   │   ├── models/          # Model configurations
│   │   ├── prompts/         # Prompt templates
│   │   ├── providers/       # AI provider integrations
│   │   └── tools/           # Custom tools for RAG
│   ├── app/
│   │   ├── api/chat/        # Chat API endpoint
│   │   └── page.tsx         # Main chat interface
│   ├── components/
│   │   ├── ai-elements/     # AI-specific UI components
│   │   └── ui/              # Reusable UI components
│   └── hooks/               # Custom React hooks
├── public/                   # Static assets
└── docs/                     # Documentation
```

## 🎯 Usage Examples

### Basic Chat Interface

The template includes a fully functional chat interface with:
- Message history
- Model selection
- File attachment support
- Web search toggle
- Streaming responses
- Copy and retry actions

### Custom AI Models

Add support for additional AI models:

```typescript
// src/ai/models/custom.ts
import { openai } from '@ai-sdk/openai';

export const customModel = openai('gpt-4-turbo', {
  // Custom configuration
});
```

### Building Custom Tools

Create tools for RAG functionality:

```typescript
// src/ai/tools/document-search.ts
import { tool } from 'ai';
import { z } from 'zod';

export const searchDocuments = tool({
  description: 'Search through uploaded documents',
  parameters: z.object({
    query: z.string(),
    context: z.string().optional(),
  }),
  execute: async ({ query, context }) => {
    // Implement document search logic
    return { results: [] };
  },
});
```

### Agent Implementation

Build complex AI agents with multiple tools:

```typescript
// src/ai/agents/research-agent.ts
import { Agent } from 'ai';

export const researchAgent = new Agent({
  model: 'openai/gpt-4o',
  tools: {
    webSearch,
    documentSearch,
    summarize,
  },
  stopWhen: stepCountIs(10),
});
```

## 🛠 Development

### Available Scripts

```bash
# Development
bun run dev          # Start development server with Turbopack
bun run build        # Build for production
bun run start        # Start production server

# Code Quality
bun run lint         # Run Biome linter
bun run format       # Format code with Biome
bun run type-check   # TypeScript type checking

# Testing
bun run test         # Run all tests
bun run test:watch   # Run tests in watch mode
bun run test:coverage # Run tests with coverage report
bun run test:ci      # Run tests in CI mode (bail on first failure)
bun run test:unit    # Run only unit tests
bun run test:integration # Run only integration tests
```

### Key Technologies

- **Framework**: Next.js 15 with App Router
- **Runtime**: React 19 with Server Components
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui + Radix UI
- **AI SDK**: Vercel AI SDK v5
- **Package Manager**: Bun
- **Linting**: Biome

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key | Yes |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Google AI API key | No |
| `DEEPSEEK_API_KEY` | DeepSeek API key | No |

## 🧪 Testing

The project uses Bun's built-in test runner for fast, Jest-compatible testing.

### Test Structure

```
src/__tests__/
├── setup.ts              # Test environment setup
├── test-utils.tsx        # Testing utilities and helpers
├── utils/                # Utility function tests
│   └── utils.test.ts
├── components/           # Component tests
│   ├── Button.test.tsx
│   └── Message.test.tsx
└── hooks/               # Hook tests
    └── use-mobile.test.ts
```

### Writing Tests

Tests use Bun's test API which is compatible with Jest:

```typescript
import { describe, expect, it } from "bun:test";

describe("My Feature", () => {
  it("should work correctly", () => {
    expect(1 + 1).toBe(2);
  });
});
```

### Test Utilities

The project includes helpful test utilities in `src/__tests__/test-utils.tsx`:

- **Custom render function** for React components
- **Mock data factories** for consistent test data
- **Assertion helpers** for common patterns
- **DOM testing utilities**

### Coverage

Generate coverage reports:

```bash
bun run test:coverage
```

Coverage thresholds are configured in `bunfig.toml`:
- Functions: 80%
- Statements: 80%
- Branches: 70%
- Lines: 80%

### Best Practices

1. **Use descriptive test names** that explain what you're testing
2. **Group related tests** with `describe` blocks
3. **Test behavior, not implementation** details
4. **Use test utilities** for consistent setup
5. **Mock external dependencies** appropriately
6. **Test edge cases** and error conditions

### Example Test

```typescript
import { describe, expect, it } from "bun:test";
import { render, screen } from "@/__tests__/test-utils";

describe("unit: Button component", () => {
  it("should render children correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("should handle click events", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    // In Bun environment, use native DOM events
    const button = screen.getByRole("button");
    button.click();
    expect(handleClick).toHaveBeenCalled();
  });
});
```

## 🔧 Configuration

### AI Model Configuration

Configure AI models in `src/ai/models/`:

```typescript
// src/ai/models/providers.ts
export const models = [
  {
    name: 'GPT-4o',
    value: 'openai/gpt-4o',
    provider: 'openai',
  },
  {
    name: 'Gemini Pro',
    value: 'google/gemini-pro',
    provider: 'google',
  },
  {
    name: 'DeepSeek R1',
    value: 'deepseek/deepseek-r1',
    provider: 'deepseek',
  },
];
```

### Tool Configuration

Define custom tools in `src/ai/tools/`:

```typescript
// src/ai/tools/index.ts
export const availableTools = {
  webSearch,
  documentSearch,
  codeExecution,
  databaseQuery,
};
```

## 🚢 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   ```bash
   vercel --prod
   ```

2. **Set environment variables** in Vercel dashboard

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Other Platforms

The template works with any Node.js hosting platform:

- **Railway**
- **Render**
- **Fly.io**
- **Docker** (see `docker-compose.yml`)

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vercel AI SDK](https://sdk.vercel.ai/) - For the amazing AI tooling
- [shadcn/ui](https://ui.shadcn.com/) - For the beautiful components
- [Tailwind CSS](https://tailwindcss.com/) - For the utility-first styling
- [Next.js](https://nextjs.org/) - For the React framework

## 📞 Support

- **GitHub Issues**: [Report bugs and request features](https://github.com/patgpt/rag-template/issues)
- **GitHub**: [@patgpt](https://github.com/patgpt)
- **LinkedIn**: [patgpt](https://linkedin.com/in/patgpt)
- **X (Twitter)**: [@slopwhisperer](https://x.com/slopwhisperer)

## 🗺 Roadmap

- [ ] Vector database integration (Pinecone, Qdrant)
- [ ] Advanced RAG patterns (re-ranking, hybrid search)
- [ ] Multi-modal support (images, audio)
- [ ] Advanced agent orchestration
- [ ] Plugin system for custom tools
- [ ] Real-time collaboration features
- [ ] Advanced analytics and monitoring
- [ ] Mobile app support (React Native)

---

**Made with ❤️ by [patgpt](https://github.com/patgpt)**
