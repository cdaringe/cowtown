import * as React from 'react'
import { connect, Provider } from 'react-redux'
import { createStore } from 'redux'
// import * as ReactDOM from 'react-dom'
// const { isNode } = require('browser-or-node')

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

const store = createStore(reducer)

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

export const ConnectedApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

// if (!isNode) {
// const appNode = document.getElementById('app')
// ReactDOM.hydrate(
//   <ConnectedApp />,
//   appNode
// )
// }
