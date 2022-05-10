import * as React from 'react'
import styled from 'styled-components'

import { Button, ButtonProps } from '@/src/components/atoms/Button'
import { Colors } from '@/src/tokens'
import { ReactComponent as IconDownIndicatorSvg } from '@/src/icons/DownIndicator.svg'

type DropdownItemObject = {
  label: string
  onClick(): void
  color?: Colors
  disabled?: boolean
}

export type DropdownItem = DropdownItemObject | React.ReactNode

interface DropdownMenuContainer {
  $opened: boolean
  $inner: boolean
  $shortThrow: boolean
  $align: 'left' | 'right'
  $labelAlign?: 'flex-start' | 'flex-end' | 'center'
}

const DropdownMenuContainer = styled.div<DropdownMenuContainer>`
  ${({ theme }) => `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: ${theme.radii['medium']};
  position: absolute;
  `}

  ${({ $labelAlign }) =>
    $labelAlign &&
    `
    & > button {
      justify-content: ${$labelAlign};
    }
  `}

  ${({ $opened }) =>
    $opened
      ? `
    visibility: visible;
    opacity: 1;
  `
      : `
    z-index: 0;
    visibility: hidden;
    opacity: 0;
  `}

  ${({ theme }) => `
    padding: ${theme.space['1.5']};
    background-color: ${theme.colors.groupBackground};
    box-shadow: ${theme.boxShadows['0.02']};
    border-radius: ${theme.radii['2xLarge']};
  `}

  ${({ theme, $inner }) =>
    $inner &&
    `
    background-color: ${theme.colors.grey};
    border-radius: ${theme.radii.almostExtraLarge};
    border-top-radius: none;
    box-shadow: 0;
    border-width: ${theme.space['px']};
    border-top-width: 0;
    border-color: ${theme.colors.borderSecondary};
    padding: 0 ${theme.space['1.5']};
    padding-top: ${theme.space['2.5']};
    padding-bottom: ${theme.space['1.5']};
    margin-top: -${theme.space['2.5']};
    transition: 0.35s all cubic-bezier(1, 0, 0.22, 1.6);
  `}

  ${({ $opened, $inner, theme }) => {
    if ($opened && !$inner)
      return `
      z-index: 20;
      margin-top: ${theme.space['1.5']};
      transition: all 0.3s cubic-bezier(1, 0, 0.22, 1.6), width 0s linear, z-index 0s linear 0.3s;
    `

    if (!$opened && !$inner)
      return `
      transition: all 0.3s cubic-bezier(1, 0, 0.22, 1.6), width 0s linear, z-index 0s linear 0s;
      `

    if ($opened && $inner)
      return `
        transition: all 0.35s cubic-bezier(1, 0, 0.22, 1.6), width 0s linear, z-index 0s linear 0.35s;
      `

    if (!$opened && $inner)
      return `
        transition: all 0.35s cubic-bezier(1, 0, 0.22, 1.6), width 0s linear, z-index 0s linear 0s;
      `
  }}

  ${({ $opened, $shortThrow, theme }) => {
    if (!$opened && $shortThrow)
      return `
      margin-top: -${theme.space['2.5']};
    `

    if (!$opened && !$shortThrow)
      return `
      margin-top: -${theme.space['12']};
    `
  }}

  ${({ $align }) =>
    $align === 'left'
      ? `
    left: 0;
  `
      : `
    right: 0;
  `}
`

interface MenuButtonProps {
  $inner: boolean
  $hasColor: boolean
  $color?: Colors
}

const MenuButton = styled.button<MenuButtonProps>`
  ${({ theme }) => `
  align-items: center;
  cursor: pointer;
  display: flex;
  gap: ${theme.space['4']};
  width: ${theme.space['full']};
  height: ${theme.space['12']};
  padding: ${theme.space['3']};
  font-weight: ${theme.fontWeights['semiBold']};
  transition-duration: 0.15s;
  transition-property: color, transform, filter;
  transition-timing-function: ease-in-out;
  letter-spacing: -0.01em;

  &:active {
    transform: translateY(0px);
    filter: brightness(1);
  }
  `}

  ${({ theme, $color }) => `
    color: ${theme.colors[$color || 'accent']};
  
    &:disabled {
      color: ${theme.colors.textTertiary}
    }
  `}

  ${({ theme, $inner }) => {
    if ($inner)
      return `
      justify-content: center;
    
      &:hover {
        color: ${theme.colors.accent};
      }
    `

    if (!$inner)
      return `
      justify-content: flex-start;
      
      &:hover {
        transform: translateY(-1px);
        filter: brightness(1.05);
      }
    `
  }}

  ${({ theme, $inner, $hasColor }) => {
    if ($inner && !$hasColor)
      return `
      color: ${theme.colors.textSecondary};  
    `
  }}
`

type DropdownMenuProps = {
  /** An array of objects conforming to the DropdownItem interface. */
  items: DropdownItem[]
  /** If true, makes the menu visible. */
  isOpen: boolean
  /** A mutation function for the isOpen variable. */
  setIsOpen: (isOpen: boolean) => void
  /** Sets the width in the number of pixels. Must be at least 150. */
  width?: string
  /** If true, renders a dropdown where the button and menu are merged. */
  inner: boolean
  /** Sets which side of the button to align the dropdown menu. */
  align: 'left' | 'right'
  /** If true, decreases the distance of the dropdown animation. */
  shortThrow: boolean
  /** If true, sets the zIndex of the dropdown menu to 100. */
  keepMenuOnTop: boolean
  labelAlign?: 'flex-start' | 'flex-end' | 'center'
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
  labelAlign,
}: DropdownMenuProps) => {
  return (
    <DropdownMenuContainer
      {...{
        $opened: isOpen,
        $inner: inner,
        $align: align,
        $shortThrow: shortThrow,
        $labelAlign: labelAlign,
      }}
      style={{
        width:
          inner || (width && parseInt(width) > 100) ? `${width}px` : '150px',
        zIndex: keepMenuOnTop ? 100 : undefined,
      }}
    >
      {items.map((item: DropdownItem) => {
        if (React.isValidElement(item)) {
          return <div onClick={() => setIsOpen(false)}>{item}</div>
        }
        const { color, label, onClick, disabled } = item as DropdownItemObject
        return (
          <MenuButton
            {...{ $inner: inner, $hasColor: !!color, $color: color, disabled }}
            key={label}
            onClick={() => Promise.resolve(setIsOpen(false)).then(onClick)}
          >
            {label}
          </MenuButton>
        )
      })}
    </DropdownMenuContainer>
  )
}

interface InnerMenuButton {
  $size: 'small' | 'medium'
  $open: boolean
}

const InnerMenuButton = styled.button<InnerMenuButton>`
  ${({ theme }) => `
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.space['4']};
  border-width: ${theme.space['px']};
  font-weight: ${theme.fontWeights['semiBold']};
  cursor: pointer;
  position: relative;
  `}

  ${({ theme }) => `
    border-color: ${theme.colors.borderSecondary};
  `}

  ${({ $size, theme }) => {
    switch ($size) {
      case 'small':
        return `
          padding: ${theme.space['0.5']} ${theme.space['0.25']};
        `
      case 'medium':
        return `
          padding: ${theme.space['2.5']} ${theme.space['3.5']};
        `
      default:
        return ``
    }
  }}

  ${({ theme, $open }) => {
    if ($open)
      return `
      border-top-left-radius: ${theme.radii['almostExtraLarge']};
      border-top-right-radius: ${theme.radii['almostExtraLarge']};
      border-bottom-left-radius: none;
      border-bottom-right-radius: none;
      border-bottom-width: 0;
      background-color: ${theme.colors.grey};
      color: ${theme.colors.textTertiary};
      transition: 0.35s all cubic-bezier(1, 0, 0.22, 1.6), 0.3s color ease-in-out, 0.2s border-radius ease-in-out, 0s border-width 0.1s, 0s padding linear;
      
      &:hover {
        color: ${theme.colors.accent};
      }
      `
    if (!$open)
      return `
      background-color: ${theme.colors.background};
      color: ${theme.colors.textSecondary};
      border-radius: ${theme.radii['almostExtraLarge']};
      box-shadow: ${theme.boxShadows['0.02']};
      transition: 0.35s all cubic-bezier(1, 0, 0.22, 1.6), 0.15s color ease-in-out, 0s border-width 0.15s, 0.15s border-color ease-in-out, 0s padding linear;
      
      &:hover {
        border-color: ${theme.colors.border};
      }
      `
  }}
`

const Chevron = styled(IconDownIndicatorSvg)<{ $open: boolean }>`
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
  `}

  & > svg {
    fill: currentColor;
  }
  fill: currentColor;

  ${({ $open }) =>
    $open &&
    `
      opacity: 1;
      transform: rotate(180deg);
  `}
`

type Props = {
  children?: React.ReactNode
  buttonProps?: ButtonProps
  inner?: boolean
  chevron?: boolean
  align?: 'left' | 'right'
  shortThrow?: boolean
  keepMenuOnTop?: boolean
  items: DropdownItem[]
  size?: 'small' | 'medium'
  label?: React.ReactNode
  menuLabelAlign?: 'flex-start' | 'flex-end' | 'center'
  isOpen?: boolean
}

type PropsWithIsOpen = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type PropsWithoutIsOpen = {
  isOpen?: never
  setIsOpen?: never
}

const ButtonWrapper = styled.div`
  z-index: 10;
  position: relative;
`

export const Dropdown = ({
  children,
  buttonProps,
  items = [],
  inner = false,
  chevron = true,
  align = 'left',
  menuLabelAlign,
  shortThrow = false,
  keepMenuOnTop = false,
  size = 'medium',
  label,
  ...props
}: Props & (PropsWithIsOpen | PropsWithoutIsOpen)) => {
  const dropdownRef = React.useRef<any>()
  const [internalIsOpen, internalSetIsOpen] = React.useState(false)
  const [isOpen, setIsOpen] = props.setIsOpen
    ? [props.isOpen, props.setIsOpen]
    : [internalIsOpen, internalSetIsOpen]

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
    <div
      data-testid="dropdown"
      ref={dropdownRef}
      style={{ maxWidth: 'max-content', position: 'relative' }}
    >
      {!children && inner && (
        <InnerMenuButton
          {...{ $open: isOpen, $size: size }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {label}
          {chevron && <Chevron $open={isOpen} />}
        </InnerMenuButton>
      )}

      {!children && !inner && (
        <ButtonWrapper>
          <Button
            {...buttonProps}
            pressed={isOpen}
            suffix={chevron && <Chevron $open={isOpen} />}
            onClick={() => setIsOpen(!isOpen)}
          >
            {label}
          </Button>
        </ButtonWrapper>
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
          labelAlign: menuLabelAlign,
        }}
      />
    </div>
  )
}

Dropdown.displayName = 'Dropdown'
