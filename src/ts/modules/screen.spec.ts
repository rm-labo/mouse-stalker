import { hasTouchScreen } from './screen'

beforeEach(() => {
  global.window = Object.create(window)
  Object.defineProperty(window, 'navigator', {
    value: {
      maxTouchPoints: 0,
      msMaxTouchPoints: 0,
    },
    writable: true,
  })
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
})

describe('hasTouchScreen: false', (): void => {
  it('TouchScreenではない', () => {
    expect(hasTouchScreen()).toBe(false)
  })
})

describe('hasTouchScreen: true', (): void => {
  it('navigator.maxTouchPoints > 0 なら TouchScreenである', () => {
    global.window = Object.create(window)
    Object.defineProperty(window, 'navigator', {
      value: {
        maxTouchPoints: 5,
      },
    })
    expect(hasTouchScreen()).toBe(true)
  })

  it('navigator.msMaxTouchPoints > 0 なら TouchScreenである', () => {
    global.window = Object.create(window)
    Object.defineProperty(window, 'navigator', {
      value: {
        msMaxTouchPoints: 5,
      },
    })
    expect(hasTouchScreen()).toBe(true)
  })
})
