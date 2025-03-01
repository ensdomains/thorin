import type { RefObject } from 'react'
import { useEffect } from 'react'

export const useDocumentEvent = (
  ref: RefObject<HTMLElement>,
  event: keyof DocumentEventMap,
  _callback: () => void,
  shouldCallback?: boolean,
) => {
  const callback = (e: Event) => {
    if (ref.current && !ref.current.contains(e.target as Node)) _callback()
  }
  useEffect(() => {
    if (shouldCallback) document.addEventListener(event, callback)
    else document.removeEventListener(event, callback)
    return () => {
      document.removeEventListener(event, callback)
    }
  }, [shouldCallback])
}
