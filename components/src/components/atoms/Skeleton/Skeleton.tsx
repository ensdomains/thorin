import * as React from 'react'
import styled, { css, keyframes } from 'styled-components'

import { Context } from '../../molecules/SkeletonGroup'

interface ContainerProps {
  $active?: boolean
}

const shine = keyframes`
  to {
    background-position-x: -200%;
  }
`

const Container = styled.div<ContainerProps>(
  ({ theme, $active }) => css`
    ${$active &&
    css`
      background: ${theme.colors.greyLight}
        linear-gradient(
          110deg,
          ${theme.colors.greyLight} 8%,
          ${theme.colors.greySurface} 18%,
          ${theme.colors.greyLight} 33%
        );
      background-size: 200% 100%;
      animation: 1.5s ${shine} infinite linear;
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
          * {
            visibility: hidden !important;
          }
        `
      : ``}
  `,
)

type NativeDivProps = React.HTMLAttributes<HTMLDivElement>

type Props = {
  /** An alternative element type to render the component as.*/
  as?: 'span'
  /** If true, hides the content and shows the skeleton style. */
  loading?: boolean
} & NativeDivProps

export const Skeleton = ({ as, children, loading, ...props }: Props) => {
  const groupLoading = React.useContext(Context)
  const active = loading ?? groupLoading

  return (
    <Container {...props} $active={active} as={as}>
      <ContainerInner $active={active}>{children}</ContainerInner>
    </Container>
  )
}

Skeleton.displayName = 'Skeleton'
