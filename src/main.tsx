import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import "./styles/index.less"
import { Provider } from "react-redux"
import store from "./store"
import "virtual:uno.css"
// svg图标
import 'virtual:svg-icons-register';
import App from "./App"

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </React.StrictMode>
)
