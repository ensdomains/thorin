import React from 'react'
import styled from 'styled-components'

type Props = {
  align?: string
  children: React.ReactNode
  direction?: string
  flex?: string
  justify?: string
  space?: string
  wrap?: string
}

const Container = styled.div<Props>`
  display: flex;
  flex-direction: ${(props) => props.direction || 'column'};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  flex: ${(props) => props.flex};
  gap: ${(props) => props.space || '16px'};
  flex-gap: ${(props) => props.space || '16px'};
  flex-wrap: ${(props) => props.wrap};
`

export const Stack = ({
  children,
  ...props
}: React.PropsWithChildren<Props>) => (
  <Container {...props}>{children}</Container>
)
