import * as React from 'react'
import styled, { css } from 'styled-components'

import { createSyntheticEvent } from '@/src/utils/createSyntheticEvent'

import { CrossCircleSVG, Field } from '../..'
import { FieldBaseProps } from '../../atoms/Field'

const Container = styled.div<{
  $validated?: boolean
  $error?: boolean
  $showDot?: boolean
  $disabled?: boolean
}>(
  ({ theme, $error, $validated, $showDot }) => css`
    position: relative;
    background-color: ${theme.colors.backgroundSecondary};
    border-radius: ${theme.radii.input};
    border-width: ${theme.space.px};
    border-color: transparent;
    color: ${theme.colors.text};
    display: flex;
    transition-duration: ${theme.transitionDuration['150']};
    transition-property: color, border-color, background-color;
    transition-timing-function: ${theme.transitionTimingFunction['inOut']};

    :after {
      content: '';
      position: absolute;
      width: ${theme.space['4']};
      height: ${theme.space['4']};
      border: 2px solid ${theme.colors.backgroundPrimary};
      right: -${theme.space['1.5']};
      top: -${theme.space['1.5']};
      border-radius: ${theme.radii.full};
      transition: all 0.3s ease-out;
      transform: scale(0.3);
      opacity: 0;
    }

    ${$showDot &&
    $error &&
    css`
      &:after {
        background-color: ${theme.colors.redPrimary};
        transform: scale(1);
        opacity: 1;
      }
    `}

    ${$showDot &&
    $validated &&
    !$error &&
    css`
      &:after {
        background-color: ${theme.colors.greenPrimary};
        transform: scale(1);
        opacity: 1;
      }
    `}

    ${$showDot &&
    !$error &&
    css`
      &:focus-within::after {
        background-color: ${theme.colors.bluePrimary};
        transform: scale(1);
        opacity: 1;
      }
    `}

    textarea:placeholder-shown ~ button,
    textarea:disabled ~ button {
      opacity: 0;
      transform: scale(0.3);
    }
  `,
)

const TextArea = styled.textarea<{
  $error?: boolean
  $validated?: boolean
  $showDot?: boolean
  $size: Props['size']
  $clearable?: boolean
}>(
  ({ theme, $size, $clearable, $error }) => css`
    position: relative;
    background-color: ${theme.colors.backgroundPrimary};
    color: ${theme.colors.textPrimary};
    border-width: 1px;
    border-style: solid;

    display: flex;
    font-family: ${theme.fonts['sans']};
    font-size: ${theme.fontSizes.body};
    font-weight: ${theme.fontWeights.normal};
    min-height: ${theme.space['14']};
    padding: ${theme.space['3.5']}
      ${$clearable ? theme.space['10'] : theme.space['4']} ${theme.space['3.5']}
      ${theme.space['4']};
    width: ${theme.space['full']};
    border-radius: ${theme.radii.input};
    overflow: hidden;
    resize: none;
    outline: none;

    &::placeholder {
      color: ${theme.colors.greyPrimary};
    }

    &:disabled {
      color: ${theme.colors.greyPrimary};
      background: ${theme.colors.greyBright};
    }

    ${$size === 'small' &&
    css`
      font-size: ${theme.fontSizes.small};
      line-height: ${theme.lineHeights.small};
      padding: ${theme.space['2.5']}
        ${$clearable ? theme.space['9'] : theme.space['3.5']}
        ${theme.space['2.5']} ${theme.space['3.5']};
    `}

    ${$error &&
    css`
      border-color: ${theme.colors.redPrimary};
      color: ${theme.colors.redPrimary};
    `}

    ${!$error &&
    css`
      &:focus-within {
        border-color: ${theme.colors.bluePrimary};
      }
    `}
  `,
)

const ClearButton = styled.button<{ $size: Props['size'] }>(
  ({ theme, $size }) => css`
    position: absolute;
    top: 0;
    right: 0;
    width: ${$size === 'small' ? theme.space[10] : theme.space[12]};
    height: ${$size === 'small' ? theme.space[10] : theme.space[12]};
    transition: all 0.3s ease-out;

    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      display: block;
      width: ${$size === 'small' ? theme.space[3] : theme.space[4]};
      height: ${$size === 'small' ? theme.space[3] : theme.space[4]};
      color: ${theme.colors.greyPrimary};
    }
  `,
)

type NativeTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

type Props = Omit<FieldBaseProps, 'inline'> & {
  /** If true, the input will automatically correct words it marks as spelling errors. */
  autoCorrect?: NativeTextareaProps['autoCorrect']
  /** If true, the component will attempt to get focus after it is rendered. */
  autoFocus?: NativeTextareaProps['autoFocus']
  clearable?: boolean
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
  /** The size of the textarea. */
  size?: 'small' | 'medium'
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
      clearable = true,
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
      name = 'textarea',
      placeholder,
      readOnly,
      required,
      rows = 5,
      size = 'medium',
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

    const handleClickClear = () => {
      // uncontrolled input
      if (!onChange) {
        if (inputRef.current) inputRef.current.value = ''
        return inputRef.current?.focus()
      }
      // Controlled input
      const target = document.createElement('input')
      target.value = ''
      target.name = name
      const event = new Event('change', { bubbles: true })
      Object.defineProperties(event, {
        target: {
          writable: false,
          value: target,
        },
        currentTarget: {
          writable: false,
          value: target,
        },
      })
      const syntheticEvent = createSyntheticEvent(
        event,
      ) as React.ChangeEvent<HTMLTextAreaElement>
      onChange(syntheticEvent)
      inputRef.current?.focus()
    }

    return (
      <Field
        description={description}
        disabled={disabled}
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
              $clearable={clearable}
              $error={hasError}
              $showDot={showDot}
              $size={size}
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
            {clearable && (
              <ClearButton
                $size={size}
                type="button"
                onClick={handleClickClear}
              >
                <CrossCircleSVG />
              </ClearButton>
            )}
          </Container>
        )}
      </Field>
    )
  },
)

Textarea.displayName = 'Textarea'
