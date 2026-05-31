import { cva, type VariantProps } from "class-variance-authority";

/*

class="relative isolate inline-flex items-center justify-center gap-x-2 shrink-0 outline-0 outline-offset-2 focus-visible:outline-2 inset-ring inset-ring-fg/20 bg-(--btn-bg) text-(--btn-fg) shadow-[inset_0_2px_--theme(--color-white/15%)] dark:inset-ring-fg/15 dark:shadow-none cursor-pointer hover:no-underline font-medium dark:[--btn-overlay:color-mix(in_oklab,var(--btn-bg)_100%,black_10%)] disabled:inactive disabled:cursor-not-allowed pending:inactive pending:cursor-default pressed:translate-y-px pressed:bg-(--btn-overlay) hover:bg-(--btn-overlay) *:icon:-mx-0.5 *:icon:my-1 *:icon:size-4 *:icon:shrink-0 *:icon:text-current/70 pressed:*:icon:text-current *:icon:transition hover:*:icon:text-current/90 *:data-[slot=avatar]:-mx-0.5 *:data-[slot=avatar]:my-1 *:data-[slot=avatar]:*:size-4 *:data-[slot=avatar]:size-4 *:data-[slot=avatar]:shrink-0 outline-primary [--btn-bg:theme(--color-primary/95%)] [--btn-fg:var(--color-primary-fg)] [--btn-overlay:var(--color-primary)] h-10 px-4 text-sm/6 rounded-lg mt-5"

*/

export const buttonStyles = cva(
	[
		"focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
		"disabled:opacity-50 disabled:pointer-events-none",

		// Base styles
		"inline-flex items-center justify-center font-medium cursor-pointer",

		// Colors
		"transition-colors",

		// Borders
		"inset-ring inset-ring-fg/20",

		// Pressed state
		"active:translate-y-px",
	],
	{
		variants: {
			variant: {
				primary:
					"bg-primary text-white hover:bg-[color-mix(in_oklab,var(--primary)_100%,black_10%)]",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklab,var(--secondary)_100%,black_10%)]",

				outline:
					"bg-transparent text-secondary-foreground hover:bg-[color-mix(in_oklab,var(--secondary)_100%,black_10%)]",

				ghost:
					"bg-transparent text-secondary-foreground hover:bg-[color-mix(in_oklab,var(--secondary)_100%,black_10%)] inset-ring-0",

				danger:
					"bg-danger text-danger-fg hover:bg-[color-mix(in_oklab,var(--danger)_100%,black_10%)]",
			},
			size: {
				sm: "h-9 px-4 text-sm rounded-lg gap-2",
				md: "h-10 px-5 text-base rounded-lg gap-2",
				lg: "h-11 px-6 text-lg rounded-lg gap-2",
				icon: "size-10 rounded-lg p-0",
				"icon-sm": "size-9 rounded-lg p-0",
			},
			isCircle: {
				true: "rounded-full",
				false: "",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "md",
			isCircle: false,
		},
	},
);

export type ButtonStylesProps = VariantProps<typeof buttonStyles>;
