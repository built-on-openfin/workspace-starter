let users = [];
let avatarRoot = '../data/avatars/';

/**
 * Initialize the users data.
 */
export async function initialize() {
	const customSettings = await getManifestCustomSettings();

	const contactsProviderUrl = getContactsProviderUrl() ?? customSettings.contactsProvider?.url;
	console.log(`contactsProviderUrl = ${contactsProviderUrl}`);
	const response = await fetch(contactsProviderUrl ?? '../data/contacts.json');

	avatarRoot = customSettings.contactsProvider?.avatarRoot ?? avatarRoot;

	users = await response.json();
}

/**
 * Find a user by name.
 * @param name The users name.
 * @returns The user object if found.
 */
export function findUserByName(name) {
	return users.find((u) => u.name === name);
}

/**
 * Find a user by context.
 * @param email The users email.
 * @returns The user object if found.
 */
export function findUserByEmail(email) {
	return users.find((u) => u.email === email);
}

/**
 * Find a user by fdc3 context.
 * @param context The context.
 * @returns The user object if found.
 */
export function findUserByContext(context) {
	return context ? users.find((u) => u.name === context.name) : undefined;
}

/**
 * Get all the users.
 * @returns The users.
 */
export function getUsers() {
	return users;
}

/**
 * Get a users profile picture.
 * @param user The user to get the picture for.
 * @returns The profile picture.
 */
export function getProfilePic(user) {
	const emailParts = user.email.split('@');
	return `${avatarRoot}${emailParts[0]}.png`;
}

/**
 * Convert a user to an FDC3 context.
 * @param user The user object.
 * @returns The FDC3 context representing the user.
 */
export function userToFdc3Context(user) {
	return {
		type: 'fdc3.contact',
		name: user.name,
		id: {
			email: user.email
		}
	};
}

/**
 * Read the custom settings from the manifest.fin.json.
 * @returns The custom settings from the manifest.
 */
async function getManifestCustomSettings() {
	try {
		if (window.fin) {
			// Get the manifest for the current application
			const app = await fin.Application.getCurrent();

			// Extract the custom settings for this application
			const manifest = await app.getManifest();
			return manifest.customSettings ?? {};
		}
	} catch {
		// not inside of an OpenFin container or there isn't app support.
	}
	return {};
}

/**
 * Tries to get a url from the query string to override the contacts provider.
 * @returns The contacts provider url if found.
 */
function getContactsProviderUrl() {
	// Get the URL parameters
	console.log('Attempting to get URL Params...');
	const urlParams = new URLSearchParams(window.location.search);
	const contactsProviderUrl = urlParams.get('contactsProviderUrl');

	if (!contactsProviderUrl) {
		return;
	}

	try {
		const url = new URL(contactsProviderUrl);
		const validDomains = ['openfin.github.io', 'built-on-openfin.github.io'];

		if (validDomains.includes(url.hostname)) {
			console.log('Valid contactsProviderUrl override url provided:', contactsProviderUrl);
			return url.href;
		}
		console.error('Invalid domain in contactsProviderUrl:', url.hostname);
	} catch {
		console.error('Invalid contactsProviderUrl URL:', contactsProviderUrl);
	}
}
