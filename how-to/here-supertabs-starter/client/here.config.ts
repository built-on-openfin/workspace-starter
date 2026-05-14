import { defineConfig } from "@openfin/here-supertabs";

export default defineConfig({
	build: {
		baseUrl: "http://localhost:8080/platform",
		landingPageUrl: "http://localhost:8080/common/views/platform/new-tab/new-tab.html"
	}
});
