import * as Schema from "effect/Schema";

export const UserId = Schema.String.pipe(
  Schema.brand("UserId"),
  Schema.annotate({
    title: "User ID",
    description: "Unique identifier for a User.",
  }),
);

export type UserId = Schema.Schema.Type<typeof UserId>;
