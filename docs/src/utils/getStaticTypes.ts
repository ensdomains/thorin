import { withCustomConfig as docgen } from 'react-docgen-typescript'
import keyBy from 'lodash/keyBy'
import mapValues from 'lodash/mapValues'

const allowed = (name: string) => ['ref'].includes(name)

export const getStaticTypes = (pathname: string) => {
  const parse = docgen(__dirname + '/../../../../tsconfig.json', {
    propFilter: (prop) => {
      if (allowed(prop.name)) return true
      if (prop.declarations !== undefined && prop.declarations.length > 0) {
        const hasPropAdditionalDescription = prop.declarations.find(
          (declaration) => {
            return !declaration.fileName.includes('node_modules')
          },
        )
        return Boolean(hasPropAdditionalDescription)
      }

      return true
    },
    shouldExtractValuesFromUnion: true,
    shouldExtractLiteralValuesFromEnum: true,
    shouldRemoveUndefinedFromOptional: true,
  }).parse

  const types = parse(pathname)

  const typesByDisplayName = keyBy(types, 'displayName')
  const parsedTypes = mapValues(typesByDisplayName, component =>
    mapValues(component.props || {}, prop => ({
      name: prop.name,
      description: prop.description,
      defaultValue: prop.defaultValue,
      required: prop.required,
      type: prop.type,
    })),
  )

  return parsedTypes
}
