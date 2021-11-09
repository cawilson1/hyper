import { test } from "uvu";
import * as assert from "uvu/assert";
import { add } from "../src/services/data";

test("data.add", async () => {
  const request = await add({ foo: "bar" })(Promise.resolve);
  assert.is(request.service, "data");
  assert.is(request.method, "POST");
  assert.is(request.body.foo, "bar");
});

test.run();
