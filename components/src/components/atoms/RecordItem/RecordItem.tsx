import * as React from 'react'
import styled, { css } from 'styled-components'
import { ReactNode } from 'react'

import { CheckSVG, CopySVG, UpArrowSVG } from '@/src'

import { Neverable } from '@/src/types'

import { Typography } from '../Typography/Typography'
import { useCopied } from '../../../hooks/useCopied'

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

const Container = styled.button<{
  $inline: boolean
}>(
  ({ theme, $inline }) => css`
    display: flex;
    align-items: flex-start;

    gap: ${theme.space[2]};
    padding: ${theme.space['2.5']} ${theme.space[3]};
    width: 100%;
    height: fit-content;
    background: ${theme.colors.greySurface};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.radii.large};
    transition: all 150ms ease-in-out;
    cursor: pointer;

    ${$inline &&
    css`
      width: fit-content;
      height: ${theme.space['10']};
    `}

    &:hover {
      transform: translateY(-1px);
      background: ${theme.colors.greyLight};
    }
  `,
)

const PrefixContainer = styled.div<{ $size: Size; $inline: boolean }>(
  ({ theme, $inline, $size }) => css`
    display: flex;
    gap: ${theme.space[2]};
    align-items: flex-start;
    width: ${$size === 'large' ? theme.space['30'] : theme.space['22.5']};
    flex: 0 0 ${$size === 'large' ? theme.space['30'] : theme.space['22.5']};

    ${$inline &&
    css`
      width: fit-content;
      flex: initial;
    `}
  `,
)

const PrefixLabelsContainer = styled.div<{ $inline: boolean }>(
  ({ theme, $inline }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    overflow: hidden;

    ${$inline &&
    css`
      flex-direction: row;
      gap: ${theme.space[2]};
      align-items: center;
    `}
  `,
)

const PrefixLabel = styled(Typography)<{
  $inline: boolean
}>(
  () => css`
    text-align: left;
    width: 100%;
  `,
)

const PrefixIcon = styled.div(
  ({ theme }) => css`
    svg {
      display: block;
      width: ${theme.space['5']};
      height: ${theme.space['5']};
    }
  `,
)

const Label = styled(Typography)<{ $inline: boolean }>(
  ({ $inline }) => css`
    flex: 1;
    text-align: left;
    word-break: break-all;

    ${$inline &&
    css`
      word-break: initial;
    `}
  `,
)

const TrailingIcon = styled.svg<{ $rotate?: boolean }>(
  ({ theme, $rotate }) => css`
    display: block;
    margin-top: ${theme.space['1']};
    width: ${theme.space['3']};
    height: ${theme.space['3']};
    color: ${theme.colors.greyPrimary};
    ${$rotate &&
    css`
      transform: rotate(45deg);
    `}
  `,
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
        <PrefixLabel
          $inline={inline}
          color="grey"
          ellipsis={!inline}
          fontVariant={size === 'large' ? 'bodyBold' : 'smallBold'}
        >
          {keyLabel}
        </PrefixLabel>
      ) : (
        keyLabel
      )

    const KeySublabel =
      typeof keySublabel === 'string' ? (
        <PrefixLabel
          $inline={inline}
          color="grey"
          ellipsis={!inline}
          fontVariant={size === 'large' ? 'smallBold' : 'extraSmallBold'}
        >
          {keySublabel}
        </PrefixLabel>
      ) : (
        keySublabel
      )
    const PostfixProps = link
      ? { $rotate: true, as: UpArrowSVG }
      : copied
      ? { as: CheckSVG }
      : { as: CopySVG }

    return (
      <Container
        $inline={inline}
        as={asProp}
        {...generatedProps}
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
      >
        {hasPrefix && (
          <PrefixContainer $inline={inline} $size={size}>
            {icon && <PrefixIcon>{icon}</PrefixIcon>}
            {hasLabels && (
              <PrefixLabelsContainer $inline={inline}>
                {KeyLabel}
                {KeySublabel}
              </PrefixLabelsContainer>
            )}
          </PrefixContainer>
        )}
        <Label
          $inline={inline}
          fontVariant={size === 'large' ? 'body' : 'small'}
        >
          {children}
        </Label>
        <TrailingIcon {...PostfixProps} />
      </Container>
    )
  },
)

RecordItem.displayName = 'RecordItem'
