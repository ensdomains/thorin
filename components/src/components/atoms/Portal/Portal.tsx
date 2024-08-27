import * as React from 'react'
import * as ReactDOM from 'react-dom'

type Props = {
  /** The classname attribute of the container element */
  className?: string
  /** The element tag of the container element */
  el?: string
  children: React.ReactNode
  /** A callback fired on the render of children */
  renderCallback?: () => void
}

export const Portal: React.FC<Props> = ({
  children,
  className,
  el = 'div',
  renderCallback,
}: Props) => {
  const [container] = React.useState(document.createElement(el))

  if (className) container.classList.add(className)

  React.useEffect(() => {
    document.body.appendChild(container)
    renderCallback?.()
    return () => {
      document.body.removeChild(container)
    }
  }, [renderCallback])

  return ReactDOM.createPortal(children, container)
}

Portal.displayName = 'Portal'
