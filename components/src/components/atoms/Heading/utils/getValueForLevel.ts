type Property = 'fontSize' | 'fontWeight' | 'lineHeight'

const levelMap = {
  1: {
    fontSize: { xs: 'headingTwo', lg: 'headingOne' },
    fontWeight: { xs: 'extraBold', lg: 'extraBold' },
    lineHeight: { xs: 'headingTwo', lg: 'headingOne' },
  },
  2: {
    fontSize: { xs: 'extraLarge', sm: 'headingTwo' },
    fontWeight: { xs: 'bold', sm: 'bold' },
    lineHeight: { xs: 'extraLarge', sm: 'headingTwo' },
  },
}

export const getValueForLevel = (
  level: '1' | '2',
  property: Property,
  responsive = false,
) => {
  const value = levelMap[level][property]
  if (responsive) return value
  return (value as any).lg || (value as any).sm
}
