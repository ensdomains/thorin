import { css } from 'styled-components'

import { DefaultTheme } from '@/src/types'

export interface GetCenterProps {
  center: boolean | undefined
  size: 'small' | 'medium' | 'extraSmall' | undefined
  side: 'left' | 'right'
  theme: DefaultTheme
}

export const getCenterProps = ({ center, size, side, theme }: GetCenterProps) =>
  center &&
  css`
    position: absolute;
    ${side}: ${size === 'medium' ? theme.space['4'] : theme.space['5']};
  `
