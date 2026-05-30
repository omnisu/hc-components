import { useEffect, useState } from "react";

/**
 * Delays the updating of a value until a specified time has passed.
 * Useful for preventing excessive API calls or expensive operations during
 * rapid state changes (e.g., search inputs).
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
}
