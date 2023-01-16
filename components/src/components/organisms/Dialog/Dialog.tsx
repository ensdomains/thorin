import * as React from 'react'
import styled, { css } from 'styled-components'

import { AlertSVG, CrossCircleSVG, EthSVG } from '@/src'
import { mq } from '@/src/utils/responsiveHelpers'

import { WithAlert } from '@/src/types'

import { Modal, Typography } from '../..'

const IconCloseContainer = styled.button(
  ({ theme }) => css`
    position: absolute;
    top: ${theme.space['1']};
    right: ${theme.space['1']};
    padding: ${theme.space['3']};
    color: ${theme.colors.greyPrimary};
    cursor: pointer;
    transition-property: all;
    transition-duration: ${theme.transitionDuration['150']};
    transition-timing-function: ${theme.transitionTimingFunction['inOut']};

    &:hover {
      opacity: 0.7;
    }

    svg {
      display: block;
      width: ${theme.space['6']};
      height: ${theme.space['6']};
    }
  `,
)

const StyledCard = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: ${theme.space['6']};

    padding: ${theme.space['3.5']};
    border-radius: ${theme.radii['3xLarge']};
    background-color: ${theme.colors.background};
    position: relative;
    width: 100%;
    ${mq.sm.min(css`
      width: initial;
    `)}
    ${mq.md.min(css`
      max-width: 80vw;
    `)}
  `,
)

type NonNullableAlert = NonNullable<WithAlert['alert']>

const IconContainer = styled.div<{
  $alert: NonNullableAlert
}>(
  ({ theme, $alert }) => css`
    width: ${theme.space[8]};
    height: ${theme.space[8]};
    flex: 0 0 ${theme.space[8]};

    svg {
      display: block;
      width: 100%;
      height: 100%;
    }

    ${$alert === 'error' &&
    css`
      background: ${theme.colors.redPrimary};
      color: ${theme.colors.backgroundPrimary};
      border-radius: ${theme.radii.full};

      svg {
        transform: scale(0.5);
      }
    `}

    ${$alert === 'warning' &&
    css`
      background: ${theme.colors.yellowPrimary};
      color: ${theme.colors.backgroundPrimary};
      border-radius: ${theme.radii.full};

      svg {
        transform: scale(0.5);
      }
    `}
  `,
)

const Icon = ({ alert }: { alert: NonNullableAlert }) => {
  const isAlertIcon = !!alert && ['error', 'warning'].includes(alert)
  return (
    <IconContainer $alert={alert}>
      {isAlertIcon ? <AlertSVG /> : <EthSVG />}
    </IconContainer>
  )
}

const Title = styled(Typography)(
  () => css`
    text-align: center;
  `,
)

const SubTitle = styled(Typography)(
  ({ theme }) => css`
    font-size: ${theme.fontSizes.body};
    line-height: ${theme.lineHeights.body};
    font-weight: ${theme.fontWeights.bold};
    color: ${theme.colors.textSecondary};
    text-align: center;

    padding: 0 ${theme.space['4']};
    max-width: ${theme.space['72']};
  `,
)

const ButtonsContainer = styled.div<{ $center?: boolean }>(
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

const FooterContainer = styled.div(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${theme.space['4']};
  `,
)

const TitleContainer = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${theme.space['1']};
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

const StepContainer = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: ${theme.space['2']};
  `,
)

type StepType = 'notStarted' | 'inProgress' | 'completed'

const StepItem = styled.div<{ $type: StepType }>(
  ({ theme, $type }) => css`
    border-radius: ${theme.radii.full};
    width: ${theme.space['3.5']};
    height: ${theme.space['3.5']};
    ${$type === 'notStarted' &&
    css`
      border: ${theme.borderWidths['0.5']} ${theme.borderStyles.solid}
        ${theme.colors.border};
    `}
    ${$type === 'inProgress' &&
    css`
      border: ${theme.borderWidths['0.5']} ${theme.borderStyles.solid}
        ${theme.colors.accent};
    `}
    ${$type === 'completed' &&
    css`
      background-color: ${theme.colors.accent};
    `}
  `,
)

type TitleProps = {
  title?: string | React.ReactNode
  subtitle?: string | React.ReactNode
} & WithAlert

type StepProps = {
  currentStep?: number
  stepCount?: number
  stepStatus?: StepType
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
} & TitleProps &
  StepProps

type BlankProps = {
  variant: 'blank'
}

type Props = BaseProps & (ClosableProps | ActionableProps | BlankProps)

type ModalProps = React.ComponentProps<typeof Modal>

const Heading = ({
  title,
  subtitle,
  alert,
}: TitleProps & StepProps & WithAlert) => {
  return (
    <TitleContainer>
      {alert && <Icon alert={alert} />}
      {title &&
        ((typeof title !== 'string' && title) || (
          <Title fontVariant="headingFour">{title}</Title>
        ))}
      {subtitle &&
        ((typeof subtitle !== 'string' && subtitle) || (
          <SubTitle>{subtitle}</SubTitle>
        ))}
    </TitleContainer>
  )
}

const Footer = ({
  leading,
  trailing,
  center,
  currentStep,
  stepCount,
  stepStatus,
}: {
  leading?: React.ReactNode
  trailing: React.ReactNode
  center?: boolean
} & StepProps) => {
  const calcStepType = React.useCallback(
    (step: number) => {
      if (step === currentStep) {
        return stepStatus || 'inProgress'
      }
      if (step < (currentStep || 0)) {
        return 'completed'
      }
      return 'notStarted'
    },
    [currentStep, stepStatus],
  )

  const showButtons = leading || trailing
  const showSteps = !!stepCount
  const showFooter = showButtons || showSteps

  if (!showFooter) return null
  return (
    <FooterContainer>
      {stepCount && (
        <StepContainer data-testid="step-container">
          {Array.from({ length: stepCount }, (_, i) => (
            <StepItem
              $type={calcStepType(i)}
              data-testid={`step-item-${i}-${calcStepType(i)}`}
              key={i}
            />
          ))}
        </StepContainer>
      )}
      {showButtons && (
        <ButtonsContainer {...{ $center: center }}>
          {leading || (!center && <div style={{ flexGrow: 1 }} />)}
          {trailing || (!center && <div style={{ flexGrow: 1 }} />)}
        </ButtonsContainer>
      )}
    </FooterContainer>
  )
}

const ModalWithTitle = ({
  open,
  onDismiss,
  alert,
  title,
  subtitle,
  children,
  currentStep,
  stepCount,
  stepStatus,
  ...props
}: Omit<ModalProps, 'title'> & TitleProps & StepProps & WithAlert) => {
  return (
    <Modal {...{ ...props, open, onDismiss }}>
      <StyledCard>
        <ContentWrapper>
          <Heading
            {...{ alert, title, subtitle, currentStep, stepCount, stepStatus }}
          />
          {children}
        </ContentWrapper>
      </StyledCard>
    </Modal>
  )
}

const CloseButton = ({ onClick }: { onClick: () => void }) => (
  <IconCloseContainer data-testid="close-icon" onClick={onClick}>
    <CrossCircleSVG />
  </IconCloseContainer>
)

export const Dialog = ({
  children,
  onDismiss,
  open,
  variant = 'closable',
  ...props
}: Props) => {
  if (variant === 'actionable') {
    const {
      trailing,
      leading,
      alert,
      title,
      subtitle,
      center,
      currentStep,
      stepCount,
      stepStatus,
      ...actionProps
    } = props as ActionableProps

    return (
      <ModalWithTitle
        {...actionProps}
        alert={alert}
        open={open}
        subtitle={subtitle}
        title={title}
        onDismiss={onDismiss}
      >
        {children}
        <Footer
          {...{
            leading,
            trailing,
            center,
            currentStep,
            stepCount,
            stepStatus,
          }}
        />
        {onDismiss && <CloseButton onClick={onDismiss} />}
      </ModalWithTitle>
    )
  } else if (variant === 'closable') {
    const { alert, title, subtitle, ...closableProps } = props as ClosableProps

    return (
      <ModalWithTitle
        {...closableProps}
        alert={alert}
        open={open}
        subtitle={subtitle}
        title={title}
        onDismiss={onDismiss}
      >
        {children}
        {onDismiss && <CloseButton onClick={onDismiss} />}
      </ModalWithTitle>
    )
  }

  return (
    <Modal {...{ onDismiss, open }}>
      <StyledCard>
        <ContentWrapper>{children}</ContentWrapper>
        {onDismiss && <CloseButton onClick={onDismiss} />}
      </StyledCard>
    </Modal>
  )
}

Dialog.displayName = 'Dialog'
Dialog.Footer = Footer
Dialog.Heading = Heading
Dialog.CloseButton = CloseButton
