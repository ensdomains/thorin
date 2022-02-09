import * as React from 'react'

import type { Props as ButtonProps } from '../../atoms/Button'
import type { DropdownProps } from '../Dropdown'
import { Dropdown } from '..'
import { Box, Button, IconDownIndicator } from '../..'
import * as styles from './styles.css'

type Props = {
  children: React.ReactNode
  buttonProps?: Exclude<
    ButtonProps,
    'suffix' | 'zIndex' | 'onClick' | 'children'
  >
  dropdownItems: DropdownProps['items']
  inner?: boolean
}

export const DropdownButton = ({
  children,
  buttonProps,
  dropdownItems,
  inner = false,
}: Props) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Dropdown {...{ isOpen, setIsOpen, items: dropdownItems, inner }}>
      {inner ? (
        <Box
          as="button"
          className={styles.innerMenuButton({ open: isOpen })}
          zIndex="10"
          onClick={() => setIsOpen(!isOpen)}
        >
          {children}
        </Box>
      ) : (
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
      )}
    </Dropdown>
  )
}
