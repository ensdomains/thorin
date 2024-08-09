import { RefObject, useEffect } from 'react'

export const useDocumentEvent = (
  ref: RefObject<any>,
  event: keyof DocumentEventMap,
  _callback: () => void,
  shouldCallback?: boolean,
) => {
  const callback = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) _callback()
  }
  useEffect(() => {
    if (shouldCallback) document.addEventListener(event, callback)
    else document.removeEventListener(event, callback)
    return () => {
      document.removeEventListener(event, callback)
    }
  }, [shouldCallback])
}
