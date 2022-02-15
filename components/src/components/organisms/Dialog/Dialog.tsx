import * as React from 'react'

import { Box, BoxProps, Modal, Stack, Typography } from '../..'

import { Props as CardProps } from '../../atoms/Card/Card'

type Props = {
  title?: string | React.ReactNode
  subtitle?: string | React.ReactNode
  trailing?: React.ReactNode
  leading?: React.ReactNode
  center?: boolean
  children: React.ReactNode
  boxProps?: BoxProps
  backdropSurface?: React.ElementType
  onDismiss?: () => void
  open: boolean
} & CardProps

export const Dialog = ({
  title,
  subtitle,
  trailing,
  leading,
  center,
  children,
  boxProps,
  ...cardProps
}: Props) => (
  <Modal padding={cardProps.padding || '4'} {...cardProps}>
    <Box minWidth={(boxProps && boxProps.minWidth) || '64'} {...boxProps}>
      <Box marginBottom="4">
        {title &&
          ((typeof title !== 'string' && title) || (
            <Typography size="headingTwo" weight="bold">
              {title}
            </Typography>
          ))}
        {subtitle &&
          ((typeof subtitle !== 'string' && subtitle) || (
            <Typography size="headingThree" weight="normal">
              {subtitle}
            </Typography>
          ))}
      </Box>
      {children}
      {(leading || trailing) && (
        <Box marginTop="4">
          <Stack
            align="center"
            direction={center ? 'vertical' : 'horizontal'}
            justify="space-between"
            space="2"
          >
            {leading || (!center && <Box flexGrow={1} />)}
            {trailing || (!center && <Box flexGrow={1} />)}
          </Stack>
        </Box>
      )}
    </Box>
  </Modal>
)
