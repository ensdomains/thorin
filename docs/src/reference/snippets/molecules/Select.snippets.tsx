import { Snippet } from '../../../types'

// Use code string because react-element-to-jsx-string does not work with forwardRef
export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: '<Select label="Select" options={[{ value: \'1\', label: \'One\' },{ value: \'2\', label: \'Two\' },{ value: \'3\', label: \'Three\' }]} />',
  },
]
