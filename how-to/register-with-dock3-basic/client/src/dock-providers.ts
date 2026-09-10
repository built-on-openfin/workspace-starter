import type { Dock3Config } from "@openfin/workspace-platform";
import { defaultContentMenu, defaultDockFavorites, overFlowDockFavorites } from "./dock-entries";

const sampleProviders = {
	google: {
		id: "google",
		title: "Google",
		icon: {
			light: "https://www.yahoo.com/favicon.ico",
			dark: "https://www.google.com/favicon.ico"
		},
		favorites: defaultDockFavorites,
		contentMenu: defaultContentMenu
	},
	barclays: {
		id: "barclays",
		title: "Barclays",
		icon: {
			light: "https://www.barclays.co.uk/favicon.ico",
			dark: "https://www.barclays.co.uk/favicon.ico"
		},
		favorites: defaultDockFavorites,
		contentMenu: defaultContentMenu
	},
	arcore: {
		id: "arcore",
		title: "ARCore",
		icon: {
			light: "https://www.arcore.com/favicon.ico",
			dark: "https://www.arcore.com/favicon.ico"
		},
		favorites: defaultDockFavorites,
		contentMenu: defaultContentMenu
	},
	nameless: {
		id: "nameless",
		title: "",
		icon: "",
		favorites: overFlowDockFavorites,
		contentMenu: []
	}
};

/**
 * Return specified dock3 config object.
 * @param set id of requested config
 * @returns requested conifg based on param id
 */
function getDock3Provider(set: keyof typeof sampleProviders): Dock3Config {
	return sampleProviders[set] as Dock3Config;
}

export default getDock3Provider;
