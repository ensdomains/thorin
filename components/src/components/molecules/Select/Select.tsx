import * as React from 'react'
import styled from 'styled-components'
import findIndex from 'lodash/findIndex'
import findLastIndex from 'lodash/findLastIndex'
import uniqueId from 'lodash/uniqueId'

import { useEffect } from 'react'

import { CloseSVG, Field } from '../..'
import { FieldBaseProps } from '../../atoms/Field'
import { ReactComponent as IconDownIndicatorSvg } from '@/src/icons/DownIndicator.svg'
import { useDocumentEvent } from '@/src/hooks/useDocumentEvent'

const CREATE_OPTION_VALUE = 'CREATE_OPTION_VALUE'

type Size = 'small' | 'medium'

const SelectContainer = styled.div<{ $disabled?: boolean; $size: Size }>`
  ${({ theme, $size }) => `
    background: ${theme.colors.background};
    border-color: ${theme.colors.backgroundHide};
    border-width: ${theme.space['px']};
    cursor: pointer;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    z-index: 10;
    ${
      $size === 'medium'
        ? `
      border-radius: ${theme.radii['extraLarge']};
      padding: ${theme.space['4']};
      height: ${theme.space['14']};
    `
        : `
      border-radius: ${theme.radii['almostExtraLarge']};
      padding: ${theme.space['2']};
      height: ${theme.space['10']};
    `
    }
  `}

  ${({ $disabled, theme }) =>
    $disabled &&
    `
    cursor: not-allowed;
    background: ${theme.colors.backgroundTertiary};
  `}
`

const OptionElementContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: ${({ theme }) => theme.space['4']};
`

const Chevron = styled(IconDownIndicatorSvg)<{
  $open: boolean
  $disabled?: boolean
}>`
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

    & > svg {
      fill: currentColor;
    }
    fill: currentColor;
  `}

  ${({ $open }) =>
    $open &&
    `
      opacity: 1;
      transform: rotate(180deg);
  `}

  ${({ $disabled }) =>
    $disabled &&
    `
      opacity: 0.1;
  `}
`

const SelectOptionContainer = styled.div<{ $open?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  position: absolute;
  visibility: hidden;
  opacity: 0;
  overflow: hidden;

  ${({ theme }) => `
    margin-top: ${theme.space['1.5']};
    padding: ${theme.space['1.5']};
    width: ${theme.space['full']};
    height: ${theme.space['fit']};
    border-radius: ${theme.radii['medium']};
    box-shadow: ${theme.boxShadows['0.02']};
    background: ${theme.colors.background};
  `}

  ${({ $open, theme }) =>
    $open
      ? `
      z-index: 20;
      visibility: visible;
      margin-top: ${theme.space['1.5']};
      opacity ${theme.opacity['100']};
      transition: all 0.3s cubic-bezier(1, 0, 0.22, 1.6), z-index 0s linear 0.3s;
  `
      : `
      z-index: 0;
      visibility: hidden;
      margin-top: -${theme.space['12']};
      opacity: 0;
      transition: all 0.3s cubic-bezier(1, 0, 0.22, 1.6), z-index 0s linear 0s;
  `}
`

const SelectOption = styled.div<{
  $selected?: boolean
  $disabled?: boolean
  $highlighted?: boolean
}>`
  ${({ theme }) => `
    align-items: center;
    cursor: pointer;
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
    
    &::first-child {
      margin-top: ${theme.space['0']};
    }
    
    &::last-child {
      margin-bottom: ${theme.space['0']};
    }
  `}

  ${({ theme, $selected, $highlighted }) => {
    if ($selected)
      return `
    background-color: ${theme.colors.foregroundSecondary};
    `
    else if ($highlighted)
      return `
    background-color: ${theme.colors.foregroundSecondaryHover};    
    `
  }}

  ${({ theme, $disabled }) =>
    $disabled &&
    `
      color: ${theme.colors.textTertiary};
      cursor: not-allowed;
      
      &:hover {
        background-color: ${theme.colors.transparent};
      }
  `}
`

const ClearIconContainer = styled.div<{
  $size: SelectProps['size']
}>`
  gap: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme, $size }) => `
  width: ${$size === 'medium' ? theme.space['14'] : theme.space['10']};
  height: ${$size === 'medium' ? theme.space['14'] : theme.space['10']};
  svg {
    display: block;
    path {
      color: ${theme.colors.textSecondary};
    }
  }
  `}
`

const NoResultsContainer = styled.div`
  ${({ theme }) => `
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

    &:hover {
    }
    
    &::first-child {
      margin-top: ${theme.space['0']};
    }
    
    &::last-child {
      margin-bottom: ${theme.space['0']};
    }
  `}
`

type NativeSelectProps = React.AllHTMLAttributes<HTMLDivElement>

export type SelectOptionProps = {
  value: string
  label?: string
  prefix?: React.ReactNode
  disabled?: boolean
}

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

export type SelectProps = Omit<FieldBaseProps, 'inline'> & {
  /** The id attribute of div element. */
  id?: NativeSelectProps['id']
  /** If true, prevents user interaction with component. */
  disabled?: boolean
  /** If the options list will filter options based on text input. */
  autocomplete?: boolean
  /** Message displayed if there is no available options. */
  emptyListMessage?: string
  /** If it is possible to create an option if it does not exist in the options list. */
  createable?: boolean
  /** The string or component to prefix the value in the create value option. */
  createablePrefix?: string
  /** The handler for change events. */
  onChange?: (selected: SelectOptionProps | null) => void
  /** The tabindex attribute for  */
  tabIndex?: NativeSelectProps['tabIndex']
  /** The handler for focus events. */
  onFocus?: NativeSelectProps['onFocus']
  /** The handler for blur events. */
  onBlur?: NativeSelectProps['onBlur']
  /** A handler for when new values are created */
  onCreate?: (value: string) => void
  /** The selected option data. */
  value?: SelectOptionProps
  /** An arrary of objects conforming to OptionProps interface. */
  options: SelectOptionProps[]
  size?: Size
}

export const Select = React.forwardRef(
  (
    {
      description,
      disabled,
      autocomplete = false,
      createable = false,
      createablePrefix = 'Add ',
      error,
      hideLabel,
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
      emptyListMessage = 'No results',
      value: _selected,
      size = 'medium',
    }: SelectProps,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const defaultRef = React.useRef<HTMLDivElement>(null)
    const rootRef = (ref as React.RefObject<HTMLDivElement>) || defaultRef

    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const [inputValue, setInputValue] = React.useState('')

    const [queryValue, setQueryValue] = React.useState('')
    const isCreateable = createable && queryValue !== ''
    const isAutocomplete = createable || autocomplete

    const [id] = React.useState(_id || uniqueId())

    // Internal tracker of selected
    const [selected, setSelected] = React.useState<SelectOptionProps | null>(
      null,
    )
    React.useEffect(() => {
      if (_selected?.value !== selected?.value && _selected !== undefined)
        setSelected(_selected)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_selected])

    const changeSelectedOption = (option?: SelectOptionProps) => {
      if (option?.disabled) return
      if (option?.value === CREATE_OPTION_VALUE) {
        if (onCreate) onCreate(queryValue)
        else if (process.env.NODE_ENV !== 'production')
          console.warn('onCreate was called but is not defined')
      } else if (option) {
        setSelected(option)
        if (onChange) onChange(option)
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

    const incrementHighlightIndex = React.useCallback(
      (direction: 'next' | 'previous') => {
        const maxIndex = isCreateable
          ? visibleOptions.length
          : visibleOptions.length - 1

        const nextIndex =
          direction === 'previous' ? highlightedIndex - 1 : highlightedIndex + 1

        if (nextIndex < 0) {
          changeHighlightIndex(-1)
        } else if (nextIndex > maxIndex) {
          changeHighlightIndex(maxIndex)
        } else {
          const isActive = (x: SelectOptionProps) => !x.disabled
          let nextActiveIndex = highlightedIndex
          if (direction === 'previous') {
            nextActiveIndex = findLastIndex(visibleOptions, isActive, nextIndex)
          } else {
            const _index = findIndex(visibleOptions, isActive, nextIndex)
            if (_index != -1) nextActiveIndex = _index
          }
          changeHighlightIndex(nextActiveIndex)
        }
      },
      [visibleOptions, highlightedIndex, changeHighlightIndex, isCreateable],
    )

    const selectHighlightedIndex = () => {
      const option = options[highlightedIndex]
      option && changeSelectedOption(option)
      setQueryValue('')
      setInputValue('')
    }

    const [menuOpen, setMenuOpen] = React.useState(false)
    const isOpen = !disabled && menuOpen
    useEffect(() => {
      if (!menuOpen) handleReset()
    }, [menuOpen])

    /**
     * Event Handlers
     */

    const handleReset = () => {
      setQueryValue('')
      setInputValue('')
      setHighlightedIndex(-1)
    }

    const handleSelectContainerClick = (
      e: React.MouseEvent<HTMLDivElement>,
    ) => {
      e.stopPropagation()
      if (isAutocomplete && !menuOpen) setMenuOpen(true)
      !isAutocomplete && setMenuOpen(!menuOpen)
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

      if (!['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) return

      e.preventDefault()
      e.stopPropagation()

      if (e.key === 'ArrowUp') incrementHighlightIndex('previous')
      else if (e.key === 'ArrowDown') incrementHighlightIndex('next')
      if (e.key === 'Enter') {
        selectHighlightedIndex()
        setMenuOpen(false)
      }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.currentTarget.value
      setQueryValue(newValue)
      setInputValue(newValue)
      setHighlightedIndex(-1)
    }

    const handleInputClear = (e: React.MouseEvent<HTMLDivElement>) => {
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
        changeSelectedOption(option)
        setMenuOpen(false)
      }

    const handleOptionMouseover = (e: React.MouseEvent<HTMLDivElement>) => {
      const index = Number(e.currentTarget.getAttribute('data-option-index'))
      if (!isNaN(index)) changeHighlightIndex(index)
    }

    useDocumentEvent(rootRef, 'click', () => setMenuOpen(false), menuOpen)

    const OptionElement = ({ option }: { option: SelectOptionProps | null }) =>
      option ? (
        <React.Fragment>
          {option.prefix && <div>{option.prefix}</div>}
          {option.label || option.value}
        </React.Fragment>
      ) : null

    return (
      <Field
        data-testid="select"
        description={description}
        error={error}
        hideLabel={hideLabel}
        id={id}
        label={label}
        labelSecondary={labelSecondary}
        required={required}
        width={width}
      >
        <div style={{ position: 'relative' }}>
          <SelectContainer
            $size={size}
            aria-controls={`listbox-${id}`}
            aria-expanded="true"
            aria-haspopup="listbox"
            aria-invalid={error ? true : undefined}
            id={`combo-${id}`}
            ref={rootRef}
            role="combobox"
            onClick={handleSelectContainerClick}
            {...{ $disabled: disabled, tabIndex }}
            onKeyDown={handleKeydown}
            {...{ onFocus, onBlur }}
            data-testid="select-container"
          >
            <OptionElementContainer data-testid="selected">
              {isAutocomplete && isOpen ? (
                <>
                  <input
                    autoCapitalize="none"
                    autoComplete="off"
                    autoFocus
                    data-testid="select-input"
                    placeholder={selected?.label}
                    ref={inputRef}
                    spellCheck="false"
                    style={{ flex: '1', height: '100%' }}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={(e) =>
                      handleKeydown(e as React.KeyboardEvent<HTMLInputElement>)
                    }
                  />
                  <ClearIconContainer $size={size} onClick={handleInputClear}>
                    <CloseSVG />
                  </ClearIconContainer>
                </>
              ) : (
                <OptionElement option={selected} />
              )}
            </OptionElementContainer>
            <Chevron {...{ $open: isOpen, $disabled: disabled }} />
          </SelectContainer>
          <SelectOptionContainer
            {...{ $open: isOpen }}
            id={`listbox-${id}`}
            role="listbox"
            tabIndex={-1}
            onMouseLeave={handleOptionsListMouseLeave}
          >
            {visibleOptions.length === 0 && (
              <NoResultsContainer>{emptyListMessage}</NoResultsContainer>
            )}
            {visibleOptions.map((option, index) => (
              <SelectOption
                {...{
                  $selected: option?.value === selected?.value,
                  $disabled: option.disabled,
                  $highlighted: index === highlightedIndex,
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
          </SelectOptionContainer>
        </div>
      </Field>
    )
  },
)

Select.displayName = 'Select'
