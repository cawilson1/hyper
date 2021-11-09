import { test } from "uvu";
import * as assert from "uvu/assert";
import { set } from "../src/services/cache";

test("cache.set", async () => {
  const request = await set("game-1", { id: "game-1", type: "game" }, "1m")(
    Promise.resolve,
  );
  assert.is(request.service, "cache");
  assert.is(request.method, "PUT");
  assert.is(request.resource, "game-1");
  assert.is(request.params.ttl, "1m");
  assert.is(request.body.type, "game");
});

test.run();
