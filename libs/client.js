import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: "midnightvibes",
  apiKey: process.env.API_KEY,
});
