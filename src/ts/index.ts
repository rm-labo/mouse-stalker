import { MsOptions } from './types'
import Stalker from './modules/stalker'
import { hasTouchScreen } from './modules/screen'

const MouseStalker = (() => {
  let activeStalker: Stalker | null = null

  const check = () => {
    if (!hasTouchScreen()) {
      return true
    }
  }

  const init = (opt?: MsOptions): void => {
    if (check()) {
      activeStalker = new Stalker(opt)
      activeStalker.init()
    }
  }

  const destroy = (): void => {
    activeStalker.destroy()
    activeStalker = null
  }

  const update = (opt?: MsOptions): void => {
    destroy()
    init(opt)
  }

  return { init, destroy, update }
})()

export { MouseStalker }
export default MouseStalker
