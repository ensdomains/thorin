import React from 'react'
import type { RawColor } from '@ensdomains/thorin'
import { Box, Typography } from '@ensdomains/thorin'
import { match, P } from 'ts-pattern'
import * as styles from './PaletteRow.css'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import { rawColorToRGB } from '~/utils/color'

const PaletteCell = ({
  name,
  color,
  onClick,
}: {
  name: string
  color: RawColor
  onClick: () => void
}) => {
  return (
    <Box flex={1} display="flex" flexDirection="column" gap="2">
      <Typography
        fontVariant="bodyBold"
        px="2"
        textTransform="lowercase"
        overflow="hidden"
        ellipsis
      >
        {name}
      </Typography>
      <Box
        width="full"
        height="24"
        className={styles.paletteCell}
        style={assignInlineVars({
          [styles.paletteCellBackgroundColor]: rawColorToRGB(color),
        })}
        borderRadius="large"
        borderWidth="1x"
        borderStyle="solid"
        borderColor="border"
        transitionDuration={150}
        transitionTimingFunction="ease-in-out"
        transitionProperty="transform"
        onClick={onClick}
      />
    </Box>
  )
}

type PaletteRowProps = {
  color?: string
  shades: [string, RawColor][]
  onSelectShade: (data: {
    color?: string
    shades: [string, RawColor][]
    selectedShade: string
  }) => void
}

export const PaletteRow = ({
  color,
  shades,
  onSelectShade,
}: PaletteRowProps) => {
  const createName = (shade: string, color?: string) =>
    match([shade, color])
      .with(['border', P._], () => `border`)
      .with([P._, undefined], () => shade)
      .otherwise(([shade, group]) => `${group} ${shade}`)
  return (
    <>
      <Box
        width="full"
        height="max"
        display="flex"
        gap={{ base: '4', sm: '6' }}
      >
        {shades.map(([shade, rawColor]) => (
          <PaletteCell
            key={shade}
            name={createName(shade, color)}
            color={rawColor}
            onClick={() =>
              onSelectShade({
                color: color,
                shades: shades,
                selectedShade: shade,
              })}
          />
        ))}
      </Box>
    </>
  )
}
