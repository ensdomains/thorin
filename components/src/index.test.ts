import { glob } from 'glob'

import path from 'path'

import * as Exports from './'

const generatedIconPaths = glob.sync('components/icons/generated/Icon*/', {
  cwd: __dirname,
  absolute: true,
})

const generatedIcons = generatedIconPaths.map((x) => path.basename(x))

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toEqual([
    // css
    'atoms',
    'breakpoints',
    'getAccentText',
    'mapResponsiveValue',
    'motionSafe',
    'normalizeResponsiveValue',
    'responsiveStyle',
    'vars',
    // components
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
    'Dialog',
    // generated icons
    ...generatedIcons,
  ])
})
