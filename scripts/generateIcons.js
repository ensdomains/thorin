const fs = require('fs-extra')

const path = require('path')

const ICONS_DIR = path.join(__dirname, '../components/src/icons')

;(async () => {
  try {
    const iconsDir = fs.readdirSync(ICONS_DIR)
    const indexContent = iconsDir
      .map((icon) => {
        const iconParts = icon.split('.')
        if (iconParts.length !== 2)
          throw new Error('Icon must be be in the format Filename.svg')
        const [filename, filetype] = iconParts
        if (filetype !== 'svg') return ''
        if (!/^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/.test(filename))
          throw new Error('Icon filenames must be in pascal case')
        return filename
      })
      .filter((x) => !!x)
      .map(
        (filename) =>
          `export { ReactComponent as ${filename}SVG } from './${filename}.svg'\n`,
      )
      .join('')
    await fs.writeFile(path.join(ICONS_DIR, 'index.tsx'), indexContent, 'utf-8')
  } catch (e) {
    console.log('ERROR', e)
  }
})()
