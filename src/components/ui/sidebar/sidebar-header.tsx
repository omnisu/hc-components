import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../../lib/utils/styles";
import { useSidebar } from "./sidebar-provider";

interface Props extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

export function SidebarHeader({ className, children, ...props }: Props) {
	const { state } = useSidebar();

	return (
		<div
			data-slot="sidebar-header"
			className={cn(
				"flex flex-col gap-2 [.border-b]:border-sidebar-border",
				state === "collapsed" ? "items-center p-2.5" : "p-4",
				"in-data-[intent=inset]:p-4",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}
