import type { InitOptionsHandlerOptions } from "here-workspace-starter/shapes/init-options-shapes";

/**
 * Options for the launch workspace integration.
 */
export type LaunchWorkspaceOptions = InitOptionsHandlerOptions;

/**
 * The payload for launching a workspace.
 */
export interface LaunchWorkspacePayload {
	/**
	 * The workspace id.
	 */
	workspaceId: string;
}
