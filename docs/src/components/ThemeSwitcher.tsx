// import * as React from 'react'
// import styled, { useTheme } from 'styled-components'

// // import { Accent } from '@ensdomains/thorin/tokens'
// import { Button, Skeleton, SkeletonGroup } from '@ensdomains/thorin'

// // import { setThemeAccent, setThemeMode } from '~/utils/cookies'
// import { useIsMounted } from '~/utils/isMounted'

// const FlexContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   gap: ${({ theme }) => theme.space['3']};
// `

// const TextContainer = styled.div`
//   text-transform: uppercase;
// `

// const Capitalize = styled.div`
//   text-transform: capitalize;
// `

// //const { accent, mode, setMode, setAccent } = useTheme()

// export const ThemeSwitcher = () => {
//   // Theme doesn't resolve from localStorage until mounted
//   // Show skeletons to avoid hydration mismatch error
//   const isMounted = useIsMounted()
//   const { mode } = useTheme()

//   // const toggleMode = React.useCallback(() => {
//   //   const nextMode = mode === 'dark' ? 'light' : 'dark'
//   //   setMode(nextMode)
//   //   setThemeMode(nextMode)
//   // }, [mode])

//   // const toggleAccent = React.useCallback(() => {
//   //   const nextAccent = getNextAccent(accent)
//   //   setAccent(nextAccent)
//   //   setThemeAccent(nextAccent)
//   // }, [accent, setAccent])

//   return (
//     <SkeletonGroup loading={!isMounted}>
//       <FlexContainer>
//         <Skeleton backgroundColor="foregroundTertiary">
//           <Button size="small" variant="secondary">
//             <TextContainer>{isMounted ? mode : 'light'}</TextContainer>
//           </Button>
//         </Skeleton>

//         <Skeleton backgroundColor="foregroundTertiary">
//           <Button size="small" variant="secondary">
//             <Capitalize>{'blue'}</Capitalize>
//           </Button>
//         </Skeleton>
//       </FlexContainer>
//     </SkeletonGroup>
//   )
// }

// // const getNextAccent = (
// //   accent: Accent | 'foreground',
// // ): Accent | 'foreground' => {
// //   switch (accent) {
// //     case 'blue':
// //       return 'green'
// //     case 'green':
// //       return 'indigo'
// //     case 'indigo':
// //       return 'orange'
// //     case 'orange':
// //       return 'pink'
// //     case 'pink':
// //       return 'purple'
// //     case 'purple':
// //       return 'red'
// //     case 'red':
// //       return 'teal'
// //     case 'teal':
// //       return 'yellow'
// //     case 'yellow':
// //       return 'foreground'
// //     case 'foreground':
// //       return 'blue'
// //     default:
// //       return 'blue'
// //   }
// // }

export {}
