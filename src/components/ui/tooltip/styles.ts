import { cva } from "class-variance-authority";

export const tooltipStyles = cva(
	[
		"group max-w-sm rounded-lg border border-(--tooltip-border) px-2.5 py-1.5 text-sm/6 will-change-transform [--tooltip-border:var(--color-muted-fg)]/30 dark:shadow-none *:[strong]:font-medium",

		// Opening animation
		"data-[open]:animate-in data-[open]:fade-in",
		"data-[open]:data-[side=left]:slide-in-from-right-1",
		"data-[open]:data-[side=right]:slide-in-from-left-1",
		"data-[open]:data-[side=top]:slide-in-from-bottom-1",
		"data-[open]:data-[side=bottom]:slide-in-from-top-1",

		// Closing animation
		"data-[closed]:animate-in data-[closed]:fade-in data-[closed]:direction-reverse",
		"data-[closed]:data-[side=left]:slide-out-to-right-1",
		"data-[closed]:data-[side=right]:slide-out-to-left-1",
		"data-[closed]:data-[side=top]:slide-out-to-bottom-1",
		"data-[closed]:data-[side=bottom]:slide-out-to-top-1",
	],
	{
		variants: {
			inverse: {
				true: "border-transparent bg-fg text-bg *:[.text-muted-fg]:text-bg/60",
				false: "bg-overlay text-overlay-fg",
			},
		},
		defaultVariants: {
			inverse: false,
		},
	},
);
