/// <reference types="@openfin/core" />
import { Page } from "@openfin/workspace-platform";
export declare let shareEnabled: boolean;
export interface IShareCustomData {
    workspaceId?: string;
    windowIdentity?: OpenFin.Identity;
    pageId?: string;
    page?: Page;
    bounds?: OpenFin.Bounds;
}
export declare function register(bootstrapEnabled: boolean): Promise<void>;
export declare function deregister(): Promise<void>;
export declare function showShareOptions(payload: {
    windowIdentity: OpenFin.Identity;
    x: number;
    y: number;
}): Promise<void>;
export declare function share(options?: IShareCustomData): Promise<void>;
export declare function isShareEnabled(): boolean;
