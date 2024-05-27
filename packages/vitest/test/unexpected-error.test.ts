
import { Effect, Option, Unify } from "effect"
import { describe, expect, it } from "vitest"


const withSpan = Effect.withSpan("bar", {
  attributes: {
    foo: "bar"
  }
})


describe("foo", () => {
  it("throws unhandled error", async () => {
    await Effect.fail(new Error("foo")).pipe(
      withSpan,
      Effect.runPromise
    )
  })
  it("fails with a normal error", async () => {
    await Effect.fail("foo").pipe(
      withSpan,
      Effect.runPromise
    )
  })
  it("fails with a normal error", async () => {
    await Effect.fail(new Error("foo")).pipe(Effect.runPromise)
  })
})
