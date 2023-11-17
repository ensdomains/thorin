type Property = 'size' | 'fontSize' | 'lineHeight' | 'marginTop'

const sizeMap = {
  small: {
    size: '$16',
    fontSize: '$normal',
    lineHeight: '$normal',
    marginTop: '$0',
  },
  large: {
    size: '$24',
    fontSize: '$extraLarge',
    lineHeight: '$extraLarge',
    marginTop: '$-0.5',
  },
}

export const getValueForNumberForSize = (
  size: 'small' | 'large',
  property: Property,
) => {
  return sizeMap[size]?.[property] || sizeMap.small[property]
}
