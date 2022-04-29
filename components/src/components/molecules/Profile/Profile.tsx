import * as React from 'react'
import styled from 'styled-components'

import { tokens } from '@/src/tokens'
import { shortenAddress } from '../../../utils/utils'

import { Typography } from '../..'
import { Avatar, Props as AvatarProps } from '../../atoms/Avatar'
import { Dropdown, DropdownItem } from '../Dropdown/Dropdown'
import { ReactComponent as IconDownIndicatorSvg } from '@/src/icons/DownIndicator.svg'

type Size = 'small' | 'medium' | 'large'

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
}

interface ContainerProps {
  size: Size
  hasChevron?: boolean
  open: boolean
}

const Container = styled.div<ContainerProps>`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: ${tokens.radii['full']};
  transition-duration: ${tokens.transitionDuration['150']};
  transition-property: color, border-color, background-color, transform, filter,
    box-shadow;
  transition-timing-function: ${tokens.transitionTimingFunction['inOut']};
  position: relative;
  z-index: 10;
  padding: ${tokens.space['2']} ${tokens.space['4']} ${tokens.space['2']}
    ${tokens.space['2.5']};
  box-shadow: ${tokens.shadows['0.25']};
  ${({ theme }) => `
    color: ${tokens.colors[theme.mode].foregroundSecondary};
    background-color: ${tokens.colors[theme.mode].groupBackground};
  `}

  ${({ hasChevron }) =>
    hasChevron &&
    `
      cursor: pointer;
      &:hover {
        transform: translateY(-1px);s
        filter: brightness(1.05);
      }
  `}

  ${({ open, theme }) =>
    open &&
    `
      box-shadow: ${tokens.shadows['0']};
      background-color: ${tokens.colors[theme.mode].foregroundSecondary};
  `}

  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          max-width: ${tokens.space['48']};
        `
      case 'medium':
        return `
          max-width: ${tokens.space['52']};
        `
      case 'large':
        return `
          max-width: ${tokens.space['80']};
        `
      default:
        return ``
    }
  }}

  ${({ size, hasChevron }) => {
    if (size === 'small' && hasChevron)
      return `
      max-width: ${tokens.space['52']};
    `

    if (size === 'medium' && hasChevron)
      return `
      max-width: ${tokens.space['56']};
    `

    if (size === 'large' && hasChevron)
      return `
      max-width: calc(${tokens.space['80']} + ${tokens.space['4']});
    `
  }}
`

const Chevron = styled.svg<{ $open: boolean }>`
  margin-left: ${tokens.space['1']};
  width: ${tokens.space['3']};
  margin-right: ${tokens.space['0.5']};
  transition-duration: ${tokens.transitionDuration['200']};
  transition-property: all;
  transition-timing-function: ${tokens.transitionTimingFunction['inOut']};
  opacity: 0.3;
  transform: rotate(0deg);
  display: flex;
  color: ${({ theme }) => tokens.colors[theme.mode].foreground};

  ${({ $open }) =>
    $open &&
    `
      opacity: 1;
      transform: rotate(180deg);
  `}
`

const ProfileInnerContainer = styled.div<{
  size?: 'small' | 'medium' | 'large'
}>`
  display: ${({ size }) => (size === 'small' ? 'none' : 'block')};
  margin: 0 ${tokens.space['1.5']};
  min-width: ${tokens.space['none']};
`

const ReducedLineText = styled(Typography)`
  line-height: initial;
`

const ProfileInner = ({ size, avatar, address, ensName }: Props) => (
  <>
    <Avatar label="profile-avatar" src={avatar} />
    <ProfileInnerContainer size={size}>
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
}: Props) => {
  const [isOpen, setIsOpen] = React.useState(false)

  if (dropdownItems) {
    return (
      <Dropdown
        {...{ items: dropdownItems, isOpen, setIsOpen, align: alignDropdown }}
      >
        <Container
          {...{
            size,
            hasChevron: true,
            open: isOpen,
          }}
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
        size,
        open: isOpen,
      }}
      data-testid="profile"
    >
      <ProfileInner {...{ size, avatar, address, ensName }} />
    </Container>
  )
}
