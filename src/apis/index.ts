import type { PriceResponse } from "../types";

/**
 * Generic fetch wrapper for making API requests.
 *
 * @template T
 * @param url
 * @param init
 * @returns A Promise resolving to the parsed JSON response of type `T`.
 * @throws {Error}
 */
const callApi = async <T = unknown>(url: string, init?: RequestInit): Promise<T> => {
  const res = await fetch(url, init);

  if (!res.ok) {
    throw new Error(`API call failed with status ${res.status}: ${res.statusText}`);
  }

  return (await res.json()) as T;
};

/**
 * Fetches paper pricing details based on the specified paper size.
 *
 * @param paperSize
 * @returns
 * @throws {Error}
 */
export const getPaperPrices = async (paperSize: string = 'A4'): Promise<PriceResponse | null> => {
  const URL = `https://us-central1-fe-ws-test.cloudfunctions.net/prices?paper_size=${encodeURIComponent(paperSize)}`;
  const data = await callApi<PriceResponse>(URL);

  return data ?? null;
};