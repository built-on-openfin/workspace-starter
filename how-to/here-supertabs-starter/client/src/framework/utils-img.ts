import { isStringValue } from "./utils";

const IMAGE_CACHE = new Map<string, { dataUri: string | undefined }>();

/**
 * Load an image to a data url containing base64 image data.
 * @param url The url of the image to load.
 * @param dimensions The dimensions to resize the image to.
 * @returns The data url containing base64 data for the image.
 */
export async function imageUrlToDataUrl(
	url: string | undefined,
	dimensions: number
): Promise<string | undefined> {
	if (!isStringValue(url)) {
		return;
	}

	const key = `${url}_${dimensions}`;

	const cachedValue = IMAGE_CACHE.get(key);
	if (cachedValue) {
		return cachedValue.dataUri;
	}

	return new Promise<string | undefined>((resolve) => {
		try {
			const img = document.createElement("img");
			img.width = dimensions;
			img.height = dimensions;
			img.crossOrigin = "anonymous";

			img.addEventListener("load", () => {
				let dataUri;
				try {
					const canvas = document.createElement("canvas");
					canvas.width = dimensions;
					canvas.height = dimensions;

					const ctx = canvas.getContext("2d");

					if (ctx) {
						ctx.drawImage(img, 0, 0, dimensions, dimensions);
						dataUri = canvas.toDataURL("image/png", 1);
						IMAGE_CACHE.set(key, { dataUri });
					}
				} catch {}
				resolve(dataUri);
			});
			img.addEventListener("error", () => {
				IMAGE_CACHE.set(key, { dataUri: undefined });
				// eslint-disable-next-line unicorn/no-useless-undefined
				resolve(undefined);
			});
			img.src = url;
		} catch {
			IMAGE_CACHE.set(key, { dataUri: undefined });
			// eslint-disable-next-line unicorn/no-useless-undefined
			resolve(undefined);
		}
	});
}
