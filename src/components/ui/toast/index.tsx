import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import { XIcon } from "lucide-react";
import { cn } from "../../../lib/utils/styles";

export const toastManager = ToastPrimitive.createToastManager();

export default function ToastProvider() {
	return (
		<ToastPrimitive.Provider toastManager={toastManager}>
			<ToastPrimitive.Portal>
				<ToastPrimitive.Viewport className="fixed bottom-4 left-1/2 z-200 mx-auto flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 flex-col items-center gap-2 sm:bottom-6">
					<ToastList />
				</ToastPrimitive.Viewport>
			</ToastPrimitive.Portal>
		</ToastPrimitive.Provider>
	);
}
function ToastList() {
	const { toasts } = ToastPrimitive.useToastManager();

	return toasts.map((toast) => (
		<ToastPrimitive.Root
			key={toast.id}
			toast={toast}
			swipeDirection="down"
			className={cn(
				"[--gap:0.75rem] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.05)))] [--shrink:calc(1-var(--scale))] [--height:var(--toast-frontmost-height,var(--toast-height))]",
				"[--offset-y:calc(var(--toast-offset-y)+(var(--toast-index)*var(--gap)))]",

				"absolute right-0 bottom-0 left-0 z-[calc(1000-var(--toast-index))] mx-auto max-w-md origin-bottom",

				"transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))))_scale(var(--scale))]",

				"rounded-lg border border-border bg-popover p-4 shadow-lg",

				"after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",

				"data-ending-style:opacity-0",
				"data-limited:opacity-0",

				"data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(-1*var(--offset-y)+var(--toast-swipe-movement-y)))_scale(1)]",

				"data-starting-style:transform-[translateY(calc(100%+var(--gap)))]",
				"[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:transform-[translateY(calc(100%+var(--gap)))]",

				"data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+100%))]",
				"data-expanded:data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+100%))]",
				"data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-110%))_translateY(calc(-1*var(--offset-y)))]",
				"data-expanded:data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-110%))_translateY(calc(-1*var(--offset-y)))]",
				"data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+110%))_translateY(calc(-1*var(--offset-y)))]",
				"data-expanded:data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+110%))_translateY(calc(-1*var(--offset-y)))]",

				"h-(--height) data-expanded:h-(--toast-height)",
				"[transition:transform_0.4s_cubic-bezier(0.25,1,0.5,1),opacity_0.4s,height_0.2s]",
				"select-none",
			)}
		>
			<ToastPrimitive.Content
				className={cn(
					"overflow-hidden transition-opacity duration-200",
					"data-behind:pointer-events-none data-behind:opacity-0",
					"data-expanded:pointer-events-auto data-expanded:opacity-100",
				)}
			>
				<ToastPrimitive.Title className="text-sm font-medium text-foreground" />
				<ToastPrimitive.Description className="text-sm text-muted-foreground" />
				<ToastPrimitive.Close
					className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-sm cursor-pointer border-none bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
					aria-label="Close"
				>
					<XIcon className="h-4 w-4" />
				</ToastPrimitive.Close>
			</ToastPrimitive.Content>
		</ToastPrimitive.Root>
	));
}
