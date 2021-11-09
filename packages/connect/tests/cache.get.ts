import { test } from "uvu";
import * as assert from "uvu/assert";
import { get } from "../src/services/cache";

test("cache.get", async () => {
  const request = await get("game-1")(Promise.resolve);
  assert.is(request.service, "cache");
  assert.is(request.method, "GET");
  assert.is(request.resource, "game-1");
});

test.run();
