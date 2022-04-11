import * as React from 'react'
import styled, { FlattenInterpolation } from 'styled-components'

import { ReactNode } from 'react'

import { Field } from '../..'
import { FieldBaseProps } from '../../atoms/Field'
import { tokens } from '@/src/tokens'

type NativeInputProps = React.AllHTMLAttributes<HTMLInputElement>

type BaseProps = FieldBaseProps & {
  autoFocus?: NativeInputProps['autoFocus']
  autoComplete?: NativeInputProps['autoComplete']
  autoCorrect?: NativeInputProps['autoCorrect']
  defaultValue?: string | number
  disabled?: boolean
  id?: NativeInputProps['id']
  inputMode?: NativeInputProps['inputMode']
  name?: string
  placeholder?: NativeInputProps['placeholder']
  prefix?: React.ReactNode
  readOnly?: NativeInputProps['readOnly']
  spellCheck?: NativeInputProps['spellCheck']
  suffix?: React.ReactNode
  tabIndex?: NativeInputProps['tabIndex']
  type?: 'email' | 'number' | 'text'
  units?: string
  value?: string | number
  onBlur?: NativeInputProps['onBlur']
  onChange?: React.EventHandler<React.ChangeEvent<HTMLInputElement>>
  onFocus?: NativeInputProps['onFocus']
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  size?: 'medium' | 'large' | 'extraLarge'
  parentStyles?: FlattenInterpolation<any>
}

type WithTypeEmail = {
  type?: 'email'
}

type WithTypeText = {
  type?: 'text'
  maxLength?: NativeInputProps['maxLength']
}

type WithTypeNumber = {
  type?: 'number'
  max?: NativeInputProps['max']
  min?: NativeInputProps['min']
}

interface InputParentProps {
  size: 'medium' | 'large' | 'extraLarge'
  disabled?: boolean
  error?: boolean
  suffix: boolean
  userStyles?: FlattenInterpolation<any>
}

const InputParent = styled.div<InputParentProps>`
  ${({ theme }) => `
    background-color: ${tokens.colors[theme.mode].backgroundSecondary};
    border-radius: ${tokens.radii['2xLarge']};
    border-width: ${tokens.space['0.75']};
    border-color: ${tokens.colors.base.transparent};
    color: ${tokens.colors[theme.mode].text};
    display: flex;
    transition-duration: ${tokens.transitionDuration['150']};
    transition-property: colors;
    transition-timing-function: ${tokens.transitionTimingFunction['inOut']};
    
    &:focus-within {
      border-color: ${tokens.colors[theme.mode].accentSecondary};
    }
  `}

  ${({ theme, disabled }) =>
    disabled &&
    `
      border-color: ${tokens.colors[theme.mode].foregroundSecondary};
      background-color: ${tokens.colors[theme.mode].background};
  `}

  ${({ theme, error }) =>
    error &&
    `
      border-color: ${tokens.colors[theme.mode].red};
      cursor: default;
      
      &:focus-within {
        border-color: ${tokens.colors[theme.mode].red};
      }
  `}

  ${({ suffix }) =>
    suffix &&
    `
      height: ${tokens.space['16']};
  `}

  ${({ size }) => {
    switch (size) {
      case 'medium':
        return `
          height: ${tokens.space['14']};
        `
      case 'large':
        return `
          height: ${tokens.space['16']};
        `
      case 'extraLarge':
        return `
          height: ${tokens.space['18']};
        `
      default:
        return ``
    }
  }}
  ${({ userStyles }) => userStyles}
`

const Prefix = styled.label`
  align-items: center;
  display: flex;
  height: ${tokens.space['full']};
  line-height: normal;
  color: inherit;
  font-family: ${tokens.fonts['sans']};
  font-weight: ${tokens.fontWeights['medium']};
  padding-left: ${tokens.space['4']};
  padding-right: ${tokens.space['2']};
`

const Suffix = styled.label`
  align-items: center;
  display: flex;
  height: ${tokens.space['full']};
  line-height: normal;
  color: inherit;
  font-family: ${tokens.fonts['sans']};
  font-weight: ${tokens.fontWeights['medium']};
  padding-left: ${tokens.space['2']};
  padding-right: ${tokens.space['2']};
`

const InputContainer = styled.div`
  overflow: hidden;
  position: relative;
  width: ${tokens.space['full']};
`

interface InputComponentProps {
  size: any
}

const InputComponent = styled.input<InputComponentProps>`
  ${({ theme }) => `
    background-color: ${tokens.colors.base.transparent};
    position: relative;
    width: ${tokens.space['full']};
    height: ${tokens.space['full']};
    padding: 0 ${tokens.space['4']};
    font-weight: ${tokens.fontWeights['medium']};
    
    &::placeholder {
        color: ${tokens.colors[theme.mode].textPlaceholder};
        font-weight: ${tokens.fontWeights['bold']};
    }
  `}

  ${({ disabled }) =>
    disabled &&
    `
        opacity ${tokens.opacity['50']};
        cursor: not-allowed;
  `}

  ${({ type }) =>
    type === 'number' &&
    `
        font-feature-settings: 'kern' 1,  'tnum' 1, 'calt' 0;
        font-variant-numeric: tabular-nums;
  `}

  ${({ size }) => {
    switch (size) {
      case 'medium':
        return `
          font-size: ${tokens.fontSizes['base']};
        `
      case 'large':
        return `
          font-size: ${tokens.fontSizes['large']};
        `
      case 'extraLarge':
        return `
          font-size: ${tokens.fontSizes['headingThree']};
          padding: 0 ${tokens.space['6']};
        `
      default:
        return ``
    }
  }}
`

const Ghost = styled.div<{ type: HTMLInputElement['type'] }>`
  border-color: ${tokens.colors.base.transparent};
  inset: 0;
  position: absolute;
  pointer-events: none;
  white-space: pre;
  line-height: normal;

  ${({ type }) =>
    type === 'number' &&
    `
        font-feature-settings: 'kern' 1,  'tnum' 1, 'calt' 0;
        font-variant-numeric: tabular-nums;
  `}
`

const Units = styled.span`
  ${({ theme }) => `
    color: ${tokens.colors[theme.mode].text};
  `}
`

const MaxContainer = styled.div<{ suffix: ReactNode }>`
  display: flex;
  align-items: center;
  ${({ suffix }) => suffix && `padding-right: ${tokens.space['4']};`}
`

const MaxButton = styled.button`
  ${({ theme }) => `
      background-color: ${tokens.colors[theme.mode].foregroundSecondary};
      border-radius: ${tokens.radii['medium']};
      color: ${tokens.colors[theme.mode].textSecondary};
      cursor: pointer;
      font-size: ${tokens.fontSizes['label']};
      font-weight: ${tokens.fontWeights['semiBold']};
      height: ${tokens.space['max']};
      line-height: none;
      padding: ${tokens.space['2']};
      text-transform: uppercase;
      transition-duration: ${tokens.transitionDuration['150']};
      transition-property: colors;
      transition-timing-function: ${tokens.transitionTimingFunction['inOut']};
      visibility: hidden;
      
      &:hover {
        color: ${tokens.colors[theme.mode].text};
      }
      
      ${InputParent}:hover & {
        visibility: visible;
      }
      
      ${InputParent}:focus-within & {
        visibility: visible;
      }
  `}
`

type Props = BaseProps & (WithTypeEmail | WithTypeText | WithTypeNumber)

export const Input = React.forwardRef(
  (
    {
      autoFocus,
      autoComplete,
      autoCorrect,
      defaultValue,
      description,
      disabled,
      error,
      hideLabel,
      id,
      inputMode,
      label,
      labelSecondary,
      name,
      placeholder,
      prefix,
      readOnly,
      required,
      spellCheck,
      suffix,
      tabIndex,
      type = 'text',
      units,
      value,
      width,
      onBlur,
      onChange,
      onFocus,
      onKeyDown,
      size = 'medium',
      parentStyles,
      ...props
    }: Props,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const defaultRef = React.useRef<HTMLInputElement>(null)
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || defaultRef

    const [state, setState] = React.useState<{
      ghostValue?: Props['value']
    }>({ ghostValue: value || defaultValue })

    const placeholderText = placeholder
      ? `${placeholder ?? ''}${units ? ` ${units}` : ''}`
      : undefined
    const hasError = error ? true : undefined

    const max = (props as WithTypeNumber).max
    const inputType = type === 'number' ? 'number' : 'text'

    const handleInput = React.useCallback(
      (event: React.FormEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value
        setState((x) => ({ ...x, ghostValue: value }))
      },
      [],
    )

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (type === 'number') {
          const key = event.key
          const filteredKeys = ['E', 'e', '+']
          if (filteredKeys.includes(key)) event.preventDefault()
        }
        onKeyDown && onKeyDown(event)
      },
      [type, onKeyDown],
    )

    const handleWheel = React.useCallback(
      (event: React.WheelEvent<HTMLElement>) => {
        ;(event.target as HTMLElement)?.blur()
      },
      [],
    )

    const handleMax = React.useCallback(() => {
      if (onChange)
        onChange({
          target: { value: max },
        } as React.ChangeEvent<HTMLInputElement>)
      else if (inputRef.current) inputRef.current.value = max as string
      if (!units) return
      setState((x) => ({ ...x, ghostValue: max }))
    }, [inputRef, max, units, onChange])

    return (
      <Field
        description={description}
        error={error}
        hideLabel={hideLabel}
        id={id}
        label={label}
        labelSecondary={labelSecondary}
        required={required}
        width={width}
      >
        {(ids) => (
          <InputParent
            {...{
              disabled,
              error: hasError,
              suffix: suffix !== undefined,
              size,
              userStyles: parentStyles,
            }}
          >
            {prefix && (
              <Prefix aria-hidden="true" {...ids?.label}>
                {prefix}
              </Prefix>
            )}

            <InputContainer>
              <InputComponent
                aria-invalid={hasError}
                autoComplete={autoComplete}
                autoCorrect={autoCorrect}
                autoFocus={autoFocus}
                defaultValue={defaultValue}
                disabled={disabled}
                inputMode={inputMode}
                name={name}
                placeholder={placeholderText}
                readOnly={readOnly}
                ref={inputRef}
                size={size}
                spellCheck={spellCheck}
                tabIndex={tabIndex}
                type={inputType}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                onFocus={onFocus}
                onInput={handleInput}
                onKeyDown={type === 'number' ? handleKeyDown : onKeyDown}
                onWheel={type === 'number' ? handleWheel : undefined}
                {...props}
                {...ids?.content}
              />

              {units && state.ghostValue && (
                <Ghost aria-hidden="true" data-testid="ghost" type={inputType}>
                  <span style={{ visibility: 'hidden' }}>
                    {state.ghostValue}{' '}
                  </span>
                  <Units>{units}</Units>
                </Ghost>
              )}
            </InputContainer>

            {max && (
              <MaxContainer suffix={suffix}>
                <MaxButton onClick={handleMax}>Max</MaxButton>
              </MaxContainer>
            )}

            {suffix && (
              <Suffix aria-hidden="true" {...ids?.label}>
                {suffix}
              </Suffix>
            )}
          </InputParent>
        )}
      </Field>
    )
  },
)

Input.displayName = 'Input'
