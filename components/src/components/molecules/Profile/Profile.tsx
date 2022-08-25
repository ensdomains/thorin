import * as React from 'react'
import styled, { css } from 'styled-components'

import { ReactComponent as IconDownIndicatorSvg } from '@/src/icons/DownIndicator.svg'

import { getTestId, shortenAddress } from '../../../utils/utils'

import { Typography } from '../..'
import { Avatar, Props as AvatarProps } from '../../atoms/Avatar'
import { Dropdown, DropdownItem } from '../Dropdown/Dropdown'

type Size = 'small' | 'medium' | 'large'

type NativeDivProps = React.HTMLAttributes<HTMLDivElement>

type BaseProps = {
  /** The url of the avatar icon. */
  avatar?: AvatarProps['src']
  // avatarAs?: AvatarProps['as']
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
} & Omit<NativeDivProps, 'children'>

interface ContainerProps {
  $size: Size
  $hasChevron?: boolean
  $open: boolean
}

const Container = styled.div<ContainerProps>(
  ({ theme, $size, $hasChevron, $open }) => css`
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-radius: ${theme.radii['full']};
    transition-duration: ${theme.transitionDuration['150']};
    transition-property: color, border-color, background-color, transform,
      filter, box-shadow;
    transition-timing-function: ${theme.transitionTimingFunction['inOut']};
    position: relative;
    z-index: 10;
    padding: ${theme.space['2']} ${theme.space['4']} ${theme.space['2']}
      ${theme.space['2.5']};
    box-shadow: ${theme.shadows['0.25']};
    color: ${theme.colors.foregroundSecondary};
    background-color: ${theme.colors.groupBackground};

    ${$hasChevron &&
    css`
      cursor: pointer;
      &:hover {
        transform: translateY(-1px);
        filter: brightness(1.05);
      }
    `}

    ${$open &&
    css`
      box-shadow: ${theme.shadows['0']};
      background-color: ${theme.colors.foregroundSecondary};
    `}

  ${() => {
      switch ($size) {
        case 'small':
          return css`
            max-width: ${theme.space['48']};
          `
        case 'medium':
          return css`
            max-width: ${theme.space['52']};
          `
        case 'large':
          return css`
            max-width: ${theme.space['80']};
          `
        default:
          return ``
      }
    }}

  ${() => {
      if ($size === 'small' && $hasChevron)
        return css`
          max-width: ${theme.space['52']};
        `

      if ($size === 'medium' && $hasChevron)
        return css`
          max-width: ${theme.space['56']};
        `

      if ($size === 'large' && $hasChevron)
        return css`
          max-width: calc(${theme.space['80']} + ${theme.space['4']});
        `
    }}
  `,
)

const AvatarContainer = styled.div(
  ({ theme }) => css`
    width: ${theme.space['12']};
  `,
)

const Chevron = styled.svg<{ $open: boolean }>(
  ({ theme, $open }) => css`
    margin-left: ${theme.space['1']};
    width: ${theme.space['3']};
    margin-right: ${theme.space['0.5']};
    transition-duration: ${theme.transitionDuration['200']};
    transition-property: all;
    transition-timing-function: ${theme.transitionTimingFunction['inOut']};
    opacity: 0.3;
    transform: rotate(0deg);
    display: flex;
    color: ${theme.colors.foreground};

    ${$open &&
    css`
      opacity: 1;
      transform: rotate(180deg);
    `}
  `,
)

const ProfileInnerContainer = styled.div<{
  $size?: 'small' | 'medium' | 'large'
}>(
  ({ theme, $size }) => css`
    display: ${$size === 'small' ? 'none' : 'block'};
    margin: 0 ${theme.space['1.5']};
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
    <AvatarContainer>
      <Avatar label="profile-avatar" src={avatar} />
    </AvatarContainer>
    <ProfileInnerContainer $size={size}>
      <ReducedLineText
        color={ensName ? 'text' : 'textTertiary'}
        ellipsis
        forwardedAs="h3"
        variant={ensName && size === 'large' ? 'extraLarge' : 'large'}
        weight="bold"
      >
        {ensName || 'No name set'}
      </ReducedLineText>
      <ReducedLineText
        color={ensName ? 'textTertiary' : 'text'}
        forwardedAs="h4"
        variant="small"
        weight="bold"
      >
        {shortenAddress(
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
  ...props
}: Props) => {
  const [isOpen, setIsOpen] = React.useState(false)

  if (dropdownItems) {
    return (
      <Dropdown
        {...{ items: dropdownItems, isOpen, setIsOpen, align: alignDropdown }}
      >
        <Container
          {...props}
          $hasChevron
          $open={isOpen}
          $size={size}
          onClick={() => setIsOpen(!isOpen)}
        >
          <ProfileInner {...{ size, avatar, address, ensName }} />
          <Chevron $open={isOpen} as={IconDownIndicatorSvg} />
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
