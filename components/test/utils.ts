import type { MockedFunction } from 'vitest'

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

export type PartialMockedFunction<T extends (...args: unknown[]) => unknown> = (
  ...args: Parameters<T>
) => DeepPartial<ReturnType<T>>

export const mockFunction = <T extends (...args: unknown[]) => unknown>(func: T) =>
  func as unknown as MockedFunction<PartialMockedFunction<T>>

type Entry = Pick<IntersectionObserverEntry, 'isIntersecting' | 'target' | 'time'>

export const makeMockIntersectionObserver
  = (
    mockIntersectionObserverCls: MockedFunction<(callback: (entries: Entry[]) => void) => Pick<IntersectionObserver, 'observe' | 'disconnect'>>,
    mockObserve: MockedFunction<(t: Element) => void>,
    mockDisconnect: MockedFunction<() => void>,
  ) =>
    (intersectTop: boolean, intersectBottom: boolean) => {
      let cb: (entries: Entry[]) => void
      mockIntersectionObserverCls.mockImplementation((callback) => {
        cb = callback
        return {
          observe: mockObserve,
          disconnect: mockDisconnect,
        } as Pick<IntersectionObserver, 'observe' | 'disconnect'>
      })
      const els: HTMLElement[] = []
      // @ts-expect-error mock interface
      window.IntersectionObserver = mockIntersectionObserverCls

      mockObserve.mockImplementation((el) => {
        if (intersectTop && intersectBottom) {
          els.push(el as HTMLElement)
          if (els.length === 2) {
            cb(els.map(el => ({ isIntersecting: true, target: el, time: 1 })))
          }
        }
        else if ((el as HTMLElement).dataset.testid === 'scrollbox-top-intersect') {
          cb([{ isIntersecting: intersectTop, target: el, time: 1 }])
        }
        else if ((el as HTMLElement).dataset.testid === 'scrollbox-bottom-intersect') {
          cb([{ isIntersecting: intersectBottom, target: el, time: 1 }])
        }
      })
    }
