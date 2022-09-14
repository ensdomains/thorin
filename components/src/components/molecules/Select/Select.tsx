import * as React from 'react'
import styled, { css } from 'styled-components'
import uniqueId from 'lodash/uniqueId'

import { useEffect } from 'react'

import { TransitionState, useTransition } from 'react-transition-state'

import { CloseSVG, Field } from '../..'
import { FieldBaseProps } from '../../atoms/Field'
import { ReactComponent as IconDownIndicatorSvg } from '@/src/icons/DownIndicator.svg'
import { useDocumentEvent } from '@/src/hooks/useDocumentEvent'
import { VisuallyHidden } from '../../atoms'
import { Space } from '@/src/tokens'

const CREATE_OPTION_VALUE = 'CREATE_OPTION_VALUE'

type Size = 'small' | 'medium' | 'large'

const SelectContainer = styled.div<{
  $disabled?: boolean
  $size: Size
  $showBorder: boolean
}>(
  ({ theme, $disabled, $size, $showBorder }) => css`
    background: ${theme.colors.backgroundSecondary};
    ${$showBorder &&
    css`
      border: 1px solid ${theme.colors.backgroundHide};
    `};
    cursor: pointer;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    z-index: 10;
    overflow: hidden;
    ${$size === 'small'
      ? css`
          border-radius: ${theme.space['2']};
          height: ${theme.space['9']};
          font-size: ${theme.space['3.5']};
        `
      : $size === 'medium'
      ? css`
          border-radius: ${theme.radii['almostExtraLarge']};
          height: ${theme.space['10']};
        `
      : css`
          border-radius: ${theme.radii['2xLarge']};
          height: ${theme.space['14']};
        `}

    ${$disabled &&
    css`
      cursor: not-allowed;
      background: ${theme.colors.backgroundTertiary};
    `}
  `,
)

const SelectContentContainer = styled.div(
  () => css`
    flex: 1;
    overflow: hidden;
    display: flex;

    svg {
      display: block;
    }
  `,
)

const SelectActionContainer = styled.div(
  () => css`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  `,
)

const SelectLabel = styled.div(
  () => css`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 1.4;
  `,
)

const OptionElementContainer = styled.div<{ $padding: Space; $gap: Space }>(
  ({ theme, $padding, $gap }) => css`
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    gap: ${theme.space[$gap]};
    padding: ${theme.space[$padding]};
    padding-right: 0;
    overflow: hidden;
  `,
)

const NoOptionContainer = styled.div<{ $padding: Space }>(
  ({ theme, $padding }) => css`
    padding: ${theme.space[$padding]};
    padding-right: 0;
    color: ${theme.colors.textPlaceholder};
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  `,
)

const SelectInput = styled.input<{ $padding: Space }>(
  ({ theme, $padding }) => css`
    padding: ${theme.space[$padding]};
    background: transparent;
    padding-right: 0;
    width: 100%;
    height: 100%;
  `,
)

const SelectActionButton = styled.button<{ $padding: Space; $size: Size }>(
  ({ theme, $padding, $size }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: ${theme.space[$padding]};
    svg {
      display: block;
      width: ${$size === 'small' ? theme.space['2'] : theme.space['3']};
      path {
        color: ${theme.colors.textSecondary};
      }
    }
  `,
)

const Chevron = styled(IconDownIndicatorSvg)<{
  $open: boolean
  $disabled?: boolean
  $direction?: Direction
}>(
  ({ theme, $open, $disabled, $direction }) => css`
    margin-left: ${theme.space['1']};
    margin-right: ${theme.space['0.5']};
    transition-duration: ${theme.transitionDuration['200']};
    transition-property: all;
    transition-timing-function: ${theme.transitionTimingFunction['inOut']};
    opacity: 0.3;
    transform: ${$direction === 'up' ? 'rotate(180deg)' : 'rotate(0deg)'};
    display: flex;

    & > svg {
      fill: currentColor;
    }
    fill: currentColor;

    ${$open &&
    css`
      opacity: 1;
      transform: ${$direction === 'up' ? 'rotate(0deg)' : 'rotate(180deg)'};
    `}

    ${$disabled &&
    css`
      opacity: 0.1;
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

    margin-top: ${theme.space['1.5']};
    padding: ${theme.space['1.5']};
    min-width: ${theme.space['full']};
    ${$align === 'right'
      ? css`
          right: 0;
        `
      : css`
          left: 0;
        `}
    border-radius: ${theme.radii['medium']};
    box-shadow: ${theme.boxShadows['0.02']};
    background: ${theme.colors.background};
    transition: all 0.3s cubic-bezier(1, 0, 0.22, 1.6), z-index 0.3s linear;

    ${$size === 'small' &&
    css`
      font-size: ${theme.space['3.5']};
    `}

    ${$state === 'entered'
      ? css`
          z-index: 20;
          visibility: visible;
          top: ${$direction === 'up'
            ? `auto`
            : `calc(100% + ${theme.space['1.5']})`};
          bottom: ${$direction === 'up'
            ? `calc(100% + ${theme.space['1.5']})`
            : 'auto'};
          opacity: ${theme.opacity['100']};
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

const SelectOptionList = styled.div<{ $rows?: number; $direction: Direction }>(
  ({ theme, $rows, $direction }) => css`
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
      max-height: calc(${theme.space['9']} * ${$rows});
      border-color: rgba(${theme.shadesRaw.foreground}, 0.05);
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
        border-color: rgba(${theme.shadesRaw.foreground}, 0.2);
      }
    `}
  `,
)

const SelectOption = styled.div<{
  $selected?: boolean
  $disabled?: boolean
  $highlighted?: boolean
  $gap: Space
}>(
  ({ theme, $selected, $disabled, $highlighted, $gap }) => css`
    align-items: center;
    cursor: pointer;
    display: flex;
    gap: ${theme.space[$gap]};
    width: ${theme.space['full']};
    height: ${theme.space['9']};
    padding: ${theme.space['2.5']} ${theme.space['2']};
    justify-content: flex-start;
    transition-duration: ${theme.transitionDuration['150']};
    transition-property: all;
    transition-timing-function: ${theme.transitionTimingFunction['inOut']};
    border-radius: ${theme.radii['medium']};
    margin: ${theme.space['0.5']} 0;
    white-space: nowrap;

    &:first-child {
      margin-top: ${theme.space['0']};
    }

    &:last-child {
      margin-bottom: ${theme.space['0']};
    }

    ${() => {
      if ($selected)
        return css`
          background-color: ${theme.colors.foregroundSecondary};
        `
      else if ($highlighted)
        return css`
          background-color: ${theme.colors.foregroundSecondaryHover};
        `
    }}

    ${$disabled &&
    css`
      color: ${theme.colors.textTertiary};
      cursor: not-allowed;

      &:hover {
        background-color: ${theme.colors.transparent};
      }
    `}

    svg {
      display: block;
    }
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

    &:first-child {
      margin-top: ${theme.space['0']};
    }

    &:last-child {
      margin-bottom: ${theme.space['0']};
    }
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
      showBorder = false,
      align,
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
        // onChange && onChange(option)
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
    const outerPadding = getPadding('outer', defaultPadding, paddingProp)
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
      (option: SelectOptionProps) => (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        changeSelectedOption(option, e)
        setMenuOpen(false)
      }

    const handleOptionMouseover = (e: React.MouseEvent<HTMLDivElement>) => {
      const index = Number(e.currentTarget.getAttribute('data-option-index'))
      if (!isNaN(index)) changeHighlightIndex(index)
    }

    useDocumentEvent(displayRef, 'click', () => setMenuOpen(false), menuOpen)

    const OptionElement = ({ option }: { option: SelectOptionProps | null }) =>
      option ? (
        <React.Fragment>
          {option.prefix && <div>{option.prefix}</div>}
          <SelectLabel>
            {option.node ? option.node : option.label || option.value}
          </SelectLabel>
        </React.Fragment>
      ) : null

    return (
      <Field
        data-testid="select"
        description={description}
        error={error}
        hideLabel={hideLabel}
        id={id}
        inline={inline}
        label={label}
        labelSecondary={labelSecondary}
        required={required}
        width={width}
      >
        <div style={{ position: 'relative' }}>
          <SelectContainer
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
            $disabled={disabled}
            $showBorder={showBorder}
            $size={size}
            id={`combo-${id}`}
            ref={displayRef}
            tabIndex={tabIndex}
            onBlur={onBlur}
            onFocus={onFocus}
          >
            <SelectContentContainer>
              {isAutocomplete && isOpen ? (
                <SelectInput
                  $padding={outerPadding}
                  autoCapitalize="none"
                  autoComplete="off"
                  autoFocus
                  data-testid="select-input"
                  placeholder={selectedOption?.label}
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
                <OptionElementContainer
                  $gap={innerPadding}
                  $padding={outerPadding}
                  data-testid="selected"
                >
                  <OptionElement option={selectedOption} />
                </OptionElementContainer>
              ) : placeholder ? (
                <NoOptionContainer $padding={outerPadding}>
                  {placeholder}
                </NoOptionContainer>
              ) : null}
            </SelectContentContainer>
            <SelectActionContainer>
              {showClearButton ? (
                <SelectActionButton
                  $padding={outerPadding}
                  $size={size}
                  type="button"
                  onClick={handleInputClear}
                >
                  <CloseSVG />
                </SelectActionButton>
              ) : (
                <SelectActionButton
                  $padding={outerPadding}
                  $size={size}
                  type="button"
                >
                  <Chevron
                    $direction={direction}
                    $disabled={disabled}
                    $open={isOpen}
                    onClick={() => setMenuOpen(!menuOpen)}
                  />
                </SelectActionButton>
              )}
            </SelectActionContainer>
            <VisuallyHidden>
              <input
                aria-hidden
                name={name}
                ref={inputRef}
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
            </VisuallyHidden>
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
            <SelectOptionList $direction={direction} $rows={rows}>
              {visibleOptions.length === 0 && (
                <NoResultsContainer>{emptyListMessage}</NoResultsContainer>
              )}
              {visibleOptions.map((option, index) => (
                <SelectOption
                  {...{
                    $selected: option?.value === value,
                    $disabled: option.disabled,
                    $highlighted: index === highlightedIndex,
                    $gap: innerPadding,
                  }}
                  data-option-index={index}
                  key={option.value}
                  role="option"
                  onClick={handleOptionClick(option)}
                  onMouseOver={handleOptionMouseover}
                >
                  <OptionElement option={option} />
                </SelectOption>
              ))}
            </SelectOptionList>
          </SelectOptionContainer>
        </div>
      </Field>
    )
  },
)

Select.displayName = 'Select'
