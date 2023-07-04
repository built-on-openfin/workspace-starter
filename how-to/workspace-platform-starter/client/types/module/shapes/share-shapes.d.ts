import type OpenFin from "@openfin/core";
import type { Page } from "@openfin/workspace-platform";
/**
 * All of the share custom data types.
 */
export type ShareCustomData = SharePageData | ShareWorkspaceData;
/**
 * The payload for sharing page data.
 */
export interface SharePageData {
    /**
     * The type of the data.
     */
    type: "page";
    /**
     * The window identity of the sharing page.
     */
    windowIdentity?: OpenFin.Identity;
    /**
     * The page id of the shared page.
     */
    pageId: string;
    /**
     * The page data.
     */
    page?: Page;
}
/**
 * The payload for sharing workspace data.
 */
export interface ShareWorkspaceData {
    /**
     * The type of the data.
     */
    type: "workspace";
    /**
     * The id of the shared workspace.
     */
    workspaceId?: string;
}
/**
 * The combined shared store types.
 */
export type ShareStoreEntry = ShareEntryStorePage | ShareEntryStoreWorkspace | ShareEntryStoreUnknown;
/**
 * Share stored entry for page.
 */
interface ShareEntryStorePage {
    /**
     * The type of the data.
     */
    type: "page";
    /**
     * The data to store.
     */
    data: {
        page: Page;
    };
}
/**
 * Share stored entry for workspace.
 */
interface ShareEntryStoreWorkspace {
    /**
     * The type of the data.
     */
    type: "workspace";
    /**
     * The data to store.
     */
    data: {
        snapshot: string;
    };
}
/**
 * Share stored entry for unknown.
 */
interface ShareEntryStoreUnknown {
    /**
     * The type of the data.
     */
    type: "other";
}
export {};
