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
  /** Have lavel appear on the left of the form element. */
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

const Label = styled(Typography)<{ $disabled?: boolean; $readOnly?: boolean }>(
  ({ $disabled, $readOnly }) => css`
    display: flex;
    flex: 1;
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
  `,
)

const LabelContentContainer = styled.div<{ $inline?: boolean }>(
  ({ theme, $inline }) => css`
    display: flex;
    align-items: center;
    padding: 0 ${$inline ? '0' : theme.space['2']};
  `,
)

const RequiredWrapper = styled.span(
  ({ theme }) => css`
    color: ${theme.colors.red};
    ::before {
      content: ' ';
      white-space: pre;
    }
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
        asProp="label"
        color="grey"
        colorScheme="secondary"
        fontVariant="regularBold"
        {...ids.label}
      >
        {label}&nbsp;
        {required && (
          <>
            <RequiredWrapper>*</RequiredWrapper>
            <VisuallyHidden>required</VisuallyHidden>
          </>
        )}
      </Label>
      {labelSecondary && (
        <Typography
          color="grey"
          colorScheme="secondary"
          fontVariant="extraSmall"
        >
          {labelSecondary}
        </Typography>
      )}
    </LabelContentContainer>
  )
  if (hideLabel) return <VisuallyHidden>{content}</VisuallyHidden>
  return content
}

const Description = styled(Typography)<{ $inline?: boolean }>(
  ({ theme, $inline }) => css`
    padding: 0 ${$inline ? '0' : theme.space['2']};
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
        color="red"
        colorScheme="secondary"
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
        color={disabled ? 'grey' : 'text'}
        colorScheme={disabled ? 'secondary' : 'primary'}
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
