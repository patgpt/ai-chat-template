import type { InferSelectModel } from "drizzle-orm";

import {
  conversations,
  insertConversationSchema,
  insertMessageEmbeddingSchema,
  insertMessageSchema,
  messageEmbeddings,
  messages,
  selectConversationSchema,
  selectMessageEmbeddingSchema,
  selectMessageSchema,
} from "./schema";

export type ConversationRow = InferSelectModel<typeof conversations>;
export type MessageRow = InferSelectModel<typeof messages>;
export type MessageEmbeddingRow = InferSelectModel<typeof messageEmbeddings>;

export const ConversationValidators = {
  insert: insertConversationSchema,
  select: selectConversationSchema,
};

export const MessageValidators = {
  insert: insertMessageSchema,
  select: selectMessageSchema,
};

export const MessageEmbeddingValidators = {
  insert: insertMessageEmbeddingSchema,
  select: selectMessageEmbeddingSchema,
};

