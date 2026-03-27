import { createClient, type Client } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import { env } from "src/env";
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  client: Client | undefined;
};

function isRemoteLibsqlUrl(url: string) {
  return url.startsWith("libsql://") || url.startsWith("https://");
}

const clientConfig = isRemoteLibsqlUrl(env.DATABASE_URL)
  ? {
      url: env.DATABASE_URL,
      authToken: env.TURSO_AUTH_TOKEN,
    }
  : {
      url: env.DATABASE_URL,
    };

export const client =
  globalForDb.client ?? createClient(clientConfig);
if (env.NODE_ENV !== "production") globalForDb.client = client;

export const db = drizzle(client, { schema });
