import * as Schema from "effect/Schema";

export const Provider = Schema.Literals(["openai", "anthropic", "google"])
  .pipe(Schema.brand("Provider"))
  .annotate({
    title: "Provider",
    description: "The owner of the Model.",
  });

export type Provider = typeof Provider.Type;

export const Model = Schema.Literals(["gpt-4.1", "claude-sonnet-4"])
  .pipe(Schema.brand("Model"))
  .annotate({
    title: "Model",
    description: "The owner of the Model.",
  });

export type Model = typeof Model.Type;

const TokenCount = Schema.Int.pipe(
  Schema.check(Schema.isGreaterThanOrEqualTo(0)),
  Schema.annotate({
    title: "Token count",
    description: "Non-negative token count.",
  }),
);

export const PromptTokenCount = TokenCount.pipe(
  Schema.brand("PromptTokenCount"),
  Schema.annotate({
    title: "Prompt token count",
  }),
);

export type PromptTokenCount = typeof PromptTokenCount.Type;

export const CompletionTokenCount = TokenCount.pipe(
  Schema.brand("CompletionTokenCount"),
  Schema.annotate({
    title: "Completion token count",
  }),
);

export type CompletionTokenCount = typeof CompletionTokenCount.Type;

export const TokenUsage = Schema.Struct({
  promptTokens: PromptTokenCount,
  completionTokens: CompletionTokenCount,
}).pipe(
  Schema.annotate({
    title: "Total token count",
  }),
);

export type TokenUsage = typeof TokenUsage.Type;
