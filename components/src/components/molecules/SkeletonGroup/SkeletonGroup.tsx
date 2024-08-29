import * as React from 'react'

import { ReactNodeNoStrings } from '../../../types'

type Props = {
  children: ReactNodeNoStrings
  loading?: boolean
}

export const SkeletonGroupContext = React.createContext<boolean | undefined>(undefined)

export const SkeletonGroup: React.FC<Props> = ({ children, loading }) => {
  return <SkeletonGroupContext.Provider value={loading}>{children}</SkeletonGroupContext.Provider>
}

SkeletonGroup.displayName = 'SkeletonGroup'
