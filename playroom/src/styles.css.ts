import { globalFontFace, globalStyle } from '@vanilla-extract/css'

import { vars } from '@ensdomains/thorin/css'

globalFontFace('JakartaSans', {
  fontDisplay: 'optional',
  fontStyle: 'normal',
  fontWeight: '400',
  src: "url('/fonts/sans/PlusJakartaSans-Regular.woff2') format('woff2')",
})

globalFontFace('JakartaSans', {
  fontDisplay: 'optional',
  fontStyle: 'italic',
  fontWeight: '400',
  src: "url('/fonts/sans/PlusJakartaSans-Italic.woff2') format('woff2')",
})

globalFontFace('JakartaSans', {
  fontDisplay: 'optional',
  fontStyle: 'normal',
  fontWeight: '700',
  src: "url('/fonts/sans/PlusJakartaSans-Bold.woff2') format('woff2')",
})

globalFontFace('JakartaSans', {
  fontDisplay: 'optional',
  fontStyle: 'italic',
  fontWeight: '700',
  src: "url('/fonts/sans/PlusJakartaSans-BoldItalic.woff2') format('woff2')",
})

globalFontFace('JakartaSans', {
  fontDisplay: 'optional',
  fontStyle: 'normal',
  fontWeight: '500',
  src: "url('/fonts/sans/PlusJakartaSans-Medium.woff2') format('woff2')",
})

globalFontFace('JakartaSans', {
  fontDisplay: 'optional',
  fontStyle: 'italic',
  fontWeight: '500',
  src: "url('/fonts/sans/PlusJakartaSans-MediumItalic.woff2') format('woff2')",
})

globalStyle('*, ::before, ::after', {
  boxSizing: 'border-box',
})

globalStyle('html', {
  fontSize: '16px',
  background: vars.colors.background,
  textRendering: 'optimizeLegibility',
})

globalStyle('body', {
  margin: 0,
})
