import { config as dotenv, DotenvConfig, stringify } from "dotenv/mod.ts";
import { Environment, Config } from "../interfaces/Config.ts";

const loadedEnv: DotenvConfig = await dotenv({ export: true, safe: true });
const _environment: Environment = Deno.env.get("DENO_ENV")
  ?.toLocaleLowerCase() as Environment;
const isDevelopment: boolean =
  "development" === (_environment || "test");

const config: Config = {
  environment: _environment,
  base_url: Deno.env.get("BASE_URL") || "",
  db: Deno.env.get("DB_URI")
    ? {
      uri: Deno.env.get("DB_URI") || "",
      pool: Number(Deno.env.get("DB_POOL_CONNECTIONS") || 1),
    }
    : {
      database: Deno.env.get("DB_NAME") || "",
      host: Deno.env.get("DB_HOST") || "",
      username: Deno.env.get("DB_USER") || "",
      password: Deno.env.get("DB_PASSWORD") || "",
      port: Number(Deno.env.get("DB_PORT") || 5432),
      pool: Number(Deno.env.get("DB_POOL_CONNECTIONS") || 1),
    },
};

if (isDevelopment) {
  console.log(`Loaded environment variables:\n${stringify(loadedEnv)}`);
}

Object.entries(config).forEach(([envKey, envValue]) => {
  if (!envValue) {
    if (!isDevelopment) {
      console.log(`Loaded environment variables:\n${stringify(loadedEnv)}`);
    }
    throw new Error(
      `Missing config variable "${envKey}"!`,
    );
  }
});

export default config;
