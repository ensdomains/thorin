import * as React from 'react'
import styled from 'styled-components'

import uniqueId from 'lodash/uniqueId'

import { Field } from '../..'
import { FieldBaseProps } from '../../atoms/Field'
import { ReactComponent as IconDownIndicatorSvg } from '@/src/icons/DownIndicator.svg'

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

const SelectOption = styled.div<{ $selected?: boolean; $disabled?: boolean }>`
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

    &:hover {
      background-color: ${theme.colors.foregroundSecondaryHover};    
    }
    
    &::first-child {
      margin-top: ${theme.space['0']};
    }
    
    &::last-child {
      margin-bottom: ${theme.space['0']};
    }
  `}

  ${({ theme, $selected }) =>
    $selected &&
    `
      background-color: ${theme.colors.foregroundSecondary};
  `}

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

type NativeSelectProps = React.AllHTMLAttributes<HTMLDivElement>

type OptionProps = {
  value: string
  label?: string
  prefix?: React.ReactNode
  disabled?: boolean
}

type SelectProps = Omit<FieldBaseProps, 'inline'> & {
  /** The id attribute of div element. */
  id?: NativeSelectProps['id']
  /** If true, prevents user interaction with component. */
  disabled?: boolean
  /** The handler for change events. */
  onChange?: (selected: OptionProps | null) => void
  /** The tabindex attribute for  */
  tabIndex?: NativeSelectProps['tabIndex']
  /** The handler for focus events. */
  onFocus?: NativeSelectProps['onFocus']
  /** The handler for blur events. */
  onBlur?: NativeSelectProps['onBlur']
  /** The selected option data. */
  selected?: OptionProps
  /** An arrary of objects conforming to OptionProps interface. */
  options: OptionProps[] | OptionProps
  size?: Size
}

export const Select = React.forwardRef(
  (
    {
      description,
      disabled,
      error,
      hideLabel,
      id: _id,
      label,
      labelSecondary,
      required,
      tabIndex,
      width,
      onBlur,
      onChange,
      onFocus,
      options,
      selected: _selected,
      size = 'medium',
    }: SelectProps,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const defaultRef = React.useRef<HTMLDivElement>(null)
    const inputRef = (ref as React.RefObject<HTMLDivElement>) || defaultRef

    const [id] = React.useState(_id || uniqueId())
    const [selected, setSelected] = React.useState<OptionProps | null>(null)

    const [menuOpen, setMenuOpen] = React.useState(false)

    const handleInputEvent = (
      e: React.MouseEvent | React.KeyboardEvent<HTMLDivElement>,
      type: 'mouse' | 'keyboard',
      value?: OptionProps,
    ) => {
      if (disabled || (value && value.disabled)) return e.stopPropagation()
      if (type === 'keyboard') {
        e = e as React.KeyboardEvent<HTMLDivElement>
        if (!menuOpen && ['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key))
          return setMenuOpen(true)
        if (menuOpen && e.key === 'Enter') {
          value && setSelected(value)
          setMenuOpen(false)
          return
        }
      } else {
        e = e as React.MouseEvent
        if (e.type === 'click' && e.button === 0) {
          value && setSelected(value)
          setMenuOpen(!menuOpen)
        }
      }
    }

    const handleClickOutside = (e: any) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }

    React.useEffect(() => {
      if (_selected !== selected && _selected !== undefined)
        setSelected(_selected)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_selected])

    React.useEffect(() => {
      if (menuOpen) {
        document.addEventListener('mousedown', handleClickOutside)
      } else {
        document.removeEventListener('mousedown', handleClickOutside)
      }
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputRef, menuOpen])

    React.useEffect(() => {
      if (selected !== _selected && onChange) onChange(selected)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected])

    const OptionElement = ({ option }: { option: OptionProps | null }) =>
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
        <div
          ref={inputRef}
          style={{ position: 'relative' }}
          {...{ onFocus, onBlur }}
        >
          <SelectContainer
            $size={size}
            aria-controls={`listbox-${id}`}
            aria-expanded="true"
            aria-haspopup="listbox"
            aria-invalid={error ? true : undefined}
            id={`combo-${id}`}
            role="combobox"
            onClick={(e) => handleInputEvent(e, 'mouse')}
            {...{ $disabled: disabled, tabIndex }}
          >
            <OptionElementContainer data-testid="selected">
              {selected ? <OptionElement option={selected} /> : <div />}
            </OptionElementContainer>
            <Chevron {...{ $open: menuOpen, $disabled: disabled }} />
          </SelectContainer>
          <SelectOptionContainer
            {...{ $open: menuOpen }}
            id={`listbox-${id}`}
            role="listbox"
            tabIndex={-1}
          >
            {(Array.isArray(options) ? options : [options]).map((option) => (
              <SelectOption
                {...{
                  $selected: option === selected,
                  $disabled: option.disabled,
                }}
                key={option.value}
                role="option"
                onClick={(e) => handleInputEvent(e, 'mouse', option)}
                onKeyPress={(e) =>
                  handleInputEvent(
                    e as React.KeyboardEvent<HTMLDivElement>,
                    'keyboard',
                    option,
                  )
                }
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
