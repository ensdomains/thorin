import { computeCoordsFromPlacement } from './DynamicPopover'

class DOMRect {
  bottom = 0

  left = 0

  right = 0

  top = 0

  constructor(public x = 0, public y = 0, public width = 0, public height = 0) {
    this.left = x
    this.top = y
    this.right = x + width
    this.bottom = y + height
  }

  static fromRect(other?: DOMRectInit): DOMRect {
    return new DOMRect(other?.x, other?.y, other?.width, other?.height)
  }

  toJSON() {
    return JSON.stringify(this)
  }
}

describe('computeCoordsFromPlacement', () => {
  let mockWindow: any
  beforeEach(() => {
    mockWindow = jest.spyOn(window, 'window', 'get')
  })
  afterEach(() => {
    mockWindow.mockRestore()
  })

  it('top-start should display on top left if there is enough space', () => {
    mockWindow.mockImplementation(() => ({
      innerWidth: 300,
      innerHeight: 500,
    }))

    const props = computeCoordsFromPlacement(
      new DOMRect(150, 250, 50, 50),
      new DOMRect(100, 100, 100, 100),
      'top-start',
      20,
      5,
    )

    expect(props.x).toEqual(0)
    expect(props.y).toEqual(-100 - 5)
    expect(props.side).toEqual('top')
  })

  it('top-center should display on top center if there is enough space', () => {
    mockWindow.mockImplementation(() => ({
      innerWidth: 300,
      innerHeight: 500,
    }))

    const props = computeCoordsFromPlacement(
      new DOMRect(150, 250, 50, 50),
      new DOMRect(100, 100, 100, 100),
      'top-center',
      20,
      5,
    )

    expect(props.x).toEqual(-25)
    expect(props.y).toEqual(-100 - 5)
    expect(props.side).toEqual('top')
  })

  it('top-end should display on top right if there is enough space', () => {
    mockWindow.mockImplementation(() => ({
      innerWidth: 300,
      innerHeight: 500,
    }))

    const props = computeCoordsFromPlacement(
      new DOMRect(150, 250, 50, 50),
      new DOMRect(100, 100, 100, 100),
      'top-end',
      20,
      5,
    )

    expect(props.x).toEqual(-50)
    expect(props.y).toEqual(-100 - 5)
    expect(props.side).toEqual('top')
  })

  it('bottom-start should display on bottom left if there is enough space', () => {
    mockWindow.mockImplementation(() => ({
      innerWidth: 300,
      innerHeight: 500,
    }))

    const props = computeCoordsFromPlacement(
      new DOMRect(150, 250, 50, 50),
      new DOMRect(100, 100, 100, 100),
      'bottom-start',
      20,
      5,
    )

    expect(props.x).toEqual(0)
    expect(props.y).toEqual(50 + 5)
    expect(props.side).toEqual('bottom')
  })

  it('bottom-center should display on bottom center if there is enough space', () => {
    mockWindow.mockImplementation(() => ({
      innerWidth: 300,
      innerHeight: 500,
    }))

    const props = computeCoordsFromPlacement(
      new DOMRect(150, 250, 50, 50),
      new DOMRect(100, 100, 100, 100),
      'bottom-center',
      20,
      5,
    )

    expect(props.x).toEqual(-25)
    expect(props.y).toEqual(50 + 5)
    expect(props.side).toEqual('bottom')
  })

  it('bottom-right should display on bottom right if there is enough space', () => {
    mockWindow.mockImplementation(() => ({
      innerWidth: 300,
      innerHeight: 500,
    }))

    const props = computeCoordsFromPlacement(
      new DOMRect(150, 250, 50, 50),
      new DOMRect(100, 100, 100, 100),
      'bottom-end',
      20,
      5,
    )

    expect(props.x).toEqual(-50)
    expect(props.y).toEqual(50 + 5)
    expect(props.side).toEqual('bottom')
  })

  it('left-start should display on left top if there is enough space', () => {
    mockWindow.mockImplementation(() => ({
      innerWidth: 300,
      innerHeight: 500,
    }))

    const props = computeCoordsFromPlacement(
      new DOMRect(150, 250, 50, 50),
      new DOMRect(100, 100, 100, 100),
      'left-start',
      20,
      5,
    )

    expect(props.x).toEqual(-100 - 5)
    expect(props.y).toEqual(0)
    expect(props.side).toEqual('left')
  })

  it('left-center should display on left center if there is enough space', () => {
    mockWindow.mockImplementation(() => ({
      innerWidth: 300,
      innerHeight: 500,
    }))

    const props = computeCoordsFromPlacement(
      new DOMRect(150, 250, 50, 50),
      new DOMRect(100, 100, 100, 100),
      'left-center',
      20,
      5,
    )

    expect(props.x).toEqual(-100 - 5)
    expect(props.y).toEqual(-25)
    expect(props.side).toEqual('left')
  })

  it('left-end should display on left bottom if there is enough space', () => {
    mockWindow.mockImplementation(() => ({
      innerWidth: 300,
      innerHeight: 500,
    }))

    const props = computeCoordsFromPlacement(
      new DOMRect(150, 250, 50, 50),
      new DOMRect(100, 100, 100, 100),
      'left-end',
      20,
      5,
    )

    expect(props.x).toEqual(-100 - 5)
    expect(props.y).toEqual(-50)
    expect(props.side).toEqual('left')
  })

  it('right-start should display on right top if there is enough space', () => {
    mockWindow.mockImplementation(() => ({
      innerWidth: 400,
      innerHeight: 500,
    }))

    const props = computeCoordsFromPlacement(
      new DOMRect(150, 250, 50, 50),
      new DOMRect(100, 100, 100, 100),
      'right-start',
      20,
      5,
    )

    expect(props.x).toEqual(50 + 5)
    expect(props.y).toEqual(0)
    expect(props.side).toEqual('right')
  })

  it('right-center should display on right center if there is enough space', () => {
    mockWindow.mockImplementation(() => ({
      innerWidth: 400,
      innerHeight: 500,
    }))

    const props = computeCoordsFromPlacement(
      new DOMRect(150, 250, 50, 50),
      new DOMRect(100, 100, 100, 100),
      'right-center',
      20,
      5,
    )

    expect(props.x).toEqual(50 + 5)
    expect(props.y).toEqual(-25)
    expect(props.side).toEqual('right')
  })

  it('right-end should display on right bottom if there is enough space', () => {
    mockWindow.mockImplementation(() => ({
      innerWidth: 400,
      innerHeight: 500,
    }))

    const props = computeCoordsFromPlacement(
      new DOMRect(150, 250, 50, 50),
      new DOMRect(100, 100, 100, 100),
      'right-end',
      20,
      5,
    )

    expect(props.x).toEqual(50 + 5)
    expect(props.y).toEqual(-50)
    expect(props.side).toEqual('right')
  })

  // SHIFT

  it('top-end should shift to right if there is not enough space', () => {
    mockWindow.mockImplementation(() => ({
      innerWidth: 300,
      innerHeight: 500,
    }))

    const props = computeCoordsFromPlacement(
      new DOMRect(20, 250, 50, 50),
      new DOMRect(100, 100, 100, 100),
      'top-end',
      20,
      5,
    )

    expect(props.x).toEqual(0)
    expect(props.y).toEqual(-100 - 5)
    expect(props.side).toEqual('top')
  })

  it('top-start should shift to the left if there is not enough space', () => {
    mockWindow.mockImplementation(() => ({
      innerWidth: 300,
      innerHeight: 500,
    }))

    const props = computeCoordsFromPlacement(
      new DOMRect(300 - 20 - 50, 250, 50, 50),
      new DOMRect(100, 100, 100, 100),
      'top-start',
      20,
      5,
    )

    expect(props.x).toEqual(-50)
    expect(props.y).toEqual(-100 - 5)
    expect(props.side).toEqual('top')
  })

  it('bottom-start should shift to the left if there is not enough space', () => {
    mockWindow.mockImplementation(() => ({
      innerWidth: 300,
      innerHeight: 500,
    }))

    const props = computeCoordsFromPlacement(
      new DOMRect(20, 250, 50, 50),
      new DOMRect(100, 100, 100, 100),
      'bottom-start',
      20,
      5,
    )

    expect(props.x).toEqual(0)
    expect(props.y).toEqual(50 + 5)
    expect(props.side).toEqual('bottom')
  })

  it('bottom-end should shift to the right if there is not enough space', () => {
    mockWindow.mockImplementation(() => ({
      innerWidth: 300,
      innerHeight: 500,
    }))

    const props = computeCoordsFromPlacement(
      new DOMRect(300 - 20 - 50, 250, 50, 50),
      new DOMRect(100, 100, 100, 100),
      'bottom-end',
      20,
      5,
    )

    expect(props.x).toEqual(-50)
    expect(props.y).toEqual(50 + 5)
    expect(props.side).toEqual('bottom')
  })

  it('left-end should shift down if there is not enough space', () => {
    mockWindow.mockImplementation(() => ({
      innerWidth: 300,
      innerHeight: 500,
    }))

    const props = computeCoordsFromPlacement(
      new DOMRect(150, 20, 50, 50),
      new DOMRect(100, 100, 100, 100),
      'left-end',
      20,
      5,
    )

    expect(props.x).toEqual(-100 - 5)
    expect(props.y).toEqual(0)
    expect(props.side).toEqual('left')
  })

  it('left-start should shift up if there is not enough space', () => {
    mockWindow.mockImplementation(() => ({
      innerWidth: 300,
      innerHeight: 500,
    }))

    const props = computeCoordsFromPlacement(
      new DOMRect(150, 500 - 20 - 50, 50, 50),
      new DOMRect(100, 100, 100, 100),
      'left-start',
      20,
      5,
    )

    expect(props.x).toEqual(-100 - 5)
    expect(props.y).toEqual(-50)
    expect(props.side).toEqual('left')
  })

  it('right-end should shift down if there is not enough space', () => {
    mockWindow.mockImplementation(() => ({
      innerWidth: 400,
      innerHeight: 500,
    }))

    const props = computeCoordsFromPlacement(
      new DOMRect(150, 20, 50, 50),
      new DOMRect(100, 100, 100, 100),
      'right-end',
      20,
      5,
    )

    expect(props.x).toEqual(50 + 5)
    expect(props.y).toEqual(0)
    expect(props.side).toEqual('right')
  })

  it('right-start should shift up if there is not enough space', () => {
    mockWindow.mockImplementation(() => ({
      innerWidth: 400,
      innerHeight: 500,
    }))

    const props = computeCoordsFromPlacement(
      new DOMRect(150, 500 - 20 - 50, 50, 50),
      new DOMRect(100, 100, 100, 100),
      'right-start',
      20,
      5,
    )

    expect(props.x).toEqual(50 + 5)
    expect(props.y).toEqual(-50)
    expect(props.side).toEqual('right')
  })

  it('top should flip to bottom if there is not enough space', () => {
    mockWindow.mockImplementation(() => ({
      innerWidth: 300,
      innerHeight: 500,
    }))

    const props = computeCoordsFromPlacement(
      new DOMRect(150, 100 + 20, 50, 50),
      new DOMRect(100, 100, 100, 100),
      'top-start',
      20,
      5,
    )

    expect(props.x).toEqual(0)
    expect(props.y).toEqual(50 + 5)
    expect(props.side).toEqual('bottom')
  })

  it('bottom should flip to top if there is not enough space', () => {
    mockWindow.mockImplementation(() => ({
      innerWidth: 400,
      innerHeight: 500,
    }))

    const props = computeCoordsFromPlacement(
      new DOMRect(150, 500 - 100 - 50, 50, 50),
      new DOMRect(100, 100, 100, 100),
      'bottom-start',
      20,
      5,
    )

    expect(props.x).toEqual(0)
    expect(props.y).toEqual(-100 - 5)
    expect(props.side).toEqual('top')
  })

  it('left should flip to right if there is not enough space', () => {
    mockWindow.mockImplementation(() => ({
      innerWidth: 400,
      innerHeight: 500,
    }))

    const props = computeCoordsFromPlacement(
      new DOMRect(20 + 100, 20 + 100, 50, 50),
      new DOMRect(100, 100, 100, 100),
      'left-start',
      20,
      5,
    )

    expect(props.x).toEqual(50 + 5)
    expect(props.y).toEqual(0)
    expect(props.side).toEqual('right')
  })

  it('right should flip to left if there is not enough space', () => {
    mockWindow.mockImplementation(() => ({
      innerWidth: 400,
      innerHeight: 500,
    }))

    const props = computeCoordsFromPlacement(
      new DOMRect(400 - 50 - 100, 250, 50, 50),
      new DOMRect(100, 100, 100, 100),
      'right-start',
      20,
      5,
    )

    expect(props.x).toEqual(-100 - 5)
    expect(props.y).toEqual(0)
    expect(props.side).toEqual('left')
  })
})
