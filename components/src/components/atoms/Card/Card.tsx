import * as React from 'react'

import { removeNullishProps } from '@/src/utils/removeNullishProps'

import { Typography } from '../Typography/Typography'
import type { BoxProps } from '../Box/Box'
import { Box } from '../Box/Box'

export type CardProps = {
  title?: string
} & BoxProps

const ContainerBox = (props: BoxProps) => (
  <Box
    backgroundColor="backgroundPrimary"
    borderColor="border"
    borderRadius="2xLarge"
    borderStyle="solid"
    borderWidth="1x"
    display="flex"
    flexDirection="column"
    gap="4"
    padding={{ xs: '4', sm: '6' }}
    position="relative"
    {...props}
  />
)

export const CardDivider = (props: BoxProps) => (
  <Box
    backgroundColor="border"
    height="px"
    mx={{ xs: '-4', sm: '-6' }}
    width={{ xs: 'dialogMobileWidth', sm: 'dialogDesktopWidth' }}
    {...props}
  />
)

export const Card: React.FC<CardProps> = ({ title, children, ...props }) => {
  return (
    <ContainerBox {...removeNullishProps(props)}>
      {title && <Typography fontVariant="headingFour">{title}</Typography>}
      {children}
    </ContainerBox>
  )
}

Card.displayName = 'Card'
