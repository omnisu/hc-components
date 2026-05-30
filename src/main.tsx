import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./globals.css";
import { AppLayout } from "./components/app-layout/app-layout";

const root = document.getElementById("app");
if (!root) {
	throw new Error("Could not find app root");
}

createRoot(root).render(
	<StrictMode>
		<AppLayout>
			<span>Test</span>
		</AppLayout>
	</StrictMode>,
);
