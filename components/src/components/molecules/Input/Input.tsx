import * as React from 'react'
import styled, { FlattenInterpolation, css } from 'styled-components'

import { Field } from '../..'
import { FieldBaseProps } from '../../atoms/Field'
import { Space } from '../../../tokens/index'

type NativeInputProps = React.InputHTMLAttributes<HTMLInputElement>

type BaseProps = Omit<FieldBaseProps, 'inline'> & {
  /** If the element should attempt to gain focus after it is rendered. */
  autoFocus?: NativeInputProps['autoFocus']
  /** If the input should display a list of suggested words. */
  autoComplete?: NativeInputProps['autoComplete']
  /** If the imput should automatically fix spelling errors. */
  autoCorrect?: NativeInputProps['autoCorrect']
  /** The initial value of the input. Useful for checking if the value of the input has changed. */
  defaultValue?: string | number
  /** Disables input from receiving user input. */
  disabled?: NativeInputProps['disabled']
  /** The id attribute of the input element. */
  id?: NativeInputProps['id']
  /** A hint to the browser of what type of input the input will receive. Allows browsers to display the corresponding keyboard. */
  inputMode?: NativeInputProps['inputMode']
  /** The name attribute of the input element. */
  name?: NativeInputProps['name']
  /** The placeholder attribute of the input element. */
  placeholder?: NativeInputProps['placeholder']
  /** A string or component inserted in front of the input element. */
  prefix?: React.ReactNode
  /** Set the element type that wraps the prefix. Useful when you do not want clicks on the prefix to cause the input to focus */
  prefixAs?: 'div'
  /** Sets the input in read only mode. */
  readOnly?: NativeInputProps['readOnly']
  /** If the input will mark spelling errors in the text. */
  spellCheck?: NativeInputProps['spellCheck']
  /** A string or component inserted at the end of the input. */
  suffix?: React.ReactNode
  /** Set the element type that wraps the suffix. Useful when you do not want clicks on the suffix to cause the input to focus */
  suffixAs?: 'div'
  /** The tabindex attribute of the input element. */
  tabIndex?: NativeInputProps['tabIndex']
  /** The data type the input. */
  type?: 'number' | 'text' | 'email' | 'date' | 'datetime-local'
  /** Inserts text after the input text. */
  units?: string
  /** The value attribute of the input element. */
  value?: string | number
  /** If true, the input has changes */
  validated?: boolean
  /** If true, the value has been validated */
  showDot?: boolean
  /** A handler for blur events. */
  onBlur?: NativeInputProps['onBlur']
  /** A handler for change events. */
  onChange?: NativeInputProps['onChange']
  /** A handler for focus events. */
  onFocus?: NativeInputProps['onFocus']
  /** A handler for keydown events. */
  onKeyDown?: NativeInputProps['onKeyDown']
  /** Sets the height of the input element. */
  size?: 'medium' | 'large' | 'extraLarge'
  /** Override the padding settings */
  padding?: Space | { prefix?: Space; suffix?: Space; input?: Space }
  /** Set of styles  */
  parentStyles?: FlattenInterpolation<any>
} & Omit<
    NativeInputProps,
    | 'size'
    | 'prefix'
    | 'children'
    | 'value'
    | 'defaultValue'
    | 'type'
    | 'aria-invalid'
    | 'onInput'
    | 'onKeyDown'
    | 'onWheel'
  >

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

type WithTypeDate = {
  type?: 'date' | 'datetime-local'
  max?: NativeInputProps['max']
  min?: NativeInputProps['min']
  step?: NativeInputProps['step']
}

interface InputParentProps {
  $size: 'medium' | 'large' | 'extraLarge'
  $disabled?: boolean
  $error?: boolean
  $suffix: boolean
  $validated?: boolean
  $showDot?: boolean
  $userStyles?: FlattenInterpolation<any>
}

const getPadding = (
  key: 'prefix' | 'suffix' | 'input',
  fallback: Space,
  padding: BaseProps['padding'],
): Space => {
  if (typeof padding === 'string') return padding
  return padding?.[key] || fallback
}

const InputParent = styled.div<InputParentProps>(
  ({
    theme,
    $size,
    $disabled,
    $error,
    $suffix,
    $userStyles,
    $validated,
    $showDot,
  }) => css`
    position: relative;
    background-color: ${theme.colors.backgroundSecondary};
    border-radius: ${theme.radii['2xLarge']};
    border-width: ${theme.space['0.75']};
    border-color: transparent;
    color: ${theme.colors.text};
    display: flex;
    transition-duration: ${theme.transitionDuration['150']};
    transition-property: color, border-color, background-color;
    transition-timing-function: ${theme.transitionTimingFunction['inOut']};
    box-sizing: content-box;
    background-clip: content-box;

    :after {
      content: '';
      position: absolute;
      width: ${theme.space['4']};
      height: ${theme.space['4']};
      box-sizing: border-box;
      border-radius: 50%;
      right: 0;
      top: 0;
      transition: all 0.3s ease-out;
      ${() => {
        if ($error && $showDot)
          return css`
            background-color: ${theme.colors.red};
            border: 2px solid ${theme.colors.background};
            transform: translate(50%, -50%) scale(1);
          `
        if ($validated && $showDot)
          return css`
            background-color: ${theme.colors.green};
            border: 2px solid ${theme.colors.background};
            transform: translate(50%, -50%) scale(1);
          `
        return css`
          background-color: transparent;
          border: 2px solid transparent;
          transform: translate(50%, -50%) scale(0.2);
        `
      }}
    }

    &:focus-within {
      ${!$error &&
      css`
        border-color: ${theme.colors.accentBright};
      `}
    }

    &:focus-within::after {
      ${!$error &&
      $showDot &&
      css`
        background-color: ${theme.colors.blue};
        border-color: ${theme.colors.background};
        transform: translate(50%, -50%) scale(1);
      `}
    }

    ${$disabled &&
    css`
      border-color: ${theme.colors.greyBright};
      background-color: ${theme.colors.background};
    `}

    ${$error &&
    css`
      border-color: ${theme.colors.red};
      cursor: default;
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

const Prefix = styled.label<{ $padding: Space }>(
  ({ theme, $padding }) => css`
    align-items: center;
    display: flex;
    height: ${theme.space['full']};
    line-height: normal;
    color: inherit;
    font-family: ${theme.fonts['sans']};
    font-weight: ${theme.fontWeights['medium']};
    padding-left: ${theme.space[$padding]};
  `,
)

const Suffix = styled.label<{ $padding: Space }>(
  ({ theme, $padding }) => css`
    align-items: center;
    display: flex;
    height: ${theme.space['full']};
    line-height: normal;
    color: inherit;
    font-family: ${theme.fonts['sans']};
    font-weight: ${theme.fontWeights['medium']};
    padding-right: ${theme.space[$padding]};
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
  $padding: Space
}

const InputComponent = styled.input<InputComponentProps>(
  ({ theme, disabled, type, $size, $padding }) => css`
    background-color: transparent;
    position: relative;
    width: ${theme.space['full']};
    height: ${theme.space['full']};
    padding: 0 ${theme.space[$padding]};
    font-weight: ${theme.fontWeights['medium']};
    text-overflow: ellipsis;

    &::placeholder {
      color: ${theme.colors.greySurface};
      font-weight: ${theme.fontWeights['medium']};
    }

    ${disabled &&
    css`
      opacity: 0.5;
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
    border-color: transparent;

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

type Props = BaseProps &
  (WithTypeEmail | WithTypeText | WithTypeNumber | WithTypeDate)

export const Input = React.forwardRef(
  (
    {
      autoFocus,
      autoComplete = 'off',
      autoCorrect,
      defaultValue,
      description,
      disabled,
      error,
      validated,
      showDot,
      hideLabel,
      id,
      inputMode,
      label,
      labelSecondary,
      labelPlacement,
      name,
      placeholder,
      prefix,
      prefixAs,
      readOnly,
      required,
      spellCheck,
      suffix,
      suffixAs,
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
      padding,
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

    const inputType = type === 'email' ? 'text' : type

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

    const prefixPadding = getPadding('prefix', '4', padding)
    const inputPadding = getPadding(
      'input',
      size === 'extraLarge' ? '6' : '4',
      padding,
    )
    const suffixPadding = getPadding('suffix', '2', padding)

    return (
      <Field
        description={description}
        error={error}
        hideLabel={hideLabel}
        id={id}
        label={label}
        labelPlacement={labelPlacement}
        labelSecondary={labelSecondary}
        required={required}
        width={width}
      >
        {(ids) => (
          <InputParent
            {...{
              $disabled: disabled,
              $error: hasError,
              $validated: validated,
              $showDot: showDot,
              $suffix: suffix !== undefined,
              $size: size,
              $userStyles: parentStyles,
            }}
          >
            {prefix && (
              <Prefix
                aria-hidden="true"
                as={prefixAs}
                {...ids?.label}
                $padding={prefixPadding}
              >
                {prefix}
              </Prefix>
            )}

            <InputContainer>
              <InputComponent
                ref={inputRef}
                {...{
                  ...props,
                  ...ids?.content,
                  'aria-invalid': hasError,
                  onInput: handleInput,
                  onKeyDown: type === 'number' ? handleKeyDown : onKeyDown,
                  onWheel: type === 'number' ? handleWheel : undefined,
                }}
                $padding={inputPadding}
                $size={size}
                autoComplete={autoComplete}
                autoCorrect={autoCorrect}
                autoFocus={autoFocus}
                defaultValue={defaultValue}
                disabled={disabled}
                inputMode={inputMode}
                name={name}
                placeholder={placeholderText}
                readOnly={readOnly}
                spellCheck={spellCheck}
                tabIndex={tabIndex}
                type={inputType}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                onFocus={onFocus}
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
              <Suffix
                aria-hidden="true"
                as={suffixAs}
                {...ids?.label}
                $padding={suffixPadding}
              >
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
