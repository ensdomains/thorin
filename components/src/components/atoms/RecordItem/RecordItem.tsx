import * as React from 'react'
import styled, { css } from 'styled-components'
import { ReactNode } from 'react'

import { CheckSVG, CopySVG, UpArrowSVG } from '@/src'

import { Typography } from '../Typography/Typography'
import { useCopied } from '../../../hooks/useCopied'

type Size = 'small' | 'large'

type BaseProps = {
  value: string
  link?: string
  size?: Size
  inline?: boolean
  icon?: ReactNode
  keyLabel?: string | ReactNode
  keySublabel?: string | ReactNode
  children: string
  onClick?: () => void
}

export type Props = BaseProps

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

    ${$inline &&
    css`
      width: fit-content;
      height: ${theme.space['10']};
    `}
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
    width: 100%; ;
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

export const RecordItem = ({
  link,
  size = 'small',
  inline = false,
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
        $inline={inline}
        color="grey"
        ellipsis={!inline}
        fontVariant={size === 'large' ? 'regularBold' : 'smallBold'}
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
        fontVariant={size === 'large' ? 'regular' : 'small'}
      >
        {children}
      </Label>
      <TrailingIcon {...PostfixProps} />
    </Container>
  )
}

RecordItem.displayName = 'RecordItem'
