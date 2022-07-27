import * as React from 'react'

import styled, { css } from 'styled-components'

import { ReactNodeNoStrings } from '../../../types'
import { useFieldIds } from '../../../hooks'
import { VisuallyHidden } from '../VisuallyHidden'

import { Space } from '@/src/tokens'

type State = ReturnType<typeof useFieldIds> | undefined
const Context = React.createContext<State>(undefined)

type NativeFormProps = React.AllHTMLAttributes<HTMLFormElement>
type NativeLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>
type Placement = 'top' | 'bottom'

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
  /** Set the placement of the error and description. Does not affect inline mode. */
  labelPlacement?: Placement | { error?: Placement; description?: Placement }
}

type Props = FieldBaseProps & {
  children: React.ReactElement | ((context: State) => ReactNodeNoStrings)
  /** The id attribute of the label element */
  id?: NativeFormProps['id']
} & Omit<NativeLabelProps, 'id' | 'children'>

const Label = styled.label<{ $inline?: boolean }>(
  ({ theme }) => css`
    color: ${theme.colors.textTertiary};
    font-weight: ${theme.fontWeights['semiBold']};
    display: flex;
  `,
)

const LabelSecondary = styled.span(
  ({ theme }) => css`
    margin-left: ${theme.space['4']};
  `,
)

type LabelContentProps = {
  ids: any
  label: React.ReactNode
  labelSecondary: React.ReactNode
  required: boolean | undefined
  $inline?: boolean
}

const LabelContentContainer = styled.div<{ $inline?: boolean }>(
  ({ theme, $inline }) => css`
    display: flex;
    align-items: flex-end;
    padding-left: ${$inline ? '0' : theme.space['4']};
    padding-right: ${$inline ? '0' : theme.space['4']};
    padding-top: 0;
    padding-bottom: 0;
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
  $inline,
  ...props
}: LabelContentProps) => (
  <LabelContentContainer {...{ ...props, ...ids.label }} $inline={$inline}>
    <Label {...ids.label} $inline={$inline}>
      {label}{' '}
      {required && (
        <>
          <RequiredWrapper>*</RequiredWrapper>
          <VisuallyHidden>required</VisuallyHidden>
        </>
      )}
    </Label>
    {labelSecondary && <LabelSecondary>{labelSecondary}</LabelSecondary>}
  </LabelContentContainer>
)

interface ContainerProps {
  $width: Space
  $inline?: boolean
}
const Container = styled.div<ContainerProps>(
  ({ theme, $inline, $width }) => css`
    display: flex;
    flex-direction: ${$inline ? 'row' : 'column'};
    align-items: ${$inline ? 'center' : 'normal'};
    gap: ${$inline ? theme.space['2.5'] : theme.space['2']};
    width: ${theme.space[$width]};
  `,
)

const ContainerInner = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.space[2]};
    flex: 1;
  `,
)

const Description = styled.div<{ $inline?: boolean }>(
  ({ theme, $inline }) => css`
    padding: 0 ${$inline ? '0' : theme.space['4']};
    color: ${theme.colors.textSecondary};
  `,
)

const Error = styled.div<{ $inline?: boolean }>(
  ({ theme, $inline }) => `
    color: ${theme.colors.red};
    padding: 0 ${$inline ? '0' : theme.space[4]};
`,
)

const getPlacement = (
  label: 'error' | 'description',
  fallback: Placement,
  placement?: Props['labelPlacement'],
): Placement => {
  if (typeof placement === 'string') return placement
  return placement?.[label] || fallback
}

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
  width = 'full',
  labelPlacement,
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

  const descriptionPlacement = getPlacement(
    'description',
    'bottom',
    labelPlacement,
  )
  const errorPlacement = getPlacement('error', 'bottom', labelPlacement)

  return inline ? (
    <Container $inline={inline} $width={width}>
      <ContainerInner>
        {hideLabel ? (
          <VisuallyHidden>
            <LabelContent
              {...{ ...props, ids, label, labelSecondary, required }}
            />
          </VisuallyHidden>
        ) : (
          <LabelContent
            {...{ ...props, ids, label, labelSecondary, required }}
            $inline={inline}
          />
        )}
        {description && (
          <Description $inline={inline}>{description}</Description>
        )}
        {error && (
          <Error aria-live="polite" {...ids.error} $inline={inline}>
            {error}
          </Error>
        )}
      </ContainerInner>
      <div>{content}</div>
    </Container>
  ) : (
    <Container $width={width}>
      {hideLabel ? (
        <VisuallyHidden>
          <LabelContent
            {...{ ...props, ids, label, labelSecondary, required }}
          />
        </VisuallyHidden>
      ) : (
        <LabelContent {...{ ...props, ids, label, labelSecondary, required }} />
      )}

      {description && descriptionPlacement === 'top' && (
        <Description {...ids.description}>{description}</Description>
      )}

      {error && errorPlacement === 'top' && (
        <Error aria-live="polite" {...ids.error}>
          {error}
        </Error>
      )}
      {content}

      {description && descriptionPlacement === 'bottom' && (
        <Description {...ids.description}>{description}</Description>
      )}

      {error && errorPlacement === 'bottom' && (
        <Error aria-live="polite" {...ids.error}>
          {error}
        </Error>
      )}
    </Container>
  )
}

Field.displayName = 'Field'
