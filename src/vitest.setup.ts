import 'vitest-canvas-mock'

import { urlConfig } from './lib/urlConfig'

// Fix undefined ResizeObserver error
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = window.ResizeObserver || ResizeObserverStub

// Define base URLs for API calls in tests.
urlConfig.baseUrlAnnonars = '/internal/proxy/annonars'
urlConfig.baseUrlMehari = '/internal/proxy/mehari'
urlConfig.baseUrlViguno = '/internal/proxy/viguno'
urlConfig.baseUrlCadaPrio = '/internal/proxy/cada-prio'
urlConfig.baseUrlDotty = '/internal/proxy/dotty'
urlConfig.baseUrlNginx = '/remote/variantvalidator'
urlConfig.baseUrlVariantValidator = '/remote/variantvalidator'
urlConfig.baseUrlPubtator = '/remote/pubtator3-api'
