import type { ReactNode } from 'react'
const ComponentWrapper = ({ children }: { children: () => ReactNode }) => (
  <>{children()}</>
)

export default ComponentWrapper
