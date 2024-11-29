import * as React from 'react'

import { breakpoints } from '@/src/tokens'

import { actionSheeItem } from './styles.css'

import type { DropdownItem, DropdownItemObject } from './Dropdown'
import type { BoxProps } from '../../atoms/Box/Box'
import { Box } from '../../atoms/Box/Box'
import { Typography, Button } from '../../atoms'
import { Modal } from '../Modal/Modal'

const ActionSheetContent = React.forwardRef<HTMLElement, BoxProps>(
  (props, ref) => (
    <Box
      {...props}
      display="flex"
      flexDirection="column"
      gap="2.5"
      padding="2.5"
      ref={ref}
      width="full"
    />
  ),
)

const ActionSheetOptions = (props: BoxProps) => (
  <Box
    {...props}
    borderRadius="large"
    display="flex"
    flexDirection="column"
    gap="px"
    textAlign="center"
    width="full"
  />
)

const ActionSheetItem = (props: BoxProps) => (
  <Box
    {...props}
    alignItems="center"
    backgroundColor="backgroundPrimary"
    className={actionSheeItem}
    color="textPrimary"
    display="flex"
    gap="2"
    justifyContent="center"
    padding="5"
    position="relative"
    width="full"
  />
)

const ActionSheetLinkItem = (props: BoxProps) => (
  <Box {...props} color={props.color || 'text'} fontWeight="normal" />
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

            const { icon, label, onClick, value, href, color }
              = item as DropdownItemObject

            return (
              <ActionSheetItem
                key={(item as DropdownItemObject).label}
                onClick={() => {
                  onClick?.(value)
                  setIsOpen(false)
                }}
              >
                <Box as={icon} />
                {href
                  ? (
                      <ActionSheetLinkItem color={color} href={href}>
                        {label}
                      </ActionSheetLinkItem>
                    )
                  : (
                      <Typography color={color}>{label}</Typography>
                    )}
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
