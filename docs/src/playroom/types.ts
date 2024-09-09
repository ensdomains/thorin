// import { Snippets as PlayroomSnippets } from 'playroom'
import type { Optional } from 'utility-types'

interface PlayroomSnippet {
  group: string
  name: string
  code: string
}

type PlayroomSnippets = PlayroomSnippet[]

export type Snippet = Omit<
  Optional<PlayroomSnippets[number], 'group'>,
  'code'
> & {
  code: React.ReactElement | string
}
