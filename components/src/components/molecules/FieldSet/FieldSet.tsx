import * as React from 'react'
import styled from 'styled-components'

import { ReactNodeNoStrings } from '../../../types'
import { Heading, Tag } from '../..'
import { TagProps } from '../../atoms/Tag'

type NativeFieldSetProps = React.AllHTMLAttributes<HTMLFieldSetElement>

const Container = styled.fieldset`
  ${({ theme }) => `
  display: flex;
  flex-direction: column;
  gap: ${theme.space['4']};
  `}
`

const ContainerInner = styled.div`
  ${({ theme }) => `
  display: flex;
  flex-direction: column;
  gap: ${theme.space['1']};
  padding: 0 ${theme.space['4']};
  `}
`

const Row = styled.div`
  ${({ theme }) => `
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: ${theme.space['3']};
  `}
`

const Description = styled.div`
  ${({ theme }) => `
    color: ${theme.colors.textSecondary};
    font-size: ${theme.fontSizes.base};
  `}
`

const ChildrenContainer = styled.div`
  ${({ theme }) => `
  display: flex;
  flex-direction: column;
  gap: ${theme.space['4']};
  `}
`

export type Props = {
  children: ReactNodeNoStrings
  description?: string | React.ReactNode
  disabled?: NativeFieldSetProps['disabled']
  form?: NativeFieldSetProps['form']
  name?: NativeFieldSetProps['name']
  legend: string
  status?:
    | 'required'
    | 'optional'
    | 'pending'
    | 'complete'
    | {
        name: string
        tone: TagProps['tone']
      }
}

export const FieldSet = ({
  children,
  description,
  disabled,
  form,
  legend,
  name,
  status,
}: Props) => {
  let statusText: string | undefined
  let statusTone: TagProps['tone']
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
      statusTone = 'secondary'
      break
    }
  }
  if (typeof status === 'object') {
    statusText = status.name
    statusTone = status.tone
  }

  return (
    <Container disabled={disabled} form={form} name={name}>
      <ContainerInner>
        <Row>
          <Heading as="legend" level="2" responsive>
            {legend}
          </Heading>
          {statusTone && statusText && (
            <Tag tone={statusTone}>{statusText}</Tag>
          )}
        </Row>

        <Description>{description}</Description>
      </ContainerInner>

      <ChildrenContainer>{children}</ChildrenContainer>
    </Container>
  )
}
