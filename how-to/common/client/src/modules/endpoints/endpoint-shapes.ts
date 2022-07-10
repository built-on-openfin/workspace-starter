
interface BaseEndpointDefinition {
	id: string;
}

type ModuleEndpointDefinition = BaseEndpointDefinition & {
	type: "module";
	typeId: string;
	options: unknown;
};

// We could include more in this type
export type EndpointDefinition = ModuleEndpointDefinition;
