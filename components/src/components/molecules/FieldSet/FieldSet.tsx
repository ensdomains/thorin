import * as React from 'react'
import styled, { css } from 'styled-components'

import { ReactNodeNoStrings } from '../../../types'
import { Heading, Tag } from '../..'
import { TagProps } from '../../atoms/Tag'

const Container = styled.fieldset(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.space['4']};
  `,
)

const ContainerInner = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.space['1']};
    padding: 0 ${theme.space['4']};
  `,
)

const Row = styled.div(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: ${theme.space['3']};
  `,
)

const Description = styled.div(
  ({ theme }) => css`
    color: ${theme.colors.textSecondary};
    font-size: ${theme.fontSizes.body};
    line-height: ${theme.lineHeights.body};
  `,
)

const ChildrenContainer = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.space['4']};
  `,
)

type NativeFieldSetProps = React.FieldsetHTMLAttributes<HTMLFieldSetElement>

export type Props = {
  children: ReactNodeNoStrings
  /** Description content */
  description?: string | React.ReactNode
  /** The disabled attribute of the fieldset element. */
  disabled?: NativeFieldSetProps['disabled']
  /** The form attribute of the fieldset element. */
  form?: NativeFieldSetProps['form']
  /** The name attribute of the fieldset element. */
  name?: NativeFieldSetProps['name']
  /** The title for the group of elements */
  legend: string
  /** An optional Tag component next to the legend. */
  status?:
    | 'required'
    | 'optional'
    | 'pending'
    | 'complete'
    | {
        name: string
        tone: TagProps['color']
      }
} & Omit<NativeFieldSetProps, 'children'>

export const FieldSet = ({
  children,
  description,
  disabled,
  form,
  legend,
  name,
  status,
  ...props
}: Props) => {
  let statusText: string | undefined
  let statusTone: TagProps['color']
  switch (status) {
    case 'complete': {
      statusText = 'Complete'
      statusTone = 'green'
      break
    }
    case 'required':
    case 'pending': {
      statusText = status === 'pending' ? 'Pending' : 'Required'
      statusTone = 'accent'
      break
    }
    case 'optional': {
      statusText = 'Optional'
      statusTone = 'grey'
      break
    }
  }
  if (typeof status === 'object') {
    statusText = status.name
    statusTone = status.tone
  }

  return (
    <Container {...props} disabled={disabled} form={form} name={name}>
      <ContainerInner>
        <Row>
          <Heading as="legend" level="2" responsive>
            {legend}
          </Heading>
          {statusTone && statusText && (
            <Tag color={statusTone}>{statusText}</Tag>
          )}
        </Row>

        <Description>{description}</Description>
      </ContainerInner>

      <ChildrenContainer>{children}</ChildrenContainer>
    </Container>
  )
}

FieldSet.displayName = 'FieldSet'
