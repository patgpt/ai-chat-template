import { sql } from "drizzle-orm";
import {
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { cosineSimilarity } from "ai";
import { z } from "zod";

export const messageRoleEnum = pgEnum("message_role", [
  "user",
  "assistant",
  "system",
  "tool",
]);

export const conversations = pgTable("conversations", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 120 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  metadata: jsonb("metadata"),
});

export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  conversationId: uuid("conversation_id")
    .notNull()
    .references(() => conversations.id, { onDelete: "cascade" }),
  role: messageRoleEnum("role").notNull(),
  content: jsonb("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  tokenUsage: jsonb("token_usage"),
  model: varchar("model", { length: 120 }),
});

export const messageEmbeddings = pgTable(
  "message_embeddings",
  {
    messageId: uuid("message_id")
      .notNull()
      .references(() => messages.id, { onDelete: "cascade" }),
    embedding: sql`vector`,
    dimensions: integer("dimensions").notNull(),
    vectorModel: varchar("vector_model", { length: 120 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    metadata: jsonb("metadata"),
  },
  (table) => ({
    messageIdPK: primaryKey({
      columns: [table.messageId],
      name: "message_embeddings_pkey",
    }),
  }),
);

export const insertConversationSchema = createInsertSchema(conversations, {
  metadata: z.record(z.any()).optional(),
});

export const selectConversationSchema = createSelectSchema(conversations, {
  metadata: z.record(z.any()).optional(),
});

export const insertMessageSchema = createInsertSchema(messages, {
  content: z.object({
    parts: z.array(z.any()),
  }),
  tokenUsage: z
    .object({
      inputTokens: z.number().optional(),
      outputTokens: z.number().optional(),
      totalTokens: z.number().optional(),
    })
    .optional(),
});

export const selectMessageSchema = createSelectSchema(messages, {
  content: z.object({
    parts: z.array(z.any()),
  }),
  tokenUsage: z
    .object({
      inputTokens: z.number().optional(),
      outputTokens: z.number().optional(),
      totalTokens: z.number().optional(),
    })
    .optional(),
});

export const insertMessageEmbeddingSchema = z.object({
  messageId: z.string().uuid(),
  embedding: z.array(z.number()),
  dimensions: z.number().positive(),
  vectorModel: z.string(),
  metadata: z.record(z.any()).optional(),
});

export const selectMessageEmbeddingSchema = insertMessageEmbeddingSchema.extend({
  createdAt: z.date().optional(),
});

export type Conversation = typeof conversations.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type MessageEmbedding = typeof messageEmbeddings.$inferSelect;

export type InsertConversation = typeof conversations.$inferInsert;
export type InsertMessage = typeof messages.$inferInsert;

export const cosineSimilarityZod = z
  .tuple([z.array(z.number()), z.array(z.number())])
  .transform((values) => cosineSimilarity(values[0], values[1]));

