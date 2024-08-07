import { cleanup, renderHook } from '@/test'

import { useFieldIds } from './useFieldIds'

const noArgs = {
  content: {
    'aria-describedby': undefined,
    'aria-labelledby': 'thorin1-label',
    'id': 'thorin1',
  },
  description: undefined,
  error: undefined,
  label: {
    htmlFor: 'thorin1',
    id: 'thorin1-label',
  },
}

const withId = {
  content: {
    'aria-describedby': undefined,
    'aria-labelledby': 'thorin2-address-label',
    'id': 'thorin2-address',
  },
  description: undefined,
  error: undefined,
  label: {
    htmlFor: 'thorin2-address',
    id: 'thorin2-address-label',
  },
}

const withDescription = {
  content: {
    'aria-describedby': 'thorin3-description',
    'aria-labelledby': 'thorin3-label',
    'id': 'thorin3',
  },
  description: {
    id: 'thorin3-description',
  },
  error: undefined,
  label: {
    htmlFor: 'thorin3',
    id: 'thorin3-label',
  },
}

const withError = {
  content: {
    'aria-describedby': 'thorin4-error',
    'aria-labelledby': 'thorin4-label',
    'id': 'thorin4',
  },
  description: undefined,
  error: {
    id: 'thorin4-error',
  },
  label: {
    htmlFor: 'thorin4',
    id: 'thorin4-label',
  },
}

const withDescriptionAndError = {
  content: {
    'aria-describedby': 'thorin5-description thorin5-error',
    'aria-labelledby': 'thorin5-label',
    'id': 'thorin5',
  },
  description: {
    id: 'thorin5-description',
  },
  error: {
    id: 'thorin5-error',
  },
  label: {
    htmlFor: 'thorin5',
    id: 'thorin5-label',
  },
}

describe.each`
  args                                  | expected
  ${undefined}                          | ${noArgs}
  ${{ id: 'address' }}                  | ${withId}
  ${{ description: true }}              | ${withDescription}
  ${{ error: true }}                    | ${withError}
  ${{ description: true, error: true }} | ${withDescriptionAndError}
`('useFieldIds($args)', ({ args, expected }) => {
  afterEach(cleanup)

  it(`returns ${JSON.stringify(expected)}`, () => {
    const { result } = renderHook(() => useFieldIds(args))
    expect(result.current).toStrictEqual(expected)
  })
})
