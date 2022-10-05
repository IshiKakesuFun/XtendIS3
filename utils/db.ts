import config from "@config";
import { Pool } from "$postgres/mod.ts";

//const ca = await Deno.readTextFile("../supabase.crt");

const pool: Pool = config.db.uri
  ? new Pool(config.db.uri, config.db.pool ?? 1, true)
  : new Pool(
    {
      database: config.db.database ?? "",
      hostname: config.db.host ?? "",
      password: config.db.password ?? "",
      user: config.db.username ?? "",
      port: config.db.port ?? 5432,
      //tls: {
      //  caCertificates: [ca],
      //},
    },
    config.db.pool ?? 1,
    true,
  );

export { pool };
