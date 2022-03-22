import { tokens } from '../../../tokens'

export interface GetCenterProps {
  center: boolean | undefined
  size: 'small' | 'medium' | 'extraSmall' | undefined
  side: 'left' | 'right'
}

export const getCenterProps = ({ center, size, side }: GetCenterProps) =>
  center &&
  `
  position: absolute;
  ${side}: ${size === 'medium' ? tokens.space['4'] : tokens.space['5']};
`
