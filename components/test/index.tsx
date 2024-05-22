import { act, render, renderHook } from '@testing-library/react'
import '@testing-library/jest-dom'
import './mocks/URL.js'

// --------------------------------------------------
// re-export everything
// --------------------------------------------------
/* eslint-disable import/export */
export * from '@testing-library/react'
// override methods
export { render, renderHook, act as actHook }
/* eslint-enable import/export */
export { default as userEvent } from '@testing-library/user-event'

export * from './utils'
