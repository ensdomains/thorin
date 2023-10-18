import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
// import '@testing-library/jest-dom/extend-expect'
import './mocks/URL.js'

// --------------------------------------------------
// re-export everything
// --------------------------------------------------
/* eslint-disable import/export */
export * from '@testing-library/react'
/* eslint-enable import/export */
export { default as userEvent } from '@testing-library/user-event'

// override methods
/* eslint-disable import/export */
export { render }
/* eslint-enable import/export */
export * from './utils'

export const getPropertyValue = (element: Element, property: string) => {
  const computedStyle = getComputedStyle(element)
  const rawValue = computedStyle.getPropertyValue(property)
  if (!rawValue.startsWith('var')) return rawValue
  const varProperty = rawValue.replace(/^var\(/, '').replace(/\)$/, '')
  return computedStyle.getPropertyValue(varProperty)
}
