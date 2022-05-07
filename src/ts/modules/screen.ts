type Navigator = typeof navigator & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  msMaxTouchPoints: any
}

export const hasTouchScreen = () => {
  if (navigator.maxTouchPoints > 0) {
    return true
  }
  if ((navigator as Navigator).msMaxTouchPoints > 0) {
    return true
  }
  if (window.matchMedia('(pointer:coarse)').matches) {
    return true
  }

  return false
}
