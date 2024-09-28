import MyComponentWithProps from './vue-ts.vue'

// biome-ignore lint/style/useImportType: effectively
import * as React from 'react'

console.info(MyComponentWithProps)

export const MyComponentWithoutProps: React.FC = () => {
  return (
    <div tabIndex={-2} type="button" aria-checked="true" role="switch">
      MyComponentWithoutProps
    </div>
  )
}
