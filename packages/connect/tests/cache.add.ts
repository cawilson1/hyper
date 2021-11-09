import { test } from "uvu";
import * as assert from "uvu/assert";
import { add } from "../src/services/cache";

test("cache.add", async () => {
  const request = await add("game-1", { id: "game-1", type: "game" })(
    Promise.resolve,
  );
  assert.is(request.service, "cache");
  assert.is(request.method, "POST");
  assert.is(request.body.key, "game-1");
});

test.run();
