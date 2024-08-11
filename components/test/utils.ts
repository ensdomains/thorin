type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

export type PartialMockedFunction<T extends (...args: any) => any> = (
  ...args: Parameters<T>
) => DeepPartial<ReturnType<T>>

export const mockFunction = <T extends (...args: any) => any>(func: T) =>
  func as unknown as vi.MockedFunction<PartialMockedFunction<T>>

export const makeMockIntersectionObserver
  = (
    mockIntersectionObserverCls: vi.MockedFunction<any>,
    mockObserve: vi.MockedFunction<any>,
    mockDisconnect: vi.MockedFunction<any>,
  ) =>
    (intersectTop: boolean, intersectBottom: boolean) => {
      let cb: (entries: any) => void
      mockIntersectionObserverCls.mockImplementation((callback: any) => {
        cb = callback
        return {
          observe: mockObserve,
          disconnect: mockDisconnect,
        }
      })
      const els: HTMLElement[] = []
      window.IntersectionObserver = mockIntersectionObserverCls
      mockObserve.mockImplementation((el: HTMLElement) => {
        if (intersectTop && intersectBottom) {
          els.push(el)
          if (els.length === 2) {
            cb(els.map(el => ({ isIntersecting: true, target: el, time: 1 })))
          }
        }
        else if (el.dataset.testid === 'scrollbox-top-intersect') {
          cb([{ isIntersecting: intersectTop, target: el, time: 1 }])
        }
        else if (el.dataset.testid === 'scrollbox-bottom-intersect') {
          cb([{ isIntersecting: intersectBottom, target: el, time: 1 }])
        }
      })
    }
