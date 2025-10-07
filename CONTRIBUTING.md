# Contributing to RAG Template

We welcome contributions to the RAG Template! This document provides guidelines for contributing to make the process smooth and effective for everyone involved.

## 🚀 Quick Start

1. **Fork** the repository on GitHub
2. **Clone** your fork locally
3. **Create** a feature branch for your changes
4. **Make** your changes with proper tests
5. **Test** your changes thoroughly
6. **Submit** a pull request

## 📋 Development Process

### Prerequisites

Before contributing, ensure you have:
- **Node.js 18+** or **Bun**
- **Git**
- **A code editor** (VS Code, Cursor, etc.)
- **Basic knowledge** of TypeScript, React, and Next.js

### Setting Up Development Environment

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/rag-template.git
   cd rag-template
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Add your API keys to .env.local
   ```

4. **Start development server**
   ```bash
   bun run dev
   ```

### Project Structure

```
src/
├── ai/                    # AI-specific modules
│   ├── agents/           # Agent implementations
│   ├── embedding/        # Vector embeddings
│   ├── mcp/             # Model Context Protocol
│   ├── middleware/      # AI request middleware
│   ├── models/          # Model configurations
│   ├── prompts/         # Prompt templates
│   ├── providers/       # AI provider integrations
│   └── tools/           # Custom tools for RAG
├── app/                 # Next.js app directory
├── components/          # React components
└── hooks/              # Custom React hooks
```

## 🛠 Development Guidelines

### Code Style

- **TypeScript**: Use strict TypeScript with proper typing
- **Formatting**: Use Biome for consistent formatting
- **Linting**: Follow Biome linting rules
- **Imports**: Use absolute imports with `@/` prefix for src directory

### Commit Guidelines

We follow the [Conventional Commits](https://conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
git commit -m "feat(chat): add file upload support"
git commit -m "fix(api): resolve streaming response bug"
git commit -m "docs: update README with deployment instructions"
```

### Testing

- **Unit Tests**: Test individual functions and components
- **Integration Tests**: Test API endpoints and component interactions
- **E2E Tests**: Test complete user workflows
- **Manual Testing**: Test the chat interface thoroughly

Run tests with:
```bash
bun run test        # Run all tests
bun run test:watch  # Run tests in watch mode
```

## 🔄 Contribution Workflow

### 1. Choose an Issue

- Browse [existing issues](https://github.com/patgpt/rag-template/issues)
- Create a new issue if needed (use issue templates)
- Comment on issues you're interested in

### 2. Create a Feature Branch

```bash
git checkout -b feat/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 3. Make Changes

- Implement your feature or fix
- Add tests if applicable
- Update documentation if needed
- Ensure code passes linting

### 4. Test Thoroughly

- Test your changes manually
- Run existing tests
- Test edge cases and error scenarios
- Test with different AI models if applicable

### 5. Submit Pull Request

1. **Push your branch**
   ```bash
   git push origin feat/your-feature-name
   ```

2. **Create a pull request** on GitHub

3. **Fill out the PR template** completely

4. **Request review** from maintainers

## 📝 Pull Request Guidelines

### PR Title

Use clear, descriptive titles:
- ✅ `feat: add support for custom AI models`
- ❌ `update stuff`

### PR Description

Include:
- **What** the PR does
- **Why** it's needed
- **How** it was implemented
- **Testing** performed
- **Breaking changes** (if any)

### Code Review Process

1. **Automated checks** run first (linting, tests)
2. **Maintainers** review the code
3. **Address feedback** and make necessary changes
4. **Approval** from at least one maintainer
5. **Merge** when ready

## 🎯 Areas for Contribution

### High Priority
- **Vector Database Integration** (Pinecone, Qdrant, etc.)
- **Advanced RAG Patterns** (re-ranking, hybrid search)
- **Multi-modal Support** (images, audio)
- **Performance Optimizations**
- **Testing Infrastructure**

### Medium Priority
- **Plugin System** for custom tools
- **Advanced Analytics** and monitoring
- **Real-time Collaboration** features
- **Mobile Responsiveness** improvements
- **Accessibility** enhancements

### Documentation
- **API Documentation**
- **Component Documentation**
- **Deployment Guides**
- **Troubleshooting Guides**

## 🐛 Reporting Bugs

Use the [Bug Report](https://github.com/patgpt/rag-template/issues/new?template=bug_report.md) template:

1. **Clear title** describing the issue
2. **Steps to reproduce**
3. **Expected behavior**
4. **Actual behavior**
5. **Environment details** (OS, Node version, browser)
6. **Error messages** and stack traces

## 💡 Suggesting Features

Use the [Feature Request](https://github.com/patgpt/rag-template/issues/new?template=feature_request.md) template:

1. **Clear title** for the feature
2. **Detailed description** of the feature
3. **Use cases** and benefits
4. **Implementation suggestions** (optional)
5. **Alternatives considered**

## 🔒 Security Issues

For security vulnerabilities, please:
1. **DO NOT** create a public issue
2. **Email** patgpt@protonmail.com directly
3. **Include** detailed information about the vulnerability
4. **Allow time** for investigation before public disclosure

## 📚 Learning Resources

### Essential Reading
- [AI SDK Documentation](https://sdk.vercel.ai/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Recommended Tools
- [Biome](https://biomejs.dev/) - Fast linter and formatter
- [Bun](https://bun.sh/) - Fast JavaScript runtime
- [Vercel AI SDK](https://sdk.vercel.ai/) - AI integration
- [shadcn/ui](https://ui.shadcn.com/) - Component library

## 🤝 Community

- **GitHub**: [@patgpt](https://github.com/patgpt)
- **LinkedIn**: [patgpt](https://linkedin.com/in/patgpt)
- **X (Twitter)**: [@slopwhisperer](https://x.com/slopwhisperer)
- **Discussions**: [GitHub Discussions](https://github.com/patgpt/rag-template/discussions)

## 🙏 Acknowledgments

Thank you to everyone who contributes to this project! Your time, effort, and expertise help make this template better for the entire community.

---

*This contributing guide is adapted from open-source best practices and inspired by projects like [Next.js](https://github.com/vercel/next.js) and [Vercel AI SDK](https://github.com/vercel/ai).*
