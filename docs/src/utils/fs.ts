import { glob } from 'glob'

import path from 'path'

export const getComponentPaths = () => {
  return glob.sync('./src/reference/mdx/**/*.docs.mdx', {
    cwd: process.cwd(),
    absolute: true,
  })
}

export const getComponentName = (pathname: string) => {
  const componentParentFolder = path.basename(path.join(pathname, '../'))
  const onlyFileName = componentParentFolder.match(/^(miscellaneous)$/)
  const componentName = path.basename(pathname, '.mdx')
  const finalisedName = componentName.replace(path.extname(componentName), '')
  return onlyFileName ? [finalisedName] : [componentParentFolder, finalisedName]
}

export const getGuidePaths = () => {
  return glob.sync('./src/guides/**/*.mdx', {
    cwd: process.cwd(),
    absolute: true,
  })
}

export const getGuideName = (pathname: string) => {
  const guideName = path.basename(pathname, '.mdx')
  return guideName.replace(path.extname(guideName), '')
}
