import { globalFontFace, globalStyle } from '@vanilla-extract/css'

// import { vars } from '@ensdomains/thorin/css'

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
  fontSize: '16px',
  background: vars.colors.background,
  textRendering: 'optimizeLegibility',
})

globalStyle('body', {
  margin: 0,
})
