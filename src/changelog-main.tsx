import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Changelog from "./Changelog";
import "./styles.css";
import "./hover.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode><Changelog /></StrictMode>,
);
