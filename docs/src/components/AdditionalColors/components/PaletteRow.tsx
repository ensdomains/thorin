import React from 'react'
import type { RawColor } from '@ensdomains/thorin'
import { Box, Typography, rawColorToRGB } from '@ensdomains/thorin'
import { match, P } from 'ts-pattern'

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
    <Box flex="1" display="flex" flexDirection="column" gap="$2">
      <Typography
        fontVariant="bodyBold"
        px="$2"
        textTransform="lowercase"
        overflow="hidden"
        ellipsis
      >
        {name}
      </Typography>
      <Box
        width="$full"
        height="$24"
        backgroundColor={rawColorToRGB(color)}
        borderRadius="$large"
        border="1px solid"
        borderColor="$border"
        transform={{ base: 'scale(1)', hover: 'scale(1.05)' }}
        transition="transform 0.15s ease-in-out"
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
        width="$full"
        height="$max"
        display="flex"
        gap={{ base: '$4', sm: '$6' }}
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
