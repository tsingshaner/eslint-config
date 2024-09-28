import * as React from 'react'

import type { FC } from 'react'

export const NestComponent: FC<{
  name: string
}> = ({ name }) => {
  const [nickname, setNickname] = React.useState<string>()

  React.useEffect(() => {
    setNickname(`qingshaner${name}`)
  }, [])

  return <div className="foo bar p-4 px-2">{name}</div>
}
