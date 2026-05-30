import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import * as v from "valibot";
import { useIsMobile } from "../../../lib/use-is-mobile";
import { useStoredState } from "../../../lib/use-stored-state";
import { cn } from "../../../lib/utils/styles";

interface SidebarContextProps {
	state: "expanded" | "collapsed";
	open: boolean;
	setOpen: (open: boolean) => void;
	isOpenOnMobile: boolean;
	setIsOpenOnMobile: (open: boolean) => void;
	isMobile: boolean;
	toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextProps | null>(null);

export function useSidebar() {
	const ctx = useContext(SidebarContext);
	if (!ctx) {
		throw new Error("useSidebar must be used within SidebarProvider");
	}
	return ctx;
}

interface SidebarProviderProps {
	defaultOpen?: boolean;
	shortcut?: string;
	isOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	children: ReactNode;
}

export function SidebarProvider(props: SidebarProviderProps) {
	const [openMobile, setOpenMobile] = useState(false);

	const [internalOpenState, setInternalOpenState] = useStoredState({
		key: "app-sidebar-open",
		schema: v.boolean(),
		defaultValue: props.defaultOpen ?? true,
	});

	const open = props.isOpen ?? internalOpenState;

	const setOpen = useCallback(
		(val: boolean | ((val: boolean) => boolean)) => {
			const openState = typeof val === "function" ? val(open) : val;
			if (props.onOpenChange) {
				props.onOpenChange(openState);
			} else {
				setInternalOpenState(openState);
			}
		},
		[props.onOpenChange, open, setInternalOpenState],
	);

	const isMobile = useIsMobile();
	const isMobileRef = useRef(isMobile);

	useEffect(() => {
		isMobileRef.current = isMobile;
	}, [isMobile]);

	const toggleSidebar = useCallback(() => {
		if (isMobileRef.current) {
			setOpenMobile((prev) => !prev);
		} else {
			setOpen((prev) => !prev);
		}
	}, [setOpen]);

	useEffect(() => {
		const shortcut = props.shortcut || "b";

		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === shortcut && (event.metaKey || event.ctrlKey)) {
				const activeElement = document.activeElement;

				const isInTextInput =
					activeElement instanceof HTMLInputElement ||
					activeElement instanceof HTMLTextAreaElement ||
					activeElement?.getAttribute("contenteditable") === "true" ||
					activeElement?.getAttribute("role") === "textbox";

				if (!isInTextInput) {
					event.preventDefault();
					toggleSidebar();
				}
			}
		}

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [toggleSidebar, props.shortcut]);

	const state = open ? "expanded" : "collapsed";

	const contextValue = useMemo<SidebarContextProps>(
		() => ({
			state,
			open,
			setOpen,
			isMobile: isMobile ?? false,
			isOpenOnMobile: openMobile,
			setIsOpenOnMobile: setOpenMobile,
			toggleSidebar,
		}),
		[state, open, setOpen, isMobile, openMobile, toggleSidebar],
	);

	return (
		<SidebarContext.Provider value={contextValue}>
			<div
				style={
					{ "--sidebar-width": "17rem", "--sidebar-width-dock": "3.25rem" } as React.CSSProperties
				}
				className={cn(
					"@container **:[svg]:shrink-0",
					"flex w-full text-sidebar-foreground",
					"group/sidebar-root peer/sidebar-root has-data-[intent=inset]:bg-sidebar dark:has-data-[intent=inset]:bg-background",
				)}
			>
				{props.children}
			</div>
		</SidebarContext.Provider>
	);
}
