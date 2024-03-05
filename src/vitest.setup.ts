import 'vitest-canvas-mock'

import { setupUrlConfigForTesting } from './lib/urlConfig'

// Fix undefined ResizeObserver error
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = window.ResizeObserver || ResizeObserverStub

// Define base URLs for API calls in tests.
setupUrlConfigForTesting()
