import * as React from 'react'

import styled, { css } from 'styled-components'

import { getTestId } from '../../../utils/utils'
import { createSyntheticEvent } from '../../../utils/createSyntheticEvent'
import { RadioButton } from '@/src/components'

const Container = styled.div<{ $inline?: boolean }>(
  ({ theme, $inline }) => css`
    display: flex;
    flex-direction: ${$inline ? 'row' : 'column'};
    gap: ${theme.space['2']};
    justify-content: flex-start;
    flex-wrap: ${$inline ? 'wrap' : 'nowrap'};
  `,
)

type NativeDivProps = React.HTMLAttributes<HTMLDivElement>
type NativeInputProps = React.InputHTMLAttributes<HTMLInputElement>
export type Props = {
  /** Display the radio buttons in a row */
  inline?: boolean
  /** The children of the component that conform to the basic input attributes  */
  children?:
    | React.ReactElement<typeof RadioButton>[]
    | React.ReactElement<typeof RadioButton>
  /** The value for the radio group */
  value?: string
  /** The handler for the change event. */
  onChange?: NativeInputProps['onChange']
  /** The handler for the blur event. */
  onBlur?: NativeInputProps['onBlur']
} & Omit<NativeDivProps, 'onFocus' | 'onChange' | 'onBlur'>

export const RadioButtonGroup = React.forwardRef(
  (
    {
      value: _value,
      children,
      inline = false,
      onChange,
      onBlur,
      ...props
    }: Props,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const defaultRef = React.useRef<HTMLDivElement>(null)
    const rootRef = (ref as React.RefObject<HTMLDivElement>) || defaultRef
    const checkedRef = React.useRef<HTMLInputElement>(null)

    const [didSetDefault, setDidSetDefault] = React.useState(false)
    const [value, setValue] = React.useState(_value)
    React.useEffect(() => {
      if (_value && _value != value) setValue(_value)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_value])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
      if (onChange) onChange(e)
    }

    const handleFocus = () => {
      if (checkedRef.current) {
        checkedRef.current.focus()
      }
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (onBlur) onBlur(e)
    }

    const generateChangeEvent = (value?: string, name = 'radiogroup') => {
      if (onChange && value) {
        const target = document.createElement('input')
        target.value = value
        target.name = name
        const event = new Event('change', { bubbles: true })
        Object.defineProperty(event, 'target', {
          writable: false,
          value: target,
        })
        const syntheticEvent = createSyntheticEvent(
          event,
        ) as React.ChangeEvent<HTMLInputElement>
        onChange(syntheticEvent)
      }
    }

    return (
      <Container
        $inline={inline}
        {...props}
        data-testid={getTestId(props, 'radiogroup')}
        ref={rootRef}
        role="radiogroup"
        onFocus={handleFocus}
      >
        {React.Children.map(children, (child: any) => {
          if (child.props.checked && !didSetDefault) {
            setDidSetDefault(true)
            if (value !== child.props.value) {
              setValue(child.props.value)
              setDidSetDefault(true)
              generateChangeEvent(child.props.value, child.props.name)
            }
          }

          const isChecked = child.props.value === value

          return React.cloneElement(child, {
            ref: isChecked ? checkedRef : undefined,
            checked: isChecked,
            onChange: handleChange,
            onBlur: handleBlur,
          })
        })}
      </Container>
    )
  },
)

RadioButtonGroup.displayName = 'RadioButtonGroup'
