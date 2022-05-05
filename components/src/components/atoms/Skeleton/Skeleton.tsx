import * as React from 'react'
import styled from 'styled-components'

import { Context } from '../../molecules/SkeletonGroup'
import { tokens } from '@/src/tokens'

interface ContainerProps {
  $active?: boolean
}

const Container = styled.div<ContainerProps>`
  ${({ theme, $active }) =>
    $active &&
    `
     background-color: ${tokens.colors[theme.mode].foregroundSecondary};
     border-radius: ${tokens.radii.medium};
     width: ${tokens.space.fit};
  `}
`

const ContainerInner = styled.span<{ $active?: boolean }>`
  display: block;
  ${({ $active }) => ($active ? 'visibility: hidden;' : '')}
`

type Props = {
  /** An alternative element type to render the component as.*/
  as?: 'span'
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
    <Container {...{ $active: active, as }}>
      <ContainerInner
        {...{
          $active: active,
        }}
      >
        {children}
      </ContainerInner>
    </Container>
  )
}
