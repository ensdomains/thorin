import * as React from 'react'
import styled, { css } from 'styled-components'

import { TransitionState } from 'react-transition-state'

import { Button, ButtonProps } from '@/src/components/atoms/Button'
import { Colors } from '@/src/tokens'

import { DownChevronSVG, DynamicPopover } from '../..'

type Align = 'left' | 'right'
type LabelAlign = 'flex-start' | 'flex-end' | 'center'
type Direction = 'down' | 'up'

type DropdownItemObject = {
  label: string
  onClick?: (value?: string) => void
  wrapper?: (children: React.ReactNode, key: React.Key) => JSX.Element
  as?: 'button' | 'a'
  icon?: React.ReactNode
  value?: string
  color?: Colors
  disabled?: boolean
}

export type DropdownItem =
  | DropdownItemObject
  | React.ReactElement<React.PropsWithRef<any>>

type Props = {
  /** An optional custom dropdown button */
  children?: React.ReactNode
  /** The props passed to the button for the dropdown */
  buttonProps?: ButtonProps
  /** A chevron in the button */
  chevron?: boolean
  /** The alignment of the dropdown relative to the button */
  align?: Align
  /** If true, decreases the distance of the dropdown animation. */
  shortThrow?: boolean
  /** If true, the dropdown will stay above the button when open */
  keepMenuOnTop?: boolean
  /** An array of objects conforming to the DropdownItem interface. */
  items: DropdownItem[]
  /** The label of the dropdown button */
  label?: React.ReactNode
  /** The alignment of the menu button labels */
  menuLabelAlign?: LabelAlign
  /** If defined, dropdown is controlled externally */
  isOpen?: boolean
  /** The direction that the dropdown menu will open from */
  direction?: Direction
  /** The width of the dropdown menu, in px */
  width?: string | number
} & NativeDivProps

type PropsWithIsOpen = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type PropsWithoutIsOpen = {
  isOpen?: never
  setIsOpen?: never
}

type DropdownMenuContainer = {
  $shortThrow: boolean
  $labelAlign?: LabelAlign
  $direction: Direction
  $state?: TransitionState
}

type NativeDivProps = React.HTMLAttributes<HTMLDivElement>

type DropdownMenuProps = {
  items: DropdownItem[]
  setIsOpen: (isOpen: boolean) => void
  width?: number | string
  shortThrow: boolean
  labelAlign?: LabelAlign
  direction: Direction
  state?: TransitionState
} & NativeDivProps

const DropdownMenuContainer = styled.div<DropdownMenuContainer>(
  ({ theme, $shortThrow, $labelAlign, $direction, $state }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${theme.space['1']};

    ${
      $direction === 'up' &&
      css`
        bottom: 100%;
      `
    }

    ${
      $labelAlign &&
      css`
        & > button {
          justify-content: ${$labelAlign};
        }
      `
    }

    z-index: 0;
    opacity: 0;

    ${
      $state === 'entered' &&
      css`
        z-index: 1;
      `
    }

    padding: ${theme.space['1.5']};
    background-color: ${theme.colors.background};
    border-radius: ${theme.radii['2xLarge']};

    border: 1px solid ${theme.colors.border};
    transition: all 0.35s cubic-bezier(1, 0, 0.22, 1.6);
    margin-${$direction === 'down' ? 'top' : 'bottom'}: ${theme.space['1.5']};

    transform: translateY(calc(${$direction === 'down' ? '-1' : '1'} * ${
    theme.space['12']
  }));

    ${
      $shortThrow &&
      css`
        transform: translateY(
          calc(${$direction === 'down' ? '-1' : '1'} * ${theme.space['2.5']})
        );
      `
    }

    ${
      ($state === 'entering' || $state === 'entered') &&
      css`
        transform: translateY(0);
        opacity: 1;
      `
    }
  `,
)

interface MenuButtonProps {
  $color?: Colors
}

const MenuButton = styled.button<MenuButtonProps>(
  ({ theme, $color, disabled }) => css`
    align-items: center;
    cursor: pointer;
    display: flex;
    gap: ${theme.space['2']};
    width: ${theme.space['full']};
    height: ${theme.space['12']};
    padding: ${theme.space['3']};
    border-radius: ${theme.radii.large};
    font-weight: ${theme.fontWeights.normal};
    transition-duration: 0.15s;
    transition-property: color, transform, filter;
    transition-timing-function: ease-in-out;

    &:active {
      transform: translateY(0px);
      filter: brightness(1);
    }

    color: ${theme.colors[$color || 'textPrimary']};

    svg {
      width: ${theme.space['4']};
      height: ${theme.space['4']};
      color: ${theme.colors[$color || 'text']};
    }
    ${disabled &&
    css`
      color: ${theme.colors.textTertiary};
      cursor: not-allowed;
    `}

    justify-content: flex-start;

    &:hover {
      background: ${theme.colors.greySurface};
    }
  `,
)

const DropdownChild = ({
  setIsOpen,
  item,
}: {
  setIsOpen: (isOpen: boolean) => void
  item: React.ReactElement<React.PropsWithRef<any>>
}) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const Item = React.cloneElement(item, { ...item.props, ref })

  const handleClick = React.useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  React.useEffect(() => {
    const currentRef = ref.current
    currentRef?.addEventListener('click', handleClick)
    return () => {
      currentRef?.removeEventListener('click', handleClick)
    }
  }, [handleClick, item])

  return Item
}

const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  (
    {
      items,
      setIsOpen,
      width,
      shortThrow,
      labelAlign,
      direction,
      state,
      ...props
    },
    ref,
  ) => {
    return (
      <DropdownMenuContainer
        {...{
          $shortThrow: shortThrow,
          $labelAlign: labelAlign,
          $direction: direction,
          $state: state,
          ...props,
        }}
        data-testid="dropdown-menu"
        ref={ref}
        style={{
          width,
        }}
      >
        {items.map((item: DropdownItem) => {
          if (React.isValidElement(item)) {
            return DropdownChild({ item, setIsOpen })
          }
          const { color, value, icon, label, onClick, disabled, as, wrapper } =
            item as DropdownItemObject

          const props: React.ComponentProps<any> = {
            $hasColor: !!color,
            $color: color,
            disabled,
            onClick: () => {
              setIsOpen(false)
              onClick?.(value)
            },
            as,
            children: (
              <>
                {icon}
                {label}
              </>
            ),
          }

          if (wrapper) {
            return wrapper(
              <MenuButton {...props} type="button" />,
              value || label,
            )
          }

          return <MenuButton {...props} key={value || label} type="button" />
        })}
      </DropdownMenuContainer>
    )
  },
)

const Chevron = styled((props) => <DownChevronSVG {...props} />)<{
  $open?: boolean
  $direction: Direction
}>(
  ({ theme, $open, $direction }) => css`
    margin-left: ${theme.space['1']};
    width: ${theme.space['3']};
    margin-right: ${theme.space['0.5']};
    transition-duration: ${theme.transitionDuration['200']};
    transition-property: all;
    transition-timing-function: ${theme.transitionTimingFunction['inOut']};
    transform: rotate(${$direction === 'down' ? '0deg' : '180deg'});
    display: flex;

    & > svg {
      fill: currentColor;
    }
    fill: currentColor;

    ${$open &&
    css`
      transform: rotate(${$direction === 'down' ? '180deg' : '0deg'});
    `}
  `,
)

export const Dropdown = ({
  children,
  buttonProps,
  items = [],
  chevron = true,
  align = 'left',
  menuLabelAlign,
  width = 150,
  shortThrow = false,
  keepMenuOnTop = false,
  label,
  direction = 'down',
  isOpen: _isOpen,
  setIsOpen: _setIsOpen,
  ...props
}: Props & (PropsWithIsOpen | PropsWithoutIsOpen)) => {
  const dropdownRef = React.useRef<any>()
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const internalOpen = React.useState(false)
  const [isOpen, setIsOpen] = _setIsOpen ? [_isOpen, _setIsOpen] : internalOpen

  React.useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (
        !dropdownRef.current?.contains(e.target) &&
        !buttonRef.current?.contains(e.target)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef, isOpen, setIsOpen])

  const button: React.ReactNode = children ? (
    React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return null
      return React.cloneElement(child as any, {
        ...buttonProps,
        zindex: '10',
        pressed: isOpen ? 'true' : undefined,
        onClick: () => setIsOpen((prev) => !prev),
        ref: buttonRef,
      })
    })
  ) : (
    <Button
      data-testid="dropdown-btn"
      pressed={isOpen}
      ref={buttonRef}
      suffix={chevron && <Chevron $direction={direction} $open={isOpen} />}
      width="fit"
      onClick={() => setIsOpen((prev) => !prev)}
      {...buttonProps}
    >
      {label}
    </Button>
  )

  return (
    <>
      {button}
      <DynamicPopover
        additionalGap={-10}
        align={align === 'left' ? 'start' : 'end'}
        anchorRef={buttonRef}
        hideOverflow={!keepMenuOnTop}
        isOpen={isOpen}
        placement={direction === 'down' ? 'bottom' : 'top'}
        popover={
          <DropdownMenu
            direction={direction}
            items={items}
            labelAlign={menuLabelAlign}
            setIsOpen={setIsOpen}
            shortThrow={shortThrow}
            width={width}
            {...props}
            ref={dropdownRef}
          />
        }
        width={width}
      />
    </>
  )
}

Dropdown.displayName = 'Dropdown'
