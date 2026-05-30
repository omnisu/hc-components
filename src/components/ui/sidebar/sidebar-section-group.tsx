import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../../lib/utils/styles";
import { useSidebar } from "./sidebar-provider";

interface Props extends HTMLAttributes<HTMLElement> {
	children: ReactNode;
}

export function SidebarSectionGroup({ className, children, ...props }: Props) {
	const { state, isMobile } = useSidebar();
	const collapsed = state === "collapsed" && !isMobile;

	return (
		<section
			data-slot="sidebar-section-group"
			className={cn(
				"flex w-full min-w-0 flex-col gap-y-0.5",
				collapsed && "items-center justify-center",
				className,
			)}
			{...props}
		>
			{children}
		</section>
	);
}
