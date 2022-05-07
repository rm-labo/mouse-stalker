import Iconify from '@iconify/iconify'

export const renderHTML = (iconName: string): string => {
  return Iconify.renderHTML(iconName)
}

export const iconExists = (iconName: string): boolean => {
  return Iconify.iconExists(iconName)
}

export const loadIcons = (iconNames: string[]) => {
  return new Promise((fulfill, reject) => {
    Iconify.loadIcons(iconNames, (loaded, missing, pending) => {
      if (pending.length) {
        // Icons are pending, wait for all to load/fail
        return
      }
      if (missing.length) {
        reject({
          loaded,
          missing,
        })
      } else {
        fulfill({
          loaded,
        })
      }
    })
  })
}
