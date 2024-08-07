import * as React from 'react'
import styled, { css } from 'styled-components'

import { Space } from '@/src/tokens'

import { mq } from '@/src/utils/responsiveHelpers'

import { Box, BoxProps, ScrollBox } from '../..'

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

const Container = styled.div<{
  $fullWidth?: boolean
  $horizontalPadding: Space
}>(
  ({ theme, $fullWidth, $horizontalPadding }) => css`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: ${theme.space['4']};
    max-height: 60vh;
    max-width: 100vw;
    overflow: hidden;

    width: calc(100% + 2 * ${theme.space[$horizontalPadding]});
    margin: 0 -${theme.space[$horizontalPadding]};

    ${$fullWidth &&
    css`
      width: calc(100% + 2 * ${theme.space['4']});
      margin: 0 -${theme.space['4']};
    `}

    ${mq.sm.min(css`
      width: calc(
        80vw - 2 * ${theme.space['6']} + 2 * ${theme.space[$horizontalPadding]}
      );
      max-width: calc(
        ${theme.space['128']} + 2 * ${theme.space[$horizontalPadding]}
      );

      ${$fullWidth &&
      css`
        width: 80vw;
        margin: 0 -${theme.space['6']};
        max-width: calc(${theme.space['128']} + 2 * ${theme.space['6']});
      `}
    `)}
  `,
)

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
    width="$full"
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
