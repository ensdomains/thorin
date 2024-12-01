export const shortenAddress = (
  address = '',
  maxLength = 10,
  leftSlice = 5,
  rightSlice = 5,
) => {
  if (address.length < maxLength) {
    return address
  }

  return `${address.slice(0, leftSlice)}...${address.slice(-rightSlice)}`
}

export const getTestId = (props: Record<string, unknown>, fallback: string): string => {
  return props['data-testid'] ? String(props['data-testid']) : fallback
}
