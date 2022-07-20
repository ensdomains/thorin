import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { CSSProperties } from 'styled-components'

type MenuPortalProps = {
  appendTo: HTMLElement | null
  control: HTMLElement | null
  listenTo?: HTMLElement | null
  isListening?: boolean
}

const MenuPortal: React.FC<React.PropsWithChildren<MenuPortalProps>> = ({
  appendTo,
  control,
  listenTo,
  isListening = false,
  children,
}) => {
  // The position and size of the control relative to the appendTo element
  const [placement, setPlacement] = React.useState<CSSProperties>({})

  const calculatePlacement = React.useCallback(() => {
    if (!appendTo || !control) return
    const controlRect = control.getBoundingClientRect()
    const containerRect = appendTo.getBoundingClientRect()
    const top = controlRect.top - containerRect.top
    const left = controlRect.left - containerRect.left
    setPlacement({
      position: 'absolute',
      top: `${top}px`,
      left: `${left}px`,
      width: `${controlRect.width}px`,
      height: `${controlRect.height}px`,
    })
  }, [control, appendTo])

  // Iniitialize the placement calculation
  React.useEffect(() => {
    calculatePlacement()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListening])

  // Listen to the scroll event of the listenTo element
  React.useEffect(() => {
    if (listenTo && isListening)
      listenTo?.addEventListener('scroll', calculatePlacement)
    return () => {
      listenTo?.removeEventListener('scroll', calculatePlacement)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listenTo, isListening])

  if (!appendTo || !control) return <>{children}</>

  // Create a wrapper element to mimic the position of the control element
  const wrapper = <div style={placement}>{children}</div>
  return ReactDOM.createPortal(wrapper, appendTo)
}

export type Props = {
  appendTo?: MenuPortalProps['appendTo']
  control?: MenuPortalProps['control']
  listenTo?: MenuPortalProps['listenTo']
  isListening?: MenuPortalProps['isListening']
}

export const MenuPlacement = ({
  appendTo,
  control,
  listenTo,
  isListening = true,
  children,
}: React.PropsWithChildren<Props>) => {
  if (!appendTo || !control) return <>{children}</>
  return (
    <MenuPortal
      appendTo={appendTo}
      control={control}
      isListening={isListening}
      listenTo={listenTo}
    >
      {children}
    </MenuPortal>
  )
}

MenuPlacement.displayName = 'MenuPlacement'
