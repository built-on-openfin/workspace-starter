import { getSettings } from "./settings";
import { Endpoint } from "./shapes";

let availableEndpoints: Endpoint<unknown>[];

interface FetchOptions {
  body?: string;
  method?: "GET" | "POST";
  credentials?: "omit" | "same-origin" | "include";
  mode?: "no-cors" | "cors" | "same-origin";
  cache?: "default" | "no-cache" | "reload" | "force-cache" | "only-if-cached";
  redirect?: "manual" | "follow" | "error";
  referrerPolicy?:
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "same-origin"
    | "strict-origin"
    | "strict-origin-when-cross-origin"
    | "unsafe-url";
  headers?: { [key: string]: string };
}

export async function init(endpoints: Endpoint<unknown>[] = null) {
  if (endpoints !== null) {
    availableEndpoints = endpoints;
  } else {
    let settings = await getSettings();
    availableEndpoints = settings.endpointProvider.endpoints || [];
  }
}

function getOptions(options: any): FetchOptions {
  const { url, ...fetchOptions } = options;

  return fetchOptions;
}

function getUrl(options: { url?: string }): string {
  return options.url;
}

function getRequestOptions(url: string, options: FetchOptions, request): { url: string; options: FetchOptions } {
  if (options.method === "GET") {
    if (request !== undefined) {
      let keys = Object.keys(request);
      if (keys.length > 0) {
        let length = keys.length;
        for (let i = 0; i < length; i++) {
          url = url.replace(`[${keys[i]}]`, encodeURIComponent(request[keys[i]]));
        }
      }
    }
  } else if (options.method === "POST") {
    if (request !== undefined) {
      options.body = JSON.stringify(request);
    }
  }

  return { url, options };
}

export async function action<T>(endpointId: string, request?: T): Promise<boolean> {
  let endpoint = availableEndpoints.find((entry) => entry.id === endpointId);

  if (endpoint === undefined) {
    console.warn(`${endpointId} is not available.`);
    return false;
  }

  // currently only fetch is supported but you could load different implementations of this intent based on type
  if (endpoint.type === "fetch") {
    let { url, options } = getRequestOptions(getUrl(endpoint.options), getOptions(endpoint.options), request);
    if (options.method !== "GET" && options.method !== "POST") {
      console.warn(
        `${endpointId} specifies a type: ${endpoint.type} with a method ${options.method} that is not supported.`
      );
      return false;
    }
    const response = await fetch(url, options);
    return response.ok;
  } else {
    console.warn(`${endpointId} specifies a type: ${endpoint.type} that is not supported.`);
    return false;
  }
}

export async function requestResponse<T, R>(endpointId: string, request: T): Promise<R> {
  let endpoint = availableEndpoints.find((entry) => entry.id === endpointId);

  if (endpoint === undefined) {
    console.warn(`${endpointId} is not available.`);
    return null;
  }

  // currently only fetch is supported but you could load different implementations of this intent based on type
  if (endpoint.type === "fetch") {
    let { url, options } = getRequestOptions(getUrl(endpoint.options), getOptions(endpoint.options), request);
    if (options.method !== "GET" && options.method !== "POST") {
      console.warn(
        `${endpointId} specifies a type: ${endpoint.type} with a method ${options.method} that is not supported.`
      );
      return null;
    }
    const response = await fetch(url, options);

    if (response.ok) {
      const json = await response.json();
      return json;
    } else {
      return null;
    }
  } else {
    console.warn(`${endpointId} specifies a type: ${endpoint.type} that is not supported.`);
    return null;
  }
}
