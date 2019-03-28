import * as React from 'react'
import {
  Route,
  Redirect,
  Switch,
  StaticRouter,
  StaticRouterContext
} from 'react-router'

export function TestHeader (props: React.HTMLAttributes<any>) {
  const { children, ...rest } = props
  return <h1 {...rest}>{props.children ? props.children : 'TEST_HEADER'}</h1>
}

export const RedirectWithStatus: React.FC<{
  from: string
  to: string
  statusCode: number
}> = ({ from, to, statusCode }) => (
  <Route
    render={({ staticContext }) => {
      // there is no `staticContext` on the client, so
      // we need to guard against that here
      if (staticContext) staticContext.statusCode = statusCode
      return <Redirect from={from} to={to} />
    }}
  />
)

export const App: React.FC<any> = () => (
  <Switch>
    <RedirectWithStatus statusCode={301} from='/users' to='/profiles' />
    <RedirectWithStatus statusCode={302} from='/courses' to='/dashboard' />
    <Route path='/dashboard'>
      <div>
        <h1>dashboard</h1>
        <Switch>
          <Route path='/dashboard/detail' component={() => <h2>detail</h2>} />
          <Route
            path='/dashboard/overview'
            component={() => <h2>overview</h2>}
          />
        </Switch>
      </div>
    </Route>
  </Switch>
)
