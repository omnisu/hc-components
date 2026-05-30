import type { ReactNode } from "react";
import { cn } from "../../../lib/utils/styles";
import { Tooltip } from "../tooltip";
import { useSidebar } from "./sidebar-provider";

interface Props {
	isCurrent?: boolean;
	children: ReactNode;
	badge?: string | number;
	tooltip: string;
	isDisabled?: boolean;
}

export function SidebarItem(props: Props) {
	const { state } = useSidebar();

	const link = (
		<button
			type="button"
			data-slot="sidebar-item"
			disabled={props.isDisabled}
			aria-current={props.isCurrent ? "page" : undefined}
			className={cn(
				"w-full min-w-0 items-center rounded-lg p-2 text-start font-medium text-base/6 text-sidebar-fg has-[a]:p-0",
				"group/sidebar-item relative col-span-full overflow-hidden focus-visible:outline-hidden",
				"grid grid-cols-[auto_1fr_1.5rem_0.5rem_auto] supports-[grid-template-columns:subgrid]:grid-cols-subgrid sm:text-sm/5 **:last:[svg]:ms-auto",
				// icon
				"[&_svg:not([class*='size-'])]:size-5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground **:[svg]:shrink-0",
				"**:last:[svg]:size-5 sm:**:last:[svg]:size-4",
				"[&:has(svg+[data-slot=sidebar-label])_svg:has(+[data-slot=sidebar-label])]:me-2",

				// avatar
				"**:data-[slot=avatar]:[--avatar-size:--spacing(5)]",
				"[&:has([data-slot=avatar]+[data-slot=sidebar-label])_[data-slot=avatar]:has(+[data-slot=sidebar-label])]:me-2",
				"[--sidebar-current-bg:var(--color-sidebar-primary)] [--sidebar-current-fg:var(--color-sidebar-primary-fg)]",

				props.isCurrent &&
					"font-medium text-(--sidebar-current-fg) hover:bg-(--sidebar-current-bg) hover:text-(--sidebar-current-fg) [&_.text-muted-foreground]:text-foreground/80 [&_svg:not([class*='text-'])]:text-(--sidebar-current-fg) hover:[&_svg:not([class*='text-'])]:text-(--sidebar-current-fg)",
				"focus-visible:inset-ring focus-visible:inset-ring-sidebar-ring focus-visible:outline-hidden",

				"active:bg-sidebar-accent active:text-sidebar-accent-fg active:[&_svg:not([class*='text-'])]:text-sidebar-accent-fg",

				"hover:bg-sidebar-accent hover:text-sidebar-accent-fg hover:[&_svg:not([class*='text-'])]:text-sidebar-accent-fg",
				props.isDisabled && "opacity-50 pointer-events-none",
			)}
		>
			{props.children}

			{props.badge &&
				(state !== "collapsed" ? (
					<span
						data-slot="sidebar-badge"
						className="absolute inset-ring-1 inset-ring-sidebar-border inset-y-1/2 inset-e-1.5 h-5.5 w-auto -translate-y-1/2 rounded-full bg-foreground/5 px-2 text-[10px]/5.5 group-hover/sidebar-item:inset-ring-muted-foreground/30 group-current:inset-ring-transparent"
					>
						{props.badge}
					</span>
				) : (
					<div aria-hidden className="absolute inset-e-1 top-1 size-1.5 rounded-full bg-primary" />
				))}
		</button>
	);

	// Показываем тултип только в collapsed состоянии или если кнопка disabled
	const showTooltip = state === "collapsed" || props.isDisabled;

	if (!showTooltip) {
		return link;
	}

	// Для Base UI оборачиваем кнопку в Trigger
	return (
		<Tooltip delay={0}>
			<Tooltip.Trigger className="contents">{link}</Tooltip.Trigger>
			<Tooltip.Content className="**:data-[slot=sidebar-label-mask]:hidden **:[svg]:hidden" inverse>
				{props.tooltip}
			</Tooltip.Content>
		</Tooltip>
	);
}
