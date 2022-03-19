import { createGlobalStyle } from 'styled-components'

import { tokens } from '@ensdomains/thorin'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
  
  a {
    text-decoration: none;
  }

  .npm__react-simple-code-editor__textarea {
    font-family: ${tokens.fonts['mono']} !important;
    font-size: ${tokens.fontSizes['base']} !important;
    padding: ${tokens.space['6']} !important;
    padding-right: ${tokens.space['14']} !important;
  }

  .npm__react-simple-code-editor__textarea:focus-visible {
    outline: none;
  }

  .npm__react-simple-code-editor__textarea + pre
   {
    font-family: ${tokens.fonts['mono']} !important;
    font-size: ${tokens.fontSizes['base']} !important;
    padding: ${tokens.space['6']} !important;
    padding-right: ${tokens.space['14']} !important;
  }

  @font-face {
    font-family: "iAWriter Mono";
    font-display: optional;
    font-style: normal;
    font-weight: 400;
    src: url('/fonts/mono/iAWriterMonoS-Regular.woff2') format('woff2');
  }

  @font-face {
    font-family: "iAWriter Mono";
    font-display: optional;
    font-style: italic;
    font-weight: 400;
    src: url('/fonts/mono/iAWriterMonoS-Italic.woff2') format('woff2'),
  }

  @font-face {
    font-family: "Satoshi";
    font-display: block;
    font-style: normal;
    font-weight: 400;
    src: url('/fonts/sans/Satoshi-Regular.woff2') format('woff2');
  }

  @font-face {
    font-family: "Satoshi";
    font-display: swap;
    font-style: normal;
    font-weight: 700;
    src: url('/fonts/sans/Satoshi-Bold.woff2') format('woff2');
  }

  @font-face {
    font-family: "Satoshi";
    font-display: swap;
    font-style: normal;
    font-weight: 900;
    src: url('/fonts/sans/Satoshi-Black.woff2') format('woff2');
  }

  @font-face {
    font-family: "Satoshi";
    font-display: swap;
    font-style: normal;
    font-weight: 500;
    src: url('/fonts/sans/Satoshi-Medium.woff2') format('woff2');
  }
`

export default GlobalStyle
