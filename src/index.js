import { StrictMode } from "react";
import ReactDOM from "react-dom";

import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import AplicacionSnoopy from "./AplicacionSnoopy";
import "./index.css";
import { CookiesProvider } from "react-cookie";
import bootstrap from "bootstrap";

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log("NODE_ENV:" + process.env.NODE_ENV);
console.log("NODE_ENV:" + process.env.REACT_APP_AMBIENTE);

root.render(
  <StrictMode>
    <CookiesProvider>
      <AplicacionSnoopy />
    </CookiesProvider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

serviceWorker.register();
