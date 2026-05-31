import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";
import { cn } from "../../../lib/utils/styles";
import { Button } from "../button";

export function Dialog({ ...props }: DialogPrimitive.Root.Props) {
	return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
	return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
	return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
	return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({ className, ...props }: DialogPrimitive.Backdrop.Props) {
	return (
		<DialogPrimitive.Backdrop
			data-slot="dialog-overlay"
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

function DialogContent({
	className,
	children,
	showCloseButton = true,
	...props
}: DialogPrimitive.Popup.Props & {
	showCloseButton?: boolean;
}) {
	return (
		<DialogPortal>
			<DialogOverlay />
			<DialogPrimitive.Popup
				data-slot="dialog-content"
				className={cn(
					"fixed top-8 left-1/2 z-50 flex w-full max-w-[calc(100%-2rem)] -translate-x-1/2 flex-col rounded-xl bg-popover text-sm text-popover-foreground ring-1 ring-foreground/10 outline-none sm:max-w-132",
					"max-h-[calc(100vh-4rem)]",
					"duration-200 ease-out",
					"data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-open:slide-in-from-top-4",
					"data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-closed:slide-out-to-top-4",
					/* Mobile fullscreen overrides */
					"max-sm:!fixed max-sm:!inset-0 max-sm:!top-0 max-sm:!left-0 max-sm:!right-0 max-sm:!bottom-0 max-sm:translate-x-0",
					"max-sm:!w-full max-sm:!max-w-none max-sm:!transform-none",
					"max-sm:!rounded-none max-sm:!max-h-none",
					"max-sm:!m-0 max-sm:!p-0",
					className,
				)}
				{...props}
			>
				{showCloseButton && (
					<DialogPrimitive.Close
						data-slot="dialog-close"
						className="absolute top-2 right-2 z-20 max-sm:top-4 max-sm:right-4"
						render={
							<Button variant="ghost" size="icon-sm">
								<XIcon />
								<span className="sr-only">Close</span>
							</Button>
						}
					/>
				)}
				<div className="flex flex-1 flex-col overflow-y-auto rounded-xl max-sm:rounded-none">
					{children}
				</div>
			</DialogPrimitive.Popup>
		</DialogPortal>
	);
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="dialog-header"
			className={cn(
				"sticky top-0 z-10 flex flex-col gap-2 border-b bg-popover px-4 pt-4 pb-3",
				"max-sm:px-6 max-sm:pt-6 max-sm:pb-4",
				className,
			)}
			{...props}
		/>
	);
}

function DialogFooter({
	className,
	showCloseButton = false,
	children,
	...props
}: React.ComponentProps<"div"> & {
	showCloseButton?: boolean;
}) {
	return (
		<div
			data-slot="dialog-footer"
			className={cn(
				"sticky bottom-0 z-10 flex flex-col-reverse gap-2 border-t bg-surface p-4",
				"sm:flex-row sm:justify-end",
				"max-sm:p-6",
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

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
	return (
		<DialogPrimitive.Title
			data-slot="dialog-title"
			className={cn("cn-font-heading text-base leading-none font-medium", className)}
			{...props}
		/>
	);
}

function DialogDescription({ className, ...props }: DialogPrimitive.Description.Props) {
	return (
		<DialogPrimitive.Description
			data-slot="dialog-description"
			className={cn(
				"text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
				className,
			)}
			{...props}
		/>
	);
}

Dialog.Trigger = DialogTrigger;
Dialog.Content = DialogContent;
Dialog.Close = DialogClose;
Dialog.Header = DialogHeader;
Dialog.Footer = DialogFooter;
Dialog.Title = DialogTitle;
Dialog.Description = DialogDescription;
