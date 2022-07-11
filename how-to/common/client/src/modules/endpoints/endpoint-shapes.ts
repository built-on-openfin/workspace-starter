interface BaseEndpointDefinition<O> {
	id: string;
	options?: O;
}

type ModuleEndpointDefinition<O> = BaseEndpointDefinition<O> & {
	type: "module";
	typeId: string;
};

// We could include more in this type
export type EndpointDefinition<O> = ModuleEndpointDefinition<O>;
