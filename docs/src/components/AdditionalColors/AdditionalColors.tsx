import React from 'react'
import {
  Box,
  RAW_ADDITIONAL_COLORS,
  RawColor,
  ScrollBox,
  useTheme,
} from '@ensdomains/thorin'
import { PaletteRow } from './components/PaletteRow'
import { PaletteModal } from '../PaletteModal/PaletteModal'

const TextBackgroundRegex = /^(text|background)(.+)$/

export const AdditionalColors = () => {
  const { mode } = useTheme()
  const additionalColors = RAW_ADDITIONAL_COLORS[mode]

  const { text, bw, background } = Object.entries(additionalColors).reduce<{
    text: [string, RawColor][]
    bw: [string, RawColor][]
    background: [string, RawColor][]
  }>(
    (acc, [name, color]) => {
      if (name === 'border') acc.background.push([name, color])
      if (['black', 'white'].includes(name)) acc.bw.push([name, color])
      if (TextBackgroundRegex.test(name)) {
        const matches = name.match(TextBackgroundRegex)
        const group = matches?.[1] as 'text' | 'background'
        const shade = matches?.[2] as string
        acc[group].push([shade, color])
      }
      return acc
    },
    { text: [], bw: [], background: [] },
  )

  const [modalProps, setModalProps] = React.useState<{
    open: boolean
    color?: string
    shades?: [string, RawColor][]
    selectedShade?: string
  }>({
    open: false,
  })

  const onSelectShade = ({
    color,
    shades,
    selectedShade,
  }: {
    color?: string
    shades: [string, RawColor][]
    selectedShade: string
  }) => {
    setModalProps({
      open: true,
      color,
      shades,
      selectedShade,
    })
  }

  return (
    <>
      <ScrollBox>
        <Box
          display={'flex'}
          flexDirection={'column'}
          gap={{ base: '$4', sm: '$6' }}
          marginBottom={'$2'}
          mx={'$2'}
        >
          <PaletteRow shades={bw} onSelectShade={onSelectShade} />
          <PaletteRow
            shades={text}
            color="text"
            onSelectShade={onSelectShade}
          />
          <PaletteRow
            shades={background}
            color="background"
            onSelectShade={onSelectShade}
          />
        </Box>
      </ScrollBox>
      <PaletteModal
        {...modalProps}
        variant="closable"
        onDismiss={() => setModalProps({ open: false })}
      />
    </>
  )
}
