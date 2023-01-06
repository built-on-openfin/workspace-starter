import type { ExampleUser } from "./shapes";

export const EXAMPLE_AUTH_CURRENT_USER_KEY = `${fin.me.identity.uuid}-EXAMPLE_AUTH_CURRENT_USER`;

export function getCurrentUser(): ExampleUser | null {
	const storedUser = localStorage.getItem(EXAMPLE_AUTH_CURRENT_USER_KEY);
	if (storedUser === null) {
		return null;
	}
	return JSON.parse(storedUser) as ExampleUser;
}

export function setCurrentUser(user: ExampleUser): void {
	localStorage.setItem(EXAMPLE_AUTH_CURRENT_USER_KEY, JSON.stringify(user));
}

export function clearCurrentUser() {
	localStorage.removeItem(EXAMPLE_AUTH_CURRENT_USER_KEY);
}
