import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../../lib/utils/styles";
import { useSidebar } from "./sidebar-provider";

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
	closeButton?: boolean;
	children: ReactNode;
}

export function Sidebar({ closeButton = true, className, children, ...props }: SidebarProps) {
	const { isMobile, state, isOpenOnMobile, setIsOpenOnMobile } = useSidebar();

	if (isMobile) {
		return (
			<>
				{/* Mobile overlay */}
				{isOpenOnMobile && (
					// biome-ignore lint/a11y/noStaticElementInteractions: Noop
					// biome-ignore lint/a11y/useKeyWithClickEvents: Noop
					<div
						className="fixed inset-0 z-50 bg-background/80"
						onClick={() => setIsOpenOnMobile(false)}
					/>
				)}

				{/* Mobile sidebar */}
				<div
					data-slot="sidebar-mobile"
					data-state={isOpenOnMobile ? "open" : "closed"}
					className={cn(
						"fixed inset-y-0 left-0 z-50 w-(--sidebar-width) transform bg-sidebar transition-transform duration-200 ease-linear md:hidden",
						isOpenOnMobile ? "translate-x-0" : "-translate-x-full",
						"border-sidebar-border border-r",
						className,
					)}
					{...props}
				>
					<div className="flex h-full w-full flex-col">
						{closeButton && (
							<button
								type="button"
								onClick={() => setIsOpenOnMobile(false)}
								className="absolute right-2 top-2 rounded-lg p-2 hover:bg-sidebar-accent"
								aria-label="Close sidebar"
							>
								{/** biome-ignore lint/a11y/noSvgWithoutTitle: Noop */}
								<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
									<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
								</svg>
							</button>
						)}
						{children}
					</div>
				</div>
			</>
		);
	}

	return (
		<div
			data-state={state}
			data-slot="sidebar"
			className={cn("group peer hidden text-sidebar-foreground md:block", className)}
			{...props}
		>
			{/* Gap for layout spacing */}
			<div
				data-slot="sidebar-gap"
				aria-hidden="true"
				className={cn(
					"w-(--sidebar-width)",
					"relative h-svh bg-transparent transition-[width] duration-200 ease-linear",
					"group-data-[collapsible=dock]:w-(--sidebar-width-dock)",
				)}
			/>

			{/* Actual sidebar container */}
			<div
				data-slot="sidebar-container"
				className={cn(
					"fixed inset-y-0 z-10 hidden w-(--sidebar-width) bg-sidebar not-has-data-[slot=sidebar-footer]:pb-2 md:flex",
					"transition-[left,right,width] duration-200 ease-linear",
					"left-0",
					"group-data-[collapsible=dock]:w-(--sidebar-width-dock)",
					"border-sidebar-border border-r",
				)}
			>
				<div
					data-sidebar="default"
					data-slot="sidebar-inner"
					className={cn(
						"flex h-full w-full flex-col text-sidebar-foreground",
						"group-data-[intent=float]:rounded-lg group-data-[intent=float]:border group-data-[intent=float]:border-sidebar-border group-data-[intent=float]:bg-sidebar group-data-[intent=float]:shadow-xs",
					)}
				>
					{children}
				</div>
			</div>
		</div>
	);
}
