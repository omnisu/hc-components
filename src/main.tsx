import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./globals.css";

const root = document.getElementById("app");
if (!root) {
	throw new Error("Could not find app root");
}

createRoot(root).render(
	<StrictMode>
		<span>Test</span>
	</StrictMode>,
);
