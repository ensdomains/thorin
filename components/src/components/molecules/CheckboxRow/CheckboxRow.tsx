import * as React from 'react'
import styled, { css } from 'styled-components'

import { Hue } from '@/src/tokens'

import { CheckSVG, Typography } from '../..'
import { useId } from '../../../hooks/useId'

export type Props = {
  label: string
  color?: Hue
} & React.InputHTMLAttributes<HTMLInputElement>

const Container = styled.div<{
  $color: Hue
}>(
  ({ theme, $color }) => css`
    position: relative;
    width: 100%;

    input ~ label:hover {
      transform: translateY(-1px);
    }

    input ~ label:hover div#circle {
      background: ${theme.colors.border};
    }

    input:checked ~ label {
      background: ${theme.colors[`${$color}Surface`]};
      border-color: transparent;
    }

    input:disabled ~ label {
      cursor: not-allowed;
    }

    input:checked ~ label div#circle {
      background: ${theme.colors[`${$color}Primary`]};
      border-color: transparent;
    }

    input:disabled ~ label div#circle,
    input:disabled ~ label:hover div#circle {
      background: ${theme.colors.greySurface};
    }

    input:checked ~ label:hover div#circle {
      background: ${theme.colors[`${$color}Bright`]};
    }

    input:disabled ~ label,
    input:disabled ~ label:hover {
      background: ${theme.colors.greySurface};
      transform: initial;
    }

    input:disabled ~ label div#circle svg,
    input:disabled ~ label:hover div#circle svg {
      color: ${theme.colors.greySurface};
    }

    input:disabled:checked ~ label div#circle,
    input:disabled:checked ~ label:hover div#circle {
      background: ${theme.colors.border};
    }

    input:disabled:checked ~ label div#circle svg,
    input:disabled:checked ~ label:hover div#circle svg {
      color: ${theme.colors.greyPrimary};
    }
  `,
)

const RootInput = styled.input(
  () => css`
    position: absolute;
    width: 1px;
    height: 1px;
  `,
)

const Label = styled.label(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.space['4']};

    width: 100%;
    height: 100%;
    padding: ${theme.space['4']};

    border-radius: ${theme.space['2']};
    border: 1px solid ${theme.colors.border};

    cursor: pointer;

    transition: all 0.3s ease-in-out;
  `,
)

const Circle = styled.div(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;

    flex: 0 0 ${theme.space['7']};
    width: ${theme.space['7']};
    height: ${theme.space['7']};
    border-radius: ${theme.radii.full};
    border: 1px solid ${theme.colors.border};

    transition: all 0.3s ease-in-out;

    svg {
      display: block;
      color: ${theme.colors.backgroundPrimary};
      width: ${theme.space['4']};
      height: ${theme.space['4']};
    }
  `,
)

const Content = styled.div(
  () => css`
    display: flex;
    flex-direction: column;
  `,
)

export const CheckboxRow = React.forwardRef<HTMLInputElement, Props>(
  ({ label: title, name, color = 'blue', ...props }, ref) => {
    const defaultRef = React.useRef<HTMLInputElement>(null)
    const inputRef = ref || defaultRef

    const id = useId()
    return (
      <Container $color={color}>
        <RootInput
          id={id}
          name={name}
          type="checkbox"
          {...props}
          ref={inputRef}
        />
        <Label htmlFor={id} id="permissions-label">
          <Circle id="circle">
            <CheckSVG />
          </Circle>
          <Content>
            <Typography color="text" fontVariant="regularBold">
              {title}
            </Typography>
          </Content>
        </Label>
      </Container>
    )
  },
)

CheckboxRow.displayName = 'CheckboxRow'
