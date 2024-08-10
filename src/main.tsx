import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HomePage } from "./pages";
import "./index.css";

// React.StrictMode triggers an additional render in development mode to help detect unintended side effects.
// In production, this behavior is disabled, and components are rendered only once.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HomePage />
  </StrictMode>
);
