/**
 * Definition of the Chrome Driver version manifest.
 */
export interface ChromeDriverManifest {
    /**
     * The bucket list result.
     */
    ListBucketResult?: {
        Contents: {
            Key: string;
        }[];
    };
}
