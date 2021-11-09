import { Request } from "node-fetch";
import { ListOptions, QueryOptions } from "./services/data";

export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type Action = "_query" | "_bulk" | "_index";

type Service = "data" | "cache";

export interface Result {
  ok: boolean;
  id?: string;
  msg?: string;
}

export interface Results<Type> {
  ok: boolean;
  docs: Type[];
}

export interface HyperData {
  add: <Type>(body: Type) => Promise<Result>;
  get: <Type>(id: string) => Promise<Type | Result>;
  list: <T>(options?: ListOptions) => Promise<Results<T>>;
  update: <Type>(id: string, doc: Type) => Promise<Result>;
  remove: (id: string) => Promise<Result>;
  query: <T>(selector: unknown, options?: QueryOptions) => Promise<Results<T>>;
  index: (name: string, fields: string[]) => Promise<Result>;
  bulk: <Type>(docs: Array<Type>) => Promise<Result>;
}

export interface HyperCache {
  add: <Type>(key: string, value: Type, ttl?: string) => Promise<Result>;
  get: <Type>(key: string) => Promise<Type>;
  remove: (key: string) => Promise<Result>;
  set: <Type>(key: string, value: Type, ttl?: string) => Promise<Result>;
  query: <Type>(pattern: string) => Promise<Results<Type>>;
}

export interface Hyper {
  data: HyperData;
  cache: HyperCache;
}

export interface HyperRequest {
  service: Service;
  method: Method;
  resource?: string;
  body?: unknown;
  // deno-lint-ignore no-explicit-any
  params?: Record<string, any>;
  action?: Action;
}

export type HyperRequestFunction = (request: HyperRequest) => Promise<Request>;
