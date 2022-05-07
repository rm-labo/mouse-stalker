import { getTemplate } from './template'
import { defaultOptions } from './stalker'

describe('getTemplate()', (): void => {
  it('toMatchSnapshot', () => {
    expect(getTemplate(defaultOptions)).toMatchSnapshot()
  })
})
