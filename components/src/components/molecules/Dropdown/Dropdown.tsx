import * as React from 'react'

import * as styles from './styles.css'

import { Box, Typography } from '../..'
import { BoxProps } from '../../atoms/Box'

export type DropdownItem = {
  label: string
  onClick(): void
  color?: BoxProps['color']
  disabled?: boolean
}

type BaseProps = {
  items: DropdownItem[]
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  children: React.ReactNode
}

type DropdownMenuProps = {
  items: DropdownItem[]
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  width?: string
}

const DropdownMenu = ({
  items,
  setIsOpen,
  isOpen,
  width,
}: DropdownMenuProps) => (
  <Box
    className={styles.variants({ opened: isOpen })}
    style={{ width: width && parseInt(width) > 100 ? width : '100px' }}
  >
    {items.map(({ label, color, disabled, onClick }: DropdownItem) => (
      <Box
        as="button"
        className={styles.menuButton}
        disabled={disabled}
        key={label}
        onClick={() => Promise.resolve(setIsOpen(false)).then(onClick)}
      >
        <Typography align="left" color={color} size="inherit" weight="semiBold">
          {label}
        </Typography>
      </Box>
    ))}
  </Box>
)

export const Dropdown = ({ items, isOpen, setIsOpen, children }: BaseProps) => {
  const dropdownRef = React.useRef<any>()

  const handleClickOutside = (e: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false)
    }
  }

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropdownRef, isOpen])

  return (
    <Box maxWidth="max" position="relative" ref={dropdownRef}>
      {children}
      <DropdownMenu
        isOpen={isOpen}
        items={items}
        setIsOpen={setIsOpen}
        width={dropdownRef.current && dropdownRef.current.offsetWidth}
      />
    </Box>
  )
}

Dropdown.displayName = 'Dropdown'
