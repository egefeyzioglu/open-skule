import { type Config } from "drizzle-kit";

import { env } from "src/env";

function isRemoteLibsqlUrl(url: string) {
  return url.startsWith("libsql://") || url.startsWith("https://");
}

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["open-skule_*"],
} satisfies Config;
