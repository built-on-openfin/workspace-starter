/**
 * Initialize.
 */
async function init() {
	const options = await fin.Window.getCurrentSync().getOptions();
	const EXAMPLE_AUTH_CURRENT_USER_KEY = `${fin.me.identity.uuid}-EXAMPLE_AUTH_CURRENT_USER`;
	let users = [];
	let key;
	if (options?.customData !== undefined) {
		if (Array.isArray(options.customData?.users)) {
			users = options.customData.users;
		}
		key = options.customData.currentUserKey ?? EXAMPLE_AUTH_CURRENT_USER_KEY;
	}

	const availableUsers = document.querySelector('#users');
	const login = document.querySelector('#login');

	if (users.length === 0) {
		users.push({ name: 'Default User', email: 'default@user.com', role: 'default' });
	}

	const userEntries = users
		.map((data, index) => `<option value="${data.name}">${data.name}</option>`)
		.join('\n');
	availableUsers.innerHTML = userEntries;

	login.addEventListener('click', () => {
		const foundUser = users.find((entry) => entry.name === availableUsers.value);
		window.localStorage.setItem(key, JSON.stringify(foundUser));
		const loggedIn = location.href.replace('login', 'logged-in');
		location.assign(loggedIn);
	});
}

init()
	.then((_) => {
		console.log('Initialized');
		return true;
	})
	// eslint-disable-next-line unicorn/prefer-top-level-await
	.catch((rejected) => {
		console.error('Error initializing.', rejected);
	});
