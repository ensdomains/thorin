import * as React from 'react'

import type { Colors } from '@/src/tokens'

import { brightness, translateY } from '@/src/css/utils/common'

import { removeNullishProps } from '@/src/utils/removeNullishProps'

import { getTestId, shortenAddress } from '../../../utils/utils'

import type { AvatarProps } from '../../atoms/Avatar/Avatar'
import { Avatar } from '../../atoms/Avatar/Avatar'
import type { DropdownItem } from '../Dropdown/Dropdown'
import { Dropdown } from '../Dropdown/Dropdown'
import type { BoxProps } from '../../atoms/Box/Box'
import { Box } from '../../atoms/Box/Box'
import { Typography } from '../../atoms/Typography/Typography'
import * as styles from './styles.css'
import { clsx } from 'clsx'
import { assignInlineVars } from '@vanilla-extract/dynamic'

type Size = 'small' | 'medium' | 'large'

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
} & Omit<BoxProps, 'size'>

interface ContainerProps {
  $size: Size
  $hasDropdown?: boolean
  $open: boolean
}

const calculateWidth = (size: Size) => {
  if (size === 'small') return '10'
  if (size === 'medium') return '45'
  return '80'
}

const Container = React.forwardRef<HTMLElement, BoxProps & ContainerProps>(
  ({ $size, $hasDropdown, $open, className, style, ...props }, ref) => (
    <Box
      alignItems="center"
      backgroundColor={$open ? 'border' : 'backgroundPrimary'}
      borderRadius="full"
      cursor={$hasDropdown ? 'pointer' : 'unset'}
      display="flex"
      flexDirection="row"
      gap="2"
      justifyContent="flex-start"
      position="relative"
      ref={ref}
      transitionDuration={150}
      transitionTimingFunction="inOut"
      zIndex={10}
      {...props}
      className={clsx(styles.variants({ size: $size }), className)}
      style={{ ...style, ...assignInlineVars({ [styles.hasDropdownBrightness]: brightness($hasDropdown ? 1.05 : 1) }), [styles.hasDropdownTransform]: translateY($hasDropdown ? -1 : 0) }}
    />
  ),
)

const AvatarContainer = ({ $size, ...props }: BoxProps & { $size: Size }) => (
  <Box
    {...props}
    flexBasis={$size === 'large' ? '12' : '10'}
    flexGrow={0}
    flexShrink={0}
    width={$size === 'large' ? '12' : '10'}
  />
)

const ProfileInnerContainer = ({
  $size,
  ...props
}: BoxProps & { $size: Size }) => {
  return (
    <Box
      {...props}
      data-testid="profile-inner-container"
      display={$size === 'small' ? 'none' : 'block'}
      flex={1}
      minWidth="none"
      overflow="hidden"
    />
  )
}

const ProfileInner = ({ size = 'medium', avatar, address, ensName }: ProfileProps) => (
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
        {ensName
        || shortenAddress(
          address,
          size === 'large' ? 30 : 10,
          size === 'large' ? 10 : 5,
          size === 'large' ? 10 : 5,
        )}
      </Typography>
    </ProfileInnerContainer>
  </>
)

export type ProfileProps = BaseProps

export const Profile: React.FC<ProfileProps> = ({
  size = 'medium',
  avatar,
  dropdownItems,
  address,
  ensName,
  alignDropdown = 'left',
  indicatorColor,
  ...props
}) => {
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
          $hasDropdown
          $open={isOpen}
          $size={size}
          onClick={() => setIsOpen(!isOpen)}
          {...removeNullishProps(props)}
        >
          <ProfileInner {...{ size, avatar, address, ensName }} />
        </Container>
      </Dropdown>
    )
  }

  return (
    <Container
      $open={isOpen}
      $size={size}
      data-testid={getTestId(props, 'profile')}
      {...removeNullishProps(props)}
    >
      <ProfileInner {...{ size, avatar, address, ensName }} />
    </Container>
  )
}

Profile.displayName = 'Profile'
