import type { ExampleUser } from "./shapes";

export function getCurrentUser(userSessionId: string): ExampleUser {
	if (userSessionId === undefined || userSessionId === null) {
		return null;
	}
	const storedUser = localStorage.getItem(userSessionId);
	if (storedUser === null) {
		return null;
	}
	return JSON.parse(storedUser) as ExampleUser;
}

export function setCurrentUser(userSessionId: string, user: ExampleUser): boolean {
	if (userSessionId === undefined || userSessionId === null) {
		return false;
	}
	localStorage.setItem(userSessionId, JSON.stringify(user));
	return true;
}

export function clearCurrentUser(userSessionId: string) {
	localStorage.removeItem(userSessionId);
}
