import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MockupC } from "./Mockups";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MockupC />
  </StrictMode>
);
