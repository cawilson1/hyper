// deno-lint-ignore-file no-unused-vars
import { assertEquals } from "../../dev_deps.js";
import * as db from "./db.js";
const test = Deno.test;

const mockDb = {
  createDatabase(name) {
    return Promise.resolve({ ok: true });
  },
  removeDatabase(name) {
    return Promise.resolve({ ok: true });
  },
  bulkDocuments({ db, docs }) {
    if (docs.length === 2) {
      return Promise.resolve({
        ok: true,
        results: [{ ok: true, id: "1" }, { ok: true, id: "2" }],
      });
    } else {
      return Promise.reject({ ok: false });
    }
  },
  listDocuments({ db, limit, start, end, keys, descending }) {
    return Promise.resolve({ ok: true, docs: [{ id: "1" }, { id: "2" }] });
  },
};

const fork = (m) =>
  () => {
    return m.bimap(
      () => assertEquals(false, true),
      () => assertEquals(true, true),
    ).toPromise();
  };
const handleFail = (m) =>
  () => {
    return m.bimap(
      () => assertEquals(true, true),
      () => assertEquals(false, true),
    ).toPromise().catch((e) => e);
  };

const events = {
  dispatch: () => null,
};

test(
  "create database",
  fork(db.create("foo").runWith({ svc: mockDb, events })),
);
test(
  "remove database",
  fork(db.remove("foo").runWith({ svc: mockDb, events })),
);
test(
  "bulk documents",
  fork(
    db.bulk("foo", [{ id: "1" }, { id: "2" }]).runWith({ svc: mockDb, events }),
  ),
);
test(
  "bulk docs failure",
  handleFail(db.bulk("foo", []).runWith({ svc: mockDb, events })),
);

test(
  "list docs",
  fork(
    db.list("foo", { limit: "2" }).runWith({ svc: mockDb, events }),
  ),
);

test(
  "list docs",
  fork(
    db.list("foo", { descending: true }).runWith({ svc: mockDb, events }),
  ),
);
// test("query database");
// test("index database");
