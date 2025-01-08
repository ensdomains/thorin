import type { ComponentDoc } from 'react-docgen-typescript'
import { withCustomConfig as docgen } from 'react-docgen-typescript'

const allowed = (name: string) => ['ref'].includes(name)

const keyBy = <T>(array: T[], key: keyof T): T[] => (array || []).reduce((r, x) => ({ ...r, [(key ? x[key] : x) as keyof T]: x }), {} as T[])

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapValues = <T extends Record<any, any>, U>(obj: T, fn: (value: T[keyof T], key: keyof T) => U): U =>
  Object.keys(obj).reduce((r, key) => ({ ...r, [key]: fn(obj[key], key as keyof T) }), {} as U)

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
    mapValues((component as ComponentDoc).props || {}, prop => ({
      name: prop.name,
      description: prop.description,
      defaultValue: prop.defaultValue,
      required: prop.required,
      type: prop.type,
    })),
  )

  return parsedTypes
}
