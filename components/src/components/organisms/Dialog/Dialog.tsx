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
    text-align: center;
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

const TitleContainer = styled.div<{ $hasSteps: boolean }>(
  ({ theme, $hasSteps }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    ${!$hasSteps &&
    css`
      margin-top: ${theme.space['1.5']};
    `}
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
        ${theme.colors.borderSecondary};
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
}

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
  currentStep,
  stepCount,
  stepStatus,
  title,
  subtitle,
}: TitleProps & StepProps) => {
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

  return (
    <>
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
      <TitleContainer $hasSteps={!!stepCount}>
        {title &&
          ((typeof title !== 'string' && title) || <Title>{title}</Title>)}
        {subtitle &&
          ((typeof subtitle !== 'string' && subtitle) || (
            <SubTitle>{subtitle}</SubTitle>
          ))}
      </TitleContainer>
    </>
  )
}

const Footer = ({
  leading,
  trailing,
  center,
}: {
  leading?: React.ReactNode
  trailing: React.ReactNode
  center?: boolean
}) => (
  <Container {...{ $center: center }}>
    {leading || (!center && <div style={{ flexGrow: 1 }} />)}
    {trailing || (!center && <div style={{ flexGrow: 1 }} />)}
  </Container>
)

const ModalWithTitle = ({
  open,
  onDismiss,
  title,
  subtitle,
  children,
  currentStep,
  stepCount,
  stepStatus,
  ...props
}: Omit<ModalProps, 'title'> & TitleProps & StepProps) => {
  return (
    <Modal {...{ ...props, open, onDismiss }}>
      <StyledCard>
        <ContentWrapper>
          <Heading
            {...{ title, subtitle, currentStep, stepCount, stepStatus }}
          />
          {children}
        </ContentWrapper>
      </StyledCard>
    </Modal>
  )
}

export const Dialog = ({
  children,
  onDismiss,
  open,
  variant = 'closable',
  ...props
}: Props) => {
  if (variant === 'actionable') {
    const { trailing, leading, title, subtitle, center, ...actionProps } =
      props as ActionableProps

    return (
      <ModalWithTitle
        {...actionProps}
        open={open}
        subtitle={subtitle}
        title={title}
        onDismiss={onDismiss}
      >
        {children}
        {(leading || trailing) && <Footer {...{ leading, trailing, center }} />}
      </ModalWithTitle>
    )
  } else if (variant === 'closable') {
    const { title, subtitle, ...closableProps } = props as ClosableProps

    return (
      <ModalWithTitle
        {...closableProps}
        open={open}
        subtitle={subtitle}
        title={title}
        onDismiss={onDismiss}
      >
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
      <StyledCard>
        <ContentWrapper>{children}</ContentWrapper>
      </StyledCard>
    </Modal>
  )
}

Dialog.displayName = 'Dialog'
Dialog.Footer = Footer
Dialog.Heading = Heading
