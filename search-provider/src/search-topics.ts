/**
 * All search topics exposed by the Home and Browser application.
 */
export enum SearchTopic {
    /**
     * When the user navigates to the `Launch` view in Home, 
     * the UI will request application search data on this topic.
     */
    Apps = "apps",
    /**
     * When the user navigates to the `Workspaces` view in Home, 
     * the UI will request workspaces search data on this topic.
     */
    Workspaces = "workspaces",
    /**
     * When the user is on the aggregated search view (AKA the view when the user first opens Home),
     * the UI will request any type of search data on this topic.
     */
    All = "all"
}