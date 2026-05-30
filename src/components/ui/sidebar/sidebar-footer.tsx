import type { ReactNode } from "react";
import { cn } from "../../../lib/utils/styles";

interface Props {
	children: ReactNode;
	className?: string;
}

export function SidebarFooter(props: Props) {
	return (
		<div
			data-slot="sidebar-footer"
			className={cn(
				"mt-auto flex shrink-0 items-center justify-center p-4 **:data-[slot=chevron]:text-muted-foreground",
				"in-data-[intent=inset]:px-6 in-data-[intent=inset]:py-4",
				props.className,
			)}
		>
			{props.children}
		</div>
	);
}
