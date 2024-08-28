export function debounceWithWait<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  maxWait: number,
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout | null = null
  let maxTimer: NodeJS.Timeout | null = null

  return function (...args: Parameters<T>): void {
    // @ts-expect-error some magic
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this

    if (timer) {
      clearTimeout(timer)
    }

    // Clear the maxWait timer if it exists
    if (maxTimer) {
      clearTimeout(maxTimer)
    }

    // Set the regular debounce timer
    timer = setTimeout(() => {
      if (maxTimer) {
        clearTimeout(maxTimer)
      }
      func.apply(context, args)
    }, wait)

    // Set the maxWait timer
    maxTimer = setTimeout(() => {
      func.apply(context, args)
      // Clear the regular timer since maxWait has fired
      if (timer) {
        clearTimeout(timer)
      }
    }, maxWait)
  }
}
