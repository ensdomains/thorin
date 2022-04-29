import * as React from 'react'
import styled from 'styled-components'

import { Space, tokens } from '@/src/tokens'

type Shape = 'circle' | 'square'

interface Container {
  shape: Shape
  noBorder?: boolean
  size: Space
}

const Container = styled.div<Container>`
  ${({ shape }) => {
    switch (shape) {
      case 'circle':
        return `
          border-radius: ${tokens.radii.full};
          &:after {
            border-radius: ${tokens.radii.full};
          }
        `
      case 'square':
        return `
          border-radius: ${tokens.radii['2xLarge']}
          &:after {
            border-radius: ${tokens.radii['2xLarge']}
          }
        `
      default:
        return ``
    }
  }}

  ${({ theme, noBorder }) =>
    !noBorder &&
    `
      &:after {
      box-shadow: ${tokens.shadows['-px']} ${
      tokens.colors[theme.mode].foregroundTertiary
    };
    content: '';
    inset: 0;
    position: absolute;
      }   
      }      
  `}

  ${({ theme, size }) =>
    `
      height: ${tokens.space[size]};
      width: ${tokens.space[size]};
      min-width: ${tokens.space[size]};
      background-color: ${tokens.colors[theme.mode].foregroundSecondary};
      
       
  `}
  
  overflow: hidden;
  position: relative;
`

const Placeholder = styled.div`
  ${({ theme }) => `
    background: ${tokens.colors[theme.mode].gradients.blue};
  `}

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`

export type Props = {
  /** Accessibility text. */
  label: string
  /** If true, removes the border around the avatar. */
  noBorder?: boolean
  /** Uses tokens space settings to set the size */
  size?: Space
  /** The src attribute for the img element */
  src?: string
  /** The shape of the avatar. */
  shape?: Shape
  // as?: 'img' | React.ComponentType
}

export const Avatar = ({
  label,
  noBorder = false,
  shape = 'circle',
  size = '12',
  src,
}: Props) => {
  const [showImage, setShowImage] = React.useState(!!src)

  return (
    <Container {...{ shape, size, noBorder: !showImage || noBorder }}>
      {showImage ? (
        <Img
          {...{
            decoding: 'async',
            src: src,
            alt: label,
            onError: () => setShowImage(false),
          }}
        />
      ) : (
        <Placeholder aria-label={label} />
      )}
    </Container>
  )
}
