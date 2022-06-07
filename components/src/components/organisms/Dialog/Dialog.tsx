import * as React from 'react'
import styled, { css } from 'styled-components'

import { ExitSVG } from '@/src'
import { mq } from '@/src/utils/responsiveHelpers'

import { Modal, Typography } from '../..'

const IconCloseContainer = styled.div(
  ({ theme }) => css`
    position: absolute;
    top: ${theme.space['2.5']};
    right: ${theme.space['2.5']};
    height: ${theme.space['8']};
    width: ${theme.space['8']};
    opacity: ${theme.opacity['50']};
    cursor: pointer;
    transition-property: all;
    transition-duration: ${theme.transitionDuration['150']};
    transition-timing-function: ${theme.transitionTimingFunction['inOut']};

    &:hover {
      opacity: ${theme.opacity['70']};
    }
  `,
)

const StyledCard = styled.div(
  ({ theme }) => css`
    padding: ${theme.space['3.5']};
    border-radius: ${theme.radii['3xLarge']};
    background-color: ${theme.colors.background};
    position: relative;
    width: 100%;
    ${mq.sm.min(css`
      width: initial;
    `)}
  `,
)

const Title = styled(Typography)(
  ({ theme }) => css`
    font-size: ${theme.fontSizes['headingThree']};
    font-weight: ${theme.fontWeights['bold']};
  `,
)

const SubTitle = styled(Typography)(
  ({ theme }) => css`
    font-size: ${theme.fontSizes['base']};
    font-weight: ${theme.fontWeights['medium']};
    color: ${theme.colors.textSecondary};
  `,
)

const Container = styled.div<{ $center?: boolean }>(
  ({ theme, $center }) => css`
    display: flex;
    align-items: center;
    justify-content: stretch;
    flex-direction: ${$center ? 'column' : 'row'};
    gap: ${theme.space['2']};
    width: ${theme.space.full};
    max-width: ${theme.space['96']};
  `,
)

const TitleContainer = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: ${theme.space['1.5']};
  `,
)

const ContentWrapper = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${theme.space['5']};
    ${mq.sm.min(css`
      min-width: ${theme.space['64']};
    `)}
  `,
)

type TitleProps = {
  title?: string | React.ReactNode
  subtitle?: string | React.ReactNode
}

type BaseProps = {
  variant?: 'closable' | 'actionable' | 'blank'
  children: React.ReactNode
  onDismiss?: () => void
  open: boolean
}

type ClosableProps = {
  variant: 'closable'
} & TitleProps

type ActionableProps = {
  variant: 'actionable'
  trailing?: React.ReactNode
  leading?: React.ReactNode
  center?: boolean
} & TitleProps

type BlankProps = {
  variant: 'blank'
}

type Props = BaseProps & (ClosableProps | ActionableProps | BlankProps)
type ModalProps = React.ComponentProps<typeof Modal>
const ModalWithTitle = ({
  open,
  onDismiss,
  title,
  subtitle,
  children,
  ...props
}: Omit<ModalProps, 'title'> & TitleProps) => (
  <Modal {...{ ...props, open, onDismiss }}>
    <StyledCard>
      <ContentWrapper>
        <TitleContainer>
          {title &&
            ((typeof title !== 'string' && title) || <Title>{title}</Title>)}
          {subtitle &&
            ((typeof subtitle !== 'string' && subtitle) || (
              <SubTitle>{subtitle}</SubTitle>
            ))}
        </TitleContainer>
        {children}
      </ContentWrapper>
    </StyledCard>
  </Modal>
)

export const Dialog = ({
  children,
  onDismiss,
  open,
  variant = 'closable',
  ...props
}: Props) => {
  if (variant === 'actionable') {
    const { trailing, leading, title, subtitle, center } =
      props as ActionableProps

    return (
      <ModalWithTitle {...{ ...props, open, onDismiss, title, subtitle }}>
        {children}
        {(leading || trailing) && (
          <Container {...{ $center: center }}>
            {leading || (!center && <div style={{ flexGrow: 1 }} />)}
            {trailing || (!center && <div style={{ flexGrow: 1 }} />)}
          </Container>
        )}
      </ModalWithTitle>
    )
  } else if (variant === 'closable') {
    const { title, subtitle } = props as ClosableProps

    return (
      <ModalWithTitle {...{ ...props, open, onDismiss, title, subtitle }}>
        {children}
        {onDismiss && (
          <IconCloseContainer
            as={ExitSVG}
            data-testid="close-icon"
            onClick={onDismiss}
          />
        )}
      </ModalWithTitle>
    )
  }

  return (
    <Modal {...{ onDismiss, open }}>
      <StyledCard>{children}</StyledCard>
    </Modal>
  )
}

Dialog.displayName = 'Dialog'
