import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "sqlite",
	driver: "d1-http",
	schema: "./src/lib/services/runtime/db/schema/index.ts",
	out: "./src/lib/services/runtime/db/migrations",
});
