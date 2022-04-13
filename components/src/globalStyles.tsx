import { createGlobalStyle } from 'styled-components'

import { tokens } from './tokens'

const GlobalStyle = createGlobalStyle`
  ${({ theme }) => `
    html,
    body {
      font-family: ${tokens.fonts['sans']};
    }

    *, ::before, ::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      border-color: ${tokens.colors[theme.mode].foregroundSecondary};
      border-style: ${tokens.borderStyles['solid']};
      border-width: 0;
      color: ${tokens.colors.base.current};
      font-size: 100%;
      font-feature-settings: "ss01" on, "ss03" on;
      -moz-font-feature-settings: "ss01" on, "ss03" on;
      vertical-align: baseline;
    }
    
    [data-js-focus-visible] &:focus:not([data-focus-visible-added]) {
      outline: none;
    }
  
    html {
      font-size: ${tokens.fontSizes['root']};
      color: ${tokens.colors[theme.mode].foreground};
      text-rendering: optimizeLegibility;
      background: radial-gradient(40.48% 67.6% at 50% 32.4%,#ecf4ff 0%,#f7f7ff 52.77%,#f7f7f7 100%),#ffffff;
    }
    
    body {
      line-height: ${tokens.lineHeights.none};
    }
    
    article, aside, details, div, figcaption, figure, footer, header, hgroup, menu, nav, section {
      display: block;
    }
    
    ul, ol {
      list-style: none;
    }
    
    quote, blockquote {
      quotes: none;
      
      &:before, &after {
        content: '';
      }
    }
    
    table {
      border-collapse: collapse;
      border-spacing: 0;s
    }
    
    field {
      display: block;
      appearance: none;
      outline: none;
      &:placeholder {
        color: ${tokens.colors[theme.mode].textTertiary};
        opacity: ${tokens.opacity['100']};
      }
    }
    
    mark {
      background-color: ${tokens.colors.base.transparent};
      color: ${tokens.colors.base.inherit};
    }
    
    select {
      display: block;
        appearance: none;
        outline: none;
        &:placeholder {
          color: ${tokens.colors[theme.mode].textTertiary};
          opacity: ${tokens.opacity['100']};
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
        color: ${tokens.colors[theme.mode].textTertiary};
        opacity: ${tokens.opacity['100']};
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
      color: ${tokens.colors.base.inherit};
    }
  
  `}
`

export default GlobalStyle
