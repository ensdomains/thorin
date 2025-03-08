import type { DependencyList, EffectCallback } from 'react'
import { useEffect, useRef, useState } from 'react'
import { RGBtoHex } from '~/utils/color'
import type { Mode, Radii } from '@ensdomains/thorin'
import { Box, Button, modeVars, Tag, Toggle, Typography, useTheme, Input } from '@ensdomains/thorin'
import * as styles from './ThemingControls.css'
import { useIsMounted } from '~/utils/isMounted'
import type { Font } from '@/dist/types/tokens/typography'

const setThemeValue = (token: string, value: string, mode: Mode) => {
  document.querySelector<HTMLHtmlElement>(`html[data-theme="${mode}"]`)!.style.setProperty(token, value)
}

const getThemeValue = (token: string) => {
  return window.getComputedStyle(document.body).getPropertyValue(token)
}

function useDidUpdateEffect<Fn extends EffectCallback, Deps extends DependencyList>(fn: Fn, inputs: Deps) {
  const isMountingRef = useRef(false)

  useEffect(() => {
    isMountingRef.current = true
  }, [])

  useEffect(() => {
    if (!isMountingRef.current) {
      return fn()
    }
    else {
      isMountingRef.current = false
    }
  }, inputs)
}

const ColorInput = ({ token, name, mode }: { token: string, name: string, mode: Mode }) => {
  const [color, setColor] = useState(() => {
    const rgb = getThemeValue(token)
    const [val, isRGB] = RGBtoHex(rgb)
    if (isRGB) return val
    else return rgb
  })

  useDidUpdateEffect(() => {
    if (color) setThemeValue(token, color, mode)
  }, [color])

  return (

    <Box display="flex" flexDirection="row" alignItems="center" gap="2">
      <Box as="input" id={name} type="color" height="4" width="4" value={color} onChange={e => setColor((e.currentTarget as HTMLInputElement).value)} />
      <Typography as="label" htmlFor={name} fontSize="extraSmall" color="textSecondary">{name}</Typography>
    </Box>
  )
}

const FontInput = ({ name, mode }: { name: Font, mode: Mode }) => {
  const [font, setFont] = useState(() => {
    const font = getThemeValue(`--thrn-fonts-${name}`)
    return font
  })

  useDidUpdateEffect(() => {
    if (font) setThemeValue(`--thrn-fonts-${name}`, font, mode)
  }, [font])

  return (
    <Input
      onChange={(e) => {
        setFont((e.currentTarget as HTMLInputElement).value)
      }}
      label={name}
      width="full"
      type="text"
      name={name}
      id={name}
      value={font}
    />

  )
}

const BorderRadiusInput = ({ mode, name }: { mode: Mode, name: Radii }) => {
  const normalizedName = name.replace('.', '_')

  const [radius, setRadius] = useState(() => {
    const radius = getThemeValue(`--thrn-radii-${normalizedName}`)
    return radius
  })

  useDidUpdateEffect(() => {
    if (radius) setThemeValue(`--thrn-radii-${normalizedName}`, radius, mode)
  }, [radius])

  return (
    <Input
      onChange={(e) => {
        setRadius((e.currentTarget as HTMLInputElement).value)
      }}
      label={name}
      width="full"
      type="text"
      name={`borderRadius-${name}`}
      id={`borderRadius-${name}`}
      value={radius}
    />

  )
}

const thorinColorKeyToCssKey = (key: string) => `--thrn-color-${key}`

const skipKeys = ['Gradient', 'initial', 'inherit', 'transparent', 'white', 'black', 'Border', 'none', 'currentColor', 'unset']

export const ThemingControls = () => {
  const mounted = useIsMounted()

  const { mode } = useTheme()

  return (
    <Box display="flex" flexDirection="row">
      <Box display="flex" flexDirection="column" gap="4" padding="4" width="full">
        {mounted && (
          <Box gap="8" display="flex" width="full" flexDirection="column">
            <Typography as="h2" fontVariant="headingTwo">Fonts</Typography>
            <FontInput name="sans" mode={mode} />
            <FontInput name="mono" mode={mode} />
          </Box>
        )}
        <Box gap="8" display="flex" width="full" flexDirection="column">
          <Typography as="h2" fontVariant="headingTwo">Colors</Typography>
          <div className={styles.grid}>
            {mounted && Object.keys(modeVars.color).filter((key) => {
              return !skipKeys.some(skipKey => key.includes(skipKey))
            }).map(key => (
              <ColorInput mode={mode} key={key} name={key} token={thorinColorKeyToCssKey(key)} />
            ))}
          </div>
        </Box>
        {mounted && (
          <Box gap="8" display="flex" flexDirection="column">
            <Typography as="h2" fontVariant="headingTwo">Border Radius</Typography>
            <BorderRadiusInput mode={mode} name="input" />
            <BorderRadiusInput mode={mode} name="card" />
            <BorderRadiusInput mode={mode} name="checkbox" />
            <BorderRadiusInput mode={mode} name="extraSmall" />
            <BorderRadiusInput mode={mode} name="small" />
            <BorderRadiusInput mode={mode} name="medium" />
            <BorderRadiusInput mode={mode} name="large" />
            <BorderRadiusInput mode={mode} name="almostExtraLarge" />
            <BorderRadiusInput mode={mode} name="extraLarge" />
            <BorderRadiusInput mode={mode} name="2xLarge" />
            <BorderRadiusInput mode={mode} name="2.5xLarge" />
            <BorderRadiusInput mode={mode} name="3xLarge" />
            <BorderRadiusInput mode={mode} name="4xLarge" />
            <BorderRadiusInput mode={mode} name="full" />
          </Box>
        )}
      </Box>

      <Box className={styles.overlay} position="sticky" height="max" top="28" right="8" display="flex" flexDirection="column" gap="4" padding="4">
        <Button colorStyle="accentPrimary">accentPrimaryBackground</Button>
        <Button colorStyle="accentSecondary">accentSecondaryBackground</Button>
        <Tag colorStyle="greenPrimary">greenPrimary</Tag>
        <Box display="flex" flexDirection="row" gap="2" alignItems="center">
          <Toggle color="pink" />
          {' '}
          pink
        </Box>
        <Typography font="sans" fontSize="extraSmall">
          Some regular text
        </Typography>
        <Typography font="mono" fontSize="extraSmall">
          Some code text
        </Typography>
      </Box>
    </Box>
  )
}
