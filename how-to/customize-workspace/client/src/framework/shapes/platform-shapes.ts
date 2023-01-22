export interface PlatformLocale {
	/**
	 * A string with a [BCP 47 language tag](http://tools.ietf.org/html/rfc5646).
	 *  For the general form and interpretation of the locales argument,
	 *  see the [`Intl` page](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation)
	 */
	tag: string;
	/** An [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/Locale#Parameters) with some or all of options of the locale. */
	options?: Intl.LocaleOptions;
}
export interface PlatformProviderOptions {
	/** What is the root url of you platform e.g. https://mydomain.com */
	rootUrl: string;
	/** Do you want to enable this platforms sharing capability (you will still need to have 2 endpoints called share-save and share-get for the storing and retrieval of the share target) */
	sharing: boolean;
	/** This is optional and only needed if you are using shell mode where you wish to load a small module with just auth logic first followed by a module with the rest of the platform core. Specify the entry point here. We do generate the provider bundle and provide an example in our docs. */
	initUrl?: string;
	/** Intent Picker configuration if you wish to support intents. It needs to support the functions required by the platform */
	intentPicker?: {
		/** The url of the html page that has the intent picker */
		url: string;
		/** the height you wish the window to be */
		height?: number;
		/** the width you wish the window to be */
		width?: number;
	};
	/** internationalization related settings */
	intl?: {
		/** If desired specify the preferred locale for this platform */
		locale?: PlatformLocale;
	};
}
