import path from "node:path";

import { defineConfig } from "vite";

export default defineConfig({
	root: __dirname,
	publicDir: path.join(__dirname, "public"),
	build: {
		outDir: path.join(__dirname, "dist"),
		emptyOutDir: true,
		rollupOptions: {
			input: {
				provider: path.join(__dirname, "provider.html"),
				view1: path.join(__dirname, "view1.html")
			}
		}
	},
	server: {
		port: 8080,
		host: true
	},
	preview: {
		port: 8080,
		host: true
	}
});
