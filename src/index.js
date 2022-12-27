import "./polifill"
import React from "react"
import ReactDOM from "react-dom"
import "./index.scss"
import App from "./App"

import rootReducer from "./reducers"
import thunk from "redux-thunk"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

ReactDOM.render(
  <>
    <React.StrictMode>
      <Provider store={createStoreWithMiddleware(rootReducer)}>
        <App />
      </Provider>
    </React.StrictMode>
  </>,
  document.getElementById("root")
)
