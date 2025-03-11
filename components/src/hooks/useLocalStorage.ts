import type { Dispatch } from 'react'
import { useCallback, useSyncExternalStore } from 'react'

export const useLocalStorage = <T extends string>(
  key: string,
  initialValue: T,
): [T, Dispatch<T>] => {
  const data = useSyncExternalStore<T>(
    (onChange) => {
      window.addEventListener('storage', onChange)
      return () => {
        window.removeEventListener('storage', onChange)
      }
    },
    () => {
      const data = localStorage.getItem(key) as T
      return data || initialValue
    },
    () => initialValue,
  )

  const setData = useCallback(
    (value: T) => {
      localStorage.setItem(key, value)
      dispatchEvent(new StorageEvent('storage', {
        storageArea: window.localStorage,
        url: window.location.href,
        key,
      }))
    },
    [key],
  )

  return [data, setData] as const
}
