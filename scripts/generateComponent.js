const fs = require('fs-extra')
const dedent = require('dedent')
const prompt = require('prompt')

const path = require('path')

const baseDir = path.join(__dirname, '..')
const componentsDir = path.join(baseDir, 'components/src/components')
const referencesDir = path.join(baseDir, 'docs/src/reference')

const COMPONENT_GROUPS = {
  a: 'atoms',
  m: 'molecules',
  o: 'organisms',
}

;(async () => {
  try {
    prompt.start()
    const input = await prompt.get([
      {
        name: 'componentName',
        description: 'Component name',
        type: 'string',
        pattern: /^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/,
        message: 'Component Name must be only letters and pascal case',
        required: true,
      },
      {
        name: 'forwardRef',
        description: 'forwardRef',
        type: 'boolean',
        default: false,
      },
      {
        name: 'componentGroupOption',
        description:
          'Choose the component group\nA - Atoms\nM - Molecules\nO - Organisms',
        required: true,
        type: 'string',
        message: 'Your options are A, M, or O',
        pattern: /^[AaMmOo]$/,
      },
    ])
    const { componentName, forwardRef, componentGroupOption } = input
    const componentGroup = COMPONENT_GROUPS[componentGroupOption.toLowerCase()]

    const componentDir = path.join(componentsDir, componentGroup, componentName)

    const exists = fs.existsSync(componentDir)
    if (exists) {
      console.log('Component already exists.')
      return
    }

    console.log(`Scaffolding <${componentName} />`)

    // Create directory
    console.log(`Create directory at ${componentDir}`)
    await fs.mkdirp(componentDir)

    /**
     * Write component file
     */
    const componentFilePath = path.join(componentDir, `${componentName}.tsx`)

    console.log('Creating component...')
    const componentImports = dedent`
      import * as React from 'react'
      import styled from 'styled-components'

      export type Props = {}

      const Container = styled.div(() => css\`\`)
    `
    const componentBasic = dedent`
      ${componentImports}

      export const ${componentName} = ({ ...props }: Props) => {
        return <Container>
        </Container>
      }

      ${componentName}.displayName = '${componentName}'\n
    `
    const componentForwardRef = dedent`
      ${componentImports}

      export const ${componentName} = React.forwardRef(
        ({ ...props }: Props, ref: React.Ref<HTMLElement>) => {
          return <Container ref={ref}>
          </Container>
        }
      )

      ${componentName}.displayName = '${componentName}'\n
    `
    await fs.writeFile(
      componentFilePath,
      forwardRef ? componentForwardRef : componentBasic,
      'utf-8',
    )

    /**
     * WRITE DOCS FILE
     * */

    const docsFilePath = path.join(
      referencesDir,
      'mdx',
      componentGroup,
      `${componentName}.docs.mdx`,
    )
    console.log('Creating docs at', docsFilePath, '...')
    await fs.writeFile(
      docsFilePath,
      dedent`
          ---
          title: ${componentName}
          description: Brief component description
          ---

          \`\`\`tsx
          import { ${componentName} } from '@ensdomains/thorin'
          \`\`\`

          \`\`\`tsx live=true expand=true
          <${componentName} />
          \`\`\`

          ## Props

          <PropsTable sourceLink={sourceLink} types={types} />

        `,
      'utf-8',
    )

    /**
     * Write Snippets File
     */

    const snippetsFilePath = path.join(
      referencesDir,
      'snippets',
      componentGroup,
      `${componentName}.snippets.tsx`,
    )
    console.log('Creating snippets at', snippetsFilePath)
    await fs.writeFile(
      snippetsFilePath,
      dedent`
          import * as React from 'react'
          import { ${componentName} } from '@ensdomains/thorin'

          import { Snippet } from '../../../types'

          export const snippets: Snippet[] = [
            {
              name: 'Basic',
              code: <${componentName} />,
            },
          ]
        `,
      'utf-8',
    )

    /**
     * Write Test File
     */
    const testFilePath = path.join(componentDir, `${componentName}.test.tsx`)
    console.log('Creating test file at', testFilePath)
    await fs.writeFile(
      testFilePath,
      dedent`
          import * as React from 'react'

          import { cleanup, render, screen } from '@/test'

          import { ${componentName} } from './${componentName}'

          describe('<${componentName} />', () => {
            afterEach(cleanup)

            it('renders', () => {
              render(<${componentName} />)
            })
          })

        `,
      'utf-8',
    )

    /**
     * Write component index file
     */
    const indexFilePath = path.join(componentDir, 'index.ts')
    console.log('Creating index at', indexFilePath)
    const componentIndex = dedent`
      export { ${componentName} } from './${componentName}'
      export type { Props as ${componentName}Props } from './${componentName}'\n
    `
    await fs.writeFile(indexFilePath, componentIndex, 'utf-8')

    /**
     * Write component group index file
     * */
    const groupIndexFilePath = path.join(
      componentsDir,
      componentGroup,
      'index.ts',
    )
    console.log('Adding component to group index at', groupIndexFilePath)
    const componentsIndex = await fs.readFile(groupIndexFilePath, 'utf8')
    const lines = [...componentsIndex.split(/\r?\n/), componentIndex]
      .sort((a, b) => (a > b ? 1 : -1))
      .join('\n')
      .trim()

    await fs.writeFile(groupIndexFilePath, lines + '\n', 'utf-8')

    console.log('Done.')
  } catch (err) {
    console.log('Exited.')
  }
})()
