import { test } from "uvu";
import * as assert from "uvu/assert";
import { update } from "../src/services/data";

test("data.update", async () => {
  const request = await update("game-1", { foo: "bar" })(Promise.resolve);
  assert.is(request.service, "data");
  assert.is(request.method, "PUT");
  assert.is(request.resource, "game-1");
  assert.is(request.body.foo, "bar");
});

test.run();
