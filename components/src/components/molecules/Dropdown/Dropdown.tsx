import * as React from 'react'
import styled from 'styled-components'

import { Button } from '../..'
import { Props as ButtonProps } from '@/src/components/atoms/Button'
import { Colors, tokens } from '@/src/tokens'
import { ReactComponent as IconDownIndicatorSvg } from '@/src/icons/DownIndicator.svg'

type DropdownItemObject = {
  label: string
  onClick(): void
  color?: Colors
  disabled?: boolean
}

export type DropdownItem = DropdownItemObject | React.ReactNode

interface DropdownMenuContainer {
  opened: boolean
  inner: boolean
  shortThrow: boolean
  align: 'left' | 'right'
  labelAlign?: 'flex-start' | 'flex-end' | 'center'
}

const DropdownMenuContainer = styled.div<DropdownMenuContainer>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: ${tokens.radii['medium']};
  position: absolute;

  ${({ labelAlign }) =>
    labelAlign &&
    `
    & > button {
      justify-content: ${labelAlign};
    }
  `}

  ${({ opened }) =>
    opened
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
    padding: ${tokens.space['1.5']};
    background-color: ${tokens.colors[theme.mode].groupBackground};
    box-shadow: ${tokens.boxShadows[theme.mode]['0.02']};
    border-radius: ${tokens.radii['2xLarge']};
  `}

  ${({ theme, inner }) =>
    inner &&
    `
    background-color: ${tokens.colors[theme.mode].grey};
    border-radius: ${tokens.radii.almostExtraLarge};
    border-top-radius: none;
    box-shadow: 0;
    border-width: ${tokens.space['px']};
    border-top-width: 0;
    border-color: ${tokens.colors[theme.mode].borderSecondary};
    padding: 0 ${tokens.space['1.5']};
    padding-top: ${tokens.space['2.5']};
    padding-bottom: ${tokens.space['1.5']};
    margin-top: -${tokens.space['2.5']};
    transition: 0.35s all cubic-bezier(1, 0, 0.22, 1.6);
  `}

  ${({ opened, inner }) => {
    if (opened && !inner)
      return `
      z-index: 20;
      margin-top: ${tokens.space['1.5']};
      transition: all 0.3s cubic-bezier(1, 0, 0.22, 1.6), width 0s linear, z-index 0s linear 0.3s;
    `

    if (!opened && !inner)
      return `
      transition: all 0.3s cubic-bezier(1, 0, 0.22, 1.6), width 0s linear, z-index 0s linear 0s;
      `

    if (opened && inner)
      return `
        transition: all 0.35s cubic-bezier(1, 0, 0.22, 1.6), width 0s linear, z-index 0s linear 0.35s;
      `

    if (!opened && inner)
      return `
        transition: all 0.35s cubic-bezier(1, 0, 0.22, 1.6), width 0s linear, z-index 0s linear 0s;
      `
  }}

  ${({ opened, shortThrow }) => {
    if (!opened && shortThrow)
      return `
      margin-top: -${tokens.space['2.5']};
    `

    if (!opened && !shortThrow)
      return `
      margin-top: -${tokens.space['12']};
    `
  }}

  ${({ align }) =>
    align === 'left'
      ? `
    left: 0;
  `
      : `
    right: 0;
  `}
`

interface MenuButtonProps {
  inner: boolean
  hasColor: boolean
  color?: Colors
}

const MenuButton = styled.button<MenuButtonProps>`
  align-items: center;
  cursor: pointer;
  display: flex;
  gap: ${tokens.space['4']};
  width: ${tokens.space['full']};
  height: ${tokens.space['12']};
  padding: ${tokens.space['3']};
  font-weight: ${tokens.fontWeights['semiBold']};
  transition-duration: 0.15s;
  transition-property: color, transform, filter;
  transition-timing-function: ease-in-out;
  letter-spacing: -0.01em;

  &:active {
    transform: translateY(0px);
    filter: brightness(1);
  }

  ${({ theme, color }) => `
    color: ${tokens.colors[theme.mode][color || 'accent']};
  
    &:disabled {
      color: ${tokens.colors[theme.mode].textTertiary}
    }
  `}

  ${({ theme, inner }) => {
    if (inner)
      return `
      justify-content: center;
    
      &:hover {
        color: ${tokens.colors[theme.mode].accent};
      }
    `

    if (!inner)
      return `
      justify-content: flex-start;
      
      &:hover {
        transform: translateY(-1px);
        filter: brightness(1.05);
      }
    `
  }}

  ${({ theme, inner, hasColor }) => {
    if (inner && !hasColor)
      return `
      color: ${tokens.colors[theme.mode].textSecondary};  
    `
  }}
`

type DropdownMenuProps = {
  items: DropdownItem[]
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  width?: string
  inner: boolean
  align: 'left' | 'right'
  shortThrow: boolean
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
      {...{ opened: isOpen, inner, align, shortThrow, labelAlign }}
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
            {...{ inner, hasColor: !!color, color, disabled }}
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
  size: 'small' | 'medium'
  open: boolean
}

const InnerMenuButton = styled.button<InnerMenuButton>`
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${tokens.space['4']};
  border-width: ${tokens.space['px']};
  font-weight: ${tokens.fontWeights['semiBold']};
  cursor: pointer;
  position: relative;

  ${({ theme }) => `
    border-color: ${tokens.colors[theme.mode].borderSecondary};
  `}

  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          padding: ${tokens.space['0.5']} ${tokens.space['0.25']};
        `
      case 'medium':
        return `
          padding: ${tokens.space['2.5']} ${tokens.space['3.5']};
        `
      default:
        return ``
    }
  }}

  ${({ theme, open }) => {
    if (open)
      return `
      border-top-left-radius: ${tokens.radii['almostExtraLarge']};
      border-top-right-radius: ${tokens.radii['almostExtraLarge']};
      border-bottom-left-radius: none;
      border-bottom-right-radius: none;
      border-bottom-width: 0;
      background-color: ${tokens.colors[theme.mode].grey};
      color: ${tokens.colors[theme.mode].textTertiary};
      transition: 0.35s all cubic-bezier(1, 0, 0.22, 1.6), 0.3s color ease-in-out, 0.2s border-radius ease-in-out, 0s border-width 0.1s, 0s padding linear;
      
      &:hover {
        color: ${tokens.colors[theme.mode].accent};
      }
      `
    if (!open)
      return `
      background-color: ${tokens.colors[theme.mode].background};
      color: ${tokens.colors[theme.mode].textSecondary};
      border-radius: ${tokens.radii['almostExtraLarge']};
      box-shadow: ${tokens.boxShadows[theme.mode]['0.02']};
      transition: 0.35s all cubic-bezier(1, 0, 0.22, 1.6), 0.15s color ease-in-out, 0s border-width 0.15s, 0.15s border-color ease-in-out, 0s padding linear;
      
      &:hover {
        border-color: ${tokens.colors[theme.mode].border};
      }
      `
  }}
`

const Chevron = styled(IconDownIndicatorSvg)<{ open: boolean }>`
  margin-left: ${tokens.space['1']};
  width: ${tokens.space['3']};
  margin-right: ${tokens.space['0.5']};
  transition-duration: ${tokens.transitionDuration['200']};
  transition-property: all;
  transition-timing-function: ${tokens.transitionTimingFunction['inOut']};
  opacity: 0.3;
  transform: rotate(0deg);
  display: flex;

  & > svg {
    fill: currentColor;
  }
  fill: currentColor;

  ${({ open }) =>
    open &&
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
      style={{ maxWidth: tokens.space.max, position: 'relative' }}
    >
      {!children && inner && (
        <InnerMenuButton
          {...{ open: isOpen, size }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {label}
          {chevron && <Chevron open={isOpen} />}
        </InnerMenuButton>
      )}

      {!children && !inner && (
        <ButtonWrapper>
          <Button
            {...buttonProps}
            pressed={isOpen}
            suffix={chevron && <Chevron open={isOpen} />}
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
