import * as React from 'react'

import type { StatusDot } from '@/src/css/recipes/statusDot.css'
import { statusDot } from '@/src/css/recipes/statusDot.css'
import { statusBorder } from '@/src/css/recipes/statusBorder.css'
import { setNativeValue } from '@/src/utils/setNativeValue'

import { scale } from '@/src/css/utils/common'

import * as styles from './styles.css'

import type { FieldBaseProps } from '../../atoms/Field/Field'
import { Field } from '../../atoms/Field/Field'
import type { Space } from '../../../tokens/index'
import type { BoxProps } from '../../atoms/Box/Box'
import { Box } from '../../atoms/Box/Box'
import { getValueForSize } from './utils/getValueForSize'
import { CrossCircleSVG } from '@/src/icons'

type NativeInputProps = React.InputHTMLAttributes<HTMLInputElement>

type BaseProps = Omit<FieldBaseProps, 'inline'> & {
  /** If the element should attempt to gain focus after it is rendered. */
  autoFocus?: NativeInputProps['autoFocus']
  /** If the input should display a list of suggested words. */
  autoComplete?: NativeInputProps['autoComplete']
  /** If the imput should automatically fix spelling errors. */
  autoCorrect?: NativeInputProps['autoCorrect']
  clearable?: boolean
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
  /** An icon that leads the input. */
  icon?: React.ReactNode
  /** A custom width for the icon component */
  iconWidth?: Space
  /** An icon that trails the input. By default is the clear icon. */
  actionIcon?: React.ReactNode
  /** If true, will not hide the action or clear button when the input is empty */
  alwaysShowAction?: boolean
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
  /** A handler for clicking the action icon */
  onClickAction?: () => void
  /** Sets the height of the input element. */
  size?: 'small' | 'medium' | 'large' | 'extraLarge'
  /** Set of styles  */
  // parentStyles?: BoxProps
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

type WithTypeDateTimeLocal = {
  type?: 'datetime-local'
}

export type Size = NonNullable<BaseProps['size']>

type ContainerProps = {
  $size: Size
  $disabled?: boolean
  $hasError?: boolean
  $suffix?: boolean
  $validated?: boolean
  $showDot?: boolean
  $userStyles?: BoxProps
}
const Container = ({
  $size,
  ...props
}: BoxProps & ContainerProps & StatusDot) => (
  <Box
    {...props}
    display="flex"
    height={getValueForSize($size, 'height')}
    position="relative"
    transitionDuration={150}
    transitionProperty="color, border-colror, background-color"
  />
)

const Label = ({
  $size,
  $disabled,
  ...props
}: BoxProps & { $disabled?: boolean, $size: Size }) => (
  <Box
    {...props}
    alignItems="center"
    as="label"
    backgroundColor={$disabled ? '$border' : 'greySurface'}
    color="greyPrimary"
    cursor={$disabled ? 'not-allowed' : 'pointer'}
    display="flex"
    fontSize={getValueForSize($size, 'labelFontSize')}
    fontWeight="normal"
    gap="2"
    height="full"
    lineHeight={getValueForSize($size, 'labelFontSize')}
    px={getValueForSize($size, 'outerPadding')}
  />
)

type IconBoxProps = {
  $icon: React.ReactElement
  $iconWidth?: any
  $size: Size
}

const Icon = ({
  $icon,
  $iconWidth,
  $size,
  ...props
}: BoxProps & IconBoxProps) => (
  <Box
    {...props}
    alignItems="center"
    as="label"
    boxSizing="content-box"
    cursor="pointer"
    display="flex"
    flexBasis={$iconWidth ? `$${$iconWidth}` : getValueForSize($size, 'icon')}
    flexGrow={0}
    flexShrink={0}
    justifyContent="flex-start"
    order={-1}
    paddingLeft={getValueForSize($size, 'outerPadding')}
    width={$iconWidth ? `$${$iconWidth}` : getValueForSize($size, 'icon')}
    zIndex={1}
  >
    {$icon}
  </Box>
)

const ActionButton = ({
  $icon,
  $size,
  ...props
}: BoxProps & { $size: Size, $icon?: React.ReactNode }) => {
  const Icon: React.ReactElement = React.isValidElement($icon)
    ? (
        $icon
      )
    : (
        <CrossCircleSVG />
      )
  return (
    <Box
      {...props}
      alignItems="center"
      as="button"
      color={{ base: 'greyPrimary', hover: 'greyBright' }}
      cursor="pointer"
      display="flex"
      flexBasis={getValueForSize($size, 'iconPadding')}
      flexGrow={0}
      flexShrink={0}
      justifyContent="flex-start"
      marginLeft={`calc(-1 * ${getValueForSize($size, 'iconPadding')})`}
      opacity={1}
      paddingRight={getValueForSize($size, 'outerPadding')}
      transform={scale(1)}
      transition="all 0.1s ease-in-out"
    >
      <Box
        as={Icon}
        display="block"
        fill="CurrentColor"
        stroke="CurrentColor"
        transition="all 150ms ease-in-out"
        wh={getValueForSize($size, 'icon')}
      />
    </Box>
  )
}

type InputComponentProps = {
  $size: Size
  $hasAction: boolean
  $hasIcon: boolean
  $hasError: boolean
  $iconWidth?: Space
}

const InputComponent = React.forwardRef<HTMLElement, BoxProps & InputComponentProps>(
  (
    {
      $size,
      $hasIcon,
      $hasAction,
      $hasError,
      // $iconWidth,
      ...props
    },
    ref,
  ) => (
    <Box
      {...props}
      as="input"
      backgroundColor={{ base: 'transparent', disabled: 'greyLight' }}
      color={
        $hasError
          ? 'redPrimary'
          : { base: 'textPrimary', disabled: 'greyPrimary' }
      }
      cursor={{ base: 'text', disabled: 'not-allowed', readonly: 'default' }}
      fontSize={getValueForSize($size, 'labelFontSize')}
      fontWeight="normal"
      paddingLeft={
        $hasIcon
          ? getValueForSize($size, 'innerPadding')
          : getValueForSize($size, 'outerPadding')
      }
      paddingRight={
        $hasAction
          ? getValueForSize($size, 'innerPadding')
          : getValueForSize($size, 'outerPadding')
      }
      position="relative"
      ref={ref}
      textOverflow="ellipsis"
      wh="full"
    />
  ),
)

type InnerContainerProps = {
  $size: Size
  $hasError?: boolean
  $disabled: boolean
  $readOnly?: boolean
  $alwaysShowAction?: boolean
}

const InnerContainer = ({
  $size,
  $disabled,
  ...props
}: BoxProps & InnerContainerProps) => (
  <Box
    {...props}
    backgroundColor={$disabled ? 'greyLight' : 'backgroundPrimary'}
    borderRadius={getValueForSize($size, 'borderRadius')}
    borderWidth="1x"
    color="textPrimary"
    display="flex"
    overflow="hidden"
    position="relative"
    transitionDuration={150}
    transitionProperty="color, border-color, background-color"
    transitionTimingFunction="inOut"
    wh="full"
  />
)

export type InputProps = BaseProps & (WithTypeEmail | WithTypeText | WithTypeDateTimeLocal)

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
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
      icon,
      iconWidth,
      actionIcon,
      alwaysShowAction = false,
      label,
      labelSecondary,
      name = 'clear-button',
      placeholder,
      prefix,
      prefixAs,
      readOnly,
      required,
      spellCheck,
      suffix,
      suffixAs,
      clearable = false,
      tabIndex,
      type = 'text',
      units,
      value,
      width,
      onBlur,
      onChange,
      onFocus,
      onClickAction,
      size = 'medium',
      ...props
    },
    ref,
  ) => {
    const defaultRef = React.useRef<HTMLInputElement>(null)
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || defaultRef

    const placeholderText = placeholder
      ? `${placeholder ?? ''}${units ? ` ${units}` : ''}`
      : undefined
    const hasError = error ? true : undefined

    const inputType = type === 'email' ? 'text' : type

    const hasAction = clearable || !!onClickAction

    const handleClickAction = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()

      if (onClickAction) {
        onClickAction()
        return inputRef.current?.focus()
      }

      // Default handler is to clear the input
      // Is uncontrolled input, update the value through the ref
      if (inputRef.current) {
        setNativeValue<HTMLInputElement>(inputRef.current, '')
        inputRef.current.dispatchEvent(new Event('input', { bubbles: true }))
        inputRef.current.focus()
      }
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
        {ids => (
          <Container
            className={statusDot({
              error: hasError,
              validated,
              show: showDot,
            })}
            {...{
              $size: size,
            }}
          >
            <InnerContainer
              // $alwaysShowAction={alwaysShowAction}
              $disabled={!!disabled}
              // $hasError={!!error}
              // $readOnly={!!readOnly}
              $size={size}
              className={statusBorder({
                readonly: readOnly,
                disabled: disabled,
                error: hasError,
              })}
            >
              <InputComponent
                ref={inputRef}
                {...{
                  ...props,
                  ...ids?.content,
                  'aria-invalid': hasError,
                }}
                $hasAction={hasAction}
                $hasError={!!error}
                $hasIcon={!!icon}
                // $iconWidth={iconWidth}
                $size={size}
                autoComplete={autoComplete}
                autoCorrect={autoCorrect}
                autoFocus={autoFocus}
                className={styles.input({
                  size: size,
                  showAction: alwaysShowAction,
                })}
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
              {prefix && (
                <Label
                  aria-hidden="true"
                  as={prefixAs}
                  className={styles.label}
                  order={-2}
                  {...ids?.label}
                  $disabled={disabled}
                  $size={size}
                >
                  {prefix}
                </Label>
              )}
              {icon && React.isValidElement(icon) && (
                <Icon
                  $icon={icon}
                  $iconWidth={iconWidth}
                  $size={size}
                  className={styles.icon}
                  {...ids?.label}
                />
              )}
              {hasAction && (
                <ActionButton
                  $icon={actionIcon}
                  $size={size}
                  data-testid="input-action-button"
                  onClick={handleClickAction}
                  onMouseDown={e => e.preventDefault()}
                />
              )}
              {suffix && (
                <Label
                  $disabled={disabled}
                  $size={size}
                  aria-hidden="true"
                  className={styles.label}
                  {...ids?.label}
                  {...(suffixAs ? { as: suffixAs } : {})}
                >
                  {suffix}
                </Label>
              )}
            </InnerContainer>
          </Container>
        )}
      </Field>
    )
  },
)

Input.displayName = 'Input'
