import { Button as ButtonPrimitive } from "@base-ui/react";
import type { VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { buttonStyles } from "./styles";

export interface ButtonProps extends VariantProps<typeof buttonStyles> {
	className?: string;
	children: ReactNode;
	disabled?: boolean;
	onClick?: () => void;
}

export function Button(props: ButtonProps) {
	return (
		<ButtonPrimitive
			className={buttonStyles({
				variant: props.variant,
				size: props.size,
				isCircle: props.isCircle,
				className: props.className,
			})}
			disabled={props.disabled}
			onClick={props.onClick}
			{...props}
		>
			{props.children}
		</ButtonPrimitive>
	);
}
