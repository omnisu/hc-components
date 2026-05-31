import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactElement, ReactNode } from "react";
import { cn } from "../../../lib/utils/styles";

const tooltipStyles = cva(
	[
		"relative z-100 flex flex-col rounded-lg border border-border px-2.5 py-1.5 text-sm/6 will-change-transform dark:shadow-none *:[strong]:font-medium",
		"bg-popover text-foreground",
		"data-open:animate-in data-open:fade-in",
		"data-open:data-[side=left]:slide-in-from-right-1",
		"data-open:data-[side=right]:slide-in-from-left-1",
		"data-open:data-[side=top]:slide-in-from-bottom-1",
		"data-open:data-[side=bottom]:slide-in-from-top-1",
		"data-closed:animate-in data-closed:fade-in data-closed:direction-reverse",
		"data-closed:data-[side=left]:slide-out-to-right-1",
		"data-closed:data-[side=right]:slide-out-to-left-1",
		"data-closed:data-[side=top]:slide-out-to-bottom-1",
		"data-closed:data-[side=bottom]:slide-out-to-top-1",
	],
	{
		variants: {
			inverse: {
				true: "border-transparent bg-foreground text-background *:[.text-muted-foreground]:text-background/60",
				false: "bg-popover text-foreground",
			},
		},
		defaultVariants: {
			inverse: false,
		},
	},
);

interface TooltipProps {
	children: ReactNode;
	delay?: number;
}

export function Tooltip(props: TooltipProps) {
	return <TooltipPrimitive.Root>{props.children}</TooltipPrimitive.Root>;
}

interface TooltipContentProps extends VariantProps<typeof tooltipStyles> {
	sideOffset?: number;
	className?: string;
	children: ReactNode;
}

function TooltipContent({ sideOffset = 8, inverse, className, children }: TooltipContentProps) {
	return (
		<TooltipPrimitive.Portal>
			<TooltipPrimitive.Positioner sideOffset={sideOffset} className="z-100">
				<TooltipPrimitive.Popup className={tooltipStyles({ inverse, className })}>
					<TooltipPrimitive.Arrow
						className={cn(
							"relative block w-3 h-1.5 overflow-clip",
							"data-[side=bottom]:-top-1.5",
							"data-[side=left]:-right-2.25 data-[side=left]:rotate-90",
							"data-[side=right]:-left-2.25 data-[side=right]:-rotate-90",
							"data-[side=top]:-bottom-1.5 data-[side=top]:rotate-180",
							"before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:w-[calc(6px*sqrt(2))] before:h-[calc(6px*sqrt(2))]",
							"before:transform-[translate(-50%,50%)_rotate(45deg)]",
							inverse
								? "before:bg-foreground before:border-foreground"
								: "before:bg-popover before:border-border",
							"before:border",
						)}
					/>
					{children}
				</TooltipPrimitive.Popup>
			</TooltipPrimitive.Positioner>
		</TooltipPrimitive.Portal>
	);
}

interface TooltipTriggerProps {
	render?: ReactElement | (() => ReactElement);
	children?: ReactNode;
	className?: string;
}

function TooltipTrigger(props: TooltipTriggerProps) {
	return (
		<TooltipPrimitive.Trigger render={props.render} className={props.className}>
			{props.children}
		</TooltipPrimitive.Trigger>
	);
}

Tooltip.Trigger = TooltipTrigger;
Tooltip.Content = TooltipContent;
