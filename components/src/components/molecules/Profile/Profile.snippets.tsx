import * as React from 'react'

import { Snippet } from '!/playroom/src/types'
import { Profile } from './Profile'

export const snippets: Snippet[] = [
  {
    name: 'No ENS Name',
    code: <Profile address="0xb6e040c9ecaae172a89bd561c5f73e1c48d28cd9" />,
  },
  {
    name: 'Has ENS Name',
    code: (
      <Profile
        address="0xb6e040c9ecaae172a89bd561c5f73e1c48d28cd9"
        ensName="frontend.ens.eth"
      />
    ),
  },
  {
    name: 'Has Dropdown',
    code: (
      <Profile
        address="0xb6e040c9ecaae172a89bd561c5f73e1c48d28cd9"
        dropdownItems={[
          { label: 'Dashboard', onClick: () => null },
          { label: 'Disconnect', onClick: () => null, color: 'red' },
        ]}
        ensName="frontend.ens.eth"
      />
    ),
  },
]
