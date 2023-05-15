import * as React from 'react'
import styled, { DefaultTheme, css, useTheme } from 'styled-components'
import { P, match } from 'ts-pattern'
import { debounce } from 'lodash'

import { TransitionState } from 'react-transition-state'

import { Button, ButtonProps } from '@/src/components/atoms/Button'
import { Colors, breakpoints } from '@/src/tokens'

import { DownChevronSVG, DynamicPopover, ScrollBox } from '../..'
import { ActionSheet } from './ActionSheet'

type Align = 'left' | 'right'
type LabelAlign = 'flex-start' | 'flex-end' | 'center'
type Direction = 'down' | 'up'

export type DropdownItemObject = {
  label: string
  onClick?: (value?: string) => void
  wrapper?: (children: React.ReactNode, key: React.Key) => JSX.Element
  as?: 'button' | 'a'
  icon?: React.ReactNode
  value?: string
  color?: Colors
  disabled?: boolean
  showIndicator?: boolean | Colors
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
  /** The width of the dropdown menu on mobile, in px */
  mobileWidth?: string | number
  /** The height of the dropdown menu. If specified, dropdown will be scrollable */
  height?: string | number
  /** The colour of the indicator */
  indicatorColor?: Colors
  /** If true, displays an action sheet when in mobile */
  responsive?: boolean
  /** The label for the cancel button when showing an action sheet */
  cancelLabel?: string
} & NativeDivProps

type PropsWithIsOpen = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type PropsWithoutIsOpen = {
  isOpen?: never
  setIsOpen?: never
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
  height?: string | number
} & NativeDivProps

type DropdownMenuContainerProps = {
  $shortThrow: boolean
  $direction: Direction
  $state?: TransitionState
}

type DropdownMenuInnerProps = {
  $labelAlign?: LabelAlign
}

const DropdownMenuContainer = styled.div<DropdownMenuContainerProps>(
  ({ theme, $shortThrow, $direction, $state }) => css`
  padding: ${theme.space['1.5']};
  width: 100%;

  ${
    $direction === 'up' &&
    css`
      bottom: 100%;
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

const dropdownInnerStyles = ({
  theme,
  $labelAlign,
}: DropdownMenuInnerProps & { theme: DefaultTheme }) => css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${theme.space['1']};
  width: 100%;

  ${$labelAlign &&
  css`
    & > * {
      justify-content: ${$labelAlign};
    }
  `}
`

const DropdownMenuInner =
  styled.div<DropdownMenuInnerProps>(dropdownInnerStyles)

const StyledScrollBox = styled(ScrollBox)<DropdownMenuInnerProps>(
  dropdownInnerStyles,
  ({ theme }) => css`
    padding-right: ${theme.space['1']};
  `,
)

interface MenuButtonProps {
  $color?: Colors
  $showIndicator?: boolean | Colors
}

const MenuButton = styled.button<MenuButtonProps>(
  ({ theme, $color, disabled, $showIndicator }) => css`
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
      min-width: ${theme.space['4']};
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

    ${$showIndicator &&
    css`
      position: relative;
      padding-right: ${theme.space['6']};
      &::after {
        position: absolute;
        content: '';
        top: 50%;
        right: ${theme.space['3']};
        transform: translateY(-50%);
        width: ${theme.space['2']};
        height: ${theme.space['2']};
        border-radius: ${theme.radii.full};
        background: ${theme.colors[
          typeof $showIndicator === 'boolean' ? 'accent' : $showIndicator
        ]};
      }
    `}
  `,
)

const DropdownChild: React.FC<{
  setIsOpen: (isOpen: boolean) => void
  item: React.ReactElement<React.PropsWithRef<any>>
}> = ({ setIsOpen, item }) => {
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
      shortThrow,
      labelAlign,
      direction,
      state,
      height,
      ...props
    },
    ref,
  ) => {
    const Content = items.map((item: DropdownItem) => {
      if (React.isValidElement(item)) {
        return DropdownChild({ item, setIsOpen })
      }
      const {
        color,
        value,
        icon,
        label,
        onClick,
        disabled,
        as,
        wrapper,
        showIndicator,
      } = item as DropdownItemObject

      const props: React.ComponentProps<any> = {
        $hasColor: !!color,
        $color: color,
        $showIndicator: showIndicator,
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
        return wrapper(<MenuButton {...props} type="button" />, value || label)
      }

      return <MenuButton {...props} key={value || label} type="button" />
    })

    const menuProps = React.useMemo(
      () => ({
        $shortThrow: shortThrow,
        $direction: direction,
        $state: state,
        ...props,
        'data-testid': 'dropdown-menu',
        ref,
      }),
      [shortThrow, direction, state, props, ref],
    )

    if (height) {
      return (
        <DropdownMenuContainer {...menuProps}>
          <StyledScrollBox $labelAlign={labelAlign} style={{ height }}>
            {Content}
          </StyledScrollBox>
        </DropdownMenuContainer>
      )
    }

    return (
      <DropdownMenuContainer {...menuProps}>
        <DropdownMenuInner $labelAlign={labelAlign}>
          {Content}
        </DropdownMenuInner>
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

interface DropdownButtonProps {
  children?: React.ReactNode
  buttonRef: React.RefObject<HTMLButtonElement>
  chevron: boolean
  direction: Direction
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  label: React.ReactNode
  items: DropdownItem[]
  buttonProps?: ButtonProps
  indicatorColor?: Colors
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
  children,
  buttonRef,
  chevron,
  direction,
  isOpen,
  setIsOpen,
  label,
  items,
  buttonProps,
  indicatorColor,
}): React.ReactElement<DropdownButtonProps> => {
  const { colors } = useTheme()
  const hasIndicator = React.useMemo(
    () => items.some((item) => 'showIndicator' in item && item.showIndicator),
    [items],
  )
  const buttonPropsWithIndicator = React.useMemo(
    () => ({
      ...buttonProps,
      'data-indicator': hasIndicator && !isOpen,
      style: {
        ...buttonProps?.style,
        '--indicator-color': indicatorColor
          ? colors[indicatorColor]
          : colors.accent,
      },
      className: `${buttonProps?.className} indicator-container`,
    }),
    [buttonProps, hasIndicator, indicatorColor, colors, isOpen],
  )

  return (
    <>
      {children ? (
        React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return null
          return React.cloneElement(child as any, {
            ...buttonPropsWithIndicator,
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
          {...buttonPropsWithIndicator}
        >
          {label}
        </Button>
      )}
    </>
  )
}

const useScreenSize = () => {
  const [screenSize, setScreenSize] = React.useState(window.innerWidth)
  React.useEffect(() => {
    const debouncedHandleResize = debounce(() => {
      setScreenSize(window.innerWidth)
    }, 100)
    const handleResize = () => {
      debouncedHandleResize()
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return screenSize
}

const useClickOutside = (
  dropdownRef: React.MutableRefObject<any>,
  buttonRef: React.MutableRefObject<any>,
  actionSheetRef: React.MutableRefObject<any>,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  isOpen: boolean,
) => {
  React.useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (
        !dropdownRef.current?.contains(e.target) &&
        !buttonRef.current?.contains(e.target) &&
        !actionSheetRef.current?.contains(e.target)
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
  }, [dropdownRef, isOpen, setIsOpen, buttonRef, actionSheetRef])
}

export const Dropdown = ({
  children,
  buttonProps,
  items = [],
  chevron = true,
  align = 'left',
  menuLabelAlign,
  width = 150,
  mobileWidth = width,
  shortThrow = false,
  keepMenuOnTop = false,
  label,
  direction = 'down',
  isOpen: _isOpen,
  setIsOpen: _setIsOpen,
  indicatorColor,
  responsive = true,
  cancelLabel = 'Cancel',
  ...props
}: Props & (PropsWithIsOpen | PropsWithoutIsOpen)) => {
  const dropdownRef = React.useRef<any>()
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const actionSheetRef = React.useRef<HTMLDivElement>(null)
  const internalOpen = React.useState(false)
  const [isOpen, setIsOpen] = _setIsOpen ? [_isOpen, _setIsOpen] : internalOpen

  useClickOutside(dropdownRef, buttonRef, actionSheetRef, setIsOpen, isOpen)
  const screenSize = useScreenSize()

  return (
    <>
      <DropdownButton
        {...{
          children,
          buttonRef,
          chevron,
          direction,
          isOpen,
          setIsOpen,
          label,
          items,
          buttonProps,
          indicatorColor,
        }}
      />
      {match({ responsive, screenSize })
        .with(
          { responsive: false, screenSize: P._ },
          {
            responsive: true,
            screenSize: P.when((screenSize) => screenSize >= breakpoints.sm),
          },
          () => (
            <DynamicPopover
              additionalGap={-10}
              align={align === 'left' ? 'start' : 'end'}
              anchorRef={buttonRef}
              hideOverflow={!keepMenuOnTop}
              isOpen={isOpen}
              mobilePlacement={direction === 'down' ? 'bottom' : 'top'}
              mobileWidth={mobileWidth}
              placement={direction === 'down' ? 'bottom' : 'top'}
              popover={
                <DropdownMenu
                  direction={direction}
                  items={items}
                  labelAlign={menuLabelAlign}
                  setIsOpen={setIsOpen}
                  shortThrow={shortThrow}
                  {...props}
                  ref={dropdownRef}
                />
              }
              width={width}
            />
          ),
        )
        .with(
          {
            responsive: true,
            screenSize: P.when((screenSize) => screenSize < breakpoints.sm),
          },
          () => (
            <ActionSheet
              {...{
                isOpen,
                screenSize,
                items,
                setIsOpen,
                DropdownChild,
                cancelLabel,
                ref: actionSheetRef,
              }}
            />
          ),
        )
        .otherwise(() => (
          <div />
        ))}
    </>
  )
}

Dropdown.displayName = 'Dropdown'
