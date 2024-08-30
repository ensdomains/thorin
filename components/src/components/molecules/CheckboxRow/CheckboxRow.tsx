import * as React from 'react'

import { translateY } from '@/src/css/utils/common'

import {
  ColorStyle,
  getValueForColorStyle,
} from './utils/getValueForColorStyle'

import * as styles from './styles.css'
import { useId } from '../../../hooks/useId'
import { Box, BoxProps } from '../../atoms/Box/Box'
import { CheckSVG } from '@/src/icons'
import { Typography } from '../../atoms'

export type CheckboxRowProps = {
  label: string
  subLabel?: string
  colorStyle?: ColorStyle
} & React.InputHTMLAttributes<HTMLInputElement>

const ContainerBox = ({ disabled, ...props }: BoxProps) => (
  <Box
    position="relative"
    transform={{
      base: translateY(0),
      hover: translateY(disabled ? 0 : -1),
    }}
    transition="transform 150ms ease-in-out"
    {...props}
    width="$full"
  />
)

const Input = React.forwardRef<HTMLElement, BoxProps>((props, ref) => (
  <Box
    {...props}
    as="input"
    position="absolute"
    ref={ref}
    type="checkbox"
    wh="$px"
  />
))

const Label = ({
  $colorStyle = 'blueSecondary',
  ...props
}: BoxProps & { $colorStyle?: ColorStyle }) => (
  <Box
    {...props}
    alignItems="center"
    as="label"
    backgroundColor={getValueForColorStyle($colorStyle, 'background')}
    borderColor="transparent"
    borderRadius="$large"
    borderStyle="solid"
    borderWidth="$1x"
    cursor="pointer"
    display="flex"
    gap="$4"
    padding="$4"
    transition="all 0.3s ease-in-out"
    wh="$full"
  />
)

const CircleFrame = (props: BoxProps) => (
  <Box
    {...props}
    flexBasis="$7"
    flexGrow="0"
    flexShrink="0"
    position="relative"
    wh="$7"
  />
)

const SVG = (props: BoxProps) => (
  <Box {...props} display="block" fill="currentColor" wh="$4" />
)

const Circle = ({
  $hover,
  $colorStyle,
  ...props
}: BoxProps & { $hover: boolean, $colorStyle: ColorStyle }) => (
  <Box
    {...props}
    alignItems="center"
    backgroundColor={getValueForColorStyle(
      $colorStyle,
      $hover ? 'iconHover' : 'icon',
    )}
    borderColor="transparent"
    borderRadius="$full"
    borderStyle="solid"
    borderWidth="$1x"
    color={getValueForColorStyle($colorStyle, 'svg')}
    display="flex"
    justifyContent="center"
    position="absolute"
    transition="all 0.3s ease-in-out"
    wh="$full"
  >
    <SVG as={<CheckSVG />} />
  </Box>
)

export const CheckboxRow = React.forwardRef<HTMLInputElement, CheckboxRowProps>(
  ({ label, subLabel, name, colorStyle = 'blue', disabled, ...props }, ref) => {
    const defaultRef = React.useRef<HTMLInputElement>(null)
    const inputRef = ref || defaultRef

    const id = useId()

    const textColor = disabled ? 'grey' : 'text'

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
          $colorStyle={colorStyle}
          className={styles.label}
          htmlFor={id}
          id="permissions-label"
        >
          <CircleFrame>
            <Circle
              $colorStyle={colorStyle}
              $hover
              className={styles.circleHover}
              id="circle-hover"
            />
            <Circle
              $colorStyle={colorStyle}
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
