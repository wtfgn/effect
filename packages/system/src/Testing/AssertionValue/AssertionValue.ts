import type { Lazy } from "../../Function"
import type * as O from "../../Option"
import type * as AM from "../AssertionM/AssertionM"
import type * as AR from "../AssertionResult"

/**
 * An `AssertionValue` keeps track of a assertion and a value, existentially
 * hiding the type. This is used internally by the library to provide useful
 * error messages in the event of test failures.
 */
export interface AssertionValue {
  value: Lazy<any>
  expression: O.Option<string>
  sourceLocation: O.Option<string>
  assertion: AM.AssertionM<any>
  result: Lazy<AR.AssertResult>
}
