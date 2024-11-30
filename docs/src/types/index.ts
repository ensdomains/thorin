// import { Snippets as PlayroomSnippets } from 'playroom'

export type Optional<T extends object, K extends keyof T = keyof T> = Omit<T, K> & Partial<Pick<T, K>>

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
