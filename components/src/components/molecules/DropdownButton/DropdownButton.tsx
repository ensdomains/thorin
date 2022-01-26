import * as React from 'react'

import type { Props as ButtonProps } from '../../atoms/Button'
import type { DropdownProps } from '../Dropdown'
import { Dropdown } from '..'
import { Button, IconDownIndicator } from '../..'
import * as styles from './styles.css'

type Props = {
  children: React.ReactNode
  buttonProps?: Exclude<
    ButtonProps,
    'suffix' | 'zIndex' | 'onClick' | 'children'
  >
  dropdownItems: DropdownProps['items']
}

export const DropdownButton = ({
  children,
  buttonProps,
  dropdownItems,
}: Props) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Dropdown {...{ isOpen, setIsOpen, items: dropdownItems }}>
      <Button
        {...buttonProps}
        pressed={isOpen}
        suffix={
          <IconDownIndicator
            className={styles.chevron({ open: isOpen })}
            size="3"
          />
        }
        zIndex="10"
        onClick={() => setIsOpen(!isOpen)}
      >
        {children}
      </Button>
    </Dropdown>
  )
}
