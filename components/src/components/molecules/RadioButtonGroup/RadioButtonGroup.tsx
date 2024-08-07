import * as React from 'react'

import { RadioButton } from '@/src/components'

import { getTestId } from '../../../utils/utils'
import { createSyntheticEvent } from '../../../utils/createSyntheticEvent'
import { Box, BoxProps } from '../../atoms/Box/Box'

const Container = React.forwardRef<
  HTMLElement,
  BoxProps & { $inline?: boolean }
>(({ $inline, ...props }, ref) => (
  <Box
    {...props}
    display="flex"
    flexDirection={$inline ? 'row' : 'column'}
    flexWrap={$inline ? 'wrap' : 'nowrap'}
    gap="$2"
    justifyContent="flex-start"
    ref={ref}
  />
))

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
        {...props}
        $inline={inline}
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
