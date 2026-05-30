import { type SetStateAction, useCallback, useEffect, useState } from "react";
import * as v from "valibot";

// biome-ignore lint/suspicious/noExplicitAny: Valid use
interface Params<S extends v.BaseSchema<any, any, any>> {
	/** The key for value to store in storage. */
	key: string;
	/** Valibot schema to validate the stored state. */
	schema: S;
	/** Default value of the state. */
	defaultValue: v.InferOutput<S>;
	/** Binded storage. LocalStorage by default. */
	storage?: Storage;
}

/**
 * Allows to use state that is binded to some storage by some key.
 * It listens for storage events, so state will be updated across the tabs,
 * but **remember that `sessionStorage` events are never shared across tabs**.
 *
 * @example
 * // Simple value
 * const themeSchema = s.picklist(['dark', 'light', 'system'])
 * const [theme, setTheme] = useStoredState({
 *    key: 'app-theme',
 *    schema: themeSchema,
 *    defaultValue: 'system',
 * })
 * console.log(theme) // Completely typed, validated & reactive ✅
 *
 * // Object
 * const authSchema = s.object({ token: s.string(2, 512), expiresAt: s.date() })
 * const [auth, setAuth] = useStoredState({
 *    key: 'auth-data',
 *    schema: authSchema,
 *    defaultValue: { token: 'some-auth-token', expiresAt: new Date() },
 *    storage: sessionStorage,
 * })
 * console.log(auth) // Completely typed, validated & reactive ✅
 */
// biome-ignore lint/suspicious/noExplicitAny: Valid use
export function useStoredState<S extends v.BaseSchema<any, any, any>>({
	key,
	schema,
	defaultValue,
	storage = localStorage,
}: Params<S>) {
	// Reads stored state from storage and validates it. Returns defaultValue in case of error.
	const readValue = useCallback(() => {
		try {
			const item = storage.getItem(key);
			if (item === null) {
				return defaultValue;
			}

			const result = v.safeParse(schema, JSON.parse(item));
			return result.success ? result.output : defaultValue;
		} catch {
			return defaultValue;
		}
	}, [key, schema, defaultValue, storage]);

	const [state, setState] = useState(readValue);

	// Handle the integrity by listening storage events
	useEffect(() => {
		function onStorageChange(e: StorageEvent) {
			if (e.key === key && e.storageArea === storage) {
				setState(readValue());
			}
		}
		window.addEventListener("storage", onStorageChange);
		return () => window.removeEventListener("storage", onStorageChange);
	}, [key, storage, readValue]);

	// Whites new value to local storage and causes state change
	function writeValue(valueOrUpdater: SetStateAction<v.InferOutput<S>>) {
		setState((prev) => {
			const next = valueOrUpdater instanceof Function ? valueOrUpdater(prev) : valueOrUpdater;
			storage.setItem(key, JSON.stringify(next));
			return next;
		});
	}

	return [state, writeValue] as const;
}
