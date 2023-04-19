/* stylelint-disable property-no-unknown */
import { createGlobalStyle, css } from 'styled-components'

const GlobalStyle = createGlobalStyle(
  ({ theme }) => css`
    *,
    ::before,
    ::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: ${theme.fonts['sans']};
      border-color: ${theme.colors.greyLight};
      border-style: ${theme.borderStyles['solid']};
      border-width: 0;
      color: currentColor;
      font-size: 100%;
      font-feature-settings: 'ss01' on, 'ss03' on;
      vertical-align: baseline;
    }

    [data-js-focus-visible] &:focus:not([data-focus-visible-added]) {
      outline: none;
    }

    html {
      font-size: ${theme.fontSizes.body};
      color: ${theme.colors.text};
      text-rendering: optimizeLegibility;
      background: radial-gradient(
          40.48% 67.6% at 50% 32.4%,
          #ecf4ff 0%,
          #f7f7ff 52.77%,
          #f7f7f7 100%
        ),
        #ffffff;
    }

    body {
      line-height: normal;
    }

    article,
    aside,
    details,
    div,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section {
      display: block;
    }

    ul,
    ol {
      list-style: none;
    }

    blockquote {
      quotes: none;

      &::before,
      &::after {
        content: '';
      }
    }

    table {
      border-collapse: collapse;
      border-spacing: 0;
    }

    fieldset {
      display: block;
      appearance: none;
      outline: none;
      &:placeholder {
        color: ${theme.colors.text};
        opacity: 1;
      }
    }

    mark {
      background-color: transparent;
      color: inherit;
    }

    select {
      display: block;
      appearance: none;
      outline: none;
      &:placeholder {
        color: ${theme.colors.text};
        opacity: 1;
      }

      &:-ms-expand {
        display: none;
      }
    }

    input {
      display: block;
      appearance: none;
      outline: none;
      &:placeholder {
        color: ${theme.colors.text};
        opacity: 1;
      }
      &::-webkit-outer-spin-button {
        webkit-appearance: none;
      }
      &::-webkit-inner-spin-button {
        webkit-appearance: none;
      }
      &::-ms-clear {
        display: none;
      }
      &::-webkit-search-cancel-button {
        webkit-appearance: none;
      }
    }

    button {
      background: none;
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    .indicator-container {
      position: relative;
      &::after {
        position: absolute;
        top: -${theme.space['0.5']};
        right: -${theme.space['0.5']};
        content: '';
        width: ${theme.space['4']};
        height: ${theme.space['4']};
        background-color: var(--indicator-color);
        border-radius: ${theme.radii.full};
        border: ${theme.space['0.5']} solid ${theme.colors.greySurface};
        transform: scale(0);
        opacity: 0;
        transition: all 0.2s ease-in-out;
      }
      &[type='button']::after {
        top: -${theme.space['1']};
        right: -${theme.space['1']};
      }
      &[data-indicator='true']::after {
        transform: scale(1);
        opacity: 1;
      }
    }
  `,
)

export default GlobalStyle
