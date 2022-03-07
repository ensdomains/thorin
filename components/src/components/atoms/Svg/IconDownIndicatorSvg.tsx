import * as React from 'react'

import { IconProps } from '@/src/types/index'

export const IconDownIndicatorSvg = ({
  title,
  titleId,
  ...props
}: IconProps) => (
  <svg
    aria-labelledby={titleId}
    fill="none"
    focusable="false"
    height={24}
    shapeRendering="geometricPrecision"
    viewBox="0 0 24 24"
    width={24}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M11.255 17.866a1 1 0 001.49 0L22.506 6.97c.577-.644.12-1.667-.744-1.667H2.238c-.864 0-1.321 1.023-.744 1.667l9.761 10.896z"
      fill="currentColor"
    />
  </svg>
)
