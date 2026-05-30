import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../../lib/utils/styles";
import { useSidebar } from "./sidebar-provider";

interface Props extends HTMLAttributes<HTMLDivElement> {
	label?: string;
	children: ReactNode;
}

export function SidebarSection({ label, className, children, ...props }: Props) {
	const { state } = useSidebar();
	const collapsed = state === "collapsed";

	return (
		<div
			data-slot="sidebar-section"
			data-state={state}
			className={cn(
				"col-span-full flex min-w-0 flex-col gap-y-0.5 **:data-[slot=sidebar-section]:**:gap-y-0",
				collapsed ? "p-2" : "p-4",
				className,
			)}
			{...props}
		>
			{!collapsed && label && (
				<span className="mb-1 flex shrink-0 items-center rounded-md px-2 text-sidebar-foreground/70 text-xs/6 outline-none ring-sidebar-ring transition-[margin,opa] duration-200 ease-linear group-data-[collapsible=dock]:-mt-8 group-data-[collapsible=dock]:opacity-0 *:[svg]:size-4 *:[svg]:shrink-0">
					{label}
				</span>
			)}
			<div
				data-slot="sidebar-section-inner"
				className={cn(
					"grid grid-cols-[auto_1fr] gap-y-0.5",
					collapsed && "gap-y-1.5",
					"*:data-[slot=control]:col-span-full",
				)}
			>
				{children}
			</div>
		</div>
	);
}
