import * as React from 'react'

export function TestHeader (props: React.HTMLAttributes<any>) {
  const { children, ...rest } = props
  return <h1 {...rest}>{props.children ? props.children : 'TEST_HEADER'}</h1>
}
