import * as React from 'react'
import styled, { css } from 'styled-components'

import type { Space } from '@/src/tokens'

import { useId } from '../../../hooks/useId'

type Size = 'small' | 'medium'

export type Props = {
  size?: Size
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>

const CONTAINER_SIZES: {
  [key in Size]: {
    width: Space
    height: Space
  }
} = {
  small: {
    width: '26',
    height: '10',
  },
  medium: {
    width: '32',
    height: '12',
  },
}

const KNOB_SIZES: {
  [key in Size]: {
    width: Space
    height: Space
    translateX: Space
  }
} = {
  small: {
    width: '12',
    height: '8',
    translateX: '6',
  },
  medium: {
    width: '15',
    height: '10',
    translateX: '7.5',
  },
}

const Container = styled.div<{ $size: Size }>(
  ({ theme, $size }) => css`
    position: relative;
    width: fit-content;

    label {
      position: absolute;
      left: 50%;
      top: 50%;
      width: ${theme.space[KNOB_SIZES[$size].width]};
      height: ${theme.space[KNOB_SIZES[$size].height]};
      font-size: ${theme.fontSizes.small};
      font-weight: ${theme.fontWeights.bold};
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.1s linear;
    }

    label#eth {
      color: ${theme.colors.textAccent};
      transform: translate(-50%, -50%)
        translateX(-${theme.space[KNOB_SIZES[$size].translateX]});
    }

    label#fiat {
      color: ${theme.colors.greyPrimary};
      transform: translate(-50%, -50%)
        translateX(${theme.space[KNOB_SIZES[$size].translateX]});
    }

    input[type='checkbox']:checked ~ label#eth {
      color: ${theme.colors.greyPrimary};
    }

    input[type='checkbox']:checked ~ label#fiat {
      color: ${theme.colors.textAccent};
    }

    input[type='checkbox']:disabled ~ label#eth {
      color: ${theme.colors.backgroundPrimary};
    }

    input[type='checkbox']:disabled ~ label#fiat {
      color: ${theme.colors.greyPrimary};
    }

    input[type='checkbox']:disabled:checked ~ label#fiat {
      color: ${theme.colors.backgroundPrimary};
    }

    input[type='checkbox']:disabled:checked ~ label#eth {
      color: ${theme.colors.greyPrimary};
    }
  `,
)

const InputComponent = styled.input<{ $size?: Size }>(
  ({ theme, $size = 'medium' }) => css`
    position: relative;
    background-color: ${theme.colors.greySurface};
    height: ${theme.space[CONTAINER_SIZES[$size].height]};
    width: ${theme.space[CONTAINER_SIZES[$size].width]};
    border-radius: ${theme.radii.input};

    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
      content: '';
      display: block;
      position: absolute;
      background-color: ${theme.colors.bluePrimary};
      width: ${theme.space[KNOB_SIZES[$size].width]};
      height: ${theme.space[KNOB_SIZES[$size].height]};
      border-radius: ${theme.space['1.5']};
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

export const CurrencyToggle = React.forwardRef<HTMLInputElement, Props>(
  ({ size = 'medium', disabled, ...props }, ref) => {
    const id = useId()
    return (
      <Container $size={size}>
        <InputComponent
          disabled={disabled}
          id={id}
          ref={ref}
          type="checkbox"
          {...props}
          $size={size}
        />
        <label htmlFor={id} id="eth">
          ETH
        </label>
        <label htmlFor={id} id="fiat">
          USD
        </label>
      </Container>
    )
  },
)

CurrencyToggle.displayName = 'CurrencyToggle'
