import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MockupSelector from "./Mockups";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MockupSelector />
  </StrictMode>
);
