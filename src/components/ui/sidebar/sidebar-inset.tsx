import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../../lib/utils/styles";

interface Props extends HTMLAttributes<HTMLElement> {
	children: ReactNode;
}

export function SidebarInset({ className, children, ...props }: Props) {
	return (
		<main
			data-slot="sidebar-inset"
			className={cn(
				"relative flex w-full flex-1 flex-col bg-background lg:min-w-0",
				"group-has-data-[intent=inset]/sidebar-root:border group-has-data-[intent=inset]/sidebar-root:border-border group-has-data-[intent=inset]/sidebar-root:bg-muted",
				"md:group-has-data-[intent=inset]/sidebar-root:m-2",
				"md:group-has-data-[side=left]:group-has-data-[intent=inset]/sidebar-root:ms-0",
				"md:group-has-data-[side=right]:group-has-data-[intent=inset]/sidebar-root:me-0",
				"md:group-has-data-[intent=inset]/sidebar-root:rounded-2xl",
				"md:group-has-data-[intent=inset]/sidebar-root:peer-data-[state=collapsed]:ms-2",
				className,
			)}
			{...props}
		>
			{children}
		</main>
	);
}
