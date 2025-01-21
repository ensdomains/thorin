import * as React from 'react'

import { iconClass, img, placeholder } from './styles.css'

import { Box, type BoxProps } from '../Box/Box'
import { avatar, overlay } from './styles.css'
import { CheckSVG } from '../../../index'
import { clsx } from 'clsx'

type NativeImgAttributes = React.ImgHTMLAttributes<HTMLImageElement>

type Shape = 'circle' | 'square'

interface Container {
  $shape: Shape
  $size: BoxProps['wh']
}

const Container = ({ $shape, $size, ...props }: BoxProps & Container) => (
  <Box
    backgroundColor="backgroundSecondary"
    borderRadius={$shape === 'circle' ? 'full' : '2xLarge'}
    className={avatar}
    height={$size}
    overflow="hidden"
    paddingBottom={$size ? 'unset' : 'full'}
    position="relative"
    width={$size ?? 'full'}
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
}: PlaceholderProps & BoxProps) => {
  return (
    <Box
      as={$url ? 'img' : 'div'}
      className={clsx({ [placeholder.disabled]: $disabled })}
      alignItems="center"
      src={$url}
      background={!$url ? 'blueGradient' : undefined}
      display="flex"
      height="full"
      justifyContent="center"
      position="absolute"
      width="full"
      {...props}
    />
  )
}

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
  icon?: React.FC
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

  const Overlay = React.useMemo(() => {
    if (!checked) return null
    return (
      <Box
        className={overlay({ checked, disabled })}
        alignItems="center"
        color="textAccent"
        display="flex"
        justifyContent="center"
      >
        <Box className={iconClass} as={icon ?? CheckSVG} />
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
        className={img({ loaded: isImageVisible, disabled })}
        {...props}
        alt={label}
        decoding={decoding}
        ref={ref}
        src={src}
        onError={() => setShowImage(false)}
        onLoad={() => setShowImage(true)}
      />
      {Overlay}
    </Container>
  )
}

Avatar.displayName = 'Avatar'
