import flatten from 'lodash/flatten'
import reactElementToJSXString from 'react-element-to-jsx-string'

import capitalize from 'lodash/capitalize'

import type { Snippet } from './types'

const req = (require as any).context(
  '../reference/snippets',
  true,
  /\.snippets\.tsx$/,
)

const snippets = flatten(
  req.keys().map((filename: string) => {
    const matches = filename.match(
      /([a-zA-Z-]+)\/([a-zA-Z-]+)\.snippets\.tsx?$/,
    )
    if (!matches) return []

    const snippets = req(filename).snippets as Snippet[]

    return snippets.map((snippet) => {
      const groupName = capitalize(matches[1])
      const displayName = matches[2]
      const code
        = typeof snippet.code === 'string'
          ? snippet.code
          : reactElementToJSXString(snippet.code)

      return {
        ...snippet,
        name: groupName,
        group: snippet.group || displayName,
        code,
      }
    })
  }),
)

export default snippets
