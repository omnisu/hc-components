import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";
import { cn } from "../../../lib/utils/styles";
import { Button } from "../button";

export function FullscreenDialog({ ...props }: DialogPrimitive.Root.Props) {
	return <DialogPrimitive.Root data-slot="fullscreen-dialog" {...props} />;
}

function FullscreenDialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
	return <DialogPrimitive.Trigger data-slot="fullscreen-dialog-trigger" {...props} />;
}

function FullscreenDialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
	return <DialogPrimitive.Portal data-slot="fullscreen-dialog-portal" {...props} />;
}

function FullscreenDialogClose({ ...props }: DialogPrimitive.Close.Props) {
	return <DialogPrimitive.Close data-slot="fullscreen-dialog-close" {...props} />;
}

function FullscreenDialogOverlay({ className, ...props }: DialogPrimitive.Backdrop.Props) {
	return (
		<DialogPrimitive.Backdrop
			data-slot="fullscreen-dialog-overlay"
			className={cn(
				"fixed inset-0 isolate z-50 bg-black/10 duration-200 supports-backdrop-filter:backdrop-blur-xs",
				"data-open:animate-in data-open:fade-in-0",
				"data-closed:animate-out data-closed:fade-out-0",
				className,
			)}
			{...props}
		/>
	);
}

function FullscreenDialogContent({
	className,
	children,
	showCloseButton = true,
	...props
}: DialogPrimitive.Popup.Props & {
	showCloseButton?: boolean;
}) {
	return (
		<FullscreenDialogPortal>
			<FullscreenDialogOverlay />
			<DialogPrimitive.Popup
				data-slot="fullscreen-dialog-content"
				className={cn(
					"fixed inset-0 z-50 flex flex-col bg-popover text-sm text-popover-foreground outline-none",
					"duration-200 ease-out",
					"data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-bottom-4",
					"data-closed:animate-out data-closed:fade-out-0 data-closed:slide-out-to-bottom-4",
					className,
				)}
				{...props}
			>
				{showCloseButton && (
					<DialogPrimitive.Close
						data-slot="fullscreen-dialog-close"
						className="absolute top-4 right-4 z-20"
						render={
							<Button variant="ghost" size="icon-sm">
								<XIcon />
								<span className="sr-only">Close</span>
							</Button>
						}
					/>
				)}
				<div className="flex flex-1 flex-col overflow-y-auto">{children}</div>
			</DialogPrimitive.Popup>
		</FullscreenDialogPortal>
	);
}

function FullscreenDialogHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="fullscreen-dialog-header"
			className={cn(
				"sticky top-0 z-10 flex flex-col gap-2 border-b bg-popover px-6 pt-6 pb-4",
				className,
			)}
			{...props}
		/>
	);
}

function FullscreenDialogFooter({
	className,
	showCloseButton = false,
	children,
	...props
}: React.ComponentProps<"div"> & {
	showCloseButton?: boolean;
}) {
	return (
		<div
			data-slot="fullscreen-dialog-footer"
			className={cn(
				"sticky bottom-0 z-10 flex flex-col-reverse gap-2 border-t bg-surface p-6",
				"flex-row justify-end",
				className,
			)}
			{...props}
		>
			{children}
			{showCloseButton && (
				<DialogPrimitive.Close render={<Button variant="outline">Close</Button>} />
			)}
		</div>
	);
}

function FullscreenDialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
	return (
		<DialogPrimitive.Title
			data-slot="fullscreen-dialog-title"
			className={cn("cn-font-heading text-lg leading-none font-semibold", className)}
			{...props}
		/>
	);
}

function FullscreenDialogDescription({ className, ...props }: DialogPrimitive.Description.Props) {
	return (
		<DialogPrimitive.Description
			data-slot="fullscreen-dialog-description"
			className={cn(
				"text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
				className,
			)}
			{...props}
		/>
	);
}

FullscreenDialog.Trigger = FullscreenDialogTrigger;
FullscreenDialog.Content = FullscreenDialogContent;
FullscreenDialog.Close = FullscreenDialogClose;
FullscreenDialog.Header = FullscreenDialogHeader;
FullscreenDialog.Footer = FullscreenDialogFooter;
FullscreenDialog.Title = FullscreenDialogTitle;
FullscreenDialog.Description = FullscreenDialogDescription;
