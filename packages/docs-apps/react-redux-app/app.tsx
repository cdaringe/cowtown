import * as React from 'react'
import { connect, Provider } from 'react-redux'
import { createStore, Store } from 'redux'
import * as ReactDOM from 'react-dom'
const { isNode } = require('browser-or-node')

const INC = 'INC'
const DEC = 'DEC'
const DEFAULT_STATE = {
  count: 0
}

function reducer (state = DEFAULT_STATE, action: any) {
  switch (action.type) {
    case INC:
      return { ...state, count: state.count + 1 }
    case DEC:
      return { ...state, count: state.count - 1 }
  }
  return state
}

export const App = connect(
  state => state,
  dispatch => ({
    inc: () => dispatch({ type: INC }),
    dec: () => dispatch({ type: DEC })
  })
)((props: any) => (
  <div>
    {props.count}
    <button onClick={props.dec}>-</button>
    <button onClick={props.inc}>+</button>
  </div>
))

export const ConnectedApp = ({ store }: { store: Store }) => (
  <Provider store={store}>
    <App />
  </Provider>
)

export const createAppStore = (initialState: any) =>
  createStore(reducer, initialState)

if (isNode) {
  // render an html page in the server process,
  // and the react application to string from within
} else {
  const appNode = document.getElementById('app')
  ReactDOM.hydrate(
    <ConnectedApp store={createAppStore((window as any).INITIAL_STATE)} />,
    appNode
  )
}

// enable hot module reloading
if ((module as any).hot) {
  ;(module as any).hot.accept()
}
