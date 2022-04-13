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
  flex-direction: ${(props) => props.flexDirection || 'column'};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  flex: ${(props) => props.flex};
  gap: ${(props) => props.gap || '16px'};
  flex-gap: ${(props) => props.gap || '16px'};
  flex-wrap: ${(props) => props.flexWrap};
`

export const Stack = ({
  children,
  ...props
}: React.PropsWithChildren<Props>) => (
  <Container {...props}>{children}</Container>
)
