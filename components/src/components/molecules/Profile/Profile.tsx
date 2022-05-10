import * as React from 'react'
import styled from 'styled-components'

import { shortenAddress } from '../../../utils/utils'

import { Typography } from '../..'
import { Avatar, Props as AvatarProps } from '../../atoms/Avatar'
import { Dropdown, DropdownItem } from '../Dropdown/Dropdown'
import { ReactComponent as IconDownIndicatorSvg } from '@/src/icons/DownIndicator.svg'

type Size = 'small' | 'medium' | 'large'

type BaseProps = {
  avatar?: AvatarProps['src']
  avatarAs?: AvatarProps['as']
  dropdownItems?: DropdownItem[]
  address: string
  ensName?: string
  alignDropdown?: 'left' | 'right'
  size?: Size
}

interface ContainerProps {
  size: Size
  hasChevron?: boolean
  open: boolean
}

const Container = styled.div<ContainerProps>`
  ${({ theme }) => `
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-radius: ${theme.radii['full']};
    transition-duration: ${theme.transitionDuration['150']};
    transition-property: color, border-color, background-color, transform, filter,
      box-shadow;
    transition-timing-function: ${theme.transitionTimingFunction['inOut']};
    position: relative;
    z-index: 10;
    padding: ${theme.space['2']} ${theme.space['4']} ${theme.space['2']}
      ${theme.space['2.5']};
    box-shadow: ${theme.shadows['0.25']};
    color: ${theme.colors.foregroundSecondary};
    background-color: ${theme.colors.groupBackground};
  `}

  ${({ hasChevron }) =>
    hasChevron &&
    `
      cursor: pointer;
      &:hover {
        transform: translateY(-1px);
        filter: brightness(1.05);
      }
  `}

  ${({ open, theme }) =>
    open &&
    `
      box-shadow: ${theme.shadows['0']};
      background-color: ${theme.colors.foregroundSecondary};
  `}

  ${({ size, theme }) => {
    switch (size) {
      case 'small':
        return `
          max-width: ${theme.space['48']};
        `
      case 'medium':
        return `
          max-width: ${theme.space['52']};
        `
      case 'large':
        return `
          max-width: ${theme.space['80']};
        `
      default:
        return ``
    }
  }}

  ${({ size, hasChevron, theme }) => {
    if (size === 'small' && hasChevron)
      return `
      max-width: ${theme.space['52']};
    `

    if (size === 'medium' && hasChevron)
      return `
      max-width: ${theme.space['56']};
    `

    if (size === 'large' && hasChevron)
      return `
      max-width: calc(${theme.space['80']} + ${theme.space['4']});
    `
  }}
`

const Chevron = styled.svg<{ $open: boolean }>`
  ${({ theme }) => `
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
  `}

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
  ${({ theme, size }) => `
  display: ${size === 'small' ? 'none' : 'block'};
  margin: 0 ${theme.space['1.5']};
  min-width: ${theme.space['none']};
  `}
`

const ReducedLineText = styled(Typography)`
  line-height: initial;
`

const ProfileInner = ({ size, avatar, avatarAs, address, ensName }: Props) => (
  <>
    <Avatar
      as={avatarAs}
      label="profile-avatar"
      placeholder={!avatar}
      src={avatar}
    />
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
      <ProfileInner {...{ size, avatar, avatarAs, address, ensName }} />
    </Container>
  )
}
