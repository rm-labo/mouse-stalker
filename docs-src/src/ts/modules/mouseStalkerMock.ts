import MouseStalker from '@rm-labo/mouse-stalker'
import Pickr from '@simonwep/pickr'

export default function (): void {
  const opt_default = {
    pageBaseColor: '#ffffff',
    pointerColor: 'rgba(0,0,0,1)',
    pointerSize: 24,
    hoveringExpansionRatio: 2,
    hoveringBorderWidth: 1,
  }
  let opt = opt_default

  const updateOptions = (propName: string, updateValue: string | number): void => {
    opt = {
      ...opt,
      [propName]: updateValue,
    }
    MouseStalker.update(opt)
    updateDemoCode()
  }

  const updateDemoCode = (): void => {
    const codeTargetEl = document.getElementById('option-demo-code')
    codeTargetEl.textContent = `import MouseStalker from '@rm-labo/mouse-stalker'\n\nconst option = ${JSON.stringify(
      opt,
      null,
      2
    )} \n\nMouseStalker.init(option)`
  }

  MouseStalker.init(opt)
  updateDemoCode()

  document.querySelectorAll('[data-value-picker]').forEach((element) => {
    const prop = element.getAttribute('data-value-picker')
    element.addEventListener('change', (event: Event) => {
      const { target } = event
      if (!(target instanceof HTMLInputElement) && !(target instanceof HTMLSelectElement)) {
        return
      }
      updateOptions(prop, target.value)
    })
  })

  document.querySelectorAll('[data-color-picker]').forEach((element) => {
    const prop = element.getAttribute('data-color-picker')
    const pickr = new Pickr({
      el: `[data-color-picker="${prop}"]`,
      default: opt_default[prop],
      theme: 'classic',
      components: {
        // Main components
        preview: true,
        opacity: true,
        hue: true,
        // Input / output Options
        interaction: {
          hex: true,
          rgba: true,
          hsla: true,
          input: true,
          save: true,
        },
      },
    })
    pickr.on('save', (color) => {
      switch (pickr.getColorRepresentation()) {
        case 'HEXA':
          updateOptions(prop, color.toHEXA().toString(0))
          break
        case 'HSLA':
          updateOptions(prop, color.toHSLA().toString(0))
          break
        case 'RGBA':
        default:
          updateOptions(prop, color.toRGBA().toString(0))
          break
      }
    })
  })
}
