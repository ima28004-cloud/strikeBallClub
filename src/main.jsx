import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { startAnalytics } from "./analytics.js";
import "./styles.css";

createRoot(document.getElementById("root")).render(<App />);
startAnalytics();
