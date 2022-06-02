import * as React from 'react'
import styled, { css } from 'styled-components'

import { Context } from '../../molecules/SkeletonGroup'

interface ContainerProps {
  $active?: boolean
}

const Container = styled.div<ContainerProps>(
  ({ theme, $active }) => css`
    ${$active &&
    css`
      background-color: ${theme.colors.foregroundSecondary};
      border-radius: ${theme.radii.medium};
      width: ${theme.space.fit};
    `}
  `,
)

const ContainerInner = styled.span<{ $active?: boolean }>(
  ({ $active }) => css`
    display: block;
    ${$active
      ? css`
          visibility: hidden;
        `
      : ``}
  `,
)

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

Skeleton.displayName = 'Skeleton'
