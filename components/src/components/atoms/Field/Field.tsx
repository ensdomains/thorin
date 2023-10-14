import * as React from 'react'

import { P, match } from 'ts-pattern'

import { Space } from '@/src/tokens'

import { ReactNodeNoStrings } from '../../../types'
import { useFieldIds } from '../../../hooks'
import { VisuallyHidden } from '../VisuallyHidden'
import { Typography } from '../Typography/Typography'
import { Box, BoxProps } from '../Box/Box'

export type State = ReturnType<typeof useFieldIds> | undefined
const Context = React.createContext<State>(undefined)

type NativeFormProps = React.AllHTMLAttributes<HTMLFormElement>
type NativeLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

export type FieldBaseProps = {
  /** Description text or react component. */
  description?: React.ReactNode
  /** Error text or a react component. */
  error?: React.ReactNode
  /** If true, hides the label and secondary label. */
  hideLabel?: boolean
  /** Label text or react component */
  label: React.ReactNode
  /** Secondary text or react component */
  labelSecondary?: React.ReactNode
  /** Adds mark to label */
  required?: NativeFormProps['required']
  /** If true, moves the label and status messages to the right of the content. */
  inline?: boolean
  /** A tokens space key value setting the width of the parent element. */
  width?: Space
  /** Have label appear on the left of the form element. */
  reverse?: boolean
  /** If true, will set the Fields component to read only mode */
  readOnly?: boolean
}

type Props = FieldBaseProps & {
  children: React.ReactElement | ((context: State) => ReactNodeNoStrings)
  /** The id attribute of the label element */
  id?: NativeFormProps['id']
  disabled?: boolean
} & Omit<NativeLabelProps, 'id' | 'children'>

const RequiredBox = () => (
  <Box as="span" color="$redPrimary" marginLeft="$1" whiteSpace="pre">
    *
  </Box>
)

const LabelBox = ({
  $disabled = false,
  $readOnly = false,
  $required,
  children,
  ...props
}: BoxProps & {
  $disabled?: boolean
  $readOnly?: boolean
  $required?: boolean
}) => (
  <Box
    cursor={match([$disabled, $readOnly])
      .with([true, P._], () => 'not-allowed')
      .with([false, true], () => 'none')
      .with([false, false], () => 'pointer')
      .exhaustive()}
    display="flex"
    flexBasis="$auto"
    flexGrow="2"
    flexShrink="1"
    overflow="hidden"
    position="relative"
    {...props}
  >
    {children}
    {$required && <RequiredBox />}
  </Box>
)

const InnerLabelBox = (props: React.ComponentProps<typeof Typography>) => (
  <Typography {...props} width="$full" />
)

const SecondaryLabelBox = (props: React.ComponentProps<typeof Typography>) => (
  <Typography
    flexBasis="$auto"
    flexGrow="0"
    flexShrink="2"
    overflow="hidden"
    position="relative"
    textAlign="right"
    {...props}
  />
)

const LabelContentContainerBox = ({
  $inline,
  ...props
}: BoxProps & { $inline?: boolean }) => (
  <Box
    alignItems="center"
    display="flex"
    gap="$2"
    overflow="hidden"
    px={$inline ? '$0' : '$2'}
    {...props}
  />
)

const LabelContent = ({
  ids,
  label,
  labelSecondary,
  required,
  hideLabel,
  inline,
  disabled,
  readOnly,
}: {
  ids: any
  label: React.ReactNode
  labelSecondary?: React.ReactNode
  required?: boolean | undefined
  inline?: boolean
  hideLabel?: boolean
  disabled?: boolean
  readOnly?: boolean
}) => {
  const content = (
    <LabelContentContainerBox $inline={inline}>
      <LabelBox
        $disabled={disabled}
        $readOnly={readOnly}
        $required={required}
        as="label"
        {...ids.label}
      >
        <InnerLabelBox color="greyPrimary" ellipsis fontVariant="bodyBold">
          {label}
          {required && (
            <>
              <RequiredBox />
              <VisuallyHidden>required</VisuallyHidden>
            </>
          )}
        </InnerLabelBox>
      </LabelBox>
      {labelSecondary && (
        <SecondaryLabelBox
          color="greyPrimary"
          ellipsis
          fontVariant="extraSmall"
        >
          {labelSecondary}
        </SecondaryLabelBox>
      )}
    </LabelContentContainerBox>
  )
  if (hideLabel) return <VisuallyHidden>{content}</VisuallyHidden>
  return content
}

const DescriptionBox = ({
  $inline,
  ...props
}: React.ComponentProps<typeof Typography> & { $inline: boolean }) => (
  <Typography
    overflow="hidden"
    padding={$inline ? '$0' : '$2'}
    width="$full"
    {...props}
  />
)

const ErrorBox = ({
  $inline,
  ...props
}: React.ComponentProps<typeof Typography> & { $inline: boolean }) => (
  <Typography padding={$inline ? '$0' : '$2'} {...props} />
)

const DecorativeContent = ({
  ids,
  error,
  description,
  hideLabel,
  inline,
  disabled,
}: {
  error: Props['error']
  description: Props['description']
  hideLabel: Props['hideLabel']
  inline: Props['inline']
  ids: any
  disabled?: boolean
}) => {
  if (hideLabel) return null
  if (error)
    return (
      <ErrorBox
        aria-live="polite"
        {...ids.error}
        $inline={inline}
        color="redPrimary"
        fontVariant="smallBold"
      >
        {error}
      </ErrorBox>
    )
  if (description)
    return (
      <DescriptionBox
        $inline={inline}
        {...ids.description}
        color={disabled ? 'greyPrimary' : 'textPrimary'}
        colorScheme={disabled ? 'secondary' : 'primary'}
        ellipsis
        fontVariant="small"
      >
        {description}
      </DescriptionBox>
    )
  return null
}

interface ContainerProps {
  $width: Space
  $inline?: boolean
  $reverse?: boolean
}

const ContainerBox = ({
  $width,
  $inline,
  $reverse,
  ...props
}: BoxProps & ContainerProps) => (
  <Box
    alignItems={$inline ? 'flex-start' : 'normal'}
    display="flex"
    flexDirection={match([!!$inline, !!$reverse])
      .with([true, true], () => 'row-reverse' as const)
      .with([true, false], () => 'row' as const)
      .with([false, P._], () => 'column' as const)
      .exhaustive()}
    gap="$2"
    justifyContent="flex-start"
    position="relative"
    width={$width}
    {...props}
  />
)

const ContainerInnerBox = (props: BoxProps) => (
  <Box
    display="flex"
    flex="1"
    flexDirection="column"
    gap="$1"
    overflow="hidden"
    {...props}
  />
)

export const Field = ({
  children,
  description,
  error,
  hideLabel,
  id,
  label,
  labelSecondary,
  required,
  inline,
  readOnly,
  width = 'full',
  reverse = false,
  disabled,
  ...props
}: Props) => {
  const ids = useFieldIds({
    id,
    description: description !== undefined,
    error: error !== undefined,
  })

  // Allow children to consume ids or try to clone ids onto it
  let content: React.ReactNode | null
  if (typeof children === 'function')
    content = (
      <Context.Provider value={ids}>
        <Context.Consumer>{(context) => children(context)}</Context.Consumer>
      </Context.Provider>
    )
  else if (children) content = React.cloneElement(children, ids.content)
  else content = children

  const labelContent = (
    <LabelContent
      {...{
        ...props,
        ids,
        label,
        labelSecondary,
        required,
        hideLabel,
        inline,
        disabled,
        readOnly,
      }}
    />
  )

  const decorativeContent = (
    <DecorativeContent
      {...{ ids, error, description, hideLabel, inline, disabled }}
    />
  )

  if (inline)
    return (
      <ContainerBox $inline={inline} $reverse={reverse} $width={width}>
        <div>{content}</div>
        <ContainerInnerBox>
          {labelContent}
          {decorativeContent}
        </ContainerInnerBox>
      </ContainerBox>
    )

  return (
    <ContainerBox $width={width}>
      {labelContent}
      {content}
      {decorativeContent}
    </ContainerBox>
  )
}

Field.displayName = 'Field'
