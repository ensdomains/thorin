import { vi } from 'vitest'

Object.defineProperty(window, 'URL', {
  writable: true,
  value: {
    createObjectURL: vi.fn(),
  },
})
