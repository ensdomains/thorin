import * as React from 'react'
import styled, { css } from 'styled-components'

import { Field } from '../..'
import { FieldBaseProps } from '../../atoms/Field'

const TextArea = styled.textarea<{ $error?: boolean }>(
  ({ theme, disabled, $error }) => css`
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

    ${disabled &&
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

type NativeTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

type Props = FieldBaseProps & {
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
  /** The handler for change events. */
  onChange?: NativeTextareaProps['onChange']
  /** The handler for blur events. */
  onBlur?: NativeTextareaProps['onBlur']
  /** The handler for focus events. */
  onFocus?: NativeTextareaProps['onFocus']
} & Omit<NativeTextareaProps, 'children' | 'value' | 'defaultValue'>

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
        <TextArea
          {...{
            ...props,
            'aria-invalid': hasError,
            autoCorrect: autoCorrect,
            autoFocus: autoFocus,
            defaultValue: defaultValue,
            disabled: disabled,
            maxLength: maxLength,
            name: name,
            placeholder: placeholder,
            readOnly: readOnly,
            ref: inputRef,
            rows: rows,
            spellCheck: spellCheck,
            tabIndex: tabIndex,
            value: value,
            onBlur: onBlur,
            onChange: onChange,
            onFocus: onFocus,
            $error: hasError,
          }}
        />
      </Field>
    )
  },
)

Textarea.displayName = 'Textarea'
