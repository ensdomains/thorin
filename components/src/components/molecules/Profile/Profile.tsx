import * as React from 'react'
import styled from 'styled-components'

import { tokens } from '@/src/tokens'
import { shortenAddress } from '../../../utils/utils'

import { Typography } from '../..'
import { Avatar, Props as AvatarProps } from '../../atoms/Avatar'
import { Dropdown, DropdownItem } from '../Dropdown/Dropdown'
import IconDownIndicatorSvg from '@/src/components/atoms/icons/DownIndicator.svg'
import Svg from '@/src/components/atoms/Svg/Svg'

type Size = 'small' | 'medium' | 'large'

type BaseProps = {
  avatar?: AvatarProps['src']
  avatarAs?: AvatarProps['as']
  dropdownItems?: DropdownItem[]
  address: string
  ensName?: string
  alignDropdown?: 'left' | 'right'
  size: Size
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
  transition-property: colors;
  transition-timing-function: ${tokens.transitionTimingFunction['inOut']};
  position: relative;
  z-index: 10;
  padding: ${tokens.space['2']} ${tokens.space['4']} ${tokens.space['2']}
    ${tokens.space['2.5']};

  ${(p) =>
    p.hasChevron &&
    `
      cursor: pointer;
      &:hover {
        transform: translateY(-1px);s
        filter: brightness(1.05);
      }
  `}

  ${(p) =>
    p.open
      ? `
      box-shadow: ${tokens.shadows['0']};
      background-color: ${tokens.colors[p.theme.mode].foregroundSecondary};
  `
      : `
      box-shadow: ${tokens.shadows['0.25']};
      color: ${tokens.colors[p.theme.mode].foregroundSecondary};
      background-color: ${tokens.colors[p.theme.mode].groupBackground};
  `}

  ${(p) => {
    switch (p.size) {
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

const Chevron = styled(Svg)<{ open: boolean }>`
  margin-left: ${tokens.space['1']};
  width: ${tokens.space['3']};
  margin-right: ${tokens.space['0.5']};
  transition-duration: ${tokens.transitionDuration['200']};
  transition-property: all;
  transition-timing-function: ${tokens.transitionTimingFunction['inOut']};
  opacity: 0.3;
  transform: rotate(0deg);

  ${(p) =>
    p.open &&
    `
      opacity: 1;
      transform: rotate(180deg);
  `}
`

const ProfileInnerContainer = styled.div<{
  size?: 'small' | 'medium' | 'large'
}>`
  display: ${(p) => (p.size === 'small' ? 'none' : 'block')};
  margin-left: 0 ${tokens.space['1.5']};
  min-width: ${tokens.space['none']};
`

type Props = BaseProps

export const Profile = ({
  size = 'medium',
  avatar,
  avatarAs,
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
          <ProfileInner {...{ size, avatar, avatarAs, address, ensName }} />
          <Chevron open={isOpen} size="3" svg={IconDownIndicatorSvg} />
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
      <ProfileInner {...{ size, avatar, avatarAs, address, ensName }} />
    </Container>
  )
}

const ProfileInner = ({ size, avatar, avatarAs, address, ensName }: Props) => (
  <React.Fragment>
    <Avatar
      as={avatarAs}
      label="profile-avatar"
      placeholder={!avatar}
      src={avatar}
    />
    <ProfileInnerContainer size={size}>
      <Typography
        as="h3"
        color={ensName ? 'text' : 'textTertiary'}
        ellipsis
        size={ensName && size === 'large' ? 'extraLarge' : 'large'}
      >
        {ensName || 'No name set'}
      </Typography>
      <Typography
        as="h4"
        color={ensName ? 'textTertiary' : 'text'}
        size="small"
      >
        {shortenAddress(
          address,
          size === 'large' ? 30 : 10,
          size === 'large' ? 10 : 5,
          size === 'large' ? 10 : 5,
        )}
      </Typography>
    </ProfileInnerContainer>
  </React.Fragment>
)
