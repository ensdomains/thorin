import * as React from 'react'
import styled, { css } from 'styled-components'

import { ExitSVG } from '@/src'
import { largerThan } from '@/src/utils/responsiveHelpers'

import { Modal, Typography } from '../..'

const IconCloseContainer = styled.div`
  ${({ theme }) => `
    position: absolute;
    top: ${theme.space['2.5']};
    right: ${theme.space['2.5']};
    height: ${theme.space['8']};
    width: ${theme.space['8']};
    opacity: ${theme.opacity['50']};
    cursor: pointer;
    transition-propery: all;
    transition-duration: ${theme.transitionDuration['150']};
    transition-timing-function: ${theme.transitionTimingFunction['inOut']};

    &:hover {
      opacity: ${theme.opacity['70']};
    }
  `}
`

const StyledCard = styled.div`
  ${({ theme }) => css`
    padding: ${theme.space['3.5']};
    border-radius: ${theme.radii['3xLarge']};
    background-color: ${theme.colors.background};
    position: relative;
    width: 100%;
    ${largerThan.sm`
      width: initial;
    `}
  `}
`

const Title = styled(Typography)`
  ${({ theme }) => `
    font-size: ${theme.fontSizes['headingThree']};
    font-weight: ${theme.fontWeights['bold']};
  `}
`

const SubTitle = styled(Typography)`
  ${({ theme }) => `
    font-size: ${theme.fontSizes['base']};
    font-weight: ${theme.fontWeights['medium']};
    color: ${theme.colors.textSecondary};
  `}
`

const Container = styled.div<{ $center?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: stretch;
  ${({ $center, theme }) => `
    flex-direction: ${$center ? 'column' : 'row'};
    gap: ${theme.space['2']};
    width: ${theme.space.full};
    max-width: ${theme.space['96']};
  `}
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${({ theme }) => `
    margin-top: ${theme.space['1.5']};
  `}
`

const ContentWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${theme.space['5']};
    ${largerThan.sm`
      min-width: ${theme.space['64']};
    `}
  `}
`

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

const ModalWithTitle = ({
  open,
  onDismiss,
  title,
  subtitle,
  children,
}: React.ComponentProps<typeof Modal> & TitleProps) => (
  <Modal {...{ open, onDismiss }}>
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
      <ModalWithTitle {...{ open, onDismiss, title, subtitle }}>
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
      <ModalWithTitle {...{ open, onDismiss, title, subtitle }}>
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
