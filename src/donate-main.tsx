import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Donate from "./Donate";
import "./styles.css";
import "./hover.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode><Donate /></StrictMode>,
);
