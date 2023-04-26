/**
 * The settings for the module.
 */
export interface TreeInlineSettings {
	/**
	 * The url to the organization data.
	 */
	rootUrl?: string;
}

/**
 * Definition of an entity.
 */
export interface EntityItem {
	/**
	 * The type of an entity.
	 */
	type: string;
	/**
	 * The id of the entity.
	 */
	id: string;
	/**
	 * The name of the entity.
	 */
	name: string;
}

/**
 * Definition of an organization.
 */
export interface EntityOrganization extends EntityItem {
	/**
	 * Fix the type.
	 */
	type: "organization";

	/**
	 * Additional departments for an organization.
	 */
	departments: EntityDepartment[];
}

/**
 * Definition of a department.
 */
export interface EntityDepartment extends EntityItem {
	/**
	 * Fix the type.
	 */
	type: "department";
	/**
	 * Additional members for a department.
	 */
	members: EntityMember[];
}

/**
 * Definition of a member.
 */
export interface EntityMember extends EntityItem {
	/**
	 * Fix the type.
	 */
	type: "member";
	/**
	 * Additional role field for a member.
	 */
	role: string;
}
