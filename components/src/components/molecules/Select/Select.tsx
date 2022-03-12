import * as React from 'react'
import styled from 'styled-components'

import uniqueId from 'lodash/uniqueId'

import { Field } from '../..'
import { FieldBaseProps } from '../../atoms/Field'
import IconDownIndicatorSvg from '@/src/Icons/DownIndicator.svg'
import { tokens } from '@/src/tokens'
import Svg from '@/src/components/atoms/Svg/Svg'

const SelectContainer = styled.div<{ disabled?: boolean }>`
  ${({ theme }) => `
    background: ${tokens.colors[theme.mode].background};
    background-color: ${tokens.colors[theme.mode].backgroundHide};
    border-width: ${tokens.space['px']};
    border-radius: ${tokens.radii['extraLarge']};
    cursor: pointer;
    position: relative;
    padding: ${tokens.space['4']};
    height: ${tokens.space['14']}
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    z-index: 10;
  `}

  ${({ disabled, theme }) =>
    disabled &&
    `
    cursor: not-allowed;
    background: ${tokens.colors[theme.mode].backgroundTertiary};
  `}
`

const OptionElementContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: ${tokens.space['4']};
`

const Chevron = styled(Svg)<{ open?: boolean; disabled?: boolean }>`
  margin-left: ${tokens.space['1']};
  width: ${tokens.space['3']};
  margin-right: ${tokens.space['0.5']};
  transition-duration: ${tokens.transitionDuration['200']};
  transition-property: all;
  transition-timing-function: ${tokens.transitionTimingFunction['inOut']};
  opacity: 0.3;
  transform: rotate(0deg);

  ${(p) =>
    p.open &&
    `
      opacity: 1;
      transform: rotate(180deg);
  `}

  ${(p) =>
    p.disabled &&
    `
      opacity: 0.1;
  `}
`

const SelectOptionContainer = styled.div<{ open?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: ${tokens.space['1.5']};
  padding: ${tokens.space['1.5']};
  position: absolute;
  visibility: hidden;
  opacity: 0;
  width: ${tokens.space['full']};
  height: ${tokens.space['fit']};
  border-radius: ${tokens.radii['medium']};
  box-shadow: ${tokens.shadows['0.02']};
  overflow: hidden;

  ${({ open }) =>
    open
      ? `
      z-index: 20;
      visibility: visible;
      margin-top: ${tokens.space['1.5']};
      opacity ${tokens.opacity['100']};
      transition: all 0.3s cubic-bezier(1, 0, 0.22, 1.6), z-index 0s linear 0.3s;
  `
      : `
      z-index: 0;
      visibility: hidden;
      margin-top: -${tokens.space['12']};
      opacity: 0;
      transition: all 0.3s cubic-bezier(1, 0, 0.22, 1.6), z-index 0s linear 0s;
  `}
`

const SelectOption = styled.div<{ selected?: boolean; disabled?: boolean }>`
  align-items: center;
  cursor: pointer;
  display: flex;
  gap: ${tokens.space['3']};
  width: ${tokens.space['full']};
  height: ${tokens.space['9']};
  padding: 0 ${tokens.space['2']};
  justify-content: flex-start;
  transition-duration: ${tokens.transitionDuration['150']};
  transition-property: all;
  transition-timing-function: ${tokens.transitionTimingFunction['inOut']};
  border-radius: ${tokens.radii['medium']};
  margin: ${tokens.space['0.5']} 0;

  ${({ theme }) => `
    &:hover {
      background-color: ${
        tokens.colors[theme.mode].foregroundSecondaryHover
      };    
    }
    
    &::first-child {
      margin-top: ${tokens.space['0']};
    }
    
    &::last-child {
      margin-bottom: ${tokens.space['0']};
    }
  `}

  ${({ theme, selected }) =>
    selected &&
    `
      background-color: ${tokens.colors[theme.mode].foregroundSecondary};
  `}

  ${({ theme, disabled }) =>
    disabled &&
    `
      color: ${tokens.colors[theme.mode].textTertiary};
      cursor: not-allowed;
      
      &:hover {
        background-color: ${tokens.colors.base.transparent};
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

type SelectProps = Exclude<FieldBaseProps, 'inline'> & {
  id?: NativeSelectProps['id']
  disabled?: boolean
  onChange?: (selected: OptionProps | null) => void
  tabIndex?: NativeSelectProps['tabIndex']
  onFocus?: NativeSelectProps['onFocus']
  onBlur?: NativeSelectProps['onBlur']
  selected?: OptionProps
  options: OptionProps[] | OptionProps
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
    }: SelectProps,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const defaultRef = React.useRef<HTMLDivElement>(null)
    const inputRef = (ref as React.RefObject<HTMLDivElement>) || defaultRef

    const [id] = React.useState(_id || uniqueId())
    const [selected, setSelected] = React.useState<OptionProps | null>(null)

    const [menuOpen, setMenuOpen] = React.useState(false)

    const handleInputEvent = (
      e: React.MouseEvent | React.KeyboardEvent,
      type: 'mouse' | 'keyboard',
      value?: OptionProps,
    ) => {
      if (disabled || (value && value.disabled)) return e.stopPropagation()
      if (type === 'keyboard') {
        e = e as React.KeyboardEvent
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
            aria-controls={`listbox-${id}`}
            aria-expanded="true"
            aria-haspopup="listbox"
            aria-invalid={error ? true : undefined}
            id={`combo-${id}`}
            role="combobox"
            onClick={(e) => handleInputEvent(e, 'mouse')}
            {...{ disabled, tabIndex, open: menuOpen }}
          >
            <OptionElementContainer data-testid="selected">
              {selected ? <OptionElement option={selected} /> : <div />}
            </OptionElementContainer>
            <Chevron
              size="3"
              svg={IconDownIndicatorSvg}
              {...{ open: menuOpen, disabled }}
            />
          </SelectContainer>
          <SelectOptionContainer
            {...{ open: menuOpen }}
            id={`listbox-${id}`}
            role="listbox"
            tabIndex={-1}
          >
            {(Array.isArray(options) ? options : [options]).map((option) => (
              <SelectOption
                {...{
                  selected: option === selected,
                  disabled: option.disabled,
                }}
                key={option.value}
                role="option"
                onClick={(e) => handleInputEvent(e, 'mouse', option)}
                onKeyPress={(e) => handleInputEvent(e, 'keyboard', option)}
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
