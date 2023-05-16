import * as React from 'react'
import styled, { css } from 'styled-components'

import { breakpoints } from '@/src/tokens'

import { Button, Modal, Typography } from '../..'
import type { DropdownItem, DropdownItemObject } from './Dropdown'

const ActionSheetContent = styled.div(
  ({ theme }) => css`
    width: 100%;
    flex-direction: column;
    padding: ${theme.space['2.5']};
    gap: ${theme.space['2.5']};
    display: flex;
  `,
)

const ActionSheetOptions = styled.div(
  ({ theme }) => css`
    border-radius: ${theme.radii['large']};
    width: ${theme.space['full']};
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: ${theme.space.px};
  `,
)

const ActionSheetItem = styled.div(
  ({ theme }) => css`
    width: 100%;
    padding: 20px;
    position: relative;
    background: ${theme.colors.backgroundPrimary};

    &:first-child {
      border-top-left-radius: ${theme.radii['large']};
      border-top-right-radius: ${theme.radii['large']};
    }
    &:last-child {
      border-bottom-left-radius: ${theme.radii['large']};
      border-bottom-right-radius: ${theme.radii['large']};
    }
  `,
)

type Props = {
  isOpen: boolean
  screenSize: number
  items: DropdownItem[]
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  DropdownChild: React.FC<{
    setIsOpen: (isOpen: boolean) => void
    item: React.ReactElement<React.PropsWithRef<any>>
  }>
  cancelLabel?: string
}
export const ActionSheet = React.forwardRef<HTMLDivElement, Props>(
  (
    { isOpen, screenSize, items, setIsOpen, DropdownChild, cancelLabel },
    ref,
  ) => (
    <Modal
      mobileOnly
      open={isOpen}
      onDismiss={
        screenSize < breakpoints.sm ? () => setIsOpen(false) : undefined
      }
    >
      <ActionSheetContent ref={ref}>
        <ActionSheetOptions>
          {items?.map((item) => {
            if (React.isValidElement(item)) {
              return DropdownChild({ item, setIsOpen })
            }

            return (
              <ActionSheetItem
                key={(item as DropdownItemObject).label}
                onClick={() => {
                  ;(item as DropdownItemObject)?.onClick?.(
                    (item as DropdownItemObject).value,
                  )
                  setIsOpen(false)
                }}
              >
                <Typography>{(item as DropdownItemObject).label}</Typography>
              </ActionSheetItem>
            )
          })}
        </ActionSheetOptions>
        <Button colorStyle="greySecondary" onClick={() => setIsOpen(false)}>
          {cancelLabel}
        </Button>
      </ActionSheetContent>
    </Modal>
  ),
)
