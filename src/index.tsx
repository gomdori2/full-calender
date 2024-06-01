import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import ReactSpinner from "./components/ReactSpinner";
import ReactCalendar from "./components/ReactCalendar";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/rc" element={<ReactCalendar />}></Route>
      <Route path="/reactSpinner" element={<ReactSpinner />}></Route>
    </Routes>
  </BrowserRouter>
);
