# Bugs & Issues — Diesel Framework

A list of real bugs, security issues, and missing features found in the codebase. Pick any and start hacking.

---

## Critical / Security

### 1. Hardcoded default JWT secret
**File:** `src/main.ts:148-151`
```ts
this.user_jwt_secret = jwtSecret || process.env.DIESEL_JWT_SECRET || "default_diesel_secret_for_jwt";
```
If no secret is configured, tokens can be forged. Should throw an error forcing explicit configuration instead of silently falling back.

Status - solved

---

### 2. CORS — wildcard origin + credentials together
**File:** `src/middlewares/cors/cors.ts:33-50`

Setting `Access-Control-Allow-Origin: *` alongside `Access-Control-Allow-Credentials: true` is invalid per the CORS spec and browsers will reject it. The middleware allows both simultaneously.

---

## High Severity Bugs

### 3. Typo in NODE_ENV check — dev mode never activates
**File:** `src/main.ts:575`
```ts
const isDev = process.env.NODE_ENV === "developement"; // typo
```
Stack traces are never shown in development because this condition is always false. ✅

---

### 4. JSON parsing — no try/catch
**File:** `src/ctx.ts:412`
```ts
return await req.json(); // throws SyntaxError on malformed JSON, crashes handler
```
Malformed request bodies crash instead of returning a proper 400 response.
✅
---

### 5. Path traversal risk in file uploads
**File:** `src/middlewares/filesave/savefile.ts:29-30`
```ts
const filename = `${field}_${uuid4()}${path.extname(file?.name)}`
```
`file.name` comes from user input. No extension whitelist, no MIME type check, no file size limit.

---

### 6. Filter false positives — `/api-admin` matches `/api` public route
**File:** `src/main.ts:252-253`
```ts
if (pathname.startsWith(pub)) return; // "/api-admin".startsWith("/api") === true
```
Route like `/api-admin` will skip authentication because it starts with `/api`. Should use exact segment matching.

---

### 7. Missing null check before calling route handler
**File:** `src/main.ts:551-553`

No validation that `matchedRouteHandler` or its `.handler` is callable before invoking.

it works without even checking so ✅

---

## Memory Leaks

### 8. Rate limiter Map grows forever
**File:** `src/middlewares/ratelimit/rate-limit.ts:12`
```ts
const requests = new Map<string, { count: number; startTime: number }>();
```
Entries are never removed. Under traffic this leaks memory indefinitely. Needs periodic cleanup of expired entries.

status - not used nor anyone uses this so lets not fix this
---

## Medium Severity

### 9. `yieldStream` returns empty response (stub)
**File:** `src/ctx.ts:348-356`
```ts
yieldStream(callback: () => AsyncIterable<any>): Response {
  return new Response(); // not implemented
}
```
Returns an empty response. Implementation is commented out.

status - it's not supposed to get implemented anytime soon
---

### 10. `ejs()` method is disabled but still in public API
**File:** `src/ctx.ts:285-298`
```ts
console.log("this method is diabled now for some time");
```
Either remove it from the API or implement it properly.

---

### 11. Unreachable code in handleRequest
**File:** `src/handleRequest.ts:78-81`

A `return` statement after a `return X ?? Y` is dead code. The second return never executes.
status - deprectaed
---

### 12. Logger uses `>` for string comparison instead of concatenation
**File:** `src/middlewares/logger/logger.ts:63`
```ts
`${methodColor > color}${meta.method}` // string comparison, not concatenation
```
This will log `"true"` or `"false"` instead of the color code.

---

### 13. No request body size limit
**File:** `src/ctx.ts:402-430`

`parseBody` has no size cap, making the server vulnerable to DoS via oversized payloads.

---

### 14. `middlewareFunc` type uses `any`
**File:** `src/types.ts:14-17`
```ts
ctx: Context | Request | any // defeats type checking
```

---

### 15. Cookie parsing — `decodeURIComponent` can throw
**File:** `src/ctx.ts:393-400`

Invalid percent-encoded values in cookies will throw an unhandled exception. Needs try/catch.

---

### 16. `BunRoute` bypasses normal route registration
**File:** `src/main.ts:382-393`

Writes directly to `this.routes` instead of going through `addRoute()`, potentially skipping middleware and filter logic.

---

### 17. `handlerFunction` return type inconsistency
**File:** `src/types.ts:9`
```ts
(ctx: Context) => Response | Promise<Response | undefined>
```
Async handlers can return `undefined` but sync ones cannot. Should be consistent.

---

### 18. Request pipeline function compiled on every call
**File:** `src/request_pipeline.ts:187-203`

`new Function(...)` inside `buildRequestPipeline()` compiles a function on every invocation. Should be memoized or run once at startup.

---

## Low Severity / Cleanup

### 19. `idleTimeOut` — unit not documented
**File:** `src/main.ts:145`
```ts
this.idleTimeOut = idleTimeOut ?? 10; // seconds? ms?
```

---

### 20. No validation that HTTP method string is actually a valid method
**File:** `src/main.ts:754-757`

Only checks `typeof method === "string"` — doesn't reject `"FOOBAR"` or empty string.

---

### 21. `errorFormat: "html"` silently falls back to text
Setting `errorFormat` to `"html"` has no effect — only `"json"` and `"text"` are implemented, but no error is thrown for invalid values.

---

## Quick Wins (good first issues)

| # | Task | Effort |
|---|------|--------|
| 3 | Fix `"developement"` typo | 1 line |
| 12 | Fix logger `>` operator bug | 1 line |
| 4 | Wrap `req.json()` in try/catch | ~5 lines |
| 19 | Document `idleTimeOut` unit | comment |
| 15 | Fix cookie `decodeURIComponent` crash | ~5 lines |
| 20 | Validate HTTP method names | ~5 lines |
| 10 | Remove or implement `ejs()` | small |
| 9 | Remove or implement `yieldStream` | small |

---

## Bigger Projects

- **File upload security** — extension whitelist + MIME validation + size limit (issue #5)
- **Rate limiter cleanup** — TTL-based eviction for the Map (issue #8)
- **JWT secret enforcement** — throw on missing secret instead of fallback (issue #1)
- **CORS credentials fix** — mutual exclusion of wildcard + credentials (issue #2)
- **Filter path matching** — replace `startsWith` with proper segment matching (issue #6)
- **Streaming** — implement `yieldStream` properly (issue #9)
