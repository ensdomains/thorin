import * as React from 'react'

import type { ReactNodeNoStrings } from '../../../types'
import type { TagProps } from '../../atoms/Tag/Tag'
import { Tag } from '../../atoms/Tag/Tag'
import type { BoxProps } from '../../atoms/Box/Box'
import { Box } from '../../atoms/Box/Box'
import { Heading } from '../../atoms'

const Container = (props: BoxProps) => (
  <Box
    {...props}
    as="fieldset"
    display="flex"
    flexDirection="column"
    gap="4"
  />
)

const ContainerInner = (props: BoxProps) => (
  <Box {...props} display="flex" flexDirection="column" gap="1" px="4" />
)

const Row = (props: BoxProps) => (
  <Box
    {...props}
    alignItems="center"
    display="flex"
    flexDirection="row"
    gap="3"
  />
)

const Description = (props: BoxProps) => (
  <Box {...props} color="textSecondary" fontSize="body" lineHeight="body" />
)

const ChildrenContainer = (props: BoxProps) => (
  <Box {...props} display="flex" flexDirection="column" gap="4" />
)

type NativeFieldSetProps = React.FieldsetHTMLAttributes<HTMLFieldSetElement>

export type FieldSetProps = {
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

export const FieldSet: React.FC<FieldSetProps> = ({
  children,
  description,
  disabled,
  form,
  legend,
  name,
  status,
  ...props
}) => {
  let statusText: string | undefined
  let statusTone: TagProps['colorStyle']
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
    statusTone = status.tone as TagProps['colorStyle']
  }

  return (
    <Container {...props} disabled={disabled} form={form} name={name}>
      <ContainerInner>
        <Row>
          <Heading as="legend" level="2" responsive>
            {legend}
          </Heading>
          {statusTone && statusText && (
            <Tag colorStyle={statusTone}>{statusText}</Tag>
          )}
        </Row>

        <Description>{description}</Description>
      </ContainerInner>

      <ChildrenContainer>{children}</ChildrenContainer>
    </Container>
  )
}

FieldSet.displayName = 'FieldSet'
