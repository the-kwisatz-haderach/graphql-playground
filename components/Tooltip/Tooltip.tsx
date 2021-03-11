import React, { ReactElement } from 'react'

interface Props {
  title: string
  description: string
}

export default function Tooltip({ title, description }: Props): ReactElement {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}
