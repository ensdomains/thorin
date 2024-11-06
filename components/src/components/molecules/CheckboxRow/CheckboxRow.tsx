import * as React from 'react'

import { translateY } from '@/src/css/utils/common'
import { match, P } from 'ts-pattern'

import * as styles from './styles.css'
import { useId } from '../../../hooks/useId'
import type { BoxProps } from '../../atoms/Box/Box'
import { Box } from '../../atoms/Box/Box'
import { CheckSVG } from '@/src/icons'
import { Typography } from '../../atoms'
import type { Colors, ColorStyles, Hue } from '@/src/tokens'
import { getColorStyleParts } from '@/src/utils/getColorStyleParts'
import clsx from 'clsx'
import { assignInlineVars } from '@vanilla-extract/dynamic'

export type CheckboxRowProps = {
  label: string
  subLabel?: string
  colorStyle?: ColorStyles
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'height' | 'width' | 'color'>

type BaseTheme = 'Primary' | 'Secondary'

const ContainerBox = ({ disabled, className, style, ...props }: BoxProps) => (
  <Box
    position="relative"
    className={clsx(styles.containerBox, className)}
    style={{ ...style, ...assignInlineVars({
      [styles.isContainerBoxDisabled]: translateY(disabled ? 0 : -1),
    }) }}
    transitionProperty="transform"
    transitionDuration={150}
    transitionTimingFunction="ease-in-out"
    {...props}
    width="full"
  />
)

const Input = React.forwardRef<HTMLElement, BoxProps>((props, ref) => (
  <Box
    {...props}
    as="input"
    position="absolute"
    ref={ref}
    type="checkbox"
    wh="px"
  />
))

const Label = ({
  baseColor,
  baseTheme,
  ...props
}: BoxProps & { baseColor?: Hue, baseTheme: BaseTheme }) => (
  <Box
    {...props}
    alignItems="center"
    as="label"
    // backgroundColor={getValueForColorStyle($colorStyle, 'background')}
    backgroundColor={match(baseTheme)
      .with(P.string.includes('Secondary'), () => `${baseColor}Surface` as Colors)
      .otherwise(() => `${baseColor}Surface` as Colors)}
    borderColor="transparent"
    borderRadius="large"
    borderStyle="solid"
    borderWidth="1x"
    cursor="pointer"
    display="flex"
    gap="4"
    padding="4"
    transitionProperty="all"
    transitionDuration={300}
    transitionTimingFunction="ease-in-out"
    wh="full"
  />
)

const CircleFrame = (props: BoxProps) => (
  <Box
    {...props}
    flexBasis="7"
    flexGrow={0}
    flexShrink={0}
    position="relative"
    wh="7"
  />
)

const SVG = (props: BoxProps) => (
  <Box {...props} display="block" fill="currentColor" wh="4" />
)

const Circle = ({
  $hover,
  baseColor,
  baseTheme,
  ...props
}: BoxProps & { $hover: boolean, baseColor: Hue, baseTheme: BaseTheme }) => (
  <Box
    {...props}
    alignItems="center"
    // backgroundColor={getValueForColorStyle(
    //   $colorStyle,
    //   $hover ? 'iconHover' : 'icon',
    // )}
    backgroundColor={match(baseTheme)
      .with(P.string.includes('Secondary'), () => `${baseColor}Light` as Colors)
      .otherwise(() => ($hover ? `${baseColor}Bright` : `${baseColor}Primary`) as Colors)}
    borderColor="transparent"
    borderRadius="full"
    borderStyle="solid"
    borderWidth="1x"
    // color={getValueForColorStyle($colorStyle, 'svg')}
    color={match(baseTheme)
      .with(P.string.includes('Secondary'), () => `${baseColor}Dim` as Colors)
      .otherwise(() => 'textAccent')}
    display="flex"
    justifyContent="center"
    position="absolute"
    transitionProperty="all"
    transitionDuration={300}
    transitionTimingFunction="ease-in-out"
    wh="full"
  >
    <SVG as={CheckSVG} />
  </Box>
)

export const CheckboxRow = React.forwardRef<HTMLInputElement, CheckboxRowProps>(
  ({ label, subLabel, name, colorStyle = 'blue', disabled, ...props }, ref) => {
    const defaultRef = React.useRef<HTMLInputElement>(null)
    const inputRef = ref || defaultRef

    const id = useId()

    const textColor = disabled ? 'grey' : 'text'

    const [baseColor, baseTheme] = getColorStyleParts(colorStyle)

    return (
      <ContainerBox disabled={disabled}>
        <Input
          {...props}
          className={styles.input}
          disabled={disabled}
          id={id}
          name={name}
          ref={inputRef}
        />
        <Label
          baseColor={baseColor}
          baseTheme={baseTheme}
          className={styles.label}
          htmlFor={id}
          id="permissions-label"
        >
          <CircleFrame>
            <Circle
              baseColor={baseColor}
              baseTheme={baseTheme}
              $hover
              className={styles.circleHover}
              id="circle-hover"
            />
            <Circle
              baseColor={baseColor}
              baseTheme={baseTheme}
              $hover={false}
              className={styles.circle}
              id="circle"
            />
          </CircleFrame>
          <Box display="flex" flexDirection="column">
            <Typography color={textColor} fontVariant="bodyBold">
              {label}
            </Typography>
            {subLabel && (
              <Typography color={textColor} fontVariant="small">
                {subLabel}
              </Typography>
            )}
          </Box>
        </Label>
      </ContainerBox>
    )
  },
)

CheckboxRow.displayName = 'CheckboxRow'
