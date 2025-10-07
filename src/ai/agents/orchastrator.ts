import type { UIMessage } from "@ai-sdk/react";
import {
  Experimental_Agent as Agent,
  convertToModelMessages,
  type ToolSet,
  tool,
} from "ai";
import z from "zod/v3";
import { googleModels } from "../models/google";

export const some = tool({
  name: "some",
  description: "Some",
  inputSchema: z.object({
    query: z.string(),
  }),
  execute: async (
    { query },
    { messages, toolCallId, abortSignal, experimental_context },
  ) => {
    return {
      result: "Some result",
    };
  },
});

const AGENT_TOOLS = {
  some,
} satisfies ToolSet;

/**
 * Configuration options for the Agent’s runtime behavior.
 * Each setting adjusts how deterministic, creative, or resilient
 * the model’s responses are during execution.
 */
const AGENT_SETTINGS = {
  /**
   * @description Maximum number of times the agent retries a failed request before giving up.
   * Use this when dealing with flaky APIs or transient network errors.
   * @example Set to 5 if you frequently hit rate limits or timeouts.
   */
  MAX_RETRIES: 3,

  /**
   * @description Random seed that controls determinism of model outputs.
   * Same seed → same result (given same input and settings).
   * Useful for debugging or tests.
   * @example Change or omit for more diverse outputs.
   */
  SEED: 42,

  /**
   * @description Adjusts creativity and randomness in generation.
   * Lower = more focused and predictable. Higher = more varied and imaginative.
   * @range 0.0–1.0
   * @example 0.2 for deterministic factual answers, 0.8 for creative writing.
   */
  TEMPERATURE: 0.7,

  /**
   * @description Controls nucleus sampling — the probability mass from which tokens are drawn.
   * The model samples only from the smallest possible set of tokens whose cumulative probability ≥ topP.
   * Lower values narrow choices, increasing focus.
   * @default 1
   * @example 0.9 keeps results tighter; 1.0 allows full probability range.
   */
  TOP_P: 1,

  /**
   * @description Limits how many of the most probable tokens are considered at each generation step.
   * Smaller values constrain diversity, larger ones encourage creativity.
   * @default 40
   * @example Use 20–50 for balanced behavior.
   */
  TOP_K: 40,

  /**
   * @description Array of sequences that will cause generation to stop when encountered.
   * Useful for code, markdown, or chat delimiters.
   * @example ["</end>", "User:"]
   */
  STOP_SEQUENCES: [],

  /**
   * @description Penalizes repetition of identical tokens.
   * Higher values reduce redundant phrasing.
   * @range -2.0–2.0
   * @example 0.5 discourages looping; 0 removes penalty.
   */
  FREQUENCY_PENALTY: 0,

  /**
   * @description Encourages introduction of new concepts by penalizing tokens already used.
   * Higher values promote topic diversity.
   * @range -2.0–2.0
   * @example 0.5 for brainstorming tasks, 0 for precision answers.
   */
  PRESENCE_PENALTY: 0,

  /**
   * @description Maximum number of reasoning or tool-execution steps allowed per run.
   * Prevents infinite loops in agents with recursive logic.
   * @example Set higher (e.g., 20) for multi-step workflows.
   */
  MAX_STEPS: 10,

  /**
   * @description Enables verbose logging for debugging.
   * Shows internal decisions and tool calls when true.
   * @example Turn off in production for cleaner logs.
   */
  VERBOSE: true,

  /**
   * @description The system prompt — defines the role, tone, and constraints of the agent.
   * Acts as the model’s “personality” or instruction baseline.
   * @example "You are a cybersecurity analyst providing concise reports."
   */
  SYSTEM:
    "You are a helpful assistant that can answer questions and help with tasks.",

  /**
   * @description Maximum length (in tokens) of the model’s output.
   * Longer limits yield more detailed responses but cost more and take longer.
   * @example 500–1000 for normal chat; >2000 for essays or long code.
   */
  MAX_OUTPUT_TOKENS: 1000,
};

export const orchastrator = new Agent({
  model: googleModels.geminiFlash,
  tools: AGENT_TOOLS,
  system: AGENT_SETTINGS.SYSTEM,

  abortSignal: new AbortController().signal,
  maxRetries: AGENT_SETTINGS.MAX_RETRIES,

  seed: AGENT_SETTINGS.SEED,
  frequencyPenalty: AGENT_SETTINGS.FREQUENCY_PENALTY,
  presencePenalty: AGENT_SETTINGS.PRESENCE_PENALTY,
  temperature: AGENT_SETTINGS.TEMPERATURE,
  topP: AGENT_SETTINGS.TOP_P,
  topK: AGENT_SETTINGS.TOP_K,
  stopSequences: [],
  maxOutputTokens: AGENT_SETTINGS.MAX_OUTPUT_TOKENS,
});

export const orchastratorAgent = async (messages: UIMessage[]) => {
  const response = await orchastrator.stream({
    messages: convertToModelMessages(messages),
    system: AGENT_SETTINGS.SYSTEM,
    providerOptions: {
      google: {},
    },
  });
  return response;
};
