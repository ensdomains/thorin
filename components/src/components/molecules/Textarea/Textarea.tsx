import * as React from 'react'
import styled, { css } from 'styled-components'

import { Field } from '../..'
import { FieldBaseProps } from '../../atoms/Field'

const Container = styled.div<{
  $validated?: boolean
  $error?: boolean
  $showDot?: boolean
  $disabled?: boolean
}>(
  ({ theme, $error, $validated, $showDot, $disabled }) => css`
    position: relative;
    background-color: ${theme.colors.backgroundSecondary};
    border-radius: ${theme.radii['2xLarge']};
    border-width: ${theme.space['0.75']};
    border-color: ${theme.colors.transparent};
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
            border: 2px solid ${theme.colors.white};
            transform: translate(50%, -50%) scale(1);
          `
        if ($validated && $showDot)
          return css`
            background-color: ${theme.colors.green};
            border: 2px solid ${theme.colors.white};
            transform: translate(50%, -50%) scale(1);
          `
        return css`
          background-color: ${theme.colors.transparent};
          border: 2px solid ${theme.colors.transparent};
          transform: translate(50%, -50%) scale(0.2);
        `
      }}
    }

    &:focus-within {
      ${!$error &&
      css`
        border-color: ${theme.colors.accentSecondary};
      `}
    }

    &:focus-within::after {
      ${!$error &&
      $showDot &&
      css`
        background-color: ${theme.colors.blue};
        border-color: ${theme.colors.white};
        transform: translate(50%, -50%) scale(1);
      `}
    }
    &:focus {
      border-color: ${theme.colors.accentSecondary};
    }

    ${$disabled &&
    css`
      border-color: ${theme.colors.foregroundSecondary};
      cursor: not-allowed;
    `}

    ${$error &&
    css`
      border-color: ${theme.colors.red};
      cursor: default;

      &:focus-within {
        border-color: ${theme.colors.red};
      }
    `}
  `,
)

const TextArea = styled.textarea<{
  $error?: boolean
  $validated?: boolean
  $showDot?: boolean
}>(
  ({ theme }) => css`
    position: relative;
    background-color: ${theme.colors.transparent};
    color: ${theme.colors.text};
    display: flex;
    font-family: ${theme.fonts['sans']};
    font-size: ${theme.fontSizes['base']};
    font-weight: ${theme.fontWeights['medium']};
    min-height: ${theme.space['14']};
    padding: ${theme.space['4']};
    width: ${theme.space['full']};
    resize: none;
    outline: none;

    &::placeholder {
      color: ${theme.colors.textPlaceholder};
      font-weight: ${theme.fontWeights['medium']};
    }
  `,
)

type NativeTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

type Props = Omit<FieldBaseProps, 'inline'> & {
  /** If true, the input will automatically correct words it marks as spelling errors. */
  autoCorrect?: NativeTextareaProps['autoCorrect']
  /** If true, the component will attempt to get focus after it is rendered. */
  autoFocus?: NativeTextareaProps['autoFocus']
  /** The initial value. Useful for detecting changes in value. */
  defaultValue?: string | number
  /** If true, prevents user interaction. */
  disabled?: NativeTextareaProps['disabled']
  /** The id attribute of the textarea element. */
  id?: NativeTextareaProps['id']
  /** The name attribute of the textarea element. */
  name?: NativeTextareaProps['name']
  /** The maximum number of characters allowed. */
  maxLength?: NativeTextareaProps['maxLength']
  /** The placeholder attribute for textarea. */
  placeholder?: NativeTextareaProps['placeholder']
  /** The readOnly attribute for textarea.  */
  readOnly?: NativeTextareaProps['readOnly']
  /** Specifies the height of the text area in rows. */
  rows?: NativeTextareaProps['rows']
  /** Textarea will mark words which it thinks are misspellings. */
  spellCheck?: NativeTextareaProps['spellCheck']
  /** The tabindex attribute of textarea. */
  tabIndex?: NativeTextareaProps['tabIndex']
  /** The value attribute of textarea. */
  value?: string | number
  /** If true the value of the textarea has been validated */
  validated?: boolean
  /** If true, shows a status dot of the current state of validation */
  showDot?: boolean
  /** The handler for change events. */
  onChange?: NativeTextareaProps['onChange']
  /** The handler for blur events. */
  onBlur?: NativeTextareaProps['onBlur']
  /** The handler for focus events. */
  onFocus?: NativeTextareaProps['onFocus']
} & Omit<
    NativeTextareaProps,
    'children' | 'value' | 'defaultValue' | 'aria-invalid'
  >

export const Textarea = React.forwardRef(
  (
    {
      autoCorrect,
      autoFocus,
      defaultValue,
      description,
      disabled,
      error,
      validated,
      showDot,
      hideLabel,
      id,
      label,
      labelSecondary,
      maxLength,
      name,
      placeholder,
      readOnly,
      required,
      rows = 5,
      spellCheck,
      tabIndex,
      value,
      width,
      onChange,
      onBlur,
      onFocus,
      ...props
    }: Props,
    ref: React.Ref<HTMLTextAreaElement>,
  ) => {
    const defaultRef = React.useRef<HTMLInputElement>(null)
    const inputRef = (ref as React.RefObject<HTMLTextAreaElement>) || defaultRef

    const hasError = error ? true : undefined

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
          <Container
            $disabled={disabled}
            $error={!!error}
            $showDot={showDot}
            $validated={validated}
          >
            <TextArea
              {...{
                ...props,
                ...ids?.content,
                'aria-invalid': hasError,
              }}
              $error={hasError}
              $showDot={showDot}
              $validated={validated}
              autoCorrect={autoCorrect}
              autoFocus={autoFocus}
              defaultValue={defaultValue}
              disabled={disabled}
              maxLength={maxLength}
              name={name}
              placeholder={placeholder}
              readOnly={readOnly}
              ref={inputRef}
              rows={rows}
              spellCheck={spellCheck}
              tabIndex={tabIndex}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              onFocus={onFocus}
            />
          </Container>
        )}
      </Field>
    )
  },
)

Textarea.displayName = 'Textarea'
