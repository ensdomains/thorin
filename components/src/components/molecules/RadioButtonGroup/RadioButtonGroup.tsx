import * as React from 'react'

import { getTestId } from '../../../utils/utils'
import { createSyntheticEvent } from '../../../utils/createSyntheticEvent'

type NativeDivProps = React.HTMLAttributes<HTMLDivElement>
type NativeInputProps = React.InputHTMLAttributes<HTMLInputElement>
type RadioType = Pick<NativeInputProps, 'value' | 'onChange' | 'checked'>
export type Props = {
  /** The children of the component that conform to the basic input attributes  */
  children?: React.ReactElement<RadioType>[] | React.ReactElement<RadioType>
  /** The value for the radio group */
  value?: string
  /** The handler for the change event. */
  onChange?: NativeInputProps['onChange']
  /** The handler for the blur event. */
  onBlur?: NativeInputProps['onBlur']
} & Omit<NativeDivProps, 'onFocus' | 'onChange'>

export const RadioButtonGroup = React.forwardRef(
  (
    { value: _value, children, onChange, onBlur, ...props }: Props,
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

    const generateChangeEvent = (
      value?: string | number,
      name = 'radiogroup',
    ) => {
      if (onChange && value) {
        const event = new Event('change', { bubbles: true })
        const syntheticEvent = createSyntheticEvent(
          event,
        ) as React.ChangeEvent<HTMLInputElement>
        Object.defineProperties(syntheticEvent, {
          target: {
            writable: true,
            value: { value, name },
          },
          currentTarget: {
            writable: true,
            value: {
              value,
              name,
            },
          },
        })
        onChange(syntheticEvent)
      }
    }

    return (
      <div
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
      </div>
    )
  },
)

RadioButtonGroup.displayName = 'RadioButtonGroup'
