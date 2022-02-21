import { glob } from 'glob'

import path from 'path'

import * as Exports from './'

const generatedIconPaths = glob.sync('components/icons/generated/Icon*/', {
  cwd: __dirname,
  absolute: true,
})

const generatedIcons = generatedIconPaths.map((x) => path.basename(x))

const exportedKeys = Object.keys(Exports)

const expectedExportedKeys = [
  // atoms
  'Avatar',
  'BackdropSurface',
  'Box',
  'Button',
  'Card',
  'Field',
  'FileInput',
  'Heading',
  'Portal',
  'Skeleton',
  'Spinner',
  'Stack',
  'Tag',
  'ThemeProvider',
  'useTheme',
  'Typography',
  'VisuallyHidden',
  // molecules
  'Backdrop',
  'Checkbox',
  'CountdownCircle',
  'Dropdown',
  'FieldSet',
  'Input',
  'Modal',
  'Profile',
  'RadioButton',
  'RadioButtonGroup',
  'Select',
  'SkeletonGroup',
  'Textarea',
  // organisms
  'Dialog',
  // css
  'atoms',
  'breakpoints',
  'getAccentText',
  'mapResponsiveValue',
  'motionSafe',
  'normalizeResponsiveValue',
  'responsiveStyle',
  'vars',
  // generated icons
  ...generatedIcons,
]

it('should expose correct exports', () => {
  expect(exportedKeys.sort()).toEqual(expectedExportedKeys.sort())
})
