import { test } from "uvu";
import * as assert from "uvu/assert";
import { remove } from "../src/services/cache";

test("cache.remove", async () => {
  const request = await remove("game-1")(Promise.resolve);
  assert.is(request.service, "cache");
  assert.is(request.method, "DELETE");
  assert.is(request.resource, "game-1");
});

test.run();
