import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import './mocks/URL.js'

// --------------------------------------------------
// re-export everything
// --------------------------------------------------
/* eslint-disable import/export */
export * from '@testing-library/react'
/* eslint-enable import/export */
export { default as userEvent } from '@testing-library/user-event'
export { act as actHook } from '@testing-library/react-hooks'

// override methods
/* eslint-disable import/export */
export { render }
/* eslint-enable import/export */
export { renderHook } from '@testing-library/react-hooks'
