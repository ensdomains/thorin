import * as React from 'react'
import { CheckCircleSVG, MoonSVG, SunSVG, ThemeSVG } from '@/src/icons'
import * as styles from './styles.css'
import { Typography, useTheme } from '@/src'
import { useLocalStorage } from '@/src/hooks/useLocalStorage'

export type ThemeToggleProps = Partial<{
  labels: {
    light: string
    dark: string
    system: string
  }
}>

export const ThemeToggle = ({ labels }: ThemeToggleProps) => {
  const { setMode, mode } = useTheme()
  const [usingSystemTheme, setUsingSystemTheme] = useLocalStorage<'false' | 'true'>('usingSystemTheme', 'false')

  React.useEffect(() => {
    if (usingSystemTheme === 'true') {
      const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
      document.documentElement.setAttribute('data-theme', darkQuery.matches ? 'dark' : 'light')
      const listener = (event: MediaQueryListEvent) => {
        document.documentElement.setAttribute('data-theme', event.matches ? 'dark' : 'light')
      }
      darkQuery.addEventListener('change', listener)
      return () => darkQuery.removeEventListener('change', listener)
    }
  }, [usingSystemTheme])

  return (

    <div className={styles.container}>
      <button
        className={styles.themeItem}
        onClick={() => {
          setMode('light')

          setUsingSystemTheme('false')
        }}
      >
        <div>
          <CheckCircleSVG
            className={styles.checkIcon}
            style={{ display: mode === 'light' && usingSystemTheme === 'false' ? 'block' : 'none' }}
          />
          <Typography>{labels?.light ?? 'Light'}</Typography>
        </div>
        <SunSVG height={16} width={16} />
      </button>
      <button
        className={styles.themeItem}
        onClick={() => {
          setMode('dark')

          setUsingSystemTheme('false')
        }}
      >
        <div>
          <CheckCircleSVG
            className={styles.checkIcon}
            style={{ display: mode === 'dark' && usingSystemTheme === 'false' ? 'block' : 'none' }}
          />
          <Typography>{labels?.dark ?? 'Dark'}</Typography>
        </div>
        <MoonSVG height={16} width={16} />
      </button>
      <button
        className={styles.themeItem}
        onClick={() => {
          setUsingSystemTheme('true')
        }}
      >
        <div>
          <CheckCircleSVG
            className={styles.checkIcon}
            style={{ display: usingSystemTheme === 'true' ? 'block' : 'none' }}
          />
          <Typography>{labels?.system ?? 'System'}</Typography>
        </div>
        <ThemeSVG height={16} width={16} />
      </button>
    </div>
  )
}

ThemeToggle.displayName = 'ThemeToggle'
