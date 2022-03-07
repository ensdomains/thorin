import { FunctionComponent } from 'react'
import styled from 'styled-components'

import * as React from 'react'

import { Colors, Space, tokens } from '@/src/tokens'

interface ContainerProps {
  color: string
  size: Space
  strokeWidth: Space
}

const Container = styled.div<ContainerProps>`
  ${(p) => `
    color: ${p.color};
    height: ${tokens.space[p.size]};
    width: ${tokens.space[p.size]};
    stroke-width: ${tokens.space[p.strokeWidth]};
  `}
`

type Props = {
  color?: Colors
  size?: Space
  strokeWidth?: Space
  svg: FunctionComponent
  className?: string
}

export default ({
  color = 'grey',
  size = '6',
  strokeWidth = '0.5',
  svg,
  className,
}: Props) => <Container as={svg} {...{ color, size, strokeWidth, className }} />
