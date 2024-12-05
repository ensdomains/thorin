import type { ComponentProps } from 'react'
import React from 'react'
import type {
  RawColor } from '@ensdomains/thorin'
import {
  Box,
  Button,
  Dialog,
  RecordItem,
  modeVars,
} from '@ensdomains/thorin'
import { match, P } from 'ts-pattern'
import { rawColorToHex, rawColorToHSL, rawColorToRGB, rawColorToRGBA } from '~/utils/color'

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

export type PaletteModalProps = {
  color?: string | null
  shades?: [string, RawColor][] | null
  selectedShade?: string | null
} & Omit<ComponentProps<typeof Dialog>, 'children'>

export const PaletteModal = ({
  color,
  shades,
  selectedShade,
  open,
  ...props
}: PaletteModalProps) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  React.useEffect(() => {
    if (open && shades && selectedShade) {
      setSelectedIndex(
        shades.findIndex(([name]) => name === selectedShade) || 0,
      )
    }
  }, [open, shades, selectedShade])

  const [shadeName, shadeRawColor] = shades?.[selectedIndex] || []

  const { title, variable } = match([color, shadeName])
    .with([P._, 'border'], () => ({
      title: 'Border',
      variable: 'border',
    }))
    .with([undefined, P.string], ([, s]) => ({
      title: capitalize(s),
      variable: s,
    }))
    .with([P.string, P.string], ([c, s]) => ({
      title: `${capitalize(c)} / ${capitalize(s)}`,
      variable: `${c}${capitalize(s)}`,
    }))
    .otherwise(() => ({ title: '', variable: '' }))

  return (
    <Dialog
      {...props}
      open={open && !!shades}
      onClose={props.onDismiss}
      title={title}
    >
      <Dialog.Content>
        <Box
          display="flex"
          flexDirection="column"
          gap={{ base: '4', sm: '6' }}
        >
          <Box
            width="full"
            height="45"
            position="relative"
            overflow="hidden"
            borderRadius="large"
            borderWidth="1x"
            borderStyle="solid"
            borderColor="border"
            style={{
              backgroundColor: shadeRawColor ? rawColorToRGB(shadeRawColor) : modeVars.color.backgroundSecondary,
            }}
          >
            <Box
              display="flex"
              width="full"
              position="absolute"
              bottom="0"
              left="0"
              right="0"
            >
              {shades?.map(([name, color], i) => (
                <Box
                  as="button"
                  cursor="pointer"
                  key={name}
                  flex={1}
                  height="4"
                  style={{
                    backgroundColor: rawColorToRGB(color),
                  }}
                  onClick={() => setSelectedIndex(i)}
                />
              ))}
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" gap="2">
            <RecordItem keyLabel="variable" value={variable}>
              {variable}
            </RecordItem>
            {shadeRawColor && (
              <>
                <RecordItem keyLabel="HEX" value={rawColorToHex(shadeRawColor)}>
                  {rawColorToHex(shadeRawColor)}
                </RecordItem>
                <RecordItem keyLabel="RGB" value={rawColorToRGB(shadeRawColor)}>
                  {rawColorToRGB(shadeRawColor)}
                </RecordItem>
                <RecordItem
                  keyLabel="RGBA"
                  value={rawColorToRGBA(shadeRawColor, 1)}
                >
                  {rawColorToRGBA(shadeRawColor, 1)}
                </RecordItem>
                <RecordItem keyLabel="HSL" value={rawColorToHSL(shadeRawColor)}>
                  {rawColorToHSL(shadeRawColor)}
                </RecordItem>
              </>
            )}
          </Box>
        </Box>
      </Dialog.Content>
      <Dialog.Footer
        trailing={(
          <Button colorStyle="accentSecondary" onClick={props.onDismiss}>
            Done
          </Button>
        )}
      />
    </Dialog>
  )
}
