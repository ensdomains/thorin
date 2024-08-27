import * as React from 'react'

import { useEffect } from 'react'

import { TransitionState, useTransition } from 'react-transition-state'

import { useDocumentEvent } from '@/src/hooks/useDocumentEvent'

import { Colors, Space } from '@/src/tokens'

import { CrossCircleSVG } from '@/src/icons'

import { statusDot } from '@/src/css/recipes/statusDot.css'

import { statusBorder } from '@/src/css/recipes/statusBorder.css'

import { rotate } from '@/src/css/utils/common'

import * as styles from './styles.css'

import { DownChevronSVG, Field, ScrollBox } from '../..'

import { FieldBaseProps, State as FieldState } from '../../atoms/Field'
import { Box, BoxProps } from '../../atoms/Box/Box'
import { getValueForSize } from './utils/getValueForSize'
import { getValueForTransitionState } from './utils/getValueForTransitionState'
import { cssVars } from '@/src/css/theme.css'
import { uniqueId } from '@/src/utils/uniqueId'

const CREATE_OPTION_VALUE = 'CREATE_OPTION_VALUE'

export type Size = 'small' | 'medium'

type ContainerProps = {
  $size: Size
  $disabled: boolean
  $hasError: boolean
  $validated: boolean
  $showDot: boolean
  $readOnly: boolean
}

const Container = React.forwardRef<HTMLElement, BoxProps & ContainerProps>(
  (
    { $size, $showDot, $hasError, $validated, $disabled, $readOnly, ...props },
    ref,
  ) => (
    <Box
      {...props}
      className={statusDot({
        error: $hasError,
        validated: $validated,
        show: $showDot && !$disabled,
      })}
      cursor="pointer"
      fontSize={getValueForSize($size, 'fontSize')}
      height={getValueForSize($size, 'height')}
      lineHeight={getValueForSize($size, 'lineHeight')}
      pointerEvents={$readOnly ? 'none' : 'all'}
      position="relative"
      ref={ref}
    />
  ),
)

type SelectContainerProps = {
  $hasError: boolean
  $disabled: boolean
  $size: Size
  $readOnly: boolean
}

const SelectContainer = ({
  $hasError,
  $disabled,
  $readOnly,
  $size,
  ...props
}: BoxProps & SelectContainerProps) => (
  <Box
    {...props}
    alignItems="center"
    backgroundColor="$backgroundPrimary"
    borderColor="$border"
    borderRadius="$large"
    borderStyle="solid"
    borderWidth="$1x"
    className={statusBorder({
      error: $hasError,
      readonly: $readOnly,
      disabled: $disabled,
    })}
    cursor="pointer"
    display="flex"
    flex="1"
    gap="$2"
    height="$full"
    overflow="hidden"
    paddingLeft={getValueForSize($size, 'outerPadding')}
  />
)

const RootInput = React.forwardRef<HTMLElement, BoxProps>((props, ref) => (
  <Box
    {...props}
    appearance="none"
    as="input"
    overflow="hidden"
    position="absolute"
    ref={ref}
    visibility="hidden"
    wh="$px"
  />
))

const SelectLabel = (props: BoxProps) => (
  <Box
    {...props}
    flex="1"
    overflow="hidden"
    textOverflow="ellipsis"
    whiteSpace="nowrap"
  />
)

type SelectLabelWithPrefixProps = {
  option: SelectOptionProps
}
const SelectLabelWithPrefix = ({
  option,
  ...props
}: BoxProps & SelectLabelWithPrefixProps) =>
  option
    ? (
        <>
          {React.isValidElement(option.prefix) && (
            <Box display="block" height="$4" width="$4">
              {option.prefix}
            </Box>
          )}
          <SelectLabel {...props}>
            {option.node ? option.node : option.label || option.value}
          </SelectLabel>
        </>
      )
    : null

const SelectInput = React.forwardRef<HTMLElement, BoxProps>((props, ref) => (
  <Box
    {...props}
    as="input"
    backgroundColor="transparent"
    className={styles.input}
    color="$textPrimary"
    flex="1"
    height="$full"
    paddingRight="$0"
    ref={ref}
  />
))

const SelectActionButton = ({
  $size,
  $disabled,
  ...props
}: BoxProps & { $size: Size, $disabled: boolean }) => (
  <Box
    {...props}
    alignItems="center"
    as="button"
    color="$greyPrimary"
    cursor={$disabled ? 'not-allowed' : 'pointer'}
    display="flex"
    height="$full"
    justifyContent="flex-end"
    margin="$0"
    padding="$0"
    paddingLeft="$2"
    paddingRight={getValueForSize($size, 'outerPadding')}
  >
    <Box
      as={<CrossCircleSVG />}
      display="block"
      wh={getValueForSize($size, 'iconWidth')}
    />
  </Box>
)

const ToggleMenuButton = ({
  $open,
  $direction,
  $size,
  $disabled,
  ...props
}: BoxProps & {
  $size: Size
  $open: boolean
  $direction: Direction
  $disabled: boolean
}) => {
  const baseRotation = $direction === 'up' ? 180 : 0
  const openRotation = baseRotation === 180 ? 0 : 180
  const rotation = $open ? openRotation : baseRotation
  return (
    <Box
      {...props}
      alignItems="center"
      as="button"
      color="$greyPrimary"
      cursor={$disabled ? 'not-allowed' : 'pointer'}
      display="flex"
      height="$full"
      justifyContent="flex-end"
      margin="$0"
      padding="$0"
      paddingLeft="$2"
      paddingRight={getValueForSize($size, 'outerPadding')}
    >
      <Box
        as={<DownChevronSVG />}
        display="block"
        fill="currentColor"
        transform={rotate(rotation)}
        transitionDuration="$200"
        transitionProperty="all"
        transitionTimingFunction="$inOut"
        wh={getValueForSize($size, 'iconWidth')}
      />
    </Box>
  )
}

type SelectOptionContainerProps = {
  $state?: TransitionState['status'] | 'default'
  $direction?: Direction
  $rows?: number
  $size?: Size
  $align?: 'left' | 'right'
}
const SelectOptionContainer = ({
  $state = 'default',
  $direction = 'down',
  // $rows,
  $size = 'medium',
  $align,
  ...props
}: BoxProps & SelectOptionContainerProps) => (
  <Box
    {...props}
    backgroundColor="$backgroundPrimary"
    borderColor="$border"
    borderRadius="$2xLarge"
    borderStyle="solid"
    borderWidth="$1x"
    bottom={getValueForTransitionState($state, 'bottom', $direction)}
    display={$state === 'exited' ? 'none' : 'block'}
    fontSize={getValueForSize($size, 'fontSize')}
    left={$align === 'left' ? 0 : 'unset'}
    lineHeight="$body"
    minWidth="$full"
    opacity={getValueForTransitionState($state, 'opacity', $direction)}
    overflow="hidden"
    padding="$2"
    position="absolute"
    right={$align === 'right' ? 0 : 'unset'}
    top={getValueForTransitionState($state, 'top', $direction)}
    transition="all 0.3s cubic-bezier(1, 0, 0.22, 1.6), z-index 0.3s linear"
    visibility={getValueForTransitionState($state, 'visibility', $direction)}
    zIndex={getValueForTransitionState($state, 'zIndex', $direction)}
  />
)

type SelectOptionListProps = {
  $rows?: number
  $direction: Direction
  $size: Size
}

const SelectOptionList = ({
  $rows,
  $direction,
  $size = 'medium',
  children,
  ...props
}: BoxProps & SelectOptionListProps) => {
  if ($rows) {
    return (
      <ScrollBox
        {...props}
        display="flex"
        flexDirection={$direction === 'up' ? 'column-reverse' : 'column'}
        hideDividers
        maxHeight={getValueForSize($size, 'maxHeightFunc')($rows)}
        paddingRight="$1"
        width="$full"
      >
        {children}
      </ScrollBox>
    )
  }
  return (
    <Box
      {...props}
      alignItems="flex-start"
      display="flex"
      flexDirection={$direction === 'up' ? 'column-reverse' : 'column'}
      gap="$1"
      justifyContent="space-between"
      overflow="hidden"
      wh="$full"
    >
      {children}
    </Box>
  )
}

type SelectOptionRowProps = {
  $selected?: boolean
  $color?: Colors
  $highlighted?: boolean
  $size: Size
  option: SelectOptionProps
}
const SelectOptionRow = ({
  $selected,
  $highlighted,
  $color,
  $size,
  option,
  ...props
}: BoxProps & SelectOptionRowProps) => {
  return (
    <Box
      {...props}
      alignItems="center"
      as="button"
      backgroundColor={{
        base: $selected
          ? '$greyLight'
          : $highlighted
            ? '$greySurface'
            : 'transparent',
        disabled: 'transparent',
      }}
      borderRadius="$large"
      color={{ base: $color || '$textPrimary', disabled: '$greyPrimary' }}
      cursor={{ base: 'pointer', disabled: 'not-allowed' }}
      display="flex"
      flexBasis={getValueForSize($size, 'rowHeight')}
      flexGrow="0"
      flexShrink="0"
      fontSize={getValueForSize($size, 'fontSize')}
      fontWeight="$normal"
      height={getValueForSize($size, 'rowHeight')}
      justifyContent="flex-start"
      lineHeight={getValueForSize($size, 'lineHeight')}
      px="$3"
      textAlign="left"
      transitionDuration="$150"
      transitionProperty="all"
      transitionTimingFunction="$inOut"
      whiteSpace="nowrap"
      width="$full"
    >
      <SelectLabelWithPrefix option={option} />
    </Box>
  )
}

const NoResultsContainer = (props: BoxProps) => (
  <Box
    {...props}
    alignItems="center"
    borderRadius="$medium"
    display="flex"
    fontStyle="italic"
    gap="$3"
    height="$9"
    justifyContent="flex-start"
    my="$0.5"
    px="$2"
    transitionDuration="$150"
    transitionProperty="all"
    transitionTimingFunction="$inOut"
    whiteSpace="nowrap"
    width="$full"
  />
)

// Helper function for filtering options
const createOptionsReducer
  = (searchTerm: string) =>
    (
      results: { options: SelectOptionProps[], exactMatch: boolean },
      option: SelectOptionProps,
    ) => {
      if (option.label) {
        const label = option.label.trim().toLowerCase()
        if (label.indexOf(searchTerm) !== -1) results.options.push(option)
        if (label === searchTerm) results.exactMatch = true
      }
      return results
    }

enum ReservedKeys {
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  Enter = 'Enter',
}

type NativeSelectProps = React.InputHTMLAttributes<HTMLInputElement>

export type SelectOptionProps = {
  value: string
  label?: string
  node?: React.ReactNode
  prefix?: React.ReactNode
  disabled?: boolean
  color?: Colors
}

export type Direction = 'up' | 'down'

type NativeDivProps = React.HTMLAttributes<HTMLDivElement>

export type SelectProps = {
  /** The id attribute of div element. */
  id?: NativeSelectProps['id']
  /** If true, prevents user interaction with component. */
  disabled?: NativeSelectProps['disabled']
  /** If the options list will filter options based on text input. */
  autocomplete?: boolean
  /** Message displayed if there is no available options. */
  emptyListMessage?: string
  /** If it is possible to create an option if it does not exist in the options list. */
  createable?: boolean
  /** If the menu opens up top or bottom. */
  direction?: Direction
  /** The string or component to prefix the value in the create value option. */
  createablePrefix?: string
  /** The handler for change events. */
  onChange?: BoxProps['onChange']
  /** The tabindex attribute for  */
  tabIndex?: NativeSelectProps['tabIndex']
  /** The handler for focus events. */
  onFocus?: NativeSelectProps['onFocus']
  /** The handler for blur events. */
  onBlur?: NativeSelectProps['onBlur']
  /** A handler for when new values are created */
  onCreate?: (value: string) => void
  /** The selected option's value. */
  value?: SelectOptionProps['value']
  /** The name property of an input element. */
  name?: NativeSelectProps['name']
  /** An arrary of objects conforming to OptionProps interface. */
  options: SelectOptionProps[]
  /** The approximate number of rows to display on menu. */
  rows?: number
  /** Preset size spacing settings */
  size?: Size
  /** Overide the padding setting of the element */
  padding?: Space | { outer?: Space, inner?: Space }
  /** The size attribute for input element. Useful for controlling input size in flexboxes. */
  inputSize?: number | { max?: number, min?: number }
  /** If true, show a border around the select component **/
  showBorder?: boolean
  /** If the option list is wider than the select, which  */
  align?: 'left' | 'right'
  /** If true will show the indicator dot */
  showDot?: boolean
  /** If true and showDot is true, will show a green indicator */
  validated?: boolean
  /** If true, sets the select component into read only mode */
  readOnly?: boolean
} & FieldBaseProps & Pick<React.InputHTMLAttributes<HTMLInputElement>, 'placeholder'> &
Omit<
  NativeDivProps,
  | 'children'
  | 'id'
  | 'onChange'
  | 'tabIndex'
  | 'onFocus'
  | 'onBlur'
  | 'aria-controls'
  | 'aria-expanded'
  | 'role'
  | 'aria-haspopup'
  | 'aria-invalid'
  | 'onClick'
  | 'onKeyDown'
>

const getPadding = (
  key: 'outer' | 'inner',
  fallback: Space,
  padding: SelectProps['padding'],
): Space => {
  if (typeof padding === 'string') return padding
  return padding?.[key] || fallback
}

const getSize = (
  key: 'max' | 'min',
  fallback: number,
  size: SelectProps['inputSize'],
): number => {
  if (typeof size === 'number') return size
  return size?.[key] || fallback
}

export const Select = React.forwardRef(
  (
    {
      description,
      disabled = false,
      autocomplete = false,
      createable = false,
      createablePrefix = 'Add ',
      placeholder,
      direction = 'down',
      error,
      hideLabel,
      inline,
      id: _id,
      label,
      labelSecondary,
      required,
      tabIndex = -1,
      readOnly = false,
      width,
      onBlur,
      onChange,
      onFocus,
      onCreate,
      options,
      rows,
      emptyListMessage = 'No results',
      name,
      value: _value,
      size = 'medium',
      padding: paddingProp,
      inputSize: inputSizeProps,
      align,
      validated,
      showDot = false,
      ...props
    }: SelectProps,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const defaultRef = React.useRef<HTMLInputElement>(null)
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || defaultRef
    const displayRef = React.useRef<HTMLDivElement>(null)
    const searchInputRef = React.useRef<HTMLInputElement>(null)

    const [inputValue, setInputValue] = React.useState('')

    const [queryValue, setQueryValue] = React.useState('')
    const isCreateable = createable && queryValue !== ''
    const isAutocomplete = createable || autocomplete

    const [id] = React.useState(_id || uniqueId())

    // Internal tracker of value
    const [value, setValue] = React.useState<SelectProps['value']>('')
    React.useEffect(() => {
      if (_value !== value && _value !== undefined) setValue(_value)
    }, [_value])

    const selectedOption = options?.find(o => o.value === value) || null

    const changeSelectedOption = (option?: SelectOptionProps, event?: any) => {
      if (option?.disabled) return
      if (option?.value === CREATE_OPTION_VALUE) {
        onCreate?.(queryValue)
      }
      else if (option?.value) {
        setValue(option?.value)
        if (event) {
          const nativeEvent = event.nativeEvent || event
          const clonedEvent = new nativeEvent.constructor(
            nativeEvent.type,
            nativeEvent,
          )
          Object.defineProperties(clonedEvent, {
            target: {
              writable: true,
              value: { value: option.value, name },
            },
            currentTarget: {
              writable: true,
              value: {
                value: option.value,
                name,
              },
            },
          })
          onChange?.(clonedEvent)
        }
      }
    }

    const visibleOptions = React.useMemo(() => {
      if (!isAutocomplete || queryValue === '') return options

      const searchTerm = queryValue.trim().toLowerCase()
      const { options: baseOptions, exactMatch } = (
        Array.isArray(options) ? options : [options]
      ).reduce(createOptionsReducer(searchTerm), {
        options: [],
        exactMatch: false,
      })

      return [
        ...baseOptions,
        ...(isCreateable && !exactMatch
          ? [
              {
                label: `${createablePrefix}"${queryValue}"`,
                value: CREATE_OPTION_VALUE,
              },
            ]
          : []),
      ]
    }, [options, isCreateable, isAutocomplete, queryValue, createablePrefix])

    const [highlightedIndex, setHighlightedIndex] = React.useState(-1)
    const changeHighlightIndex = React.useCallback(
      (index: number) => {
        const option = visibleOptions[index]
        if (
          option
          && !option.disabled
          && option.value !== CREATE_OPTION_VALUE
        ) {
          setHighlightedIndex(index)
          setInputValue(option.label || '')
          return
        }

        setInputValue(queryValue)
        setHighlightedIndex(index)
      },
      [visibleOptions, queryValue, setInputValue, setHighlightedIndex],
    )

    const incrementHighlightIndex = (direction: 'next' | 'previous') => {
      let nextIndex = highlightedIndex
      do {
        if (direction === 'previous') nextIndex--
        else nextIndex++
        if (nextIndex < 0) {
          return changeHighlightIndex(-1)
        }
        if (visibleOptions[nextIndex] && !visibleOptions[nextIndex]?.disabled)
          return changeHighlightIndex(nextIndex)
      } while (visibleOptions[nextIndex])
    }

    const selectHighlightedIndex = (event: any) => {
      const option = visibleOptions[highlightedIndex]
      if (option) changeSelectedOption(option, event)
      handleReset()
    }

    const [menuOpen, setMenuOpen] = React.useState(false)
    const isOpen = !disabled && menuOpen

    const showClearButton = queryValue !== '' && isAutocomplete

    // Set the intrinsic size of the input
    const minInputSize = getSize('min', 4, inputSizeProps)
    const maxInputSize = getSize('max', 20, inputSizeProps)
    const inputSize = Math.min(
      Math.max(minInputSize, queryValue.length),
      maxInputSize,
    )

    const [{ status: state }, toggle] = useTransition({
      timeout: {
        enter: 0,
        exit: 300,
      },
      preEnter: true,
    })

    useEffect(() => {
      toggle(isOpen)
    }, [isOpen])

    useEffect(() => {
      if (!menuOpen && state.status === 'unmounted') handleReset()
    }, [menuOpen, state.status])

    const defaultPadding = size === 'small' ? '3' : '4'
    const innerPadding = getPadding('inner', defaultPadding, paddingProp)

    /**
     * Event Handlers
     */

    const handleReset = () => {
      setQueryValue('')
      setInputValue('')
      setHighlightedIndex(-1)
    }

    const handleSelectContainerClick = () => {
      if (isAutocomplete && !menuOpen) setMenuOpen(true)
      if (!isAutocomplete) setMenuOpen(!menuOpen)
    }

    const handleKeydown = (
      e:
        | React.KeyboardEvent<HTMLDivElement>
        | React.KeyboardEvent<HTMLInputElement>,
    ) => {
      if (!menuOpen) {
        e.stopPropagation()
        e.preventDefault()
        return setMenuOpen(true)
      }

      if (!(e.key in ReservedKeys)) return

      e.preventDefault()
      e.stopPropagation()

      if (e.key === ReservedKeys.ArrowUp)
        incrementHighlightIndex(direction === 'up' ? 'next' : 'previous')
      else if (e.key === ReservedKeys.ArrowDown)
        incrementHighlightIndex(direction === 'up' ? 'previous' : 'next')
      if (e.key === ReservedKeys.Enter) {
        selectHighlightedIndex(e)
        setMenuOpen(false)
      }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.currentTarget.value
      setQueryValue(newValue)
      setInputValue(newValue)
      setHighlightedIndex(-1)
    }

    const handleInputClear = (
      e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
    ) => {
      e.stopPropagation()
      setQueryValue('')
      setInputValue('')
      setHighlightedIndex(-1)
    }

    const handleOptionsListMouseLeave = () => {
      changeHighlightIndex(-1)
    }

    const handleOptionClick
      = (option: SelectOptionProps) =>
        (e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation()
          changeSelectedOption(option, e)
          setMenuOpen(false)
        }

    const handleOptionMouseover = (e: React.MouseEvent<HTMLButtonElement>) => {
      const index = Number(e.currentTarget.getAttribute('data-option-index'))
      if (!isNaN(index)) changeHighlightIndex(index)
    }

    useDocumentEvent(displayRef, 'click', () => setMenuOpen(false), menuOpen)

    const OptionElement = ({
      option,
      ...props
    }: {
      option: SelectOptionProps | null
    }) =>
      option
        ? (
            <>
              {option.prefix && <div>{option.prefix}</div>}
              <SelectLabel {...props}>
                {option.node ? option.node : option.label || option.value}
              </SelectLabel>
            </>
          )
        : null

    return (
      <Field
        data-testid="select"
        description={description}
        disabled={disabled}
        error={error}
        hideLabel={hideLabel}
        id={id}
        inline={inline}
        label={label}
        labelSecondary={labelSecondary}
        readOnly={readOnly}
        required={required}
        width={width}
      >
        {(ids: FieldState) => (
          <Container
            {...{
              ...props,
              'aria-controls': `listbox-${id}`,
              'aria-expanded': 'true',
              'aria-haspopup': 'listbox',
              'aria-invalid': error ? true : undefined,
              'data-testid': 'select-container',
              'role': 'combobox',
              'onClick': handleSelectContainerClick,
              'onKeyDown': handleKeydown,
            }}
            $disabled={!!disabled}
            $hasError={!!error}
            $readOnly={readOnly}
            $showDot={showDot}
            $size={size}
            $validated={!!validated}
            id={`combo-${id}`}
            ref={displayRef}
            tabIndex={tabIndex}
            onBlur={onBlur}
            onFocus={onFocus}
          >
            <SelectContainer
              $disabled={!!disabled}
              $hasError={!!error}
              $readOnly={readOnly}
              $size={size}
            >
              <RootInput
                ref={inputRef}
                {...{
                  ...ids?.content,
                }}
                aria-hidden
                disabled={disabled}
                name={name}
                placeholder={placeholder}
                readOnly={readOnly}
                tabIndex={-1}
                value={value}
                onChange={(e) => {
                  const newValue = (e.target as HTMLInputElement).value
                  const option = options?.find(o => o.value === newValue)
                  if (option) {
                    setValue(option.value)
                    onChange?.(e)
                  }
                }}
                onFocus={() => {
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  searchInputRef.current
                    ? searchInputRef.current.focus()
                    : displayRef.current?.focus()
                }}
              />
              {isAutocomplete && isOpen
                ? (
                    <SelectInput
                      autoCapitalize="none"
                      autoComplete="off"
                      autoFocus
                      data-testid="select-input"
                      placeholder={selectedOption?.label || placeholder}
                      ref={searchInputRef}
                      size={inputSize}
                      spellCheck="false"
                      style={{ flex: '1', height: '100%' }}
                      value={inputValue}
                      onChange={handleInputChange}
                      onKeyDown={e =>
                        handleKeydown(e as React.KeyboardEvent<HTMLInputElement>)}
                    />
                  )
                : selectedOption
                  ? (
                      <OptionElement data-testid="selected" option={selectedOption} />
                    )
                  : (
                      <SelectLabel color="$greyPrimary" pointerEvents="none">
                        {placeholder}
                      </SelectLabel>
                    )}
              {showClearButton
                ? (
                    <SelectActionButton
                      $disabled={disabled}
                      $size={size}
                      type="button"
                      onClick={handleInputClear}
                    >
                      <CrossCircleSVG />
                    </SelectActionButton>
                  )
                : !readOnly
                    ? (
                        <ToggleMenuButton
                          $direction={direction}
                          $disabled={disabled}
                          $open={isOpen}
                          $size={size}
                          id="chevron"
                          type="button"
                          onClick={() => setMenuOpen(!menuOpen)}
                        >
                          <DownChevronSVG />
                        </ToggleMenuButton>
                      )
                    : null}
            </SelectContainer>
            <SelectOptionContainer
              $align={align}
              $direction={direction}
              $rows={rows}
              $size={size}
              $state={state.status}
              id={`listbox-${id}`}
              role="listbox"
              tabIndex={-1}
              onMouseLeave={handleOptionsListMouseLeave}
            >
              <SelectOptionList
                $direction={direction}
                $rows={rows}
                $size={size}
              >
                {visibleOptions.length === 0 && (
                  <NoResultsContainer>{emptyListMessage}</NoResultsContainer>
                )}
                {visibleOptions.map((option, index) => (
                  <SelectOptionRow
                    {...{
                      $selected: option?.value === value,
                      $highlighted: index === highlightedIndex,
                      gap: cssVars.space[innerPadding],
                      $color: option.color,
                      $size: size,
                    }}
                    data-option-index={index}
                    data-testid={`select-option-${option.value}`}
                    disabled={option.disabled}
                    key={option.value}
                    option={option}
                    role="option"
                    type="button"
                    onClick={handleOptionClick(option)}
                    onMouseOver={handleOptionMouseover}
                  />
                ))}
              </SelectOptionList>
            </SelectOptionContainer>
          </Container>
        )}
      </Field>
    )
  },
)

Select.displayName = 'Select'
