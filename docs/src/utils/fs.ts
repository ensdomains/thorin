import { globSync } from 'node:fs'

import path from 'path'

export const getComponentPaths = () => {
  return globSync('./src/reference/mdx/**/*.docs.mdx', {
    cwd: process.cwd(),
  })
}

export const getComponentName = (pathname: string) => {
  const componentParentFolder = path.basename(path.join(pathname, '../'))
  const componentName = path.basename(pathname, '.mdx')
  const finalisedName = componentName.replace(path.extname(componentName), '')
  return [componentParentFolder, finalisedName]
}

export const getGuidePaths = () => {
  return globSync('./src/guides/**/*.mdx', {
    cwd: process.cwd(),
  })
}

export const getGuideName = (pathname: string) => {
  const guideName = path.basename(pathname, '.mdx')
  return guideName.replace(path.extname(guideName), '')
}
