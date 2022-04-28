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

  .npm__react-simple-code-editor__textarea *, .npm__react-simple-code-editor__textarea + pre * {
    font-family: ${tokens.fonts['mono']} !important;
    font-size: ${tokens.fontSizes['base']} !important;
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
`

export default GlobalStyle
