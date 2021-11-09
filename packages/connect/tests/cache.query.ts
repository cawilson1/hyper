import { test } from "uvu";
import * as assert from "uvu/assert";
import { query } from "../src/services/cache";

test("cache.query", async () => {
  const request = await query("game*")(Promise.resolve);
  assert.is(request.service, "cache");
  assert.is(request.method, "POST");
  assert.is(request.action, "_query");
  assert.is(request.params.pattern, "game*");
});

test.run();
