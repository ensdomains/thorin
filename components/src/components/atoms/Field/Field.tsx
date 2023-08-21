import * as React from 'react'

import styled, { css } from 'styled-components'

import { Space } from '@/src/tokens'

import { ReactNodeNoStrings } from '../../../types'
import { useFieldIds } from '../../../hooks'
import { VisuallyHidden } from '../VisuallyHidden'
import { Typography } from '../Typography/Typography'

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

const Label = styled.label<{
  $disabled?: boolean
  $readOnly?: boolean
  $required?: boolean
}>(
  ({ theme, $disabled, $readOnly, $required }) => css`
    display: flex;
    flex-basis: auto;
    flex-grow: 2;
    flex-shrink: 1;
    overflow: hidden;
    position: relative;
    cursor: pointer;

    ${$readOnly &&
    css`
      cursor: default;
      pointer-events: none;
    `}

    ${$disabled &&
    css`
      cursor: not-allowed;
    `}

    ${$required &&
    css`
      ::after {
        content: ' *';
        white-space: pre;
        color: ${theme.colors.red};
      }
    `}
  `,
)

const InnerLabel = styled(Typography)(
  () => css`
    width: 100%;
  `,
)

const SecondaryLabel = styled(Typography)(
  () => css`
    flex-basis: auto;
    flex-grow: 0;
    flex-shrink: 2;
    text-align: right;
    overflow: hidden;
    position: relative;
  `,
)

const LabelContentContainer = styled.div<{ $inline?: boolean }>(
  ({ theme, $inline }) => css`
    display: flex;
    align-items: center;
    padding: 0 ${$inline ? '0' : theme.space['2']};
    overflow: hidden;
    gap: ${theme.space['2']};
  `,
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
    <LabelContentContainer $inline={inline}>
      <Label
        $disabled={disabled}
        $readOnly={readOnly}
        $required={required}
        {...ids.label}
      >
        <InnerLabel color="greyPrimary" ellipsis fontVariant="bodyBold">
          {label}
          {required && <VisuallyHidden>required</VisuallyHidden>}
        </InnerLabel>
      </Label>
      {labelSecondary && (
        <SecondaryLabel color="greyPrimary" ellipsis fontVariant="extraSmall">
          {labelSecondary}
        </SecondaryLabel>
      )}
    </LabelContentContainer>
  )
  if (hideLabel) return <VisuallyHidden>{content}</VisuallyHidden>
  return content
}

const Description = styled(Typography)<{ $inline?: boolean }>(
  ({ theme, $inline }) => css`
    padding: 0 ${$inline ? '0' : theme.space['2']};
    width: 100%;
    overflow: hidden;
  `,
)

const Error = styled(Typography)<{ $inline?: boolean }>(
  ({ theme, $inline }) => `
    padding: 0 ${$inline ? '0' : theme.space[2]};
`,
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
      <Error
        aria-live="polite"
        {...ids.error}
        $inline={inline}
        color="redPrimary"
        fontVariant="smallBold"
      >
        {error}
      </Error>
    )
  if (description)
    return (
      <Description
        $inline={inline}
        {...ids.description}
        color={disabled ? 'greyPrimary' : 'textPrimary'}
        colorScheme={disabled ? 'secondary' : 'primary'}
        ellipsis
        fontVariant="small"
      >
        {description}
      </Description>
    )
  return null
}

interface ContainerProps {
  $width: Space
  $inline?: boolean
  $reverse?: boolean
}

const Container = styled.div<ContainerProps>(
  ({ theme, $inline, $width, $reverse }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: 'normal';
    gap: ${theme.space['2']};
    width: ${theme.space[$width]};

    ${$inline &&
    css`
      flex-direction: ${$reverse ? 'row-reverse' : 'row'};
      align-items: 'flex-start';
    `}
  `,
)

const ContainerInner = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.space[1]};
    flex: 1;
    overflow: hidden;
  `,
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
      <Container $inline={inline} $reverse={reverse} $width={width}>
        <div>{content}</div>
        <ContainerInner>
          {labelContent}
          {decorativeContent}
        </ContainerInner>
      </Container>
    )

  return (
    <Container $width={width}>
      {labelContent}
      {content}
      {decorativeContent}
    </Container>
  )
}

Field.displayName = 'Field'
