import React from 'react'
import { Box, DownArrowSVG } from '@ensdomains/thorin'
import Image from 'next/image'

type Item = {
  src: string
  alt: string
  background?: 'background' | 'white' | 'black'
}
const Panel = ({ background = 'background', alt, src }: Item) => {
  return (
    <Box
      flex={1}
      position="relative"
      // border="1px solid"
      borderColor="border"
      borderRadius="large"
      display="flex"
      alignItems="center"
      justifyContent="center"
      py="10"
      px="4"
      // backgroundColor={`$${background}`}
    >
      <Image src={src} height="56" width="126" alt={alt} />
      <Box
        as="a"
        href={src}
        download
        wh="6"
        backgroundColor="background"
        position="absolute"
        top="4"
        right="4"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="small"
      >
        <DownArrowSVG />
      </Box>
    </Box>
  )
}

type LogosProps = {
  items: Item[]
}

export const Logos = ({ items }: LogosProps) => {
  return (
    <Box
      display="flex"
      width="full"
      flexDirection={{ base: 'column', md: 'row' }}
      gap={{ base: '4', sm: '6' }}
    >
      {items.map(item => (
        <Panel key={item.src} {...item} alt="hello" />
      ))}
    </Box>
  )
}
