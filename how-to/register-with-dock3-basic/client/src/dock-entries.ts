import type { DockEntry, ContentMenuEntry } from "@openfin/workspace/client-api-platform/src/shapes";

export const defaultDockFavorites: DockEntry[] = [
	{
		label: "Google Meet",
		icon: "https://lh3.googleusercontent.com/n3Eac1gPc5OTEh7Go1jemICnooceXtfs4VZW-4CPukCUi_doFsN9Q8njidksZ4KIFyPJVYtR7ZhLL16VoUJSPE1j74iTXT2xwCqq",
		id: "googleMeet",
		type: "item",
		itemData: {
			appType: "desktop"
		}
	},
	{
		label: "Drive",
		icon: "https://lh3.googleusercontent.com/rCwHBRBJV4wFiEIN_Mlboj94_TGJxyJtBh-MBFL4y1aZdO4hb7_Uc_PpXRyAoN7O9m_Zc1wSyp3H1vsnb829QE7t9KyGNJY9A1a3QQ",
		id: "googleDrive",
		type: "item"
	},
	{
		label: "Docs",
		icon: "https://lh3.googleusercontent.com/1DECuhPQ1y2ppuL6tdEqNSuObIm_PW64w0mNhm3KGafi40acOJkc4nvsZnThoDKTH8gWyxAnipJmvCiszX8R6UAUu1UyXPfF13d7",
		id: "googleDocs",
		type: "item"
	},
	{
		label: "Example Folder 4",
		id: "exampleFolder4",
		type: "folder"
	},
	{
		label: "Example Folder 5",
		id: "exampleFolder5",
		type: "folder"
	},
	{
		label: "Example Folder 6",
		id: "exampleFolder6",
		type: "folder"
	},
	{
		label: "Example Folder 7",
		id: "exampleFolder7",
		type: "folder"
	},
	{
		label: "Example Folder 8",
		id: "exampleFolder8",
		type: "folder"
	},
	{
		label: "Example Folder 9",
		id: "exampleFolder9",
		type: "folder"
	}
];

export const defaultContentMenu: ContentMenuEntry[] = [
	{
		type: "item",
		id: "googleMeet",
		label: "Google Meet",
		icon: "https://lh3.googleusercontent.com/n3Eac1gPc5OTEh7Go1jemICnooceXtfs4VZW-4CPukCUi_doFsN9Q8njidksZ4KIFyPJVYtR7ZhLL16VoUJSPE1j74iTXT2xwCqq",

		itemData: {
			type: "item",
			contentId: "googleMeet",
			appType: "desktop"
		},
		bookmarked: true
	},
	{
		type: "folder",
		id: "googleFolder",
		label: "Google",
		children: [
			{
				type: "item",
				id: "googleDrive",
				label: "Drive",
				icon: "https://lh3.googleusercontent.com/rCwHBRBJV4wFiEIN_Mlboj94_TGJxyJtBh-MBFL4y1aZdO4hb7_Uc_PpXRyAoN7O9m_Zc1wSyp3H1vsnb829QE7t9KyGNJY9A1a3QQ",
				itemData: {
					type: "item",
					contentId: "googleDrive"
				},
				bookmarked: true
			},
			{
				type: "item",
				id: "googleMeet",
				label: "Google Meet",
				icon: "https://lh3.googleusercontent.com/n3Eac1gPc5OTEh7Go1jemICnooceXtfs4VZW-4CPukCUi_doFsN9Q8njidksZ4KIFyPJVYtR7ZhLL16VoUJSPE1j74iTXT2xwCqq",
				itemData: {
					type: "item",
					contentId: "googleMeet"
				},
				bookmarked: true
			},
			{
				type: "item",
				id: "googleForms",
				label: "Forms",
				icon: "https://lh3.googleusercontent.com/qT-mnpsMIcop6f82s52RiUSQTfhP5TqbS9eNovaITMbjEIAlIxuW5m3lI2LxLkwox92YIl7rPIzsI0oxUzLPx89KyPabgiLAPeVcjg",
				itemData: {
					type: "item",
					contentId: "googleForms"
				}
			}
		]
	},
	{
		type: "folder",
		id: "exampleFolder1",
		label: "Example Folder 1",
		children: [
			{
				type: "folder",
				id: "exampleFolder2",
				label: "Example Folder 2",
				children: [
					{
						type: "folder",
						id: "exampleFolder3",
						label: "Example Folder 3",
						children: [
							{
								type: "folder",
								id: "exampleFolder4",
								label: "Example Folder 4",
								children: []
							},
							{
								type: "folder",
								id: "exampleFolder5",
								label: "Example Folder 5",
								children: []
							},
							{
								type: "folder",
								id: "exampleFolder6",
								label: "Example Folder 6",
								children: []
							},
							{
								type: "folder",
								id: "exampleFolder7",
								label: "Example Folder 7",
								children: []
							},
							{
								type: "folder",
								id: "exampleFolder8",
								label: "Example Folder 8",
								children: []
							},
							{
								type: "folder",
								id: "exampleFolder9",
								label: "Example Folder 9",
								children: []
							},
							{
								type: "folder",
								id: "exampleFolder10",
								label: "Example Folder 10",
								children: []
							},
							{
								type: "folder",
								id: "exampleFolder11",
								label: "Example Folder 11",
								children: []
							},
							{
								type: "folder",
								id: "exampleFolder12",
								label: "Example Folder 12",
								children: []
							},
							{
								type: "folder",
								id: "exampleFolder13",
								label: "Example Folder 13",
								children: []
							},
							{
								type: "folder",
								id: "exampleFolder14",
								label: "Example Folder 14",
								children: []
							},
							{
								type: "folder",
								id: "exampleFolder15",
								label: "Example Folder 15",
								children: []
							},
							{
								type: "folder",
								id: "exampleFolder16",
								label: "Example Folder 16",
								children: []
							},
							{
								type: "folder",
								id: "exampleFolder17",
								label: "Example Folder 17",
								children: []
							},
							{
								type: "folder",
								id: "exampleFolder18",
								label: "Example Folder 18",
								children: []
							},
							{
								type: "folder",
								id: "exampleFolder19",
								label: "Example Folder 19",
								children: []
							},
							{
								type: "folder",
								id: "exampleFolder20",
								label: "Example Folder 20",
								children: []
							}
						]
					}
				]
			}
		]
	}
];

export const overFlowDockFavorites: DockEntry[] = [
	{
		label: "Google Meet",
		icon: "https://img.icons8.com/color/48/google-meet.png",
		id: "googleMeet",
		type: "item"
	},
	{
		label: "Google Drive",
		icon: "https://img.icons8.com/color/48/google-drive--v1.png",
		id: "googleDrive",
		type: "item"
	},
	{
		label: "Google Docs",
		icon: "https://img.icons8.com/color/48/google-docs.png",
		id: "googleDocs",
		type: "item"
	},
	{
		label: "Google Forms",
		icon: "https://img.icons8.com/color/48/google-forms.png",
		id: "googleForms",
		type: "item"
	},
	{
		label: "Gmail",
		icon: "https://img.icons8.com/color/48/gmail.png",
		id: "gmail",
		type: "item"
	},
	{
		label: "Google Calendar",
		icon: "https://img.icons8.com/color/48/google-calendar--v1.png",
		id: "googleCalendar",
		type: "item"
	},
	{
		label: "YouTube",
		icon: "https://img.icons8.com/color/48/youtube-play.png",
		id: "youtube",
		type: "item"
	},
	{
		label: "Google Maps",
		icon: "https://img.icons8.com/color/48/google-maps.png",
		id: "googleMaps",
		type: "item"
	},
	{
		label: "Google Keep",
		icon: "https://img.icons8.com/color/48/google-keep.png",
		id: "googleKeep",
		type: "item"
	},
	{
		label: "Google News",
		icon: "https://img.icons8.com/color/48/google-news.png",
		id: "googleNews",
		type: "item"
	},
	{
		label: "Google Podcasts",
		icon: "https://img.icons8.com/color/48/google-podcasts.png",
		id: "googlePodcasts",
		type: "item"
	},
	{
		label: "Zoom",
		icon: "https://img.icons8.com/color/48/zoom.png",
		id: "zoom",
		type: "item"
	},
	{
		label: "Slack",
		icon: "https://img.icons8.com/color/48/slack-new.png",
		id: "slack",
		type: "item"
	},
	{
		label: "Dropbox",
		icon: "https://img.icons8.com/color/48/dropbox.png",
		id: "dropbox",
		type: "item"
	},
	{
		label: "Microsoft Teams",
		icon: "https://img.icons8.com/color/48/microsoft-teams.png",
		id: "microsoftTeams",
		type: "item"
	},
	{
		label: "Outlook",
		icon: "https://img.icons8.com/color/48/microsoft-outlook-2019--v1.png",
		id: "outlook",
		type: "item"
	},
	{
		label: "LinkedIn",
		icon: "https://img.icons8.com/color/48/linkedin.png",
		id: "linkedin",
		type: "item"
	},
	{
		label: "Instagram",
		icon: "https://img.icons8.com/color/48/instagram-new.png",
		id: "instagram",
		type: "item"
	},
	{
		label: "Twitter",
		icon: "https://img.icons8.com/color/48/twitter--v1.png",
		id: "twitter",
		type: "item"
	},
	{
		label: "Facebook",
		icon: "https://img.icons8.com/color/48/facebook-new.png",
		id: "facebook",
		type: "item"
	},
	{
		label: "WhatsApp",
		icon: "https://img.icons8.com/color/48/whatsapp--v1.png",
		id: "whatsapp",
		type: "item"
	},
	{
		label: "Spotify",
		icon: "https://img.icons8.com/color/48/spotify--v1.png",
		id: "spotify",
		type: "item"
	},
	{
		label: "Apple Music",
		icon: "https://img.icons8.com/color/48/apple-music.png",
		id: "appleMusic",
		type: "item"
	},
	{
		label: "TikTok",
		icon: "https://img.icons8.com/color/48/tiktok--v1.png",
		id: "tiktok",
		type: "item"
	},
	{
		label: "Reddit",
		icon: "https://img.icons8.com/color/48/reddit--v1.png",
		id: "reddit",
		type: "item"
	},
	{
		label: "GitHub",
		icon: "https://img.icons8.com/color/48/github--v1.png",
		id: "github",
		type: "item"
	},
	{
		label: "Notion",
		icon: "https://img.icons8.com/color/48/notion.png",
		id: "notion",
		type: "item"
	},
	{
		label: "Figma",
		icon: "https://img.icons8.com/color/48/figma.png",
		id: "figma",
		type: "item"
	},
	{
		label: "Trello",
		icon: "https://img.icons8.com/color/48/trello.png",
		id: "trello",
		type: "item"
	},
	{
		label: "Asana",
		icon: "https://img.icons8.com/color/48/asana.png",
		id: "asana",
		type: "item"
	},
	{
		label: "Airbnb",
		icon: "https://img.icons8.com/color/48/airbnb.png",
		id: "airbnb",
		type: "item"
	},
	{
		label: "Uber",
		icon: "https://img.icons8.com/color/48/uber.png",
		id: "uber",
		type: "item"
	},
	{
		label: "Lyft",
		icon: "https://img.icons8.com/color/48/lyft.png",
		id: "lyft",
		type: "item"
	},
	{
		label: "Pinterest",
		icon: "https://img.icons8.com/color/48/pinterest--v1.png",
		id: "pinterest",
		type: "item"
	},
	{
		label: "Netflix",
		icon: "https://img.icons8.com/color/48/netflix.png",
		id: "netflix",
		type: "item"
	},
	{
		label: "Amazon",
		icon: "https://img.icons8.com/color/48/amazon.png",
		id: "amazon",
		type: "item"
	}
];
