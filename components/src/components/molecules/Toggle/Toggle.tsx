import * as React from 'react'
import styled, { css } from 'styled-components'

import type { Space } from '@/src/tokens'

type Size = 'small' | 'medium' | 'large'

export type Props = {
  size?: Size
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>

const CONTAINER_SIZES: {
  [key in Size]: {
    width: Space
    height: Space
  }
} = {
  small: {
    width: '12',
    height: '7',
  },
  medium: {
    width: '12',
    height: '8',
  },
  large: {
    width: '16',
    height: '10',
  },
}

const KNOB_SIZES: {
  [key in Size]: {
    diameter: Space
    translateX: Space
  }
} = {
  small: {
    diameter: '5',
    translateX: '2.5',
  },
  medium: {
    diameter: '6',
    translateX: '2',
  },
  large: {
    diameter: '8',
    translateX: '3',
  },
}

const Container = styled.input<{ $size?: Size }>(
  ({ theme, $size = 'medium' }) => css`
    position: relative;
    background-color: ${theme.colors.border};
    height: ${theme.space[CONTAINER_SIZES[$size].height]};
    width: ${theme.space[CONTAINER_SIZES[$size].width]};
    border-radius: ${theme.radii.full};
    transition: background-color 0.1s ease-in-out;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    &:checked {
      background-color: ${theme.colors.bluePrimary};
    }

    &:disabled {
      cursor: not-allowed;
    }

    &::after {
      content: '';
      display: block;
      position: absolute;
      background-color: ${theme.colors.backgroundPrimary};
      width: ${theme.space[KNOB_SIZES[$size].diameter]};
      height: ${theme.space[KNOB_SIZES[$size].diameter]};
      border-radius: ${theme.radii.full};
      transform: translateX(-${theme.space[KNOB_SIZES[$size].translateX]});
      transition: transform 0.3s ease-in-out, background-color 0.1s ease-in-out;
    }

    &:checked::after {
      transform: translateX(${theme.space[KNOB_SIZES[$size].translateX]});
    }

    &:disabled::after {
      background-color: ${theme.colors.greyPrimary};
    }
  `,
)

export const Toggle = React.forwardRef<HTMLInputElement, Props>(
  ({ size = 'medium', ...props }, ref) => {
    return <Container ref={ref} type="checkbox" {...props} $size={size} />
  },
)

Toggle.displayName = 'Toggle'
