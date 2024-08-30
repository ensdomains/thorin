import * as React from 'react'

import { AlertSVG, CrossSVG, EthSVG } from '@/src/icons'

import { WithAlert } from '@/src/types'

import { translateY } from '@/src/css/utils/common'
import { FontSize } from '@/src/tokens/typography'

import { DialogContent } from './DialogContent'

import { Box, BoxProps } from '../../atoms/Box/Box'
import { getValueForAlert } from './utils/getValueForAlert'
import { getValueForStepType } from './utils/getValueForStepType'
import { Typography } from '../../atoms'
import { Modal } from '../../molecules'

const CloseButton = (props: BoxProps) => (
  <Box
    {...props}
    alignItems="center"
    as="button"
    backgroundColor={{ base: 'transparent', hover: '$greySurface' }}
    borderRadius="$full"
    cursor="pointer"
    data-testid="close-icon"
    display="flex"
    justifyContent="center"
    position="absolute"
    right="$2"
    top="$2"
    transform={{ base: translateY(0), hover: translateY(-1) }}
    transitionDuration="$150"
    transitionProperty="all"
    transitionTimingFunction="$inOut"
    wh="$8"
  >
    <Box as={<CrossSVG />} color="$greyPrimary" display="block" wh="$4" />
  </Box>
)

const StyledCard = (props: BoxProps) => (
  <Box
    {...props}
    alignItems="center"
    backgroundColor="$backgroundPrimary"
    borderBottomLeftRadius={{ xs: '0', sm: '$3xLarge' }}
    borderBottomRightRadius={{ xs: '0', sm: '$3xLarge' }}
    borderRadius="$3xLarge"
    display="flex"
    flexDirection="column"
    gap={{ xs: '$4', sm: '$6' }}
    maxHeight={{ xs: '80vh', sm: 'min(90vh, $144)' }}
    maxWidth={{ xs: 'unset', sm: '80vw' }}
    minWidth={{ xs: 'unset', sm: '$64' }}
    overflow="hidden"
    padding={{ xs: '$4', sm: '$6' }}
    position="relative"
    width="$full"
  />
)

type NonNullableAlert = NonNullable<WithAlert['alert']>

const Icon = ({
  $alert,
  ...props
}: BoxProps & { $alert: NonNullableAlert }) => {
  const Icon = ['error', 'warning'].includes($alert) ? <AlertSVG /> : <EthSVG />
  return (
    <Box
      {...props}
      backgroundColor={getValueForAlert($alert, 'backgroundColor')}
      borderRadius="$full"
      color={getValueForAlert($alert, 'color')}
      flexBasis="$8"
      flexGrow="0"
      flexShrink="0"
      wh="$8"
    >
      <Box
        as={Icon}
        display="block"
        transform={getValueForAlert($alert, 'svgTransform')}
        wh="$full"
      />
    </Box>
  )
}

const ButtonsContainer = (props: BoxProps) => (
  <Box
    {...props}
    alignItems="center"
    display="flex"
    flexDirection={{ xs: 'column', sm: 'row' }}
    gap="$2"
    justifyContent="stretch"
    width="$full"
  />
)

const FooterContainer = (props: BoxProps) => (
  <Box
    {...props}
    alignItems="center"
    display="flex"
    flexDirection="column"
    gap="$4"
    width="$full"
  />
)

const TitleContainer = (props: BoxProps) => (
  <Box
    {...props}
    alignItems="center"
    display="flex"
    flexDirection="column"
    gap="$px"
    justifyContent="center"
  />
)

const StepContainer = (props: BoxProps) => (
  <Box
    {...props}
    alignItems="center"
    display="flex"
    flexDirection="row"
    gap="$2"
    justifyContent="center"
  />
)

export type StepType = 'notStarted' | 'inProgress' | 'completed'

const StepItem = ({ $type, ...props }: BoxProps & { $type: StepType }) => (
  <Box
    {...props}
    backgroundColor={getValueForStepType($type, 'backgroundColor')}
    borderColor={getValueForStepType($type, 'borderColor')}
    borderRadius="$full"
    borderStyle="solid"
    borderWidth={getValueForStepType($type, 'borderWidth')}
    wh="$3.5"
  />
)

type TitleProps = {
  title?: string | React.ReactNode
  subtitle?: string | React.ReactNode
  fontVariant?: FontSize
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
  onClose?: () => void
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

export type DialogProps = BaseProps & (ClosableProps | ActionableProps | BlankProps)

type ModalProps = React.ComponentProps<typeof Modal>

const Heading = ({
  title,
  subtitle,
  alert,
  fontVariant = 'headingFour',
}: TitleProps & StepProps & WithAlert) => {
  return (
    <TitleContainer>
      {alert && <Icon $alert={alert} />}
      {title
      && ((typeof title !== 'string' && title) || (
        <Typography fontVariant={fontVariant} textAlign="center">
          {title}
        </Typography>
      ))}
      {subtitle
      && ((typeof subtitle !== 'string' && subtitle) || (
        <Typography
          color="textSecondary"
          fontVariant="bodyBold"
          maxWidth="$72"
          px="$4"
          textAlign="center"
        >
          {subtitle}
        </Typography>
      ))}
    </TitleContainer>
  )
}

// const Content = ({ children }: { children?: React.ReactNode }) => {
//   return (
//     <Box
//       maxHeight="60vh"
//       maxWidth={{ base: '100vw', sm: '$128' }}
//       width={{ base: '100vw', sm: '80vw' }}
//     >
//       <ScrollBox height="$full" width="$full">
//         <Box paddingRight="$2">{children}</Box>
//       </ScrollBox>
//     </Box>
//   )
// }

const Footer: React.FC<{
  leading?: React.ReactNode
  trailing: React.ReactNode
} & StepProps> = ({
  leading,
  trailing,
  currentStep,
  stepCount,
  stepStatus,
}) => {
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
        <ButtonsContainer>
          {leading}
          {trailing}
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
        <Heading
          {...{ alert, title, subtitle, currentStep, stepCount, stepStatus }}
        />
        {children}
      </StyledCard>
    </Modal>
  )
}

export const Dialog = ({
  children,
  onDismiss,
  onClose,
  open,
  variant = 'closable',
  ...props
}: DialogProps) => {
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

    const onCloseOrDismiss = onClose || onDismiss
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
        {onCloseOrDismiss && <CloseButton onClick={onCloseOrDismiss} />}
      </ModalWithTitle>
    )
  }
  else if (variant === 'closable') {
    const { alert, title, subtitle, ...closableProps } = props as ClosableProps
    const onCloseOrDismiss = onClose || onDismiss
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
        {onCloseOrDismiss && <CloseButton onClick={onCloseOrDismiss} />}
      </ModalWithTitle>
    )
  }

  return (
    <Modal {...{ onDismiss, open }}>
      <StyledCard>
        {children}
        {onClose && <CloseButton onClick={onClose} />}
      </StyledCard>
    </Modal>
  )
}

Dialog.displayName = 'Dialog'
Dialog.Footer = Footer
Dialog.Heading = Heading
Dialog.Content = DialogContent
Dialog.CloseButton = CloseButton
