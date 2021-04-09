import * as core from "../../../Effect/core"
import type { Effect } from "../../../Effect/effect"
import * as forEach from "../../../Effect/excl-forEach"
import * as coreMap from "../../../Effect/map"
import * as Chunk from "../core"

/**
 * Effectfully maps the elements of this chunk.
 */
export function mapM_<A, R, E, B>(
  self: Chunk.Chunk<A>,
  f: (a: A) => Effect<R, E, B>
): Effect<R, E, Chunk.Chunk<B>> {
  return core.suspend(() => {
    let builder = Chunk.empty<B>()

    return coreMap.map_(
      forEach.forEachUnit_(self, (a) =>
        coreMap.map_(f(a), (b) => {
          builder = Chunk.append_(builder, b)
        })
      ),
      () => builder
    )
  })
}

/**
 * Effectfully maps the elements of this chunk.
 *
 * @dataFirst mapM_
 */
export function mapM<A, R, E, B>(
  f: (a: A) => Effect<R, E, B>
): (self: Chunk.Chunk<A>) => Effect<R, E, Chunk.Chunk<B>> {
  return (self) => mapM_(self, f)
}
