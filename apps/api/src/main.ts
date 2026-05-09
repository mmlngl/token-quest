import * as Http from "./Http";

export default {
	async fetch(request, env, ctx) {
		const { dispose, handler } = Http.makeHandler(env, ctx);
		const response = await handler(request);
		await dispose();
		return response;
	},
} satisfies ExportedHandler<Env>;
