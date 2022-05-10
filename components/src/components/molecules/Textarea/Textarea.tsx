import * as React from 'react'
import styled from 'styled-components'

import { Field } from '../..'
import { FieldBaseProps } from '../../atoms/Field'

const TextArea = styled.textarea<{ disabled?: boolean; error?: boolean }>`
  ${({ theme }) => `
      background-color: ${theme.colors.transparent};
      border-color: ${theme.colors.foregroundSecondary};
      border-radius: ${theme.radii['2xLarge']};
      border-width: ${theme.space['0.5']};
      color: ${theme.colors.text};
      display: flex;
      font-family: ${theme.fonts['sans']};
      font-size: ${theme.fontSizes['base']};
      font-weight: ${theme.fontWeights['medium']};
      min-height: ${theme.space['14']};
      padding: ${theme.space['4']};
      transition-duration: ${theme.transitionDuration['150']};
      transition-property: color, border-color, background-color;
      transition-timing-function: ${theme.transitionTimingFunction['inOut']};
      width: ${theme.space['full']};
      resize: none;
      
      &:focus {
        border-color: ${theme.colors.accent};
      }
  `}

  ${({ theme, disabled }) =>
    disabled &&
    `
      border-color: ${theme.colors.foregroundSecondary};
      cursor: not-allowed;
  `}

  ${({ theme, error }) =>
    error &&
    `
      border-color: ${theme.colors.red};
      cursor: default;
      
      &:focus-within {
        border-color: ${theme.colors.red};
      }
  `}
`

type NativeTextareaProps = React.AllHTMLAttributes<HTMLTextAreaElement>

type Props = FieldBaseProps & {
  autoCorrect?: NativeTextareaProps['autoCorrect']
  autoFocus?: NativeTextareaProps['autoFocus']
  defaultValue?: string | number
  disabled?: boolean
  id?: NativeTextareaProps['id']
  name?: string
  maxLength?: NativeTextareaProps['maxLength']
  placeholder?: NativeTextareaProps['placeholder']
  readOnly?: NativeTextareaProps['readOnly']
  rows?: NativeTextareaProps['rows']
  spellCheck?: NativeTextareaProps['spellCheck']
  tabIndex?: NativeTextareaProps['tabIndex']
  value?: string | number
  onChange?: React.EventHandler<React.ChangeEvent<HTMLTextAreaElement>>
  onBlur?: NativeTextareaProps['onBlur']
  onFocus?: NativeTextareaProps['onFocus']
}

export const Textarea = React.forwardRef(
  (
    {
      autoCorrect,
      autoFocus,
      defaultValue,
      description,
      disabled,
      error,
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
        <TextArea
          aria-invalid={hasError}
          autoCorrect={autoCorrect}
          autoFocus={autoFocus}
          defaultValue={defaultValue}
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
          {...{
            disabled,
            error: hasError,
          }}
        />
      </Field>
    )
  },
)

Textarea.displayName = 'Textarea'
