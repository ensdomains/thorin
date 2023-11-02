import * as React from 'react'

import { Typography } from '../Typography'
import { Box, BoxProps } from '../Box/Box'

export type Props = {
  title?: string
} & NativeDivProps

const ContainerBox = (props: BoxProps) => (
  <Box
    backgroundColor="$backgroundPrimary"
    borderColor="$border"
    borderRadius="$2xLarge"
    borderStyle="solid"
    borderWidth="$1x"
    display="flex"
    flexDirection="column"
    gap="$4"
    padding={{ xs: '$4', sm: '$6' }}
    position="relative"
    {...props}
  />
)

const Divider = (props: BoxProps) => (
  <Box
    backgroundColor="$border"
    height="$px"
    mx={{ xs: '$-4', sm: '$-6' }}
    width={{ xs: '$dialogMobileWidth', sm: '$dialogDesktopWidth' }}
    {...props}
  />
)

type NativeDivProps = React.HTMLAttributes<HTMLDivElement>

export const Card = ({ title, children, ...props }: Props) => {
  return (
    <ContainerBox {...props}>
      {title && <Typography fontVariant="headingFour">{title}</Typography>}
      {children}
    </ContainerBox>
  )
}

Card.displayName = 'Card'
Card.Divider = Divider
