import * as React from 'react'

export const useIntersectionalObserver = (
  ref: React.RefObject<HTMLElement>,
  callback: (isIntersecting: boolean) => void,
  active = false,
  options: IntersectionObserverInit = {},
) => {
  React.useEffect(() => {
    let observer: IntersectionObserver
    const target = ref.current /* Maintain link to element for unmounting */

    if (target && active) {
      observer = new IntersectionObserver(
        entries => callback && callback(entries[0].isIntersecting),
        options,
      )
      observer.observe(target)
    }
    return () => {
      if (observer && target) observer.unobserve(target)
    }
  }, [ref, active])
}
