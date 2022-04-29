import { Snippet } from '../../../types'

// Use code string because react-element-to-jsx-string does not work with function as children
export const snippets: Snippet[] = [
  {
    name: 'Atoms',
    code: '<FileInput>{(context) => context.name ? <div>{context.name}</div> : <div />}</FileInput>',
  },
]
