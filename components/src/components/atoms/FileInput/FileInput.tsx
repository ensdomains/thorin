import * as React from 'react'

import type { ReactNodeNoStrings } from '../../../types'
import { useFieldIds } from '../../../hooks'
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden'
import { validateAccept } from './utils'

type Context = {
  droppable?: boolean
  file?: File
  focused?: boolean
  name?: string
  previewUrl?: string
  type?: string
  reset?: (event: React.MouseEvent<HTMLInputElement>) => void
}

const initialState: Context = {}

type NativeInputProps = React.InputHTMLAttributes<HTMLInputElement>

export type FileInputProps = {
  /** The accept attribute of input element */
  accept?: NativeInputProps['accept']
  /** The autoFocus attribute of input element */
  autoFocus?: NativeInputProps['autoFocus']
  /** A function that receives a context object and return a react element. The context object is made of the following properties droppable, focused, file, name, previewUrl, type and reset. */
  children: (context: Context) => ReactNodeNoStrings
  /** Preloads the file input file to submit. */
  defaultValue?: { name?: string, type: string, url: string }
  /** The disabled attribute of input element. */
  disabled?: NativeInputProps['disabled']
  /** Error text or react element */
  error?: boolean | React.ReactNode
  /** The id attribute of input element */
  id?: NativeInputProps['id']
  /** Size in megabytes */
  maxSize?: number
  /** The name attribute of input element. */
  name?: NativeInputProps['name']
  /** The required attribute of input element */
  required?: NativeInputProps['required']
  /** The tabindex attribute of input element */
  tabIndex?: NativeInputProps['tabIndex']
  /** An event handler that is fired after blur events. Wrap this function in useCallback to maintian referenctial equality.  */
  onBlur?: NativeInputProps['onBlur']
  /** An event handler that is fired after error events. Wrap this function in useCallback to maintian referenctial equality.  */
  onError?(error: string): void
  /** An event handler that is fired after change events. Wrap this function in useCallback to maintian referenctial equality.  */
  onChange?(file: File): void
  /** An event handler that is fired after focus events. Wrap this function in useCallback to maintian referenctial equality.  */
  onFocus?: NativeInputProps['onFocus']
  /** An event handler that is fired after the context.reset function is fired. Wrap this function in useCAllback to maintain referential equality. */
  onReset?(): void
} & Omit<
  NativeInputProps,
  'onReset' | 'onChange' | 'onError' | 'defaultValue' | 'children' | 'type'
>

export const FileInput = React.forwardRef<HTMLDivElement, FileInputProps>(
  (
    {
      accept,
      autoFocus,
      children,
      defaultValue,
      disabled,
      error,
      id,
      maxSize,
      name,
      required,
      tabIndex,
      onBlur,
      onChange,
      onError,
      onFocus,
      onReset,
      ...props
    },
    ref,
  ) => {
    const defaultRef = React.useRef<HTMLInputElement>(null)
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || defaultRef
    const [state, setState] = React.useState<Context>(initialState)

    const hasError = error ? true : undefined
    const ids = useFieldIds({
      id,
      error: hasError,
    })

    const handleFile = React.useCallback(
      (file: File, event?: React.ChangeEvent | React.DragEvent) => {
        // Disallow file larger than max
        if (maxSize && file.size > maxSize * 1_000_000) {
          event?.preventDefault()
          if (onError)
            onError(
              `File is ${(file.size / 1_000_000).toFixed(
                2,
              )} MB. Must be smaller than ${maxSize} MB`,
            )
          return
        }
        setState(x => ({
          ...x,
          file,
          name: file.name,
          type: file.type,
        }))
        if (onChange) onChange(file)
      },
      [maxSize, onChange, onError],
    )

    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (!files?.length) return
        handleFile(files[0], event)
      },
      [handleFile],
    )

    const handleDragOver = React.useCallback(
      (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault()
        setState(x => ({ ...x, droppable: true }))
      },
      [],
    )

    const handleDragLeave = React.useCallback(
      (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault()
        setState(x => ({ ...x, droppable: false }))
      },
      [],
    )

    const handleDrop = React.useCallback(
      (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault()
        setState(x => ({ ...x, droppable: false }))
        let file: File | null
        if (event.dataTransfer.items) {
          const files = event.dataTransfer.items
          if (files?.[0].kind !== 'file') return
          file = files[0].getAsFile()
          if (!file) return
        }
        else {
          const files = event.dataTransfer.files
          if (!files?.length) return
          file = files[0]
        }
        if (!validateAccept(file.type, accept)) return
        handleFile(file, event)
      },
      [handleFile, accept],
    )

    const handleFocus = React.useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        setState(x => ({ ...x, focused: true }))
        if (onFocus) onFocus(event)
      },
      [onFocus],
    )

    const handleBlur = React.useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        setState(x => ({ ...x, focused: false }))
        if (onBlur) onBlur(event)
      },
      [onBlur],
    )

    const reset = React.useCallback(
      (event: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault()
        setState(initialState)
        if (inputRef.current) inputRef.current.value = ''
        if (onReset) onReset()
      },
      // No need to add defaultValue
      [inputRef, onReset],
    )

    // Display preview for default value

    React.useEffect(() => {
      if (!defaultValue) return
      setState({
        previewUrl: defaultValue.url,
        name: defaultValue.name,
        type: defaultValue.type,
      })
    }, [])

    // Create URL for displaying media preview
    React.useEffect(() => {
      if (!state.file) return
      const previewUrl = URL.createObjectURL(state.file)
      setState(x => ({ ...x, previewUrl }))
      return () => URL.revokeObjectURL(previewUrl)
    }, [state.file])

    return (
      <div>
        <VisuallyHidden>
          <input
            {...props}
            {...ids.content}
            accept={accept}
            aria-invalid={hasError}
            autoFocus={autoFocus}
            disabled={disabled}
            name={name}
            ref={inputRef}
            required={required}
            tabIndex={tabIndex}
            type="file"
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
          />
        </VisuallyHidden>

        <label
          {...ids.label}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {children({ ...state, reset })}
        </label>
      </div>
    )
  },
)

FileInput.displayName = 'FileInput'
