import * as React from 'react'

import classNames from 'clsx'

import { createSyntheticEvent } from '@/src/utils/createSyntheticEvent'

import { statusDot } from '@/src/css/recipes/statusDot.css'

import { statusBorder } from '@/src/css/recipes/statusBorder.css'

import { translateY } from '@/src/css/utils/common'

import * as styles from './styles.css'

import type { FieldBaseProps } from '../../atoms/Field/Field'
import { Field } from '../../atoms/Field/Field'
import type { BoxProps } from '../../atoms/Box/Box'
import { Box } from '../../atoms/Box/Box'
import { getValueForSize } from './utils/getValueForSize'
import { CrossCircleSVG } from '@/src/icons'

export type Size = TextareaProps['size']

type ContainerProps = {
  $validated?: boolean
  $error?: boolean
  $showDot?: boolean
  $disabled?: boolean
}
const Container = ({
  $error,
  $validated,
  $showDot,
  $disabled,
  ...props
}: BoxProps & ContainerProps) => (
  <Box
    {...props}
    backgroundColor="backgroundSecondary"
    borderRadius="large"
    className={statusDot({
      error: $error,
      validated: $validated,
      show: $showDot && !$disabled,
    })}
    color="text"
    display="flex"
    position="relative"
    transitionDuration={150}
    transitionProperty="color, border-color, background-color"
    transitionTimingFunction="inOut"
  />
)

type TextAreaProps = {
  $error?: boolean
  $size: TextareaProps['size']
  $hasAction?: boolean
  $alwaysShowAction?: boolean
}
const TextArea = React.forwardRef<HTMLElement, BoxProps & TextAreaProps>(
  (
    {
      $size = 'medium',
      $hasAction,
      $error,
      $alwaysShowAction,
      readOnly,
      disabled,
      ...props
    },
    ref,
  ) => (
    <Box
      {...props}
      as="textarea"
      backgroundColor={{ base: 'backgroundPrimary', disabled: 'greyLight' }}
      borderColor="border"
      borderRadius="large"
      borderStyle="solid"
      borderWidth="1x"
      className={classNames(
        styles.textarea({ showAction: $alwaysShowAction }),
        statusBorder({
          error: $error,
          readonly: readOnly,
          disabled: disabled,
        }),
      )}
      color={{ base: 'textPrimary', disabled: 'greyPrimary' }}
      disabled={disabled}
      display="flex"
      fontSize={getValueForSize($size, 'fontSize')}
      fontWeight="normal"
      fontFamily="inherit"
      lineHeight={getValueForSize($size, 'fontSize')}
      minHeight="$14"
      outline="none"
      overflow="hidden"
      paddingLeft={getValueForSize($size, 'paddingX')}
      paddingRight={getValueForSize(
        $size,
        $hasAction ? 'paddingAction' : 'paddingX',
      )}
      position="relative"
      py={getValueForSize($size, 'paddingY')}
      readOnly={readOnly}
      ref={ref}
      resize="none"
      transition="all 0.3s ease-in-out"
      width="full"
    />
  ),
)

const ActionButton = ({
  $size = 'medium',
  $icon,
  ...props
}: BoxProps & { $size: Size, $icon: React.ReactNode }) => {
  const icon = React.isValidElement($icon) ? $icon : <CrossCircleSVG />
  return (
    <Box
      {...props}
      alignItems="center"
      as="button"
      color={{ base: 'greyPrimary', hover: 'greyBright' }}
      cursor="pointer"
      display="flex"
      justifyContent="center"
      position="absolute"
      right="0"
      top="0"
      transform={{ base: translateY(0), hover: translateY(-1) }}
      transition="all 0.1s ease-in-out"
      type="button"
      wh={getValueForSize($size, 'actionSize')}
    >
      <Box
        as={icon}
        transition="all 0.1s ease-in-out"
        wh={getValueForSize($size, 'iconSize')}
      />
    </Box>
  )
}

type NativeTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

export type TextareaProps = Omit<FieldBaseProps, 'inline'> & {
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

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
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
    },
    ref,
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

    const showAction = alwaysShowAction || clearable || onClickAction
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
        {ids => (
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
              $hasAction={hasAction}
              $size={size}
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
            {showAction && (
              <ActionButton
                $icon={actionIcon}
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
