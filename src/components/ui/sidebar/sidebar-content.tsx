import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "../../../lib/utils/styles";
import { useSidebar } from "./sidebar-provider";

interface Props {
	children: ReactNode;
}

export function SidebarContent(props: Props) {
	const { state } = useSidebar();
	const [isAtBottom, setIsAtBottom] = useState(false);
	const [isAtTop, setIsAtTop] = useState(true);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const check = () => {
			const atBottom = Math.abs(el.scrollHeight - el.scrollTop - el.clientHeight) < 1;
			const atTop = el.scrollTop === 0;
			setIsAtBottom(atBottom);
			setIsAtTop(atTop);
		};

		check();
		el.addEventListener("scroll", check, { passive: true });

		const observer = new ResizeObserver(check);
		observer.observe(el);

		return () => {
			el.removeEventListener("scroll", check);
			observer.disconnect();
		};
	}, []);

	return (
		<div
			ref={ref}
			data-slot="sidebar-content"
			className={cn(
				"flex min-h-0 flex-1 scroll-mb-96 flex-col overflow-auto *:data-[slot=sidebar-section]:border-l-0",
				state === "collapsed" && "items-center",
				state !== "collapsed" &&
					!isAtBottom &&
					"mask-[linear-gradient(to_top,transparent,black_10%)]",
				state !== "collapsed" &&
					!isAtTop &&
					"mask-[linear-gradient(to_bottom,transparent,black_10%)]",
				state !== "collapsed" &&
					!isAtTop &&
					!isAtBottom &&
					"mask-[linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]",
			)}
		>
			{props.children}
		</div>
	);
}
