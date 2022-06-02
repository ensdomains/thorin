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
      border-color: ${theme.colors.foregroundSecondary};
      border-style: ${theme.borderStyles['solid']};
      border-width: 0;
      color: ${theme.colors.current};
      font-size: 100%;
      font-feature-settings: 'ss01' on, 'ss03' on;
      vertical-align: baseline;
    }

    [data-js-focus-visible] &:focus:not([data-focus-visible-added]) {
      outline: none;
    }

    html {
      font-size: ${theme.fontSizes['root']};
      color: ${theme.colors.foreground};
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
      line-height: ${theme.lineHeights.none};
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
        color: ${theme.colors.textTertiary};
        opacity: ${theme.opacity['100']};
      }
    }

    mark {
      background-color: ${theme.colors.transparent};
      color: ${theme.colors.inherit};
    }

    select {
      display: block;
      appearance: none;
      outline: none;
      &:placeholder {
        color: ${theme.colors.textTertiary};
        opacity: ${theme.opacity['100']};
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
        color: ${theme.colors.textTertiary};
        opacity: ${theme.opacity['100']};
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
      color: ${theme.colors.inherit};
    }
  `,
)

export default GlobalStyle
