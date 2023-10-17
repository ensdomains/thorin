import { Prism as _Prism } from 'prism-react-renderer'

export const Prism = {
  ..._Prism,
  languages: {
    ..._Prism.languages,
    jsx: {
      ..._Prism.languages.jsx,
    },
  },
}
