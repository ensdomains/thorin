import * as React from 'react'
import styled, { FlattenInterpolation, css } from 'styled-components'

import { NativeInputProps } from '../../../types'
import { Field } from '../..'
import { FieldBaseProps } from '../../atoms/Field'

type BaseProps = FieldBaseProps & {
  /** If the element should attempt to gain focus after it is rendered. */
  autoFocus?: NativeInputProps['autoFocus']
  /** If the input should display a list of suggested words. */
  autoComplete?: NativeInputProps['autoComplete']
  /** If the imput should automatically fix spelling errors. */
  autoCorrect?: NativeInputProps['autoCorrect']
  /** The initial value of the input. Useful for checking if the value of the input has changed. */
  defaultValue?: string | number
  /** Disables input from receiving user input. */
  disabled?: boolean
  /** The id attribute of the input element. */
  id?: NativeInputProps['id']
  /** A hint to the browser of what type of input the input will receive. Allows browsers to display the corresponding keyboard. */
  inputMode?: NativeInputProps['inputMode']
  /** The name attribute of the input element. */
  name?: string
  /** The placeholder attribute of the input element. */
  placeholder?: NativeInputProps['placeholder']
  /** A string or component inserted in front of the input element. */
  prefix?: React.ReactNode
  /** Sets the input in read only mode. */
  readOnly?: NativeInputProps['readOnly']
  /** If the input will mark spelling errors in the text. */
  spellCheck?: NativeInputProps['spellCheck']
  /** A string or component inserted at the end of the input. */
  suffix?: React.ReactNode
  /** The tabindex attribute of the input element. */
  tabIndex?: NativeInputProps['tabIndex']
  /** The data type the input. */
  type?: 'email' | 'number' | 'text'
  /** Inserts text after the input text. */
  units?: string
  /** The value attribute of the input element. */
  value?: string | number
  /** A handler for blur events. */
  onBlur?: NativeInputProps['onBlur']
  /** A handler for change events. */
  onChange?: NativeInputProps['onChange']
  /** A handler for focus events. */
  onFocus?: NativeInputProps['onFocus']
  /** A handler for keydown events. */
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  /** Sets the height of the input element. */
  size?: 'medium' | 'large' | 'extraLarge'
  /** Set of styles  */
  parentStyles?: FlattenInterpolation<any>
} & Omit<NativeInputProps, 'size' | 'prefix'>

type WithTypeEmail = {
  type?: 'email'
}

type WithTypeText = {
  type?: 'text'
  maxLength?: NativeInputProps['maxLength']
}

type WithTypeNumber = {
  type?: 'number'
  /** Sets the max value of number type inputs as well as a tag to the label and a mx button at the end of the input element. */
  max?: NativeInputProps['max']
  /** Sets the min value of number type inputs. */
  min?: NativeInputProps['min']
}

interface InputParentProps {
  $size: 'medium' | 'large' | 'extraLarge'
  $disabled?: boolean
  $error?: boolean
  $suffix: boolean
  $userStyles?: FlattenInterpolation<any>
}

const InputParent = styled.div<InputParentProps>(
  ({ theme, $size, $disabled, $error, $suffix, $userStyles }) => css`
    background-color: ${theme.colors.backgroundSecondary};
    border-radius: ${theme.radii['2xLarge']};
    border-width: ${theme.space['0.75']};
    border-color: ${theme.colors.transparent};
    color: ${theme.colors.text};
    display: flex;
    transition-duration: ${theme.transitionDuration['150']};
    transition-property: color, border-color, background-color;
    transition-timing-function: ${theme.transitionTimingFunction['inOut']};

    &:focus-within {
      border-color: ${theme.colors.accentSecondary};
    }

    ${$disabled &&
    css`
      border-color: ${theme.colors.foregroundSecondary};
      background-color: ${theme.colors.background};
    `}

    ${$error &&
    css`
      border-color: ${theme.colors.red};
      cursor: default;

      &:focus-within {
        border-color: ${theme.colors.red};
      }
    `}

  ${$suffix &&
    css`
      height: ${theme.space['16']};
    `}

  ${() => {
      switch ($size) {
        case 'medium':
          return css`
            height: ${theme.space['14']};
          `
        case 'large':
          return css`
            height: ${theme.space['16']};
          `
        case 'extraLarge':
          return css`
            height: ${theme.space['18']};
          `
        default:
          return ``
      }
    }}
  ${$userStyles}
  `,
)

const Prefix = styled.label(
  ({ theme }) => css`
    align-items: center;
    display: flex;
    height: ${theme.space['full']};
    line-height: normal;
    color: inherit;
    font-family: ${theme.fonts['sans']};
    font-weight: ${theme.fontWeights['medium']};
    padding-left: ${theme.space['4']};
    padding-right: ${theme.space['2']};
  `,
)

const Suffix = styled.label(
  ({ theme }) => css`
    align-items: center;
    display: flex;
    height: ${theme.space['full']};
    line-height: normal;
    color: inherit;
    font-family: ${theme.fonts['sans']};
    font-weight: ${theme.fontWeights['medium']};
    padding-left: ${theme.space['2']};
    padding-right: ${theme.space['2']};
  `,
)

const InputContainer = styled.div(
  ({ theme }) => css`
    overflow: hidden;
    position: relative;
    width: ${theme.space['full']};
  `,
)

interface InputComponentProps {
  $size: any
}

const InputComponent = styled.input<InputComponentProps>(
  ({ theme, disabled, type, $size }) => css`
    background-color: ${theme.colors.transparent};
    position: relative;
    width: ${theme.space['full']};
    height: ${theme.space['full']};
    padding: 0 ${theme.space['4']};
    font-weight: ${theme.fontWeights['medium']};

    &::placeholder {
      color: ${theme.colors.textPlaceholder};
      font-weight: ${theme.fontWeights['medium']};
    }

    ${disabled &&
    css`
      opacity: ${theme.opacity['50']};
      cursor: not-allowed;
    `}

    ${type === 'number' &&
    css`
      font-feature-settings: 'kern' 1, 'tnum' 1, 'calt' 0;
      font-variant-numeric: tabular-nums;
    `}

  ${() => {
      switch ($size) {
        case 'medium':
          return css`
            font-size: ${theme.fontSizes['base']};
          `
        case 'large':
          return css`
            font-size: ${theme.fontSizes['large']};
          `
        case 'extraLarge':
          return css`
            font-size: ${theme.fontSizes['headingThree']};
            padding: 0 ${theme.space['6']};
          `
        default:
          return ``
      }
    }}
  `,
)

const Ghost = styled.div<{ $type: HTMLInputElement['type']; $size: any }>(
  ({ theme, $type, $size }) => css`
    inset: 0;
    position: absolute;
    pointer-events: none;
    white-space: pre;
    line-height: normal;
    display: flex;
    align-items: center;

    padding: 0 ${theme.space['4']};
    border-color: ${theme.colors.transparent};

    ${$type === 'number' &&
    css`
      font-feature-settings: 'kern' 1, 'tnum' 1, 'calt' 0;
      font-variant-numeric: tabular-nums;
    `}

    ${() => {
      switch ($size) {
        case 'medium':
          return css`
            font-size: ${theme.fontSizes['base']};
          `
        case 'large':
          return css`
            font-size: ${theme.fontSizes['large']};
          `
        case 'extraLarge':
          return css`
            font-size: ${theme.fontSizes['headingThree']};
            padding: 0 ${theme.space['6']};
          `
        default:
          return ``
      }
    }}
  `,
)

const Units = styled.span(
  ({ theme }) => css`
    color: ${theme.colors.text};
    font-weight: ${theme.fontWeights['medium']};
  `,
)

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
              $disabled: disabled,
              $error: hasError,
              $suffix: suffix !== undefined,
              $size: size,
              $userStyles: parentStyles,
            }}
          >
            {prefix && (
              <Prefix aria-hidden="true" {...ids?.label}>
                {prefix}
              </Prefix>
            )}

            <InputContainer>
              <InputComponent
                $size={size}
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
                <Ghost
                  $size={size}
                  $type={inputType}
                  aria-hidden="true"
                  data-testid="ghost"
                >
                  <span style={{ visibility: 'hidden' }}>
                    {state.ghostValue}{' '}
                  </span>
                  <Units>{units}</Units>
                </Ghost>
              )}
            </InputContainer>

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
