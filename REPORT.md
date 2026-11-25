# Voxgig SDK generator observations

## API and scope

I chose TMDB because it is relevant to my Cinemabek project and is not listed in the Voxgig SDK catalog. This starter SDK covers two read-only TMDB v3 operations: movie search and movie details. It is generated from a focused OpenAPI spec and released under MIT. It is unofficial; TMDB data and API use remain subject to TMDB's terms and attribution rules.

## What worked

The scaffold made it quick to go from an OpenAPI spec to a TypeScript client, generated documentation, and an offline test suite. The `.sdk/model` files give the project a clear place to adjust the generated surface, and `voxgig-sdkgen doctor` provides a direct check for generator drift. The generated README examples are exercised by the test suite.

## Developer experience findings

- TMDB's published spec describes its bearer token with an `apiKey` scheme and a nonstandard `x-bearer-format` extension. The generated client treated the credential as a literal header value. I changed this project's spec to standard OpenAPI HTTP bearer auth; the client then generated the `Bearer` prefix. Supporting this extension, or explaining the required OpenAPI auth shape in the guide, would make APIs like TMDB easier to onboard.
- The movie search endpoint is exposed as `Movie().list({ query })`. It works, but `search` would better match the endpoint's meaning. An operation alias in the model could let the generated client keep API-specific names.
- A whitespace check reported trailing spaces in generated TypeScript and scaffold files. Since the generator guide says target output should not be hand-edited, a generator-side formatting or whitespace check would help keep generated repositories clean.
- Installing the generator toolchain reported three npm audit findings (two low, one high); the available fixes require major-version changes. The generated SDK package itself has no production dependencies, and `npm audit --omit=dev` reports no vulnerabilities.

## Verification and assistance

Generated with Node 24.14.1. `npm run generate` completed, and `npx voxgig-sdkgen doctor` reported no drift. In `ts/`, `npm run build` passed and `npm test` completed 223 tests: 214 passed, 9 were skipped, and none failed. The skips are for features not enabled in this SDK. I also prepared a request with a dummy token and verified the resulting header was `Authorization: Bearer test-secret`; no request was sent to TMDB. `npm audit --omit=dev` reported no vulnerabilities.

Codex helped inspect the catalog and API spec, prepare the focused OpenAPI definition, run the generator, and inspect the output and test results. The live TMDB API was not tested because no API token was configured in the environment.
