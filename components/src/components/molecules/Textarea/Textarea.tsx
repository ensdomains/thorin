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
  $alwaysShowAction?: boolean
}>(
  ({
    theme,
    $error,
    $validated,
    $showDot,
    $alwaysShowAction,
    $disabled,
  }) => css`
    position: relative;
    background-color: ${theme.colors.backgroundSecondary};
    border-radius: ${theme.radii.large};
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
      transition: all 0.3s ease-in-out;
      transform: scale(0.3);
      opacity: 0;
    }

    ${$showDot &&
    !$disabled &&
    $error &&
    css`
      &:after {
        background-color: ${theme.colors.redPrimary};
        transform: scale(1);
        opacity: 1;
      }
    `}

    ${$showDot &&
    !$disabled &&
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

    textarea:disabled ~ button {
      opacity: 0;
      transform: scale(0.8);
    }

    ${!$alwaysShowAction &&
    css`
      textarea:placeholder-shown ~ button {
        opacity: 0;
        transform: scale(0.8);
      }
    `}
  `,
)

const TextArea = styled.textarea<{
  $error?: boolean
  $validated?: boolean
  $showDot?: boolean
  $size: Props['size']
  $hasAction?: boolean
}>(
  ({ theme, $size, $hasAction, $error }) => css`
    position: relative;
    color: ${theme.colors.textPrimary};
    background-color: ${theme.colors.backgroundPrimary};
    border-color: ${theme.colors.border};
    border-width: 1px;
    border-style: solid;

    display: flex;
    font-family: ${theme.fonts['sans']};
    font-size: ${theme.fontSizes.body};
    font-weight: ${theme.fontWeights.normal};
    min-height: ${theme.space['14']};
    padding: ${theme.space['3.5']}
      ${$hasAction ? theme.space['10'] : theme.space['4']} ${theme.space['3.5']}
      ${theme.space['4']};
    width: ${theme.space['full']};
    border-radius: ${theme.radii.large};
    overflow: hidden;
    resize: none;
    outline: none;
    transition: all 0.3s ease-in-out;

    &::placeholder {
      color: ${theme.colors.greyPrimary};
    }

    &:disabled {
      color: ${theme.colors.greyPrimary};
      background: ${theme.colors.greyLight};
    }

    ${$size === 'small' &&
    css`
      font-size: ${theme.fontSizes.small};
      line-height: ${theme.lineHeights.small};
      padding: ${theme.space['2.5']}
        ${$hasAction ? theme.space['9'] : theme.space['3.5']}
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

    &:read-only {
      border-color: ${theme.colors.border};
      cursor: default;
    }
  `,
)

const ActionButton = styled.button<{ $size: Props['size'] }>(
  ({ theme, $size }) => css`
    position: absolute;
    top: 0;
    right: 0;
    width: ${$size === 'small' ? theme.space[10] : theme.space[12]};
    height: ${$size === 'small' ? theme.space[10] : theme.space[12]};
    transition: all 0.1s ease-in-out;

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
  /** If true, will show a clear button when the input has value */
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
  /** A replacement icon for the action button */
  actionIcon?: React.ReactNode
  /** If true, will show the action button even when there is not input */
  alwaysShowAction?: boolean
  /** A custom handler that replaces the clear handler */
  onClickAction?: () => void
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
      clearable = false,
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
      actionIcon,
      alwaysShowAction = false,
      onClickAction,
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
    const hasAction = clearable || !!onClickAction

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

    const handleClickAction = () => {
      if (onClickAction) {
        return onClickAction()
      }
      handleClickClear()
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
        readOnly={readOnly}
        required={required}
        width={width}
      >
        {(ids) => (
          <Container
            $alwaysShowAction={alwaysShowAction}
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
              $hasAction={hasAction}
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
            {(clearable || onClickAction) && (
              <ActionButton
                $size={size}
                type="button"
                onClick={handleClickAction}
              >
                {actionIcon || <CrossCircleSVG />}
              </ActionButton>
            )}
          </Container>
        )}
      </Field>
    )
  },
)

Textarea.displayName = 'Textarea'
