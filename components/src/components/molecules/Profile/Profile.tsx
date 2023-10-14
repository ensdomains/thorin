import * as React from 'react'

import { Colors } from '@/src/tokens'

import { brightness, translateY } from '@/src/css/utils/common'

import { getTestId, shortenAddress } from '../../../utils/utils'

import { Typography } from '../..'
import { Avatar, Props as AvatarProps } from '../../atoms/Avatar'
import { Dropdown, DropdownItem } from '../Dropdown/Dropdown'
import { Box, BoxProps } from '../../atoms/Box/Box'
import { getValueForSize } from './utils/getValueForSize'

export type Size = 'small' | 'medium' | 'large'

type NativeDivProps = React.HTMLAttributes<HTMLDivElement>

type BaseProps = {
  /** The url of the avatar icon, or the avatar props to passthrough */
  avatar?: AvatarProps['src'] | Omit<AvatarProps, 'label'>
  /** An array of objects conforming to the DropdownItem interface. */
  dropdownItems?: DropdownItem[]
  /** The ethereum address of the profiled user. */
  address: string
  /** The ENS name associated with the address. */
  ensName?: string
  /** The alignment of the dropdown menu in relation to the profile button. */
  alignDropdown?: 'left' | 'right'
  /** The size and styling of the profile button. */
  size?: Size
  /** The colour of the indicator */
  indicatorColor?: Colors
} & Omit<NativeDivProps, 'children'>

interface ContainerProps {
  $size: Size
  $hasDropdown?: boolean
  $open: boolean
}

const calculateWidth = (size: Size) => {
  if (size === 'small') return '$10'
  if (size === 'medium') return '$45'
  return '$80'
}

const Container = React.forwardRef<HTMLElement, BoxProps & ContainerProps>(
  ({ $size, $hasDropdown, $open, ...props }, ref) => (
    <Box
      {...props}
      alignItems="center"
      backgroundColor={$open ? '$border' : '$backgroundPrimary'}
      borderRadius="$full"
      cursor={$hasDropdown ? 'pointer' : 'unset'}
      display="flex"
      filter={{
        base: brightness(1),
        hover: brightness($hasDropdown ? 1.05 : 1),
      }}
      flexDirection="row"
      gap="$2"
      height={getValueForSize($size, 'height')}
      justifyContent="flex-start"
      maxWidth={getValueForSize($size, 'maxWidth')}
      padding={getValueForSize($size, 'padding')}
      paddingRight={getValueForSize($size, 'paddingRight')}
      position="relative"
      ref={ref}
      transform={{
        base: translateY(0),
        hover: translateY($hasDropdown ? -1 : 0),
      }}
      transitionDuration="$150"
      transitionProperty="color, border-color, background-color, transform, filter"
      transitionTimingFunction="$inOut"
      width={getValueForSize($size, 'width')}
      zIndex={10}
    />
  ),
)

const AvatarContainer = ({ $size, ...props }: BoxProps & { $size: Size }) => (
  <Box
    {...props}
    flexBasis={$size === 'large' ? '$12' : '$10'}
    flexGrow="0"
    flexShrink="0"
    width={$size === 'large' ? '$12' : '$10'}
  />
)

const ProfileInnerContainer = ({
  $size,
  ...props
}: BoxProps & { $size: Size }) => (
  <Box
    {...props}
    display={$size === 'small' ? 'none' : 'block'}
    flex="1"
    minWidth="none"
    overflow="hidden"
  />
)

const ProfileInner = ({ size = 'medium', avatar, address, ensName }: Props) => (
  <>
    <AvatarContainer $size={size}>
      <Avatar
        label="profile-avatar"
        {...(typeof avatar === 'string' ? { src: avatar } : avatar || {})}
      />
    </AvatarContainer>
    <ProfileInnerContainer $size={size}>
      <Typography
        as="h3"
        color="text"
        data-testid="profile-title"
        ellipsis
        fontVariant={size === 'large' ? 'headingFour' : 'bodyBold'}
      >
        {ensName ||
          shortenAddress(
            address,
            size === 'large' ? 30 : 10,
            size === 'large' ? 10 : 5,
            size === 'large' ? 10 : 5,
          )}
      </Typography>
    </ProfileInnerContainer>
  </>
)

type Props = BaseProps

export const Profile = ({
  size = 'medium',
  avatar,
  dropdownItems,
  address,
  ensName,
  alignDropdown = 'left',
  indicatorColor,
  ...props
}: Props) => {
  const [isOpen, setIsOpen] = React.useState(false)

  if (dropdownItems) {
    return (
      <Dropdown
        width={calculateWidth(size)}
        {...{
          indicatorColor,
          items: dropdownItems,
          isOpen,
          setIsOpen,
          align: alignDropdown,
          responsive: false,
        }}
      >
        <Container
          {...props}
          $hasDropdown
          $open={isOpen}
          $size={size}
          onClick={() => setIsOpen(!isOpen)}
        >
          <ProfileInner {...{ size, avatar, address, ensName }} />
        </Container>
      </Dropdown>
    )
  }

  return (
    <Container
      {...{
        ...props,
        'data-testid': getTestId(props, 'profile'),
      }}
      $open={isOpen}
      $size={size}
    >
      <ProfileInner {...{ size, avatar, address, ensName }} />
    </Container>
  )
}

Profile.displayName = 'Profile'
