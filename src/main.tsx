import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./globals.css";
import { AppLayout } from "./components/app-layout/app-layout";
import { Button } from "./components/ui/button";
import { Dialog } from "./components/ui/dialog";
import { FullscreenDialog } from "./components/ui/fullscreen-dialog";
import ToastProvider, { toastManager } from "./components/ui/toast";
import { Tooltip } from "./components/ui/tooltip";

const root = document.getElementById("app");
if (!root) {
	throw new Error("Could not find app root");
}

createRoot(root).render(
	<StrictMode>
		<AppLayout>
			<div className="p-4 [&_h2]:text-lg [&_h2]:mb-1 [&_h2]:mt-4">
				<h2>Buttons</h2>
				<div className="p-4 flex gap-2 border rounded-lg flex-wrap">
					<Button variant="primary">Hello</Button>
					<Button variant="secondary">Hello</Button>
					<Button variant="outline">Hello</Button>
					<Button variant="ghost">Hello</Button>
					<Button variant="danger">Hello</Button>

					<Button size="lg">Hello</Button>
					<Button size="md">Hello</Button>
					<Button size="sm">Hello</Button>
					<Button size="icon">Hello</Button>
				</div>

				<h2>Dialogs</h2>
				<div className="p-4 flex gap-2 border rounded-lg flex-wrap">
					<Dialog>
						<Dialog.Trigger render={<Button>Many overlays</Button>} />
						<Dialog.Content>
							<Dialog.Header>
								<Dialog.Title>Hello</Dialog.Title>
							</Dialog.Header>

							<div className="p-4 flex flex-col gap-3 [&_button]:w-fit">
								<Tooltip>
									<Tooltip.Trigger render={<Button>Tooltip</Button>} />
									<Tooltip.Content>Yes, defenitely tooltip</Tooltip.Content>
								</Tooltip>

								<Button
									variant="secondary"
									onClick={() => toastManager.add({ title: "Hello", description: "I am toast" })}
								>
									Toast
								</Button>
							</div>

							<Dialog.Footer>
								<span>Footer or something</span>
							</Dialog.Footer>
						</Dialog.Content>
					</Dialog>

					<FullscreenDialog>
						<FullscreenDialog.Trigger render={<Button variant="secondary">Fullscreen</Button>} />
						<FullscreenDialog.Content>
							<FullscreenDialog.Header>
								<FullscreenDialog.Title>Fullscreen</FullscreenDialog.Title>
							</FullscreenDialog.Header>

							<div className="text-3xl">
								{Array.from({ length: 30 }).map((_, i) => (
									<h3 key={i}>Test-{i + 1}</h3>
								))}
							</div>

							<FullscreenDialog.Footer>
								<span>Footer or something</span>
							</FullscreenDialog.Footer>
						</FullscreenDialog.Content>
					</FullscreenDialog>

					<Button variant="danger">Nested</Button>
					<Button variant="outline">Sheet</Button>
				</div>

				<h2>Selects</h2>
				<div className="p-4 flex gap-2 border rounded-lg flex-wrap">
					<Button>Single</Button>
					<Button>Multiple</Button>
					<Button>Combobox</Button>
				</div>

				<h2>Tabs</h2>
				<div className="p-4 flex gap-2 border rounded-lg flex-wrap"></div>

				<h2>Switches</h2>
				<div className="p-4 flex gap-2 border rounded-lg flex-wrap">SS</div>
			</div>
		</AppLayout>
		<ToastProvider />
	</StrictMode>,
);
