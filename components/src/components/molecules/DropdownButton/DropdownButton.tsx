import * as React from 'react'

import type { Props as ButtonProps } from '../../atoms/Button'
import type { DropdownProps } from '../Dropdown'
import { Dropdown } from '..'
import { Box, Button, IconDownIndicator } from '../..'
import * as styles from './styles.css'

type Props = {
  children: React.ReactNode
  buttonProps?: Omit<ButtonProps, 'suffix' | 'zIndex' | 'onClick' | 'children'>
  dropdownItems: DropdownProps['items']
  inner?: boolean
  chevron?: boolean
  align?: 'left' | 'right'
  shortThrow?: boolean
}

export const DropdownButton = ({
  children,
  buttonProps,
  dropdownItems,
  inner = false,
  chevron = true,
  align,
  shortThrow,
}: Props) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Dropdown
      {...{ isOpen, setIsOpen, items: dropdownItems, inner, align, shortThrow }}
    >
      {inner ? (
        <Box
          as="button"
          className={styles.innerMenuButton({ open: isOpen })}
          zIndex="10"
          onClick={() => setIsOpen(!isOpen)}
        >
          {children}
          {chevron && (
            <IconDownIndicator
              className={styles.chevron({ open: isOpen })}
              size="3"
            />
          )}
        </Box>
      ) : (
        <Button
          {...buttonProps}
          pressed={isOpen}
          suffix={
            chevron && (
              <IconDownIndicator
                className={styles.chevron({ open: isOpen })}
                size="3"
              />
            )
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
