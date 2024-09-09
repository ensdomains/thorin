let idCounter = 0

export function uniqueId(prefix?: { toString: () => string }) {
  const id = ++idCounter
  return (prefix ? prefix.toString() : '') + id
}
