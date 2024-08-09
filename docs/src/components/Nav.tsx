import { useRouter } from 'next/dist/client/router'
import * as React from 'react'

// import { useIsMounted } from '~/utils/isMounted'

import { Link } from './Link'
import { NavBar } from './NavBar'
import { SideBar } from './SideBar'

type Link = { name: string, route: string }

export type Props = {
  links: { name: string, links: Link[] }[]
}

type State = {
  open: boolean
}

const initialState = {
  open: false,
}

export const Nav = ({ links }: Props) => {
  // const isMounted = useIsMounted()
  const router = useRouter()
  const [state, setState] = React.useState<State>(initialState)

  // Close menu on route change
  React.useEffect(() => {
    const handleRouteChange = () => setState(x => ({ ...x, open: false }))
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return (
    <>
      <NavBar
        open={state.open}
        onToggle={() => setState(x => ({ ...x, open: !x.open }))}
      />
      <SideBar open={state.open} links={links} />
    </>
  )
}
