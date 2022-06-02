import styled, { css } from 'styled-components'

export const VisuallyHidden = styled.div(
  () => css`
    border-width: 0;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  `,
)
