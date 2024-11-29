import React from 'react'
import type {
  RawColor } from '@ensdomains/thorin'
import {
  Box,
  ScrollBox,
  RAW_PALETTE_COLORS,
  useTheme,
} from '@ensdomains/thorin'
import { grid, colorLabel, colorCell } from './styles.css'
import { PaletteModal } from '../PaletteModal/PaletteModal'

const ColorLabel = ({ children }: React.PropsWithChildren) => (
  <Box
    className={colorLabel}
    display="flex"
    alignItems="center"
    justifyContent="center"
    fontWeight="bold"
    fontSize="body"
  >
    {children}
  </Box>
)

const ShadeLabel = ({ children }: React.PropsWithChildren) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    fontSize="body"
    fontWeight="bold"
  >
    {children}
  </Box>
)

const ColorCell = ({
  color,
  onClick,
}: {
  color: Readonly<[number, number, number]>
  onClick: () => void
}) => (
  <Box
    style={{
      backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
    }}
    borderRadius="large"
    className={colorCell}
    onClick={onClick}
  />
)

export const Palette = () => {
  const [modalProps, setModalProps] = React.useState<{
    open: boolean
    color?: string
    shades?: [string, RawColor][]
    selectedShade?: string
  }>({
    open: false,
    color: undefined,
    shades: undefined,
    selectedShade: undefined,
  })

  const { mode } = useTheme()
  const palette = RAW_PALETTE_COLORS[mode]
  return (
    <>
      <ScrollBox>
        <div className={grid}>
          <div />
          {['active', 'dim', 'primary', 'bright', 'light', 'surface'].map(
            label => (
              <ShadeLabel key={label}>{label}</ShadeLabel>
            ),
          )}
          {Object.entries(palette).map(([primaryColor, colors]) => {
            if (primaryColor === 'accent') return null
            const colorEntries = Object.entries(colors)
            return (
              <React.Fragment key={primaryColor}>
                <ColorLabel>{primaryColor}</ColorLabel>
                {colorEntries.map(([shade, color]) => (
                  <ColorCell
                    key={shade}
                    color={color}
                    onClick={() =>
                      setModalProps({
                        open: true,
                        color: primaryColor,
                        shades: colorEntries,
                        selectedShade: shade,
                      })}
                  />
                ))}
              </React.Fragment>
            )
          })}
        </div>
      </ScrollBox>
      <PaletteModal
        {...modalProps}
        variant="closable"
        onDismiss={() => setModalProps({ open: false })}
      />
    </>
  )
}
