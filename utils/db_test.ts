import { assertEquals } from "testing/asserts.ts";
import { pool } from "@db";
import config from "@config";

Deno.test("PostgresSQL database pool test", async (t) => {
  await t.step("Pool available connections", () => {
    assertEquals(pool.available, config.db.pool);
  });

  await t.step({
    name: "Pool acquire connection",
    fn: async () => {
      const availableBefore = pool.available;
      const client = await pool.connect();
      assertEquals(pool.available, availableBefore - 1);
      client.release();
    },
    ignore: false,
    sanitizeOps: false,
    sanitizeResources: false,
    sanitizeExit: false,
  });

  await t.step({
    name: "Pool release connection",
    fn: async () => {
      const client = await pool.connect();
      const availableAfter = pool.available;
      client.release();
      assertEquals(pool.available, availableAfter + 1);
    },
    ignore: false,
    sanitizeOps: false,
    sanitizeResources: false,
    sanitizeExit: false,
  });
  await pool.end();
});
