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

const Placeholder = styled.div<{ $url?: string }>(
  ({ theme, $url }) => css`
    background: ${$url || theme.colors.gradients.blue};

    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  `,
)

const Img = styled.img<{ $shown: boolean }>(
  ({ $shown }) => css`
    height: 100%;
    width: 100%;
    object-fit: cover;
    display: none;

    ${$shown &&
    css`
      display: block;
    `}
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
  /** A placeholder for the image to use when not loaded, in css format (e.g. url("https://example.com")) */
  placeholder?: string
} & Omit<NativeImgAttributes, 'alt' | 'onError' | 'children' | 'onError'>

export const Avatar = ({
  label,
  noBorder = false,
  shape = 'circle',
  src,
  placeholder,
  decoding = 'async',
  ...props
}: Props) => {
  const ref = React.useRef<HTMLImageElement>(null)
  const [showImage, setShowImage] = React.useState(false)

  const showImg = React.useCallback(() => {
    setShowImage(true)
  }, [setShowImage])

  const hideImg = React.useCallback(() => {
    setShowImage(false)
  }, [setShowImage])

  React.useEffect(() => {
    const img = ref.current
    if (img) {
      img.addEventListener('load', showImg)
      img.addEventListener('loadstart', hideImg)
      img.addEventListener('error', hideImg)
    }
    return () => {
      if (img) {
        img.removeEventListener('load', showImg)
        img.removeEventListener('loadstart', hideImg)
        img.removeEventListener('error', hideImg)
      }
    }
  }, [ref, hideImg, showImg])

  return (
    <Container $noBorder={!showImage || noBorder} $shape={shape}>
      {!showImage && <Placeholder $url={placeholder} aria-label={label} />}
      <Img
        {...props}
        $shown={showImage}
        alt={label}
        decoding={decoding}
        ref={ref}
        src={src}
        onError={() => setShowImage(false)}
        onLoad={() => setShowImage(true)}
      />
    </Container>
  )
}

Avatar.displayName = 'Avatar'
