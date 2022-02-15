import { globalFontFace, globalStyle } from '@vanilla-extract/css'

import { vars } from '@ensdomains/thorin/css'

globalFontFace('iAWriter Mono', {
  fontDisplay: 'optional',
  fontStyle: 'normal',
  fontWeight: '400',
  src: "url('/fonts/mono/iAWriterMonoS-Regular.woff2') format('woff2')",
})

globalFontFace('iAWriter Mono', {
  fontDisplay: 'optional',
  fontStyle: 'italic',
  fontWeight: '400',
  src: "url('/fonts/mono/iAWriterMonoS-Italic.woff2') format('woff2')",
})

globalFontFace('Satoshi', {
  fontDisplay: 'block',
  fontStyle: 'normal',
  fontWeight: '400',
  src: "url('/fonts/sans/Satoshi-Regular.woff2') format('woff2')",
})

globalFontFace('Satoshi', {
  fontDisplay: 'swap',
  fontStyle: 'normal',
  fontWeight: '700',
  src: "url('/fonts/sans/Satoshi-Bold.woff2') format('woff2')",
})

globalFontFace('Satoshi', {
  fontDisplay: 'swap',
  fontStyle: 'normal',
  fontWeight: '900',
  src: "url('/fonts/sans/Satoshi-Black.woff2') format('woff2')",
})

globalFontFace('Satoshi', {
  fontDisplay: 'swap',
  fontStyle: 'normal',
  fontWeight: '500',
  src: "url('/fonts/sans/Satoshi-Medium.woff2') format('woff2')",
})

globalStyle('*, ::before, ::after', {
  boxSizing: 'border-box',
})

globalStyle('html', {
  fontSize: vars.fontSizes.root,
  background:
    'radial-gradient(40.48% 67.6% at 50% 32.4%,#ecf4ff 0%,#f7f7ff 52.77%,#f7f7f7 100%),#ffffff',
  color: vars.colors.foreground,
  textRendering: 'optimizeLegibility',
})

globalStyle('body', {
  margin: 0,
})

globalStyle('a', {
  textDecoration: 'none',
})
