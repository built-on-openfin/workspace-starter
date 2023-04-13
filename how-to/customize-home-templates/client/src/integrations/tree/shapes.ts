export interface TreeSettings {
	orgUrl: string;
}

export interface EntityItem {
	type: string;
	id: string;
	name: string;
}

export interface EntityOrganization extends EntityItem {
	type: "organization";
	departments: EntityDepartment[];
}

export interface EntityDepartment extends EntityItem {
	type: "department";
	members: EntityMember[];
}

export interface EntityMember extends EntityItem {
	type: "member";
	role: string;
}
