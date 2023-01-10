import * as React from 'react'
import styled, { css } from 'styled-components'
import uniqueId from 'lodash/uniqueId'

import { useEffect } from 'react'

import { TransitionState, useTransition } from 'react-transition-state'

import { useDocumentEvent } from '@/src/hooks/useDocumentEvent'

import { Colors, Space } from '@/src/tokens'

import { CrossCircleSVG } from '@/src'

import { getTypography } from '@/src/utils/getTypography'

import { DownChevronSVG, Field } from '../..'

import { FieldBaseProps, State as FieldState } from '../../atoms/Field'
import { DefaultTheme } from '../../../types/index'

const CREATE_OPTION_VALUE = 'CREATE_OPTION_VALUE'

type Size = 'small' | 'medium'

const Container = styled.div<{
  $size: Size
  $open: boolean
  $disabled: boolean
  $hasError: boolean
  $validated: boolean
  $showDot: boolean
}>(
  ({ theme, $size, $showDot, $hasError, $validated, $open, $disabled }) => css`
    cursor: pointer;
    position: relative;

    height: ${theme.space['12']};
    font-size: ${theme.fontSizes.body};
    line-height: ${theme.lineHeights.body};

    :after {
      content: '';
      position: absolute;
      width: ${theme.space['4']};
      height: ${theme.space['4']};
      border: 2px solid ${theme.colors.backgroundPrimary};
      box-sizing: border-box;
      border-radius: 50%;
      right: -${theme.space['1.5']};
      top: -${theme.space['1.5']};
      transition: all 0.3s ease-out;
      transform: scale(0.3);
      opacity: 0;
    }

    ${$size === 'small' &&
    css`
      font-size: ${theme.fontSizes.small};
      line-height: ${theme.lineHeights.small};
      height: ${theme.space['10']};
    `}

    ${$showDot &&
    !$disabled &&
    $validated &&
    !$open &&
    css`
      :after {
        background: ${theme.colors.greenPrimary};
        transform: scale(1);
        opacity: 1;
      }
    `}

    ${$showDot &&
    !$disabled &&
    !$hasError &&
    $open &&
    css`
      :after {
        background: ${theme.colors.bluePrimary};
        transform: scale(1);
        opacity: 1;
      }
    `}

    ${$hasError &&
    !$disabled &&
    $showDot &&
    css`
      :after {
        background: ${theme.colors.redPrimary};
        transform: scale(1);
        opacity: 1;
      }
    `}
  `,
)
const SelectContainer = styled.div<{
  $open: boolean
  $hasError: boolean
  $disabled: boolean
  $size: Size
  $ids: FieldState
}>(
  ({ theme, $open, $hasError, $disabled, $size, $ids }) => css`
    flex: 1;
    display: flex;
    align-items: center;
    height: 100%;
    gap: ${theme.space['2']};
    padding-left: ${theme.space['4']};
    background: ${theme.colors.backgroundPrimary};

    overflow: hidden;
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.radii.large};

    svg {
      display: block;
    }

    ${$open &&
    css`
      border-color: ${theme.colors.bluePrimary};
    `}

    ${$hasError &&
    css`
      border-color: ${theme.colors.redPrimary};
      label {
        color: ${theme.colors.redPrimary};
      }
    `}


    ${$size === 'small' &&
    css`
      padding-left: ${theme.space['3.5']};
    `}

    ${$disabled &&
    css`
      background: ${theme.colors.greyBright};
      color: ${theme.colors.greyPrimary};
    `}

    input#${$ids?.content.id} ~ button#chevron svg {
      color: ${theme.colors.textPrimary};
    }

    input#${$ids?.content.id}:placeholder-shown ~ button#chevron {
      svg {
        color: ${theme.colors.greyPrimary};
      }
    }

    input#${$ids?.content.id}:disabled ~ button#chevron {
      svg {
        color: ${theme.colors.greyPrimary};
      }
    }

    input#${$ids?.content.id}:disabled ~ * {
      color: ${theme.colors.greyPrimary};
      background: ${theme.colors.greyBright};
      cursor: not-allowed;
    }
  `,
)

const RootInput = styled.input(
  () => css`
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    appearance: none;
    visibility: hidden;
  `,
)

const SelectLabel = styled.label(
  () => css`
    flex: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  `,
)

const PlaceholderLabel = styled(SelectLabel)(
  ({ theme }) => css`
    color: ${theme.colors.greyPrimary};
  `,
)

const SelectInput = styled.input(
  ({ theme }) => css`
    flex: 1;
    background: transparent;
    padding-right: 0;
    height: 100%;
    color: ${theme.colors.textPrimary};

    &::placeholder {
      color: ${theme.colors.greyPrimary};
    }
  `,
)

const SelectActionButton = styled.button<{ $size: Size }>(
  ({ theme, $size }) => css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    margin: 0;
    padding: 0;
    padding-right: ${theme.space['4']};
    padding-left: ${theme.space['2']};

    svg {
      display: block;
      width: ${$size === 'small' ? theme.space['3'] : theme.space['4']};
      path {
        color: ${theme.colors.greyPrimary};
      }
    }

    ${$size === 'small' &&
    css`
      padding-right: ${theme.space['3.5']};
    `}
  `,
)

const ToggleMenuButton = styled(SelectActionButton)<{
  $open: boolean
  $direction?: Direction
}>(
  ({ theme, $open, $direction }) => css`
    display: flex;

    svg {
      fill: currentColor;
      transform: ${$direction === 'up' ? 'rotate(180deg)' : 'rotate(0deg)'};
      transition-duration: ${theme.transitionDuration['200']};
      transition-property: all;
      transition-timing-function: ${theme.transitionTimingFunction['inOut']};
    }
    fill: currentColor;

    ${$open &&
    css`
      svg {
        transform: ${$direction === 'up' ? 'rotate(0deg)' : 'rotate(180deg)'};
      }
    `}
  `,
)

const SelectOptionContainer = styled.div<{
  $state?: TransitionState
  $direction?: Direction
  $rows?: number
  $size?: Size
  $align?: 'left' | 'right'
}>(
  ({ theme, $state, $direction, $rows, $size, $align }) => css`
    display: ${$state === 'exited' ? 'none' : 'block'};
    position: absolute;
    visibility: hidden;
    opacity: 0;
    overflow: hidden;

    border: 1px solid ${theme.colors.border};
    padding: ${theme.space['2']};
    min-width: ${theme.space['full']};
    ${$align === 'right'
      ? css`
          right: 0;
        `
      : css`
          left: 0;
        `}
    border-radius: ${theme.radii['2xLarge']};
    background: ${theme.colors.background};
    transition: all 0.3s cubic-bezier(1, 0, 0.22, 1.6), z-index 0.3s linear;

    font-size: ${theme.fontSizes.body};
    line-height: ${theme.lineHeights.body};

    ${$size === 'small' &&
    css`
      font-size: ${theme.fontSizes.small};
    `}

    ${$state === 'entered'
      ? css`
          z-index: 20;
          visibility: visible;
          top: ${$direction === 'up'
            ? `auto`
            : `calc(100% + ${theme.space['2']})`};
          bottom: ${$direction === 'up'
            ? `calc(100% + ${theme.space['2']})`
            : 'auto'};
          opacity: 1;
        `
      : css`
          z-index: 1;
          visibility: hidden;
          top: ${$direction === 'up'
            ? `auto`
            : `calc(100% - ${theme.space['12']})`};
          bottom: ${$direction === 'up'
            ? `calc(100% - ${theme.space['12']})`
            : 'auto'};
          opacity: 0;
        `}

    ${$rows &&
    css`
      padding-right: ${theme.space['1']};
    `}
  `,
)

const getMaxHeight = (theme: DefaultTheme, $rows: number, $size: Size) => {
  if ($size === 'small') return `calc(${theme.space['9']} * ${$rows})`
  return `calc(${theme.space['11']} * ${$rows})`
}

const SelectOptionList = styled.div<{
  $rows?: number
  $direction: Direction
  $size: Size
}>(
  ({ theme, $rows, $direction, $size }) => css`
    display: flex;
    flex-direction: ${$direction === 'up' ? 'column-reverse' : 'column'};
    align-items: flex-start;
    justify-content: space-between;
    overflow-y: ${$rows ? 'scroll' : 'hidden'};
    overflow-x: hidden;
    width: 100%;
    height: 100%;
    ${$rows &&
    css`
      max-height: ${getMaxHeight(theme, $rows, $size)};
      border-color: hsla(${theme.colors.raw.greyActive} / 0.05);
      transition: border-color 0.15s ease-in-out;
      padding-right: ${theme.space['1']};

      /* stylelint-disable-next-line selector-pseudo-element-no-unknown */
      &::-webkit-scrollbar-track {
        background-color: transparent;
      }

      &::-webkit-scrollbar {
        width: ${theme.space['1.5']};
        background-color: transparent;
      }

      &::-webkit-scrollbar-thumb {
        border: none;
        border-radius: ${theme.radii.full};
        border-right-style: inset;
        border-right-width: calc(100vw + 100vh);
        border-color: inherit;
      }

      &::-webkit-scrollbar-button {
        display: none;
      }

      &:hover {
        border-color: hsla(${theme.colors.raw.greyActive} / 0.2);
      }
    `};
  `,
)

const SelectOption = styled.button<{
  $selected?: boolean
  $color?: Colors
  $highlighted?: boolean
  $size: Size
}>(
  ({ theme, $selected, $highlighted, $color, $size }) => css`
    align-items: center;
    cursor: pointer;
    display: flex;
    gap: ${theme.space['2']};
    width: ${theme.space['full']};
    height: ${theme.space['11']};
    flex: 0 0 ${theme.space['11']};
    padding: 0 ${theme.space['3']};
    justify-content: flex-start;
    transition-duration: ${theme.transitionDuration['150']};
    transition-property: all;
    transition-timing-function: ${theme.transitionTimingFunction['inOut']};
    border-radius: ${theme.radii.large};
    white-space: nowrap;
    color: ${theme.colors.textPrimary};
    font-size: ${getTypography(theme, 'regular', 'fontSize')};
    font-weight: ${getTypography(theme, 'regular', 'fontWeight')};
    line-height: ${getTypography(theme, 'regular', 'lineHeight')};
    text-align: left;

    svg {
      display: block;
      width: ${theme.space['4']};
      height: ${theme.space['4']};
      color: ${theme.colors.textPrimary};
    }

    ${$color &&
    css`
      color: ${theme.colors[$color]};
      svg {
        color: ${theme.colors[$color]};
      }
    `}

    &:disabled {
      color: ${theme.colors.greyPrimary};
      cursor: not-allowed;

      &:hover {
        background-color: transparent;
      }

      svg {
        color: ${theme.colors.greyPrimary};
      }
    }

    ${$highlighted &&
    css`
      background-color: ${theme.colors.greySurface};
    `}

    ${$selected &&
    css`
      background-color: ${theme.colors.greyBright};
    `}

    ${$size === 'small' &&
    css`
      height: ${theme.space['9']};
      flex: 0 0 ${theme.space['9']};
      font-size: ${getTypography(theme, 'small', 'fontSize')};
      font-weight: ${getTypography(theme, 'small', 'fontWeight')};
      line-height: ${getTypography(theme, 'small', 'lineHeight')};
    `}
  `,
)

const NoResultsContainer = styled.div(
  ({ theme }) => css`
    align-items: center;
    display: flex;
    gap: ${theme.space['3']};
    width: ${theme.space['full']};
    height: ${theme.space['9']};
    padding: 0 ${theme.space['2']};
    justify-content: flex-start;
    transition-duration: ${theme.transitionDuration['150']};
    transition-property: all;
    transition-timing-function: ${theme.transitionTimingFunction['inOut']};
    border-radius: ${theme.radii['medium']};
    margin: ${theme.space['0.5']} 0;
    font-style: italic;
    white-space: nowrap;
  `,
)

// Helper function for filtering options
const createOptionsReducer =
  (searchTerm: string) =>
  (
    results: { options: SelectOptionProps[]; exactMatch: boolean },
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

type Direction = 'up' | 'down'

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
  onChange?: NativeSelectProps['onChange']
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
  padding?: Space | { outer?: Space; inner?: Space }
  /** The size attribute for input element. Useful for controlling input size in flexboxes. */
  inputSize?: number | { max?: number; min?: number }
  /** If true, show a border around the select component **/
  showBorder?: boolean
  /** If the option list is wider than the select, which  */
  align?: 'left' | 'right'
  /** If true will show the indicator dot */
  showDot?: boolean
  /** If true and showDot is true, will show a green indicator */
  validated?: boolean
} & FieldBaseProps &
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
      disabled,
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_value])

    const selectedOption = options?.find((o) => o.value === value) || null

    const changeSelectedOption = (option?: SelectOptionProps, event?: any) => {
      if (option?.disabled) return
      if (option?.value === CREATE_OPTION_VALUE) {
        onCreate && onCreate(queryValue)
      } else if (option?.value) {
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
          onChange && onChange(clonedEvent)
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
          option &&
          !option.disabled &&
          option.value !== CREATE_OPTION_VALUE
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
      option && changeSelectedOption(option, event)
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

    const [state, toggle] = useTransition({
      timeout: {
        enter: 0,
        exit: 300,
      },
      preEnter: true,
    })

    useEffect(() => {
      toggle(isOpen)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen])

    useEffect(() => {
      if (!menuOpen && state === 'unmounted') handleReset()
    }, [menuOpen, state])

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

    const handleOptionClick =
      (option: SelectOptionProps) =>
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
      option ? (
        <>
          {option.prefix && <div>{option.prefix}</div>}
          <SelectLabel {...props}>
            {option.node ? option.node : option.label || option.value}
          </SelectLabel>
        </>
      ) : null

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
              role: 'combobox',
              onClick: handleSelectContainerClick,
              onKeyDown: handleKeydown,
            }}
            $disabled={!!disabled}
            $hasError={!!error}
            $open={isOpen}
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
              $ids={ids}
              $open={isOpen}
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
                tabIndex={-1}
                value={value}
                onChange={(e) => {
                  const newValue = e.target.value
                  const option = options?.find((o) => o.value === newValue)
                  if (option) {
                    setValue(option.value)
                    onChange && onChange(e)
                  }
                }}
                onFocus={() => {
                  searchInputRef.current
                    ? searchInputRef.current.focus()
                    : displayRef.current?.focus()
                }}
              />
              {isAutocomplete && isOpen ? (
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
                  onKeyDown={(e) =>
                    handleKeydown(e as React.KeyboardEvent<HTMLInputElement>)
                  }
                />
              ) : selectedOption ? (
                <OptionElement data-testid="selected" option={selectedOption} />
              ) : (
                <PlaceholderLabel>{placeholder}</PlaceholderLabel>
              )}
              {showClearButton ? (
                <SelectActionButton
                  $size={size}
                  type="button"
                  onClick={handleInputClear}
                >
                  <CrossCircleSVG />
                </SelectActionButton>
              ) : (
                <ToggleMenuButton
                  $direction={direction}
                  $open={isOpen}
                  $size={size}
                  id="chevron"
                  type="button"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <DownChevronSVG />
                </ToggleMenuButton>
              )}
            </SelectContainer>
            <SelectOptionContainer
              $align={align}
              $direction={direction}
              $rows={rows}
              $size={size}
              $state={state}
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
                  <SelectOption
                    {...{
                      $selected: option?.value === value,
                      $highlighted: index === highlightedIndex,
                      $gap: innerPadding,
                      $color: option.color,
                      $size: size,
                    }}
                    data-option-index={index}
                    data-testid={`select-option-${option.value}`}
                    disabled={option.disabled}
                    key={option.value}
                    role="option"
                    type="button"
                    onClick={handleOptionClick(option)}
                    onMouseOver={handleOptionMouseover}
                  >
                    <OptionElement option={option} />
                  </SelectOption>
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
