async function init() {
	const ticker = document.querySelector<HTMLInputElement>("#ticker");
	const execute = document.querySelector("#execute");
	const result = document.querySelector("#result");

	result.textContent = "Not Set";
	execute.addEventListener("click", () => {
		const value = ticker.value;
		console.log(`Value ${value}`);
		result.textContent = ticker.value;
	});
}

document.addEventListener("DOMContentLoaded", async () => {
	try {
		await init();
	} catch (error) {
		console.error(error);
	}
});
