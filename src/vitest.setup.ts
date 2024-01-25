// Fix undefined ResizeObserver error
import "vitest-canvas-mock";
import "jest-canvas-mock";

class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = window.ResizeObserver || ResizeObserverStub;
