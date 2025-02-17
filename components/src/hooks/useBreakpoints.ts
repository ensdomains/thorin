import { useSyncExternalStore } from 'react'
import { breakpoints, type Breakpoints } from '../tokens'
import { debounce } from '../utils/debounce'

const breakpointSizes = Object.keys(breakpoints) as Breakpoints[]

let store = Object.fromEntries(breakpointSizes.map(key => [key, false])) as { [key in Breakpoints]: boolean }

const subscribe = (onStoreChange: () => void) => {
  const debouncedOnStoreChange = debounce(onStoreChange, 100)
  window.addEventListener('resize', debouncedOnStoreChange)
  return () => {
    window.removeEventListener('resize', debouncedOnStoreChange)
  }
}

export const useBreakPoints = () => {
  return useSyncExternalStore(
    subscribe,
    () => {
      const screensize = window.innerWidth
      const newEntries = breakpointSizes.map(key => [key, screensize >= breakpoints[key]]) as [Breakpoints, boolean][]
      const hasChanged = newEntries.some(([key, value]) => store[key] !== value)
      if (hasChanged) store = Object.fromEntries(newEntries) as { [key in Breakpoints]: boolean }
      return store
    },
    () => store,
  )
}
