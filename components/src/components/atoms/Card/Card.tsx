import * as React from 'react'
import { useTheme } from 'styled-components'

import { Box, BoxProps } from '../Box'
import * as styles from './styles.css'

export type Props = {
  as?: BoxProps['as']
  shadow?: boolean
  padding?: BoxProps['padding']
  width?: BoxProps['width']
}

export const Card = ({
  as = 'div',
  children,
  padding,
  shadow,
  width,
}: React.PropsWithChildren<Props>) => {
  const { mode, forcedMode } = useTheme()
  return (
    <Box
      as={as}
      className={styles.variants({
        dark: (forcedMode ?? mode) === 'dark',
        shadow,
      })}
      padding={padding}
      width={width}
    >
      {children}
    </Box>
  )
}
