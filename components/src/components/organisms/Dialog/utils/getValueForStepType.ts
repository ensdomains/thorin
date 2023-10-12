import { Sprinkles } from '@/src/css/rainbow-spinkles.css'

import type { StepType } from '../Dialog'

type Properties = {
  borderWidth: Sprinkles['borderWidth']
  borderColor: string
  backgroundColor: string
}

type Property = keyof Properties

const stepTypeMap: { [key in StepType]: Properties } = {
  notStarted: {
    borderWidth: '$2x',
    borderColor: '$border',
    backgroundColor: 'none',
  },
  inProgress: {
    borderWidth: '$2x',
    borderColor: '$accent',
    backgroundColor: 'none',
  },
  completed: {
    borderWidth: '$2x',
    borderColor: '$accent',
    backgroundColor: '$accent',
  },
}

export const getValueForStepType = <T extends Property>(
  stepType: StepType,
  property: T,
): Properties[T] => {
  return stepTypeMap[stepType][property]
}
