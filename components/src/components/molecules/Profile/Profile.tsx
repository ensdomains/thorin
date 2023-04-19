import * as React from 'react'
import styled, { css, useTheme } from 'styled-components'

import { Colors, Tokens } from '@/src/tokens'

import { getTestId, shortenAddress } from '../../../utils/utils'

import { Typography } from '../..'
import { Avatar, Props as AvatarProps } from '../../atoms/Avatar'
import { Dropdown, DropdownItem } from '../Dropdown/Dropdown'

type Size = 'small' | 'medium' | 'large'

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

const calculateWidth = (space: Tokens['space'], size: Size) => {
  if (size === 'small') return space['10']
  if (size === 'medium') return space['45']
  return space['80']
}

const Container = styled.div<ContainerProps>(
  ({ theme, $size, $hasDropdown, $open }) => css`
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: ${theme.space['2']};
    border-radius: ${theme.radii['full']};
    transition-duration: ${theme.transitionDuration['150']};
    transition-property: color, border-color, background-color, transform,
      filter;
    transition-timing-function: ${theme.transitionTimingFunction['inOut']};
    position: relative;
    z-index: 10;
    padding: ${theme.space['1']};
    background-color: ${theme.colors.backgroundPrimary};
    width: fit-content;

    ${$hasDropdown &&
    css`
      cursor: pointer;
      &:hover {
        transform: translateY(-1px);
        filter: brightness(1.05);
      }
    `}

    ${$open &&
    css`
      background-color: ${theme.colors.border};
    `}

    width: ${calculateWidth(theme.space, $size)};

    ${$size === 'small' &&
    css`
      height: ${theme.space['10']};
      padding: 0;
      border: none;
    `}

    ${$size === 'medium' &&
    css`
      height: ${theme.space['12']};
      padding-right: ${theme.space['4']};
    `}

    ${$size === 'large' &&
    css`
      width: fit-content;
      height: ${theme.space['14']};
      max-width: ${theme.space['80']};
      padding-right: ${theme.space['5']};
    `}
  `,
)

const AvatarContainer = styled.div<{ $size?: 'small' | 'medium' | 'large' }>(
  ({ theme, $size }) => css`
    width: ${theme.space['10']};
    flex: 0 0 ${theme.space['10']};
    ${$size === 'large' &&
    css`
      width: ${theme.space['12']};
      flex: 0 0 ${theme.space['12']};
    `}
  `,
)

const ProfileInnerContainer = styled.div<{
  $size?: 'small' | 'medium' | 'large'
}>(
  ({ theme, $size }) => css`
    display: ${$size === 'small' ? 'none' : 'block'};
    min-width: ${theme.space['none']};
  `,
)

const ReducedLineText = styled(Typography)(
  () => css`
    line-height: initial;
  `,
)

const ProfileInner = ({ size, avatar, address, ensName }: Props) => (
  <>
    <AvatarContainer $size={size}>
      <Avatar
        label="profile-avatar"
        {...(typeof avatar === 'string' ? { src: avatar } : avatar || {})}
      />
    </AvatarContainer>
    <ProfileInnerContainer $size={size}>
      <ReducedLineText
        color="text"
        data-testid="profile-title"
        ellipsis
        fontVariant={size === 'large' ? 'headingFour' : 'bodyBold'}
        forwardedAs="h3"
      >
        {ensName ||
          shortenAddress(
            address,
            size === 'large' ? 30 : 10,
            size === 'large' ? 10 : 5,
            size === 'large' ? 10 : 5,
          )}
      </ReducedLineText>
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
  const { space } = useTheme()
  const [isOpen, setIsOpen] = React.useState(false)

  if (dropdownItems) {
    return (
      <Dropdown
        width={calculateWidth(space, size)}
        {...{
          indicatorColor,
          items: dropdownItems,
          isOpen,
          setIsOpen,
          align: alignDropdown,
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
