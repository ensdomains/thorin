import React from 'react'
import styled, { css } from 'styled-components'

type Props = {
  alignItems?: string
  flexDirection?: string
  flex?: string
  justifyContent?: string
  gap?: string
  flexWrap?: string
} & React.HTMLAttributes<HTMLDivElement>

const Container = styled.div<{
  $alignItems?: string
  $flexDirection?: string
  $flex?: string
  $justifyContent?: string
  $gap?: string
  $flexWrap?: string
}>(
  ({
    $flexDirection,
    $justifyContent,
    $alignItems,
    $flex,
    $gap,
    $flexWrap,
  }) => css`
    display: flex;
    flex-direction: ${$flexDirection || 'column'};
    flex-gap: ${$gap || '16px'};
    gap: ${$gap || '16px'};
    ${$justifyContent && `justify-content: ${$justifyContent};`}
    ${$alignItems && `align-items: ${$alignItems};`}
    ${$flex && `flex: ${$flex};`}
    ${$flexWrap && `flex-wrap: ${$flexWrap};`}
  `,
)

export const DeleteMe = ({
  children,
  alignItems,
  flexDirection,
  flex,
  justifyContent,
  gap,
  flexWrap,
  ...props
}: React.PropsWithChildren<Props>) => (
  <Container
    $alignItems={alignItems}
    $flex={flex}
    $flexDirection={flexDirection}
    $flexWrap={flexWrap}
    $gap={gap}
    $justifyContent={justifyContent}
    {...props}
  >
    {children}
  </Container>
)
