import { MsOptions } from '../types'
import { getTemplate } from './template'
import { renderHTML, loadIcons, iconExists } from './icons'

const animationNames = ['default', 'toTop', 'toRight', 'toBottom', 'toLeft'] as const

export const defaultOptions = {
  mouseElementClassName: 'mouse-stalker-root',
  pointerElementClassName: 'mouse-stalker-pointer',
  iconTargetElementClassName: 'mouse-stalker-icon-target',
  pageBaseColor: '#ffffff',
  pointerColor: 'rgba(0,0,0,1)',
  pointerSize: 24,
  zIndex: '9999',
  hoveringExpansionRatio: 2,
  hoveringBorderWidth: 1,
  scoped: false,
  targetSelectorsDataName: 'data-st-target',
  hoveringIconName: 'data-st-icon-name',
  hoveringIconAnimationName: 'data-st-icon-animation-name',
}

/**
 * Stalker
 */
export default class Stalker {
  private _opt: MsOptions
  private _rootElement: HTMLElement
  private _rootTarget: HTMLElement | ShadowRoot
  private _mouseElement: HTMLElement
  private _pointerElement: HTMLElement
  private _iconTargetElement: HTMLElement
  private _selectors: NodeListOf<Element>
  private _handleMousemove: (e: MouseEvent) => void
  private _handleMouseover: (e: Event) => void
  private _handleMouseout: (e: Event) => void

  static defaultOptions: MsOptions = defaultOptions

  constructor(private options: MsOptions) {
    this._opt = Object.assign(Stalker.defaultOptions, options)
  }

  init(): void {
    const iconAnimationDataName = `${this._opt.hoveringIconAnimationName}-target`
    const initIcons = (): void => {
      const _names: string[] = []
      const _iconTargets = this._selectors
      _iconTargets.forEach((e) => _names.push(e.getAttribute(this._opt.hoveringIconName)))
      _names.filter((e) => e)
      loadIcons(_names)
    }

    const initHoverTarget = (): void => {
      this._selectors.forEach((element) => {
        element.addEventListener('mouseenter', this._handleMouseover)
        element.addEventListener('mouseleave', this._handleMouseout)
      })
    }

    const showIcon = (event: Event): void => {
      const _target = event.target as HTMLElement
      const iconName = _target.getAttribute(this._opt.hoveringIconName)
      const animationName = _target.getAttribute(this._opt.hoveringIconAnimationName) as typeof animationNames[number]

      if (iconName) {
        if (!iconExists(iconName)) {
          loadIcons([iconName])
        }
        this._iconTargetElement.innerHTML = renderHTML(iconName)
        if (animationName) {
          if (!animationNames.includes(animationName)) {
            throw new Error(
              `Acceptable values for ${this._opt.hoveringIconAnimationName} are ${animationNames.toString()}.`
            )
          }
          this._mouseElement.setAttribute(iconAnimationDataName, animationName)
        }
        this._mouseElement.classList.add('has-icon')
      }
    }

    const hideIcon = (): void => {
      this._mouseElement.classList.remove('has-icon')
      this._iconTargetElement.innerHTML = null
      this._mouseElement.removeAttribute(iconAnimationDataName)
    }

    const renderElement = (): void => {
      this._rootElement = document.createElement('div')

      if (this._opt.scoped) {
        this._rootElement.attachShadow({ mode: 'open' })
        this._rootTarget = this._rootElement.shadowRoot
      } else {
        this._rootTarget = this._rootElement
      }

      this._rootTarget.innerHTML = getTemplate(this._opt)
      document.body.appendChild(this._rootElement)
      document.body.style.backgroundColor = this._opt.pageBaseColor

      this._mouseElement = this._rootTarget.querySelector(`.${this._opt.mouseElementClassName}`)
      this._pointerElement = this._rootTarget.querySelector(`.${this._opt.pointerElementClassName}`)
      this._iconTargetElement = this._rootTarget.querySelector(`.${this._opt.iconTargetElementClassName}`)
    }

    const mouseMove = (e: MouseEvent): void => {
      let _movementTimer: NodeJS.Timer | null = null
      const _mouse = {
        x: e.clientX,
        y: e.clientY,
        mx: e.movementX,
        my: e.movementY,
      }
      const _degrees = Math.atan2(_mouse.my, _mouse.mx) * (180 / Math.PI) + 90
      const _distance = Math.sqrt(Math.pow(_mouse.mx, 2) + Math.pow(_mouse.my, 2))
      const _scaleX = 1 - (_distance / 100) * 0.5
      const _scaleY = 1 + (_distance / 100) * 0.5

      this._mouseElement.style.transform = `translate3d(${_mouse.x}px, ${_mouse.y}px, 0)`
      this._pointerElement.style.transform = `rotate(${_degrees}deg) scale(${_scaleX}, ${_scaleY})`

      // Reset distortion when going off-screen
      clearTimeout(_movementTimer)
      _movementTimer = setTimeout(() => {
        if (this._pointerElement) {
          this._pointerElement.style.transform = 'rotate(0deg) scale(1, 1)'
        }
      }, 100)
    }

    this._selectors = document.querySelectorAll(`[${this._opt.targetSelectorsDataName}]`)

    this._handleMouseover = (event) => {
      showIcon(event)
      this._mouseElement.classList.add('is-hover')
    }

    this._handleMouseout = () => {
      hideIcon()
      this._mouseElement.classList.remove('is-hover')
    }

    this._handleMousemove = (event) => {
      mouseMove(event)
    }

    initIcons()
    initHoverTarget()
    renderElement()

    document.addEventListener('mousemove', this._handleMousemove)
  }

  destroy(): void {
    document.removeEventListener('mousemove', this._handleMousemove)
    this._selectors.forEach((element) => {
      element.removeEventListener('mouseenter', this._handleMouseover)
      element.removeEventListener('mouseleave', this._handleMouseout)
    })
    this._rootElement.remove()
    this._rootElement = null
    this._rootTarget = null
    this._mouseElement = null
    this._pointerElement = null
    this._iconTargetElement = null
    this._selectors = null
    this._handleMousemove = null
    this._handleMouseover = null
    this._handleMouseout = null
  }
}
