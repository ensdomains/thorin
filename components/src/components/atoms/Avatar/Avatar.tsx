import * as React from 'react'
import styled, { css } from 'styled-components'

type NativeImgAttributes = React.ImgHTMLAttributes<HTMLImageElement>

type Shape = 'circle' | 'square'

interface Container {
  $shape: Shape
  $noBorder?: boolean
}

const Container = styled.div<Container>(
  ({ theme, $shape, $noBorder }) => css`
    ${() => {
      switch ($shape) {
        case 'circle':
          return css`
            border-radius: ${theme.radii.full};
            &:after {
              border-radius: ${theme.radii.full};
            }
          `
        case 'square':
          return css`
          border-radius: ${theme.radii['2xLarge']}
          &:after {
            border-radius: ${theme.radii['2xLarge']}
          }
        `
        default:
          return css``
      }
    }}

    ${!$noBorder &&
    css`
      &::after {
        box-shadow: ${theme.shadows['-px']} ${theme.colors.foregroundTertiary};
        content: '';
        inset: 0;
        position: absolute;
      }
    `}

    background-color: ${theme.colors.foregroundSecondary};

    width: 100%;
    padding-bottom: 100%;

    > * {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    overflow: hidden;
    position: relative;
  `,
)

const Placeholder = styled.div(
  ({ theme }) => css`
    background: ${theme.colors.gradients.blue};

    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  `,
)

const Img = styled.img(
  () => css`
    height: 100%;
    width: 100%;
    object-fit: cover;
  `,
)

export type Props = {
  /** Accessibility text. */
  label: string
  /** If true, removes the border around the avatar. */
  noBorder?: boolean
  /** Uses tokens space settings to set the size */
  src?: NativeImgAttributes['src']
  /** The shape of the avatar. */
  shape?: Shape
  // as?: 'img' | React.ComponentType
} & Omit<
  NativeImgAttributes,
  'decoding' | 'alt' | 'onError' | 'children' | 'onError'
>

export const Avatar = ({
  label,
  noBorder = false,
  shape = 'circle',
  src,
  ...props
}: Props) => {
  const [showImage, setShowImage] = React.useState(!!src)

  return (
    <Container $noBorder={!showImage || noBorder} $shape={shape}>
      {showImage ? (
        <Img
          {...props}
          alt={label}
          decoding="async"
          src={src}
          onError={() => setShowImage(false)}
        />
      ) : (
        <Placeholder aria-label={label} />
      )}
    </Container>
  )
}

Avatar.displayName = 'Avatar'
