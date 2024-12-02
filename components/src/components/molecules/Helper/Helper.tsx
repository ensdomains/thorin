import * as React from 'react'

import { AlertSVG, InfoCircleSVG } from '@/src/icons'

import type { Alert } from '@/src/types'

import type { AsProp, BoxProps } from '../../atoms/Box/Box'
import { Box } from '../../atoms/Box/Box'

import * as styles from './styles.css'
import clsx from 'clsx'

type Alignment = 'horizontal' | 'vertical'

export type HelperProps = BoxProps & {
  alert?: Alert
  alignment?: Alignment
}

const Container = ({
  $alert,
  $alignment,
  className,
  ...props
}: BoxProps & { $alert: Alert, $alignment: Alignment }) => (
  <Box
    {...props}
    className={clsx(styles.variants({ alert: $alert }), className)}
    alignItems="center"
    borderRadius="large"
    borderStyle="solid"
    borderWidth="1x"
    display="flex"
    flexDirection={$alignment === 'horizontal' ? 'row' : 'column'}
    gap={$alignment === 'horizontal' ? '4' : '2'}
    justifyContent={$alignment === 'horizontal' ? 'flex-start' : 'center'}
    overflowX="auto"
    px="4"
    py={$alignment === 'horizontal' ? '4' : '6'}
    textAlign={$alignment === 'horizontal' ? 'left' : 'center'}
    width="full"
  />
)

const IconElement = ({ $alert, as }: { $alert: Alert, as: AsProp }) => (
  <Box as={as} className={clsx(styles.variants({ svgAlert: $alert }))} wh="6" />
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
