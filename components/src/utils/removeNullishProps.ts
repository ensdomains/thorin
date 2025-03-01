import type { BoxProps } from '../components/atoms/Box/Box'

export const removeNullishProps = (props: BoxProps): BoxProps => {
  const keys = Object.keys(props) as (keyof BoxProps)[]
  return keys.reduce<BoxProps>(
    (acc, cur) => (props[cur] ? { ...acc, [cur]: props[cur] } : acc),
    {},
  )
}
