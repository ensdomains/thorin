import * as React from 'react'

import { rainbowSprinkles } from '@/src/css/rainbow-spinkles.css'

import { Box, BoxProps } from '../Box'

type NativeImgAttributes = React.ImgHTMLAttributes<HTMLImageElement>

type Shape = 'circle' | 'square'

interface Container {
  $shape: Shape
}

const Container = ({ $shape, ...props }: BoxProps & Container) => (
  <Box
    {...props}
    backgroundColor="$backgroundSecondary"
    borderRadius={$shape === 'circle' ? '$full' : '$2xLarge'}
    overflow="hidden"
    paddingBottom="$full"
    position="relative"
    width="$full"
  />
)

type PlaceholderProps = {
  $disabled: boolean
  $url?: string
}
const Placeholder = ({
  $disabled,
  $url,
  ...props
}: PlaceholderProps & BoxProps) => (
  <Box
    alignItems="center"
    background={$url || '$blueGradient'}
    display="flex"
    filter={$disabled ? 'grayscale(1)' : 'unset'}
    height="100%"
    justifyContent="center"
    position="absolute"
    width="100%"
    {...props}
  />
)

export type Props = {
  /** Accessibility text. */
  label: string
  /** Uses tokens space settings to set the size */
  src?: NativeImgAttributes['src']
  /** The shape of the avatar. */
  shape?: Shape
  /** A placeholder for the image to use when not loaded, in css format (e.g. url("https://example.com")) */
  placeholder?: string
  /** If true sets the component into disabled format. */
  disabled?: boolean
  /** An element that overlays the avatar */
  overlay?: React.ReactNode
} & Omit<NativeImgAttributes, 'alt' | 'onError' | 'children' | 'onError'>

export const Avatar = ({
  label,
  shape = 'circle',
  src,
  placeholder,
  decoding = 'async',
  disabled = false,
  overlay,
  ...props
}: Props) => {
  const ref = React.useRef<HTMLImageElement>(null)
  const [showImage, setShowImage] = React.useState(!!src)

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

  const isImageVisible = showImage && !!src

  const {
    className: imgClassName,
    style: imgStyle,
    otherProps: imgOtherProps,
  } = rainbowSprinkles({
    display: isImageVisible ? 'block' : 'none',
    position: 'absolute',
    height: '100%',
    objectFit: 'cover',
    width: '100%',
    filter: disabled ? 'grayscale(1)' : undefined,
    ...props,
  })

  return (
    <Container $shape={shape}>
      {overlay}
      {!isImageVisible && (
        <Placeholder
          $disabled={disabled}
          $url={placeholder}
          aria-label={label}
        />
      )}
      <img
        className={imgClassName}
        style={imgStyle}
        {...imgOtherProps}
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
