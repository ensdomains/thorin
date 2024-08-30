import * as React from 'react'

import { rainbowSprinkles } from '@/src/css/rainbow-spinkles.css'

import { rawColorToRGBA } from '@/src/tokens/color3'

import { Box, type BoxProps } from '../Box'
import { avatar } from './styles.css'
import { CheckSVG } from '../../../icons/index'

type NativeImgAttributes = React.ImgHTMLAttributes<HTMLImageElement>

type Shape = 'circle' | 'square'

interface Container {
  $shape: Shape
  $size: BoxProps['wh']
}

const Container = ({ $shape, $size, ...props }: BoxProps & Container) => (
  <Box
    backgroundColor="$backgroundSecondary"
    borderRadius={$shape === 'circle' ? '$full' : '$2xLarge'}
    className={avatar}
    height={$size}
    overflow="hidden"
    paddingBottom={$size ? 'unset' : '$full'}
    position="relative"
    width={$size ?? '$full'}
    {...props}
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

export type AvatarProps = {
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
  checked?: boolean
  /** An svg to overlay over the avatar */
  icon?: React.ReactElement
  /** The deconding attribute of an img element */
  decoding?: NativeImgAttributes['decoding']
  /** A custom sizing for the avatar */
  size?: BoxProps['wh']
} & Omit<NativeImgAttributes, 'alt' | 'onError' | 'children' | 'onError'>

export const Avatar: React.FC<AvatarProps> = ({
  label,
  shape = 'circle',
  src,
  placeholder,
  decoding = 'async',
  disabled = false,
  icon,
  checked,
  size,
  ...props
}) => {
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

  const overlay = React.useMemo(() => {
    if (disabled || (!icon && !checked)) return null
    return (
      <Box
        alignItems="center"
        bg={
          checked
            ? rawColorToRGBA([56, 137, 255], 0.75)
            : rawColorToRGBA([0, 0, 0], 0.25)
        }
        color="$white"
        display="flex"
        justifyContent="center"
      >
        <Box as={icon ?? <CheckSVG />} wh="40%" />
      </Box>
    )
  }, [checked, disabled, icon])
  return (
    <Container $shape={shape} $size={size}>
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
      {overlay}
    </Container>
  )
}

Avatar.displayName = 'Avatar'
