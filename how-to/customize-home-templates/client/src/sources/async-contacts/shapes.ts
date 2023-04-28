/**
 * The settings for the module.
 */
export interface AsyncSettings {
	/**
	 * The root url where the data is stored.
	 */
	rootUrl?: string;
}

/**
 * Contact type definition.
 */
export interface Contact {
	/**
	 * The contact id.
	 */
	id: string;
	/**
	 * The contact first name.
	 */
	firstName: string;
	/**
	 * The contact last name.
	 */
	lastName: string;
}

/**
 * A full contact with email.
 */
export interface ContactFull extends Contact {
	/**
	 * The contact email.
	 */
	email: string;
}

/**
 * The list of contact results.
 */
export interface ContactsResult {
	/**
	 * The results.
	 */
	data: Contact[];
}
