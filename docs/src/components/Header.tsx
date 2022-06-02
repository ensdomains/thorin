import * as React from 'react'
import styled, { css } from 'styled-components'

import { Heading, Typography } from '@ensdomains/thorin'

type Props = {
  description?: React.ReactNode
  title: React.ReactNode
}

const Container = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.space['10']};
  `,
)

const Description = styled(Typography)(
  ({ theme }) => css`
    color: ${theme.colors.textSecondary};
    font-size: ${theme.fontSizes['extraLarge']};
  `,
)

export const Header = ({ description, title }: Props) => {
  return (
    <header style={{ marginBottom: description ? 16 : 10 }}>
      <Container>
        <Heading color="foreground" level="1">
          {title}
        </Heading>

        {description && <Description>{description}</Description>}
      </Container>
    </header>
  )
}
