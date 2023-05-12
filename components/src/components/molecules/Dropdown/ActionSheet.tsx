import * as React from 'react'
import styled, { css } from 'styled-components'

import { mq } from '@/src/utils/responsiveHelpers'

import { breakpoints } from '@/src/tokens'

import { Button, Modal, Typography } from '../..'
import type { DropdownItem, DropdownItemObject } from './Dropdown'

const ActionSheetModal = styled((props) => <Modal {...props} />)(
  () => css`
    flex-direction: column !important;
    padding: 10px;
    gap: 10px;
    display: flex;

    ${mq.sm.min(
      css`
        display: none !important;
      `,
    )}
  `,
)

const ActionSheetOptions = styled.div(
  ({ theme }) => css`
    border-radius: ${theme.radii['large']};
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 1px;
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

export const ActionSheet = ({
  isOpen,
  screenSize,
  items,
  setIsOpen,
  DropdownChild,
}: {
  isOpen: boolean
  screenSize: number
  items: DropdownItem[]
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  DropdownChild: React.FC<{
    setIsOpen: (isOpen: boolean) => void
    item: React.ReactElement<React.PropsWithRef<any>>
  }>
}) => (
  <ActionSheetModal
    open={isOpen}
    onDismiss={screenSize < breakpoints.sm ? () => null : null}
  >
    <ActionSheetOptions>
      {items?.map((item) => {
        if (React.isValidElement(item)) {
          return DropdownChild({ item, setIsOpen })
        }

        return (
          <ActionSheetItem
            key={(item as DropdownItemObject).label}
            onClick={() =>
              (item as DropdownItemObject)?.onClick?.(
                (item as DropdownItemObject).value,
              )
            }
          >
            <Typography>{(item as DropdownItemObject).label}</Typography>
          </ActionSheetItem>
        )
      })}
    </ActionSheetOptions>
    <Button colorStyle="greySecondary">Cancel</Button>
  </ActionSheetModal>
)
