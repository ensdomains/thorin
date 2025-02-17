import * as React from 'react'

type Mode = 'dark' | 'light'

type ThemeContextValue = {
  mode: Mode
  setMode: (mode: Mode) => void
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

type Props = {
  defaultMode?: Mode
  onThemeChange?: (mode: Mode) => void
}

export const ThemeProvider: React.FC<React.PropsWithChildren<Props>> = ({
  defaultMode = 'light',
  onThemeChange,
  children,
}) => {
  const [mode, setMode] = React.useState<Mode>(defaultMode)

  const value = React.useMemo(() => ({ mode, setMode }), [mode])

  React.useEffect(() => {
    if (onThemeChange) onThemeChange(mode)
  }, [mode])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext)
  if (context === null) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
