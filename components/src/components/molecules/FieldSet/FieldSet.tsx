import * as React from 'react'
import styled from 'styled-components'

import { ReactNodeNoStrings } from '../../../types'
import { Heading, Tag } from '../..'
import { TagProps } from '../../atoms/Tag'
import { tokens } from '@/src/tokens'

type NativeFieldSetProps = React.AllHTMLAttributes<HTMLFieldSetElement>

const Container = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: ${tokens.space['4']};
`

const ContainerInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.space['1']};
  padding: 0 ${tokens.space['4']};
`

const Row = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: ${tokens.space['3']};
`

const Description = styled.div`
  ${({ theme }) => `
    color: ${tokens.colors[theme.mode].textSecondary};
    font-size: ${tokens.fontSizes.base};
  `}
`

const ChildrenContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.space['4']};
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
