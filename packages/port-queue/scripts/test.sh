#!/usr/bin/env bash

deno lint && \
deno fmt --check && \
deno test *_test.js
