import type { Snippet } from '../../../types'

// Use code string because react-element-to-jsx-string attempts to print styled.components instead of the component name
export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: '<VisuallyHidden>_</VisuallyHidden>',
  },
]
