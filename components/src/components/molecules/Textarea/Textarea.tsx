import * as React from 'react'
import styled from 'styled-components'

import { Field } from '../..'
import { FieldBaseProps } from '../../atoms/Field'
import { tokens } from '@/src/tokens'

const TextArea = styled.textarea<{ disabled?: boolean; error?: boolean }>`
  ${({ theme }) => `
      background-color: ${tokens.colors.base.transparent};
      border-color: ${tokens.colors[theme.mode].foregroundSecondary};
      border-radius: ${tokens.radii['2xLarge']};
      border-width: ${tokens.space['0.5']};
      color: ${tokens.colors[theme.mode].text};
      display: flex;
      font-family: ${tokens.fonts['sans']};
      font-size: ${tokens.fontSizes['base']};
      font-weight: ${tokens.fontWeights['medium']};
      min-height: ${tokens.space['14']};
      padding: ${tokens.space['4']};
      transition-duration: ${tokens.transitionDuration['150']};
      transition-property: color, border-color, background-color;
      transition-timing-function: ${tokens.transitionTimingFunction['inOut']};
      width: ${tokens.space['full']};
      resize: none;
      
      &:focus {
        border-color: ${tokens.colors[theme.mode].accent};
      }
  `}

  ${({ theme, disabled }) =>
    disabled &&
    `
      border-color: ${tokens.colors[theme.mode].foregroundSecondary};
      cursor: not-allowed;
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
`

type NativeTextareaProps = React.AllHTMLAttributes<HTMLTextAreaElement>

type Props = FieldBaseProps & {
  /** If true, the input will automatically correct words it marks as spelling errors. */
  autoCorrect?: NativeTextareaProps['autoCorrect']
  /** If true, the component will attempt to get focus after it is rendered. */
  autoFocus?: NativeTextareaProps['autoFocus']
  /** The initial value. Useful for detecting changes in value. */
  defaultValue?: string | number
  /** If true, prevents user interaction. */
  disabled?: boolean
  /** The id attribute of the textarea element. */
  id?: NativeTextareaProps['id']
  /** The name attribute of the textarea element. */
  name?: string
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
  /** The handler for change events. */
  onChange?: React.EventHandler<React.ChangeEvent<HTMLTextAreaElement>>
  /** The handler for blur events. */
  onBlur?: NativeTextareaProps['onBlur']
  /** The handler for focus events. */
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
