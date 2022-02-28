export interface GetCenterProps {
  center: boolean | undefined
  size: 'small' | 'medium' | 'extraSmall' | undefined
  side: 'left' | 'right'
}

export const getCenterProps = ({ center, size, side }: GetCenterProps) =>
  center &&
  `
  position: absolute;
  ${side}: ${size === 'medium' ? 4 : 5};
`
