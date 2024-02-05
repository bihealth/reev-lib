/**
 * Store state enum
 */
export enum StoreState {
  /** Initial state, not loaded yet. */
  Initial = 'initial',
  /** Loading state, loading data. */
  Loading = 'loading',
  /** Active state, data loaded. */
  Active = 'active',
  /** Error state, error loading data. */
  Error = 'error',
  /** Redirect state, redirecting to another page. */
  Redirect = 'redirect'
}
