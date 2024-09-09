const sizesMap = {
  small: {
    size: '$4',
    strokeWidth: '$1',
  },
  medium: {
    size: '$6',
    strokeWidth: '$1.25',
  },
  large: {
    size: '$16',
    strokeWidth: '$1',
  },
}

export const getValueForSize = (
  size: 'small' | 'medium' | 'large',
  property: 'size' | 'strokeWidth',
) => {
  return sizesMap[size]?.[property] || sizesMap.small[property]
}
