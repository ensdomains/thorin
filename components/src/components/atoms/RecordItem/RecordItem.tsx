import * as React from 'react'
import { ReactNode } from 'react'

import { match } from 'ts-pattern'

import { CheckSVG, CopySVG, UpArrowSVG } from '@/src'

import { Neverable } from '@/src/types'

import { Typography } from '../Typography/Typography'
import { useCopied } from '../../../hooks/useCopied'
import { Box, BoxProps } from '../Box/Box'

type Size = 'small' | 'large'

type BaseProps = {
  value: string
  size?: Size
  inline?: boolean
  icon?: ReactNode
  keyLabel?: string | ReactNode
  keySublabel?: string | ReactNode
  children: string
  onClick?: () => void
  as?: 'button' | 'a'
  postfixIcon?: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >
}

type NativeElementProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  keyof BaseProps
>
type NativeButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  keyof NativeElementProps | keyof BaseProps
>
type NativeAnchorProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof NativeElementProps | keyof BaseProps
>

type AsAnchorProps = {
  as: 'a'
  link?: string
} & Neverable<NativeButtonProps, NativeAnchorProps> &
  NativeAnchorProps

type AsButtonProps = {
  as?: 'button'
  link?: never
} & Neverable<NativeAnchorProps, NativeButtonProps> &
  NativeButtonProps

export type Props = BaseProps &
  NativeElementProps &
  (AsAnchorProps | AsButtonProps)

const ContainerBox = ({
  $inline,
  ...props
}: BoxProps & { $inline: boolean }) => (
  <Box
    alignItems="flex-start"
    backgroundColor={{ base: '$greySurface', hover: '$greyLight' }}
    borderColor="$border"
    borderRadius="$large"
    borderStyle="solid"
    borderWidth="$1x"
    cursor="pointer"
    display="flex"
    gap="$2"
    height={$inline ? '$10' : 'fit-content'}
    padding="2.5 3"
    px="$3"
    py="$2.5"
    transform={{ base: 'translateY(0)', hover: 'translateY(-1px)' }}
    transitionDuration="$150"
    transitionProperty="all"
    transitionTimingFunction="$inOut"
    width={$inline ? 'fit-content' : '$full'}
    {...props}
  />
)

const PrefixBox = ({
  $inline,
  $size,
  ...props
}: BoxProps & { $inline: boolean; $size: Size }) => (
  <Box
    alignItems="flex-start"
    display="flex"
    flexBasis={match($inline)
      .with(true, () => 'initial')
      .otherwise(() => ($size === 'large' ? '$30' : '$22.5'))}
    flexGrow="0"
    flexShrink="0"
    gap="$2"
    width={match($inline)
      .with(true, () => 'fit-content' as const)
      .otherwise(() => ($size === 'large' ? '$30' : '$22.5'))}
    {...props}
  />
)

const PrefixLabelsContainerBox = ({
  $inline,
  ...props
}: BoxProps & { $inline: boolean }) => (
  <Box
    alignItems={$inline ? 'center' : 'flex-start'}
    display="flex"
    flexDirection={$inline ? 'row' : 'column'}
    gap={$inline ? '$2' : '$0'}
    overflow="hidden"
    {...props}
  />
)

// const PrefixLabelBox = (props: BoxProps) => (
//   <Typography textAlign="left" width="$full" {...props} />
// )

const PrefixSVGBox = (props: BoxProps) => (
  <Box display="block" height="$5" width="$5" {...props} />
)

// const LabelBox = ({ $inline, ...props }: BoxProps & { $inline: boolean }) => (
//   <Typography
//     flex="1"
//     textAlign="left"
//     wordBreak={$inline ? 'normal' : 'break-all'}
//     {...props}
//   />
// )

const TrailingSVGBox = ({
  $rotate,
  ...props
}: BoxProps & { $rotate: boolean }) => (
  <Box
    color="$greyPrimary"
    display="block"
    marginTop="$1"
    transform={$rotate ? 'rotate(45deg)' : 'none'}
    wh="$3"
    {...props}
  />
)

export const RecordItem = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  Props
>(
  (
    {
      as: asProp = 'button',
      link,
      size = 'small',
      inline = false,
      postfixIcon,
      icon,
      keyLabel,
      keySublabel,
      value,
      children,
      ...props
    },
    ref,
  ) => {
    const { copy, copied } = useCopied()

    const generatedProps =
      asProp === 'a'
        ? ({
            href: link,
            rel: 'nofollow noreferrer',
            target: '_blank',
            ...props,
          } as NativeElementProps & NativeAnchorProps)
        : ({
            onClick: () => {
              copy(value)
            },
            ...props,
          } as NativeElementProps & NativeButtonProps)

    const hasPrefix = !!icon || !!keyLabel
    const hasLabels = !!keyLabel || !!keySublabel

    const KeyLabel =
      typeof keyLabel === 'string' ? (
        <Typography
          color="grey"
          ellipsis={!inline}
          fontVariant={size === 'large' ? 'bodyBold' : 'smallBold'}
          textAlign="left"
          width="$full"
        >
          {keyLabel}
        </Typography>
      ) : (
        keyLabel
      )

    const KeySublabel =
      typeof keySublabel === 'string' ? (
        <Typography
          color="grey"
          ellipsis={!inline}
          fontVariant={size === 'large' ? 'smallBold' : 'extraSmallBold'}
          textAlign="left"
          width="$full"
        >
          {keySublabel}
        </Typography>
      ) : (
        keySublabel
      )
    const PostfixProps = postfixIcon
      ? { as: postfixIcon }
      : link
      ? { $rotate: true, as: UpArrowSVG }
      : copied
      ? { as: CheckSVG }
      : { as: CopySVG }

    return (
      <ContainerBox $inline={inline} as={asProp} {...generatedProps}>
        {hasPrefix && (
          <PrefixBox $inline={inline} $size={size}>
            {icon && <PrefixSVGBox as={icon as React.ReactElement} />}
            {hasLabels && (
              <PrefixLabelsContainerBox $inline={inline}>
                {KeyLabel}
                {KeySublabel}
              </PrefixLabelsContainerBox>
            )}
          </PrefixBox>
        )}
        <Typography
          flex="1"
          fontVariant={size === 'large' ? 'body' : 'small'}
          textAlign="left"
          wordBreak={inline ? 'normal' : 'break-all'}
        >
          {children}
        </Typography>
        <TrailingSVGBox {...(PostfixProps as any)} />
      </ContainerBox>
    )
  },
)

RecordItem.displayName = 'RecordItem'
