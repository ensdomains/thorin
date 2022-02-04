import * as React from 'react'

import uniqueId from 'lodash/uniqueId'

import { Box, Field, IconDownIndicator } from '../..'
import { FieldBaseProps } from '../../atoms/Field'
import * as styles from './styles.css'

type NativeSelectProps = React.AllHTMLAttributes<HTMLSelectElement>

type OptionProps = {
  value: string
  label?: string
  prefix?: React.ReactNode
  disabled?: boolean
}

type SelectProps = Exclude<FieldBaseProps, 'inline'> & {
  id?: NativeSelectProps['id']
  disabled?: boolean
  onChange?: (selected: OptionProps | null) => void
  tabIndex?: NativeSelectProps['tabIndex']
  onFocus?: NativeSelectProps['onFocus']
  onBlur?: NativeSelectProps['onBlur']
  selected?: OptionProps
  options: OptionProps[] | OptionProps
}

export const Select = React.forwardRef(
  (
    {
      description,
      disabled,
      error,
      hideLabel,
      id: _id,
      label,
      labelSecondary,
      required,
      tabIndex,
      width,
      onBlur,
      onChange,
      onFocus,
      options,
      selected: _selected,
    }: SelectProps,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const defaultRef = React.useRef<HTMLDivElement>(null)
    const inputRef = (ref as React.RefObject<HTMLDivElement>) || defaultRef

    const [id] = React.useState(_id || uniqueId())
    const [selected, setSelected] = React.useState<OptionProps | null>(null)

    const [menuOpen, setMenuOpen] = React.useState(false)

    const handleInputEvent = (
      e: React.MouseEvent | React.KeyboardEvent,
      type: 'mouse' | 'keyboard',
      value?: OptionProps,
    ) => {
      if (disabled || (value && value.disabled)) return e.stopPropagation()
      if (type === 'keyboard') {
        e = e as React.KeyboardEvent
        if (!menuOpen && ['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key))
          return setMenuOpen(true)
        if (menuOpen && e.key === 'Enter') {
          value && setSelected(value)
          setMenuOpen(false)
          return
        }
      } else {
        e = e as React.MouseEvent
        if (e.type === 'click' && e.button === 0) {
          value && setSelected(value)
          setMenuOpen(!menuOpen)
        }
      }
    }

    const handleClickOutside = (e: any) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }

    React.useEffect(() => {
      if (_selected !== selected && _selected !== undefined)
        setSelected(_selected)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_selected])

    React.useEffect(() => {
      if (menuOpen) {
        document.addEventListener('mousedown', handleClickOutside)
      } else {
        document.removeEventListener('mousedown', handleClickOutside)
      }
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputRef, menuOpen])

    React.useEffect(() => {
      if (selected !== _selected && onChange) onChange(selected)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected])

    const OptionElement = ({ option }: { option: OptionProps | null }) =>
      option ? (
        <React.Fragment>
          {option.prefix && <Box>{option.prefix}</Box>}
          {option.label || option.value}
        </React.Fragment>
      ) : null

    return (
      <Field
        description={description}
        error={error}
        hideLabel={hideLabel}
        id={id}
        label={label}
        labelSecondary={labelSecondary}
        required={required}
        width={width}
      >
        <Box className={styles.wrapper} ref={inputRef} {...{ onFocus, onBlur }}>
          <Box
            aria-controls={`listbox-${id}`}
            aria-expanded="true"
            aria-haspopup="listbox"
            aria-invalid={error ? true : undefined}
            className={styles.select({ disabled, open: menuOpen })}
            id={`combo-${id}`}
            role="combobox"
            onClick={(e) => handleInputEvent(e, 'mouse')}
            {...{ disabled, tabIndex }}
          >
            <Box
              alignItems="center"
              display="flex"
              flexDirection="row"
              flexGrow={1}
              gap="4"
            >
              {selected ? <OptionElement option={selected} /> : <Box />}
            </Box>
            <IconDownIndicator
              className={styles.chevron({ open: menuOpen, disabled })}
              size="3"
            />
          </Box>
          <Box
            className={styles.selectOptionContainer({ open: menuOpen })}
            id={`listbox-${id}`}
            role="listbox"
            tabIndex={-1}
          >
            {(Array.isArray(options) ? options : [options]).map((option) => (
              <Box
                className={styles.selectOption({
                  selected: option === selected,
                  disabled: option.disabled,
                })}
                key={option.value}
                role="option"
                onClick={(e) => handleInputEvent(e, 'mouse', option)}
                onKeyPress={(e) => handleInputEvent(e, 'keyboard', option)}
              >
                <OptionElement option={option} />
              </Box>
            ))}
          </Box>
        </Box>
      </Field>
    )
  },
)
