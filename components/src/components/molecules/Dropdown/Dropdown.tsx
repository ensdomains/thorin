import * as React from 'react'
import { P, match } from 'ts-pattern'

import type { TransitionState } from 'react-transition-state'

import type { ButtonProps } from '@/src/components/atoms/Button/Button'
import { Button } from '@/src/components/atoms/Button/Button'
import type { Colors } from '@/src/tokens'
import { breakpoints } from '@/src/tokens'

import { commonVars, modeVars } from '@/src/css/theme.css'

import type { Color } from '@/src/interfaces/withColor'

import { ActionSheet } from './ActionSheet'
import type { BoxProps } from '../../atoms/Box/Box'
import { Box } from '../../atoms/Box/Box'
import type { PopoverProps } from '../../atoms/DynamicPopover/DynamicPopover'
import { DynamicPopover } from '../../atoms/DynamicPopover/DynamicPopover'
import { debounce } from '@/src/utils/debounce'
import { DownChevronSVG } from '@/src/icons'
import { ScrollBox } from '../../atoms/ScrollBox/ScrollBox'

type Align = 'left' | 'right'
type LabelAlign = 'flex-start' | 'flex-end' | 'center'
type Direction = 'down' | 'up'

export type DropdownItemObject = {
  label: string
  onClick?: (value?: string) => void
  wrapper?: (children: React.ReactNode, key: React.Key) => JSX.Element
  icon?: React.ReactNode
  value?: string
  color?: Color
  disabled?: boolean
  showIndicator?: boolean | Colors
  href?: string
}

export type DropdownItem =
  | DropdownItemObject
  | React.ReactElement<React.PropsWithRef<any>>

export type DropdownProps = {
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
} & BoxProps

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
  state?: TransitionState['status']
  height?: string | number
} & BoxProps &
PopoverProps

type DropdownMenuContainerProps = {
  $shortThrow: boolean
  $direction: Direction
  $state?: TransitionState['status']
}

const DropdownMenuBox = React.forwardRef<
  HTMLElement,
  BoxProps & DropdownMenuContainerProps
>(({ $shortThrow, $direction, $state, ...props }, ref) => (
  <Box
    {...props}
    backgroundColor="background"
    borderColor="border"
    borderRadius="2xLarge"
    borderStyle="solid"
    borderWidth="1x"
    bottom={$direction === 'up' ? 'full' : 'unset'}
    marginBottom={$direction === 'up' ? '1.5' : 'unset'}
    marginTop={$direction === 'down' ? '1.5' : 'unset'}
    opacity={1}
    padding="1.5"
    ref={ref}
    // transform={match([$state, $direction, $shortThrow])
    //   .with([P.union('entering', 'entered'), P._, P._], () => `translateY(0)`)
    //   .with(
    //     [P._, 'up', true],
    //     () => `translateY(calc(${commonVars.space['2.5']}))`,
    //   )
    //   .with(
    //     [P._, 'down', true],
    //     () => `translateY(calc(-1 * ${commonVars.space['2.5']}))`,
    //   )
    //   .with(
    //     [P._, 'up', false],
    //     () => `translateY(calc(${commonVars.space['12']}))`,
    //   )
    //   .with(
    //     [P._, 'down', false],
    //     () => `translateY(calc(-1 * ${commonVars.space['12']}))`,
    //   )
    //   .exhaustive()}
    // transition="all .35s cubic-bezier(1, 0, 0.22, 1.6)"
    width="full"
    zIndex={1}
  />
))

interface MenuButtonProps {
  $color?: Colors
  $icon?: React.FC
  $showIndicator?: boolean | Colors
}

const MenuButton = React.forwardRef<HTMLElement, BoxProps & MenuButtonProps>(
  ({ $color, $icon, $showIndicator, disabled, children, ...props }, ref) => (
    <Box
      {...props}
      alignItems="center"
      backgroundColor={{ base: 'backgroundPrimary', hover: 'greySurface' }}
      borderRadius="large"
      // color={
      //   disabled ? 'textTertiary' : $color ? `$${$color}` : 'textPrimary'
      // }
      cursor={disabled ? 'not-allowed' : 'pointer'}
      display="flex"
      // filter={{ base: 'brightness(1)', active: 'brightness(0.9)' }}
      fontWeight="normal"
      gap="2"
      height="12"
      justifyContent="flex-start"
      padding="3"
      paddingRight={$showIndicator ? '6' : '3'}
      position="relative"
      ref={ref}
      // transform={{ base: 'translateY(0px)', active: 'translateY(0px)' }}
      transitionDuration={150}
      // transitionProperty="color, transform, filter"
      // transitionTimingFunction="ease-in-out"
      width="full"
    >
      {$icon
        ? (
            <Box
              as={$icon}
              // color={$color ? `$${$color}` : 'textPrimary'}
              flexBasis="4"
              flexGrow={0}
              flexShrink={0}
              wh="4"
            />
          )
        : null}
      {children}
      {$showIndicator && (
        <Box
          // backgroundColor={
          //   typeof $showIndicator === 'boolean'
          //     ? 'accent'
          //     : `$${$showIndicator}`
          // }
          borderRadius="full"
          position="absolute"
          right="3"
          top="1/2"
          // transform="translateY(-50%)"
          wh="2"
        />
      )}
    </Box>
  ),
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
      direction,
      state,
      height,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      placement: _placement,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      mobilePlacement: _mobilePlacement,
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
        wrapper,
        showIndicator,
        href,
      } = item as DropdownItemObject

      const props: React.ComponentProps<any> = {
        $color: color,
        $showIndicator: showIndicator,
        $icon: icon,
        disabled,
        onClick: () => {
          onClick?.(value)
          setIsOpen(false)
        },
        as: href ? 'a' : 'button',
        children: label,
        href,
      } as const

      if (wrapper) {
        return wrapper(<MenuButton {...props} type="button" />, value || label)
      }

      return <MenuButton {...props} key={value || label} type="button" />
    })

    const menuProps = React.useMemo(
      () => ({
        '$shortThrow': shortThrow,
        '$direction': direction,
        '$state': state,
        ...props,
        'data-testid': 'dropdown-menu',
        ref,
      }),
      [shortThrow, direction, state, props, ref],
    )

    if (height) {
      return (
        <DropdownMenuBox {...menuProps}>
          <ScrollBox paddingRight="1" style={{ height }}>
            {Content}
          </ScrollBox>
        </DropdownMenuBox>
      )
    }

    return (
      <DropdownMenuBox {...menuProps}>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
          gap="1"
          justifyContent="center"
          width="full"
        >
          {Content}
        </Box>
      </DropdownMenuBox>
    )
  },
)

const rotation = (direction: Direction, open: boolean) =>
  match([direction, open])
    .with(['down', false], () => 'rotate(0deg)')
    .with(['down', true], () => 'rotate(180deg)')
    .with(['up', false], () => 'rotate(180deg)')
    .with(['up', true], () => 'rotate(0deg)')
    .exhaustive()

const Chevron = ({
  $open,
  $direction,
}: { $open?: boolean, $direction: Direction } & BoxProps) => (
  <Box
    as={DownChevronSVG}
    // fill="currentColor"
    marginLeft="1"
    marginRight="0.5"
    // transform={rotation($direction, !!$open)}
    // transitionDuration="200"
    transitionProperty="all"
    transitionTimingFunction="inOut"
    width="3"
  />
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
  const hasIndicator = React.useMemo(
    () => items.some(item => 'showIndicator' in item && item.showIndicator),
    [items],
  )
  const buttonPropsWithIndicator = React.useMemo(
    () => ({
      ...buttonProps,
      'data-indicator': hasIndicator && !isOpen,
      'style': {
        ...buttonProps?.style,
        '--indicator-color':
          modeVars.color[`$${indicatorColor}` as keyof typeof modeVars.color]
          || modeVars.color.accent,
      },
      'className': `${buttonProps?.className} indicator-container`,
    }),
    [buttonProps, hasIndicator, indicatorColor, isOpen],
  )

  return (
    <>
      {children
        ? (
            React.Children.map(children, (child) => {
              if (!React.isValidElement(child)) return null
              return React.cloneElement(child as any, {
                ...buttonPropsWithIndicator,
                zindex: '10',
                pressed: isOpen ? 'true' : undefined,
                onClick: () => setIsOpen(prev => !prev),
                ref: buttonRef,
              })
            })
          )
        : (
            <Button
              data-testid="dropdown-btn"
              pressed={isOpen}
              ref={buttonRef}
              suffix={chevron && <Chevron $direction={direction} $open={isOpen} />}
              width="fit"
              onClick={() => setIsOpen(prev => !prev)}
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
  dropdownRef: React.MutableRefObject<HTMLElement | null>,
  buttonRef: React.MutableRefObject<HTMLButtonElement | null>,
  actionSheetRef: React.MutableRefObject<HTMLDivElement | null>,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  isOpen: boolean,
) => {
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !dropdownRef.current?.contains(e.target as Node)
        && !buttonRef.current?.contains(e.target as Node)
        && !actionSheetRef.current?.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef, isOpen, setIsOpen, buttonRef, actionSheetRef])
}

export const Dropdown: React.FC<DropdownProps & (PropsWithIsOpen | PropsWithoutIsOpen)> = ({
  children,
  buttonProps,
  // eslint-disable-next-line @eslint-react/no-unstable-default-props
  items = [],
  chevron = true,
  align = 'left',
  // menuLabelAlign,
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
}) => {
  const dropdownRef = React.useRef<HTMLDivElement | null>(null)
  const buttonRef = React.useRef<HTMLButtonElement | null>(null)
  const actionSheetRef = React.useRef<HTMLDivElement | null>(null)
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
            screenSize: P.when(screenSize => screenSize >= breakpoints.sm),
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
              popover={(
                <DropdownMenu
                  {...props}
                  direction={direction}
                  items={items}
                  ref={dropdownRef}
                  setIsOpen={setIsOpen}
                  shortThrow={shortThrow}
                  // labelAlign={menuLabelAlign}
                />
              )}
              width={width}
            />
          ),
        )
        .with(
          {
            responsive: true,
            screenSize: P.when(screenSize => screenSize < breakpoints.sm),
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
