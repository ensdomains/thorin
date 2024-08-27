import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
// import '@testing-library/jest-dom/extend-expect'
import './mocks/URL.js'

// --------------------------------------------------
// re-export everything
// ----------------------------------
export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'

// override methods
export { render }
export * from './utils'

export const getPropertyValue = (element: Element, property: string) => {
  const computedStyle = getComputedStyle(element)
  const rawValue = computedStyle.getPropertyValue(property)
  if (!rawValue.startsWith('var')) return rawValue
  const varProperty = rawValue.replace(/^var\(/, '').replace(/\)$/, '')
  return computedStyle.getPropertyValue(varProperty)
}
