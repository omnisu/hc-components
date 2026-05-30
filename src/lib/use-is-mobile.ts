import { useSyncExternalStore } from "react";

const query = window.matchMedia("(max-width: 768px)");

function subscribe(callback: () => void) {
	query.addEventListener("change", callback);
	return () => query.removeEventListener("change", callback);
}

function getSnapshot() {
	return query.matches;
}

function getServerSnapshot() {
	return false;
}

export function useIsMobile(): boolean {
	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
