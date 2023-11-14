import { BoxProps } from '../components'

export const removeNullishProps = (props: BoxProps): object => {
  const keys = Object.keys(props) as (keyof BoxProps)[]
  return keys.reduce<BoxProps>(
    (acc, cur) => (props[cur] ? { ...acc, [cur]: props[cur] } : acc),
    {},
  )
}
