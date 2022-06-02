import React from 'react'

type Props = {
  alignItems?: string
  children: React.ReactNode
  flexDirection?: string
  flex?: string
  justifyContent?: string
  gap?: string
  flexWrap?: string
}

export const Stack = ({
  children,
  alignItems,
  flexDirection,
  flex,
  justifyContent,
  gap,
  flexWrap,
}: React.PropsWithChildren<Props>) => (
  <div
    style={{
      display: 'flex',
      alignItems,
      flexDirection: (flexDirection as any) || 'column',
      flex,
      justifyContent: justifyContent,
      gap: gap || '16px',
      flexWrap: flexWrap as any,
    }}
  >
    {children}
  </div>
)
