import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SnackbarProvider } from "notistack";

createRoot(document.getElementById("root")).render(
  <SnackbarProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </SnackbarProvider>
);
