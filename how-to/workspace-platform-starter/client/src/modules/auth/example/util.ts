import { isEmpty } from "../../../framework/utils";
import type { ExampleUser } from "./shapes";

export const EXAMPLE_AUTH_CURRENT_USER_KEY = `${fin.me.identity.uuid}-EXAMPLE_AUTH_CURRENT_USER`;

/**
 * Get the current user from storage.
 * @returns The current user.
 */
export function getCurrentUser(): ExampleUser | undefined {
	const storedUser = localStorage.getItem(EXAMPLE_AUTH_CURRENT_USER_KEY);
	if (isEmpty(storedUser)) {
		return;
	}
	return JSON.parse(storedUser) as ExampleUser;
}

/**
 * Set the current user in storage.
 * @param user The user to store.
 */
export function setCurrentUser(user: ExampleUser): void {
	localStorage.setItem(EXAMPLE_AUTH_CURRENT_USER_KEY, JSON.stringify(user));
}

/**
 * Remove the current user from storage.
 */
export function clearCurrentUser(): void {
	localStorage.removeItem(EXAMPLE_AUTH_CURRENT_USER_KEY);
}
