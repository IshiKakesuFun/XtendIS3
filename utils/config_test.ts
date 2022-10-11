import { assertEquals, assertExists } from "testing/asserts.ts";
import { Environment } from "@inf/Config.ts";
import config from "@config";

Deno.test("Environment configuration", async (t) => {
  await t.step("Deno Environment", () => {
    assertExists(config);
    assertEquals(config.environment, Deno.env.get("DENO_ENV") as Environment);
  });

});
