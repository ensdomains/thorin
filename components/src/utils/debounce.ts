type DebounceOptions = {
  maxWait?: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => unknown>(
  func: T,
  wait: number,
  options?: DebounceOptions,
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout | null = null
  let maxTimer: NodeJS.Timeout | null = null
  const { maxWait } = options || {}

  return function (...args: Parameters<T>): void {
    // @ts-expect-error because this in a func
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this

    if (timer) {
      clearTimeout(timer)
    }

    if (maxTimer) {
      clearTimeout(maxTimer)
    }

    timer = setTimeout(() => {
      if (maxTimer) {
        clearTimeout(maxTimer)
      }
      func.apply(context, args)
    }, wait)

    if (maxWait) {
      maxTimer = setTimeout(() => {
        func.apply(context, args)
        if (timer) {
          clearTimeout(timer)
        }
      }, maxWait)
    }
  }
}
