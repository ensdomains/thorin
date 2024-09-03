import * as React from 'react'

import { AlertSVG, InfoCircleSVG } from '@/src/icons'

import type { Alert } from '@/src/types'

import type { BoxProps } from '../../atoms/Box/Box'
import { Box } from '../../atoms/Box/Box'

import { getValueForAlert } from './utils/getValueForAlert'

type NativeDivProps = React.HTMLAttributes<HTMLDivElement>

type Alignment = 'horizontal' | 'vertical'

export type HelperProps = NativeDivProps & {
  alert?: Alert
  alignment?: Alignment
  children: React.ReactNode
}

const Container = ({
  $alert,
  $alignment,
  ...props
}: BoxProps & { $alert: Alert, $alignment: Alignment }) => (
  <Box
    {...props}
    alignItems="center"
    backgroundColor={getValueForAlert($alert, 'background')}
    borderColor={getValueForAlert($alert, 'border')}
    borderRadius="large"
    borderStyle="solid"
    borderWidth="1x"
    display="flex"
    flexDirection={$alignment === 'horizontal' ? 'row' : 'column'}
    gap={$alignment === 'horizontal' ? '4' : '$2'}
    justifyContent={$alignment === 'horizontal' ? 'flex-start' : 'center'}
    overflowX="auto"
    px="4"
    py={$alignment === 'horizontal' ? '4' : '6'}
    textAlign={$alignment === 'horizontal' ? 'left' : 'center'}
    width="full"
  />
)

const IconElement = ({ $alert, ...props }: BoxProps & { $alert: Alert }) => (
  <Box {...props} color={getValueForAlert($alert, 'svg')} wh="6" />
)

export const Helper: React.FC<HelperProps> = ({
  alert = 'info',
  alignment = 'vertical',
  children,
  ...props
}) => {
  const Icon = alert === 'info' ? InfoCircleSVG : AlertSVG

  return (
    <Container $alert={alert} $alignment={alignment} {...props}>
      <IconElement $alert={alert} as={Icon} />
      {children}
    </Container>
  )
}

Helper.displayName = 'Helper'
