import * as React from 'react'
import styled from 'styled-components'
import NextLink from 'next/link'
import { tokens } from '@ensdomains/thorin'

type NextLinkProps = Parameters<typeof NextLink>[0]

const LinkInner = styled.a`
  ${({ theme }) => `
      cursor: pointer;
      text-decoration: underline;
      text-decoration-color: ${tokens.colors[theme.mode].accent};
      text-underline-offset: 0.2em;
  
      color: ${tokens.colors[theme.mode].accent};
  `}
`

type Props = {
  as?: NextLinkProps['as']
  className?: string
  href: string
}

export const Link = ({
  as,
  children,
  className,
  href,
}: React.PropsWithChildren<Props>) => {
  const external = !href.startsWith('/')
  if (external) {
    return (
      <LinkInner href={href} rel="noopener noreferrer" target="_blank">
        {children}
      </LinkInner>
    )
  }

  return (
    <>
      <NextLink
        as={as}
        href={href}
        passHref
        prefetch={canPrefetch(href) ? undefined : false}
      >
        <a className={className}>{children}</a>
      </NextLink>
    </>
  )
}
const canPrefetch = (href: string) => {
  if (!href || !href.startsWith('/')) return false
  return true
}
