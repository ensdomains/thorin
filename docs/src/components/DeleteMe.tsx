import React from 'react'
import styled from 'styled-components'

type Props = {
  alignItems?: string
  children: React.ReactNode
  flexDirection?: string
  flex?: string
  justifyContent?: string
  gap?: string
  flexWrap?: string
}

const Container = styled.div<Props>`
  display: flex;
  ${({ flexDirection, justifyContent, alignItems, flex, gap, flexWrap }) => `
    flex-direction: ${flexDirection || 'column'};
    justify-content: ${justifyContent};
    align-items: ${alignItems};
    flex: ${flex};
    gap: ${gap || '16px'};
    flex-gap: ${gap || '16px'};
    flex-wrap: ${flexWrap};
  `}
`

export const DeleteMe = ({
  children,
  ...props
}: React.PropsWithChildren<Props>) => (
  <Container {...props}>{children}</Container>
)
