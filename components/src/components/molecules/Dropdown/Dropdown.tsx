import * as React from 'react'

import * as styles from './styles.css'

import { Box, BoxProps, Button, IconDownIndicator } from '../..'
import { Props as ButtonProps } from '@/src/components/atoms/Button'

export type DropdownItem = {
  label: string
  onClick(): void
  color?: BoxProps['color']
  disabled?: boolean
}

type DropdownMenuProps = {
  items: DropdownItem[]
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  width?: string
  inner: boolean
  align: 'left' | 'right'
  shortThrow: boolean
  keepMenuOnTop: boolean
}

const DropdownMenu = ({
  items,
  setIsOpen,
  isOpen,
  width,
  inner,
  align,
  shortThrow,
  keepMenuOnTop,
}: DropdownMenuProps) => {
  return (
    <Box
      className={styles.variants({ opened: isOpen, inner, align, shortThrow })}
      style={{
        width:
          inner || (width && parseInt(width) > 100) ? `${width}px` : '150px',
        zIndex: keepMenuOnTop ? 100 : undefined,
      }}
    >
      {items.map(({ label, color, disabled, onClick }: DropdownItem) => (
        <Box
          as="button"
          className={styles.menuButton({ inner, hasColor: !!color })}
          color={color}
          disabled={disabled}
          key={label}
          onClick={() => Promise.resolve(setIsOpen(false)).then(onClick)}
        >
          {label}
        </Box>
      ))}
    </Box>
  )
}

type Props = {
  children?: React.ReactNode
  buttonProps?: ButtonProps
  inner?: boolean
  chevron?: boolean
  align?: 'left' | 'right'
  shortThrow?: boolean
  keepMenuOnTop?: boolean
  items: DropdownItem[]
  size?: styles.Size
  label?: string
}

export const Dropdown = ({
  children,
  buttonProps,
  items = [],
  inner = false,
  chevron = true,
  align = 'left',
  shortThrow = false,
  keepMenuOnTop = false,
  size = 'medium',
  label,
}: Props) => {
  const dropdownRef = React.useRef<any>()

  const [isOpen, setIsOpen] = React.useState(false)

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
  }, [dropdownRef, isOpen])

  return (
    <Box
      data-testid="dropdown"
      maxWidth="max"
      position="relative"
      ref={dropdownRef}
    >
      {!children && inner && (
        <Box
          as="button"
          className={styles.innerMenuButton({ open: isOpen, size })}
          zIndex="10"
          onClick={() => setIsOpen(!isOpen)}
        >
          {label}
          {chevron && (
            <IconDownIndicator
              className={styles.chevron({ open: isOpen })}
              size="3"
            />
          )}
        </Box>
      )}

      {!children && !inner && (
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
          {label}
        </Button>
      )}

      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...buttonProps,
            zindex: 10,
            onClick: () => setIsOpen(!isOpen),
          })
        }
      })}

      <DropdownMenu
        width={
          dropdownRef.current &&
          dropdownRef.current.getBoundingClientRect().width.toFixed(2)
        }
        {...{
          align,
          inner,
          isOpen,
          items,
          setIsOpen,
          shortThrow,
          keepMenuOnTop,
        }}
      />
    </Box>
  )
}

Dropdown.displayName = 'Dropdown'
