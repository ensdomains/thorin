import { useEffect, useState } from 'react'
import { RGBtoHex } from '~/utils/color'
import { Box, Button, modeVars, Typography } from '@ensdomains/thorin'
import * as styles from './ThemingControls.css'

const setThemeValue = (token: string, value: string) => {
  document.documentElement.style.setProperty(token, value)
}

const getThemeValue = (token: string) => {
  return window.getComputedStyle(document.body).getPropertyValue(token)
}

const ColorInput = ({ token, name }: { token: string, name: string }) => {
  const [color, setColor] = useState(() => {
    const [val, isRGB] = RGBtoHex(getThemeValue(token))
    if (isRGB) return val
    else return getThemeValue(token)
  })

  useEffect(() => {
    if (color) setThemeValue(token, color)
  }, [color])

  return (

    <Box display="flex" flexDirection="row" alignItems="center" gap="2">
      <Box as="input" id={name} type="color" height="6" width="6" value={color} onChange={e => setColor(e.currentTarget.value)} />
      <Typography as="label" htmlFor={name} fontSize="extraSmall" color="textSecondary">{name}</Typography>
    </Box>
  )
}

const thorinColorKeyToCssKey = (key: string) => `--thrn-color-${key}`

const skipKeys = ['Gradient', 'initial', 'inherit', 'transparent', 'white', 'black', 'Border', 'none', 'currentColor', 'unset']

export const ThemingControls = () => {
  if (typeof window === 'undefined') return null

  return (
    <Box display="flex" flexDirection="row">
      <Box gap="8" display="flex" width="full" flexDirection="column">
        <Typography as="h2" fontVariant="headingTwo">Colors</Typography>
        <div className={styles.grid}>
          {Object.keys(modeVars.color).filter((key) => {
            return !skipKeys.some(skipKey => key.includes(skipKey))
          }).map(key => (
            <ColorInput key={key} name={key} token={thorinColorKeyToCssKey(key)} />
          ))}
        </div>
      </Box>
      <Box gap="4">
        <Button colorStyle="accentPrimary">accentPrimaryBackground</Button>
        <Button colorStyle="accentSecondary">accentSecondaryBackground</Button>
      </Box>
    </Box>
  )
}
