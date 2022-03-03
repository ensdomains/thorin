import * as React from 'react'
import styled from 'styled-components'

import { Context } from '../../molecules/SkeletonGroup'
import { Colors, Radii, tokens } from '@/src/tokens'

interface ContainerProps {
  active?: boolean
}

const Container = styled.div<ContainerProps>`
  ${(p) =>
    p.active &&
    `
     background-color: ${tokens.colors[p.theme.mode].foregroundSecondary};
     border-radius: ${tokens.radii.medium};
     width: ${tokens.space.fit};
  `}
`

const ContainerInner = styled.span<{ active?: boolean }>`
  display: block;
  ${(p) => (p.active ? 'visibility: hidden;' : '')}
`

type Props = {
  as?: 'div' | 'span'
  backgroundColor?: Colors
  radius?: Radii
  loading?: boolean
}

export const Skeleton = ({
  as,
  children,
  loading,
}: React.PropsWithChildren<Props>) => {
  const groupLoading = React.useContext(Context)
  const active = loading ?? groupLoading
  return (
    <Container {...{ active, as }}>
      <ContainerInner
        {...{
          active,
        }}
      >
        {children}
      </ContainerInner>
    </Container>
  )
}
