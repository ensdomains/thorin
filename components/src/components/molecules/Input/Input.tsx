import * as React from 'react'
import styled, { FlattenInterpolation, css } from 'styled-components'

import { setNativeValue } from '@/src/utils/setNativeValue'

import { CrossCircleSVG, Field } from '../..'
import { FieldBaseProps } from '../../atoms/Field'
import { Space } from '../../../tokens/index'
import { DefaultTheme, Typography } from '../../../types/index'
import { getTypography } from '../../../utils/getTypography'

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
  /** An icon that trails the input. By default is the clear icon. */
  actionIcon?: React.ReactNode
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

type Size = NonNullable<BaseProps['size']>

const SPACES: {
  [key in Size]: {
    outerPadding: Space
    icon: Space
    iconPadding: Space
    height: Space
    radius: Space
  }
} = {
  small: {
    outerPadding: '3.5',
    icon: '3',
    iconPadding: '8.5',
    height: '10',
    radius: '2',
  },
  medium: {
    outerPadding: '4',
    icon: '4',
    iconPadding: '10',
    height: '12',
    radius: '2',
  },
  large: {
    outerPadding: '4',
    icon: '5',
    iconPadding: '11',
    height: '16',
    radius: '5.5',
  },
  extraLarge: {
    outerPadding: '6',
    icon: '6',
    iconPadding: '14',
    height: '20',
    radius: '5.5',
  },
}

const getSpaceValue = (
  theme: DefaultTheme,
  size: keyof typeof SPACES,
  key: keyof typeof SPACES['small'],
): string => {
  return theme.space[SPACES[size][key]]
}

const TYPOGRAPHIES: {
  [key in Size]: Typography
} = {
  small: 'Small/Normal',
  medium: 'Body/Normal',
  large: 'Large/Normal',
  extraLarge: 'Heading/H3',
}

const getTypographyValue = (size: keyof typeof TYPOGRAPHIES) => {
  return TYPOGRAPHIES[size]
}

const Container = styled.div<{
  $size: Size
  $disabled?: boolean
  $hasError?: boolean
  $suffix: boolean
  $validated?: boolean
  $showDot?: boolean
  $userStyles?: FlattenInterpolation<any>
}>(
  ({ theme, $size, $hasError, $userStyles, $validated, $showDot }) => css`
    position: relative;
    height: ${getSpaceValue(theme, $size, 'height')};
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
      box-sizing: border-box;
      border-radius: 50%;
      right: -${theme.space['1.5']};
      top: -${theme.space['1.5']};
      transition: all 0.3s ease-out;
      transform: scale(0.3);
      opacity: 0;
    }

    ${$showDot &&
    $validated &&
    css`
      :after {
        background: ${theme.colors.greenPrimary};
        transform: scale(1);
        opacity: 1;
      }
    `}

    ${$showDot &&
    !$hasError &&
    css`
      &:focus-within:after {
        background: ${theme.colors.bluePrimary};
        transform: scale(1);
        opacity: 1;
      }
    `}

    ${$hasError &&
    $showDot &&
    css`
      :after {
        background: ${theme.colors.redPrimary};
        transform: scale(1);
        opacity: 1;
      }
    `}

  ${$userStyles}
  `,
)

const Label = styled.label<{ $size: Size }>(
  ({ theme, $size }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.space[2]};

    height: ${theme.space.full};
    color: ${theme.colors.greyPrimary};
    background: ${theme.colors.greySurface};
    font-size: ${getTypography(theme, getTypographyValue($size), 'fontSize')};
    line-height: ${getTypography(
      theme,
      getTypographyValue($size),
      'lineHeight',
    )};
    font-weight: ${theme.fontWeights.normal};
    padding: 0 ${getSpaceValue(theme, $size, 'outerPadding')};

    svg {
      display: block;
      color: ${theme.colors.greyPrimary};
    }
  `,
)

const Prefix = styled(Label)(
  () => css`
    order: -2;
  `,
)

const IconWrapper = styled.div<{ $size: Size }>(
  ({ theme, $size }) => css`
    order: -1;
    padding-left: ${getSpaceValue(theme, $size, 'outerPadding')};
    flex: 0 0 ${getSpaceValue(theme, $size, 'iconPadding')};
    margin-right: -${getSpaceValue(theme, $size, 'iconPadding')};
    display: flex;
    align-items: center;
    justify-content: flex-start;
    svg {
      display: block;
      width: ${getSpaceValue(theme, $size, 'icon')};
      height: ${getSpaceValue(theme, $size, 'icon')};
      color: ${theme.colors.greyPrimary};
    }
    z-index: 1;
  `,
)

const ActionButton = styled.button<{ $size: Size }>(
  ({ theme, $size }) => css`
    padding-right: ${getSpaceValue(theme, $size, 'outerPadding')};
    margin-left: -${getSpaceValue(theme, $size, 'iconPadding')};
    flex: 0 0 ${getSpaceValue(theme, $size, 'iconPadding')};
    display: flex;
    justify-content: flex-end;
    align-items: center;
    transition: all 0.3s ease-out;
    transform: scale(1);
    opacity: 1;

    svg {
      display: block;
      width: ${getSpaceValue(theme, $size, 'icon')};
      height: ${getSpaceValue(theme, $size, 'icon')};
      color: ${theme.colors.greyPrimary};
    }
  `,
)

const InputComponent = styled.input<{
  $size: Size
  $hasAction: boolean
  $hasIcon: boolean
  $hasError: boolean
}>(
  ({ theme, $size, $hasIcon, $hasAction, $hasError }) => css`
    background-color: transparent;
    position: relative;
    width: ${theme.space['full']};
    height: ${theme.space['full']};
    font-weight: ${theme.fontWeights.normal};
    text-overflow: ellipsis;
    color: ${theme.colors.textPrimary};
    padding: 0 ${getSpaceValue(theme, $size, 'outerPadding')};
    font-size: ${getTypography(theme, getTypographyValue($size), 'fontSize')};
    line-height: ${getTypography(
      theme,
      getTypographyValue($size),
      'lineHeight',
    )};

    ${$hasIcon &&
    css`
      padding-left: ${getSpaceValue(theme, $size, 'iconPadding')};
    `}

    ${$hasAction &&
    css`
      padding-right: ${getSpaceValue(theme, $size, 'iconPadding')};
    `}

    &::placeholder {
      color: ${theme.colors.greyPrimary};
      font-weight: ${$size === 'large' || $size === 'extraLarge'
        ? theme.fontWeights.bold
        : theme.fontWeights.normal};
    }

    &:disabled {
      background: ${theme.colors.greyBright};
      cursor: not-allowed;
      color: ${theme.colors.greyPrimary};
    }

    ${$hasError &&
    css`
      color: ${theme.colors.redPrimary};
    `}
  `,
)

const InnerContainer = styled.div<{
  $size: Size
  $hasError: boolean
  $disabled: boolean
}>(
  ({ theme, $size, $hasError, $disabled }) => css`
    position: relative;
    background-color: ${theme.colors.backgroundPrimary};
    border-radius: ${getSpaceValue(theme, $size, 'radius')};
    border-width: ${theme.space.px};
    border-color: ${theme.colors.border};
    color: ${theme.colors.textPrimary};
    overflow: hidden;
    width: 100%;
    height: 100%;
    display: flex;
    transition-duration: ${theme.transitionDuration['150']};
    transition-property: color, border-color, background-color;
    transition-timing-function: ${theme.transitionTimingFunction['inOut']};

    ${$disabled &&
    css`
      border-color: ${theme.colors.border};
      background-color: ${theme.colors.greyBright};
    `}

    ${$hasError &&
    css`
      border-color: ${theme.colors.redPrimary};
      cursor: default;
    `}

    ${!$hasError &&
    css`
      &:focus-within {
        border-color: ${theme.colors.accentBright};
      }
    `}

    input:disabled ~ label, input:disabled ~ button {
      background: ${theme.colors.greyBright};
      cursor: not-allowed;
    }

    input:disabled ~ button,
    input:placeholder-shown ~ button {
      opacity: 0;
      transform: scale(0.3);
    }
  `,
)

type Props = BaseProps & (WithTypeEmail | WithTypeText)

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
      icon,
      actionIcon,
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
      clearable = true,
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
      parentStyles,
      ...props
    }: Props,
    ref: React.Ref<HTMLInputElement>,
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
        required={required}
        width={width}
      >
        {(ids) => (
          <Container
            {...{
              $disabled: disabled,
              $hasError: hasError,
              $validated: validated,
              $showDot: showDot,
              $suffix: suffix !== undefined,
              $size: size,
              $userStyles: parentStyles,
              $ids: ids,
            }}
          >
            <InnerContainer
              $disabled={!!disabled}
              $hasError={!!error}
              $size={size}
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
              {prefix && (
                <Prefix
                  aria-hidden="true"
                  as={prefixAs}
                  {...ids?.label}
                  $size={size}
                >
                  {prefix}
                </Prefix>
              )}
              {icon && <IconWrapper $size={size}>{icon}</IconWrapper>}
              {hasAction && (
                <ActionButton
                  $size={size}
                  data-testid="input-action-button"
                  onClick={handleClickAction}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {actionIcon ? actionIcon : <CrossCircleSVG />}
                </ActionButton>
              )}
              {suffix && (
                <Label
                  $size={size}
                  aria-hidden="true"
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
