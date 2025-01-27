import * as React from 'react'

import { forwardRef } from 'react'

import type { Space } from '@/src/tokens'

import { space } from '@/src/tokens/space'
import type { BoxProps } from '../../atoms'
import { ScrollBox, Box } from '../../atoms'
import * as styles from './styles.css'
import { clsx } from 'clsx'
import { assignInlineVars } from '@vanilla-extract/dynamic'

type NativeFromProps = React.FormHTMLAttributes<HTMLFormElement>

type BaseProps = React.ComponentProps<typeof ScrollBox> & {
  as?: 'form'
  gap?: Space
  fullWidth?: boolean
}

type WithForm = {
  as: 'form'
  target?: NativeFromProps['target']
  action?: NativeFromProps['action']
  method?: NativeFromProps['method']
  onSubmit?: NativeFromProps['onSubmit']
}

type WithoutForm = {
  as?: never
  target?: never
  onSubmit?: never
  method?: never
  action?: never
}

type DialogContentProps = BaseProps & (WithForm | WithoutForm)

const Container = forwardRef<
  HTMLElement,
  BoxProps & { $fullWidth?: boolean, $horizontalPadding: Space }
>(({ $horizontalPadding, $fullWidth, className, style, ...props }, ref) => (
  <Box
    ref={ref}
    {...props}
    alignItems="center"
    display="flex"
    flex={1}
    flexDirection="column"
    gap="4"
    justifyContent="flex-start"
    className={clsx(styles.dialogContent, className)}
    style={{
      ...assignInlineVars({
        [styles.dialogContentMargin]: $fullWidth
          ? `0 -${space['4']};`
          : `0 -${space[$horizontalPadding]}`,
        [styles.dialogContentMarginSm]: $fullWidth
          ? `0 -${space['6']}`
          : `0 -${space[$horizontalPadding]}`,
        [styles.dialogContentWidthSm]: $fullWidth
          ? '80vw'
          : `calc(80vw - 2 * ${space['6']} + 2 * ${space[$horizontalPadding]})`,
        [styles.dialogContentWidth]: $fullWidth
          ? `calc(100% + 2 * ${space['4']});`
          : `calc(100% + 2 * ${space[$horizontalPadding]})`,
        [styles.dialogContentMaxWidthSm]: `calc(${space['128']} + 2 * ${space[$horizontalPadding]})`,
      }),
      ...style,
    }}
    maxHeight="60vh"
    overflow="hidden"
  />
))
const ScrollBoxContent = ({
  gap,
  children,
}: Pick<BoxProps, 'gap' | 'children'>) => (
  <Box
    alignItems="center"
    display="flex"
    flexDirection="column"
    gap={gap}
    justifyContent="flex-start"
    width="full"
    maxWidth={{ base: 'full', sm: '144' }}
  >
    {children}
  </Box>
)

export const DialogContent = React.forwardRef<
  HTMLFormElement,
  React.PropsWithChildren<DialogContentProps>
>(
  (
    {
      as: asProp,
      target,
      method,
      action,
      onSubmit,
      gap = '4',
      fullWidth,
      horizontalPadding = '2',
      children,
      ...props
    }: React.PropsWithChildren<DialogContentProps>,
    ref,
  ) => {
    return (
      <Container
        $fullWidth={fullWidth}
        $horizontalPadding={horizontalPadding}
        as={asProp}
        ref={ref}
        {...{ target, method, action, onSubmit }}
      >
        <ScrollBox {...props} horizontalPadding={horizontalPadding}>
          <ScrollBoxContent gap={gap}>{children}</ScrollBoxContent>
        </ScrollBox>
      </Container>
    )
  },
)
