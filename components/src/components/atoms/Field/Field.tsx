import * as React from 'react'

import styled, { useTheme } from 'styled-components'

import { ReactNodeNoStrings } from '../../../types'
import { useFieldIds } from '../../../hooks'
import { VisuallyHidden } from '../VisuallyHidden'
import { Mode, Space, tokens } from '@/src/tokens'

type State = ReturnType<typeof useFieldIds> | undefined
const Context = React.createContext<State>(undefined)

type NativeFormProps = React.AllHTMLAttributes<HTMLFormElement>

export type FieldBaseProps = {
  description?: React.ReactNode
  error?: React.ReactNode
  hideLabel?: boolean
  label: React.ReactNode
  labelSecondary?: React.ReactNode
  required?: NativeFormProps['required']
  inline?: boolean
  width?: Space
}

type Props = FieldBaseProps & {
  children: React.ReactElement | ((context: State) => ReactNodeNoStrings)
  id?: NativeFormProps['id']
}

const Label = styled.label`
  ${({ theme }) => `
  color: ${tokens.colors[theme.mode].textTertiary};
  font-weight: ${tokens.fontWeights['semiBold']};
  margin-right: ${tokens.space['4']};
`}
`

interface LabelContentProps {
  ids: any
  label: React.ReactNode
  labelSecondary: React.ReactNode
  required: boolean | undefined
}

const LabelContentContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-conetn: space-between;
  padding-left: ${tokens.space['4']};
  padding-right: ${tokens.space['4']};
  padding-top: 0;
  padding-bottom: 0;
`

const LabelContent = ({
  ids,
  label,
  labelSecondary,
  required,
}: LabelContentProps) => (
  <LabelContentContainer>
    <Label {...ids.label}>
      {label} {required && <VisuallyHidden>(required)</VisuallyHidden>}
    </Label>
    {labelSecondary && labelSecondary}
  </LabelContentContainer>
)

interface ContainerProps {
  width: Space
  inline?: boolean
}
const Container = styled.div<ContainerProps>`
  ${({ inline }) => (inline ? 'align-items: center' : '')};
  display: flex;
  flex-direction: ${({ inline }) => (inline ? 'row' : 'column')};
  gap: ${tokens.space[2]};
  width: ${({ width }) => tokens.space[width]};
`

const ContainerInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.space[2]};
`

const Description = styled.div<{ mode: Mode }>`
  padding: 0 ${tokens.space['4']};
  color: ${({ mode }) => tokens.shades[mode].textSecondary};
`

const Error = styled.div`
  color: ${({ theme }) => tokens.colors[theme.mode].red};
  padding: 0 ${tokens.space[4]};
`

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
}: Props) => {
  const ids = useFieldIds({
    id,
    description: description !== undefined,
    error: error !== undefined,
  })

  const { mode } = useTheme()

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

  return inline ? (
    <Container inline={inline} width={width}>
      <div>{content}</div>
      <ContainerInner>
        {hideLabel ? (
          <VisuallyHidden>
            <LabelContent {...{ ids, label, labelSecondary, required }} />
          </VisuallyHidden>
        ) : (
          <LabelContent {...{ ids, label, labelSecondary, required }} />
        )}
        {description && <Description {...{ mode }}>{description}</Description>}
        {error && (
          <Error aria-live="polite" {...ids.error}>
            {error}
          </Error>
        )}
      </ContainerInner>
    </Container>
  ) : (
    <Container width={width}>
      {hideLabel ? (
        <VisuallyHidden>
          <LabelContent {...{ ids, label, labelSecondary, required }} />
        </VisuallyHidden>
      ) : (
        <LabelContent {...{ ids, label, labelSecondary, required }} />
      )}
      {content}

      {description && (
        <Description {...{ mode }} {...ids.description}>
          {description}
        </Description>
      )}

      {error && (
        <Error aria-live="polite" {...ids.error}>
          {error}
        </Error>
      )}
    </Container>
  )
}
