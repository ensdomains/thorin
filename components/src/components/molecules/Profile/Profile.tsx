import * as React from 'react'

import * as styles from './styles.css'
import { shortenAddress } from '../../../utils'

import { Box, IconDownIndicator, Typography } from '../..'
import { Avatar, Props as AvatarProps } from '../../atoms/Avatar'
import { Dropdown, DropdownItem } from '../Dropdown/Dropdown'

type BaseProps = {
  avatar?: AvatarProps['src']
  avatarAs?: AvatarProps['as']
  dropdownItems?: DropdownItem[]
  address: string
  ensName?: string
} & styles.Variants

type Props = BaseProps

export const Profile = ({
  size = 'medium',
  avatar,
  avatarAs,
  dropdownItems,
  address,
  ensName,
}: Props) => {
  const [isOpen, setIsOpen] = React.useState(false)

  if (dropdownItems) {
    return (
      <Dropdown {...{ items: dropdownItems, isOpen, setIsOpen }}>
        <Box
          className={styles.variants({ size, hasChevron: true, open: isOpen })}
          onClick={() => setIsOpen(!isOpen)}
        >
          <ProfileInner {...{ size, avatar, avatarAs, address, ensName }} />
          <IconDownIndicator
            className={styles.chevron({ open: isOpen })}
            size="3"
          />
        </Box>
      </Dropdown>
    )
  }

  return (
    <Box className={styles.variants({ size, open: false })}>
      <ProfileInner {...{ size, avatar, avatarAs, address, ensName }} />
    </Box>
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
    <Box marginX="1.5" minWidth="none">
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
    </Box>
  </React.Fragment>
)
