import * as React from 'react'

import { RadioButton } from '..'

type Props = {
  children:
    | React.ReactElement<typeof RadioButton>[]
    | React.ReactElement<typeof RadioButton>
  currentValue?: any
  onChange?: (value: any) => void
}

export const RadioButtonGroup = ({
  children,
  currentValue: _currentValue,
  onChange,
}: Props) => {
  const [currentValue, setCurrentValue] = React.useState<any>(null)
  const [didSetDefault, setDidSetDefault] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (_currentValue) {
      setCurrentValue(_currentValue)
    }
  }, [_currentValue])

  return (
    <>
      {React.Children.map(children, (child: any) => {
        if (
          child.props.checked &&
          currentValue !== child.props.value &&
          !didSetDefault
        ) {
          setCurrentValue(child.props.value)
          setDidSetDefault(true)
        }
        return React.cloneElement(child, {
          checked: child.props.value === currentValue,
          onChange: () => {
            setCurrentValue(child.props.value)
            if (onChange) {
              onChange(child.props.value)
            }
          },
        })
      })}
    </>
  )
}
