import * as React from 'react'
import styled, { css } from 'styled-components'
import { ReactNode } from 'react'

import { CheckSVG, CopySVG, UpArrowSVG } from '@/src'

import { Typography } from '../Typography/Typography'
import { useCopied } from '../../../hooks/useCopied'

type Screen = 'desktop' | 'mobile'
type Size = 'small' | 'large'

type BaseProps = {
  value: string
  link?: string
  screen?: Screen
  size?: Size
  icon?: ReactNode
  keyLabel?: string | ReactNode
  keySublabel?: string | ReactNode
  children: string
  onClick?: () => void
}

export type Props = BaseProps

const Container = styled.button<{
  $size: Size
}>(
  ({ theme, $size }) => css`
    display: flex;
    align-items: flex-start;

    gap: ${theme.space[2]};
    padding: ${theme.space['2.5']} ${theme.space[3]};
    height: ${theme.space['10']};
    width: fit-content;
    background: ${theme.colors.greySurface};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.radii.input};

    ${$size === 'large' &&
    css`
      width: 100%;
      height: fit-content;
    `}
  `,
)

const PrefixContainer = styled.div<{ $screen: Screen; $size: Size }>(
  ({ theme, $size, $screen }) => css`
    display: flex;
    gap: ${theme.space[2]};
    align-items: flex-start;

    ${$size === 'large' &&
    css`
      width: ${$screen === 'desktop' ? theme.space['30'] : theme.space['22.5']};
      flex: 0 0
        ${$screen === 'desktop' ? theme.space['30'] : theme.space['22.5']};
    `}
  `,
)

const PrefixLabelsContainer = styled.div<{ $size: Size }>(
  ({ theme, $size }) => css`
    display: flex;
    gap: ${theme.space[2]};
    align-items: center;

    ${$size === 'large' &&
    css`
      flex-direction: column;
      align-items: flex-start;
      gap: 0;
    `}
  `,
)

const PrefixLabel = styled(Typography)<{
  $screen: 'desktop' | 'mobile'
  $size: 'small' | 'large'
}>(
  () => css`
    text-align: left;
    width: 100%;
  `,
)

const PrefixSublabel = styled(Typography)(
  () => css`
    text-align: left;
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

const Label = styled(Typography)<{ $size: Size }>(
  ({ $size }) => css`
    flex: 1;
    text-align: left;

    ${$size === 'large' &&
    css`
      word-break: break-all;
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

export const RecordItem = ({
  link,
  screen = 'mobile',
  size = 'small',
  icon,
  keyLabel,
  keySublabel,
  value,
  children,
  ...props
}: Props) => {
  const { copy, copied } = useCopied()

  const asProp = link ? 'a' : undefined

  const hasPrefix = !!icon || !!keyLabel
  const hasLabels = !!keyLabel || !!keySublabel

  const KeyLabel =
    typeof keyLabel === 'string' ? (
      <PrefixLabel
        $screen={screen}
        $size={size}
        color="grey"
        colorScheme="text"
        ellipsis
        typography={screen === 'desktop' ? 'Body/Bold' : 'Small/Bold'}
      >
        {keyLabel}
      </PrefixLabel>
    ) : (
      keyLabel
    )

  const KeySublabel =
    typeof keySublabel === 'string' ? (
      <PrefixSublabel
        color="grey"
        typography={screen === 'desktop' ? 'Small/Bold' : 'Small/XS Bold'}
      >
        {keySublabel}
      </PrefixSublabel>
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
      $size={size}
      as={asProp}
      href={link}
      rel="nofollow noreferrer"
      target="_blank"
      type="button"
      onClick={() => {
        if (!link) copy(value)
      }}
      {...props}
    >
      {hasPrefix && (
        <PrefixContainer $screen={screen} $size={size}>
          {icon && <PrefixIcon>{icon}</PrefixIcon>}
          {hasLabels && (
            <PrefixLabelsContainer $size={size}>
              {KeyLabel}
              {KeySublabel}
            </PrefixLabelsContainer>
          )}
        </PrefixContainer>
      )}
      <Label
        $size={size}
        typography={screen === 'desktop' ? 'Body/Normal' : 'Small/Normal'}
      >
        {children}
      </Label>
      <TrailingIcon {...PostfixProps} />
    </Container>
  )
}

RecordItem.displayName = 'RecordItem'
