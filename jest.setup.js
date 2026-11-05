import '@testing-library/jest-dom'

// jsdom nie implementuje IntersectionObserver, którego używa framer-motion
class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}

global.IntersectionObserver = IntersectionObserverMock
