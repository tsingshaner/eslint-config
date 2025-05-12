import MyComponentWithProps from './vue.vue'

// biome-ignore lint/style/useImportType: effectively
import * as React from 'react'

console.info(MyComponentWithProps)

export const MyComponentWithoutProps: React.FC = () => {
  return (
    <div aria-checked="true" role="switch" tabIndex={-2} type="button">
      MyComponentWithoutProps
    </div>
  )
}
