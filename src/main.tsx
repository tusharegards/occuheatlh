import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; 
import "./index.css";
import App from "./App.tsx";

const HOME_PATH = "/";
const navigationEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
const isReload =
  navigationEntry?.type === "reload" ||
  (!navigationEntry && performance.navigation.type === 1);

if (isReload && window.location.pathname !== HOME_PATH) {
  window.location.replace(HOME_PATH);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>  
      <App />
    </BrowserRouter>
  </StrictMode>
);
