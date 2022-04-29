import * as React from 'react'
import styled from 'styled-components'

import { Context } from '../../molecules/SkeletonGroup'
import { Colors, Radii, tokens } from '@/src/tokens'

interface ContainerProps {
  active?: boolean
}

const Container = styled.div<ContainerProps>`
  ${({ theme, active }) =>
    active &&
    `
     background-color: ${tokens.colors[theme.mode].foregroundSecondary};
     border-radius: ${tokens.radii.medium};
     width: ${tokens.space.fit};
  `}
`

const ContainerInner = styled.span<{ active?: boolean }>`
  display: block;
  ${({ active }) => (active ? 'visibility: hidden;' : '')}
`

type Props = {
  /** The element type of the container element. Defaults to div. */
  as?: 'div' | 'span'
  backgroundColor?: Colors
  radius?: Radii
  /** If true, hides the content and shows the skeleton style. */
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
