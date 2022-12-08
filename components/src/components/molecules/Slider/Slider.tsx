import * as React from 'react'
import styled, { DefaultTheme, css } from 'styled-components'

import { Field, FieldBaseProps } from '../../atoms/Field'

type NativeInputProps = React.InputHTMLAttributes<HTMLInputElement>

export type Props = FieldBaseProps & {
  /** The initial value. Useful for detecting changes in value. */
  defaultValue?: string | number
  /** If true, prevents user interaction. */
  disabled?: NativeInputProps['disabled']
  /** The id attribute of input. */
  id?: NativeInputProps['id']
  /** The name attribute of input. */
  name?: NativeInputProps['name']
  /** The readOnly attribute of input.  */
  readOnly?: NativeInputProps['readOnly']
  /** The tabindex attribute of input. */
  tabIndex?: NativeInputProps['tabIndex']
  /** The value attribute of slider. */
  value?: number
  /** The min value of slider. */
  min?: number
  /** The max value of slider. */
  max?: number
  /** The handler for change events. */
  onChange?: NativeInputProps['onChange']
  /** The handler for blur events. */
  onBlur?: NativeInputProps['onBlur']
  /** The handler for focus events. */
  onFocus?: NativeInputProps['onFocus']
} & Omit<
    NativeInputProps,
    'children' | 'value' | 'defaultValue' | 'aria-invalid' | 'type'
  >

const Container = styled.div(
  ({ theme }) => css`
    width: ${theme.space.full};
  `,
)

const thumbCss = ({ theme }: { theme: DefaultTheme }) => css`
  width: ${theme.space['4']};
  height: ${theme.space['4']};
  background: ${theme.colors.accent};
  border-radius: ${theme.radii.full};
  cursor: pointer;
  transition: filter 0.15s ease-in-out;
  filter: brightness(1);
  &:hover {
    filter: brightness(0.95);
  }
  &:active {
    filter: brightness(0.875);
  }
`

const SliderComponent = styled.input(
  ({ theme, disabled }) => css`
    appearance: none;
    width: ${theme.space.full};
    height: ${theme.space['1.5']};
    background: hsla(${theme.colors.raw.accent}, 0.4);
    border-radius: ${theme.radii.full};
    outline: none;

    &::-webkit-slider-thumb {
      appearance: none;
      ${thumbCss}
    }

    &::-moz-range-thumb {
      ${thumbCss}
    }

    &:hover {
      background: hsla(${theme.colors.raw.accent}, 0.45);
    }

    ${disabled &&
    css`
      opacity: 0.5;
      filter: grayscale(100%);
      cursor: not-allowed;
    `}
  `,
)

export const Slider = React.forwardRef(
  (
    {
      label,
      description,
      error,
      hideLabel,
      inline,
      labelPlacement,
      labelSecondary,
      required,
      width,
      defaultValue,
      disabled,
      id,
      name,
      readOnly,
      tabIndex,
      value,
      min = 1,
      max = 100,
      onChange,
      onBlur,
      onFocus,
      step = 'any',
      ...nativeProps
    }: Props,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const defaultRef = React.useRef<HTMLInputElement>(null)
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || defaultRef

    return (
      <Field
        {...{
          label,
          description,
          error,
          hideLabel,
          inline,
          labelPlacement,
          labelSecondary,
          required,
          width,
          id,
        }}
      >
        {(ids) => (
          <Container>
            <SliderComponent
              ref={inputRef}
              type="range"
              {...{
                ...nativeProps,
                ...ids?.content,
                defaultValue,
                disabled,
                name,
                readOnly,
                tabIndex,
                value,
                min,
                max,
                onChange,
                onBlur,
                onFocus,
                step,
              }}
            />
          </Container>
        )}
      </Field>
    )
  },
)

Slider.displayName = 'Slider'
