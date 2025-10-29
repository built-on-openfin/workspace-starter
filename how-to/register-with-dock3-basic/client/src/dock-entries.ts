import type { DockEntry, ContentMenuEntry } from "@openfin/workspace/client-api-platform/src/shapes";

export const defaultDockFavorites: DockEntry[] = [
	{
		label: "Google",
		icon: "https://www.google.com/favicon.ico",
		id: "google",
		type: "item",
		itemData: {
			url: "https://www.google.com"
		}
	},
	{
		label: "Drive",
		icon: "https://lh3.googleusercontent.com/rCwHBRBJV4wFiEIN_Mlboj94_TGJxyJtBh-MBFL4y1aZdO4hb7_Uc_PpXRyAoN7O9m_Zc1wSyp3H1vsnb829QE7t9KyGNJY9A1a3QQ",
		id: "googleDrive",
		type: "item",
		itemData: {
			url: "https://www.google.com/drive"
		}
	},
	{
		label: "Docs",
		icon: "https://lh3.googleusercontent.com/1DECuhPQ1y2ppuL6tdEqNSuObIm_PW64w0mNhm3KGafi40acOJkc4nvsZnThoDKTH8gWyxAnipJmvCiszX8R6UAUu1UyXPfF13d7",
		id: "googleDocs",
		type: "item",
		itemData: {
			url: "https://www.google.com/docs"
		}
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
		id: "google",
		label: "Google",
		icon: "https://www.google.com/favicon.ico",

		itemData: {
			url: "https://www.google.com"
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
					url: "https://www.google.com/drive"
				},
				bookmarked: true
			},
			{
				type: "item",
				id: "googleMeet",
				label: "Google Meet",
				icon: "https://lh3.googleusercontent.com/n3Eac1gPc5OTEh7Go1jemICnooceXtfs4VZW-4CPukCUi_doFsN9Q8njidksZ4KIFyPJVYtR7ZhLL16VoUJSPE1j74iTXT2xwCqq",
				itemData: {
					url: "https://www.google.com/meet"
				},
				bookmarked: true
			},
			{
				type: "item",
				id: "googleForms",
				label: "Forms",
				icon: "https://lh3.googleusercontent.com/qT-mnpsMIcop6f82s52RiUSQTfhP5TqbS9eNovaITMbjEIAlIxuW5m3lI2LxLkwox92YIl7rPIzsI0oxUzLPx89KyPabgiLAPeVcjg",
				itemData: {
					url: "https://www.google.com/forms"
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
		type: "item",
		itemData: {
			url: "https://www.google.com/meet"
		}
	},
	{
		label: "Google Drive",
		icon: "https://img.icons8.com/color/48/google-drive--v1.png",
		id: "googleDrive",
		type: "item",
		itemData: {
			url: "https://www.google.com/drive"
		}
	},
	{
		label: "Google Docs",
		icon: "https://img.icons8.com/color/48/google-docs.png",
		id: "googleDocs",
		type: "item",
		itemData: {
			url: "https://www.google.com/docs"
		}
	},
	{
		label: "Google Forms",
		icon: "https://img.icons8.com/color/48/google-forms.png",
		id: "googleForms",
		type: "item",
		itemData: {
			url: "https://www.google.com/forms"
		}
	},
	{
		label: "Gmail",
		icon: "https://img.icons8.com/color/48/gmail.png",
		id: "gmail",
		type: "item",
		itemData: {
			url: "https://www.google.com/gmail"
		}
	},
	{
		label: "Google Calendar",
		icon: "https://img.icons8.com/color/48/google-calendar--v1.png",
		id: "googleCalendar",
		type: "item",
		itemData: {
			url: "https://www.google.com/calendar"
		}
	},
	{
		label: "YouTube",
		icon: "https://img.icons8.com/color/48/youtube-play.png",
		id: "youtube",
		type: "item",
		itemData: {
			url: "https://www.youtube.com"
		}
	},
	{
		label: "Google Maps",
		icon: "https://img.icons8.com/color/48/google-maps.png",
		id: "googleMaps",
		type: "item",
		itemData: {
			url: "https://www.google.com/maps"
		}
	},
	{
		label: "Google Keep",
		icon: "https://img.icons8.com/color/48/google-keep.png",
		id: "googleKeep",
		type: "item",
		itemData: {
			url: "https://www.google.com/keep"
		}
	},
	{
		label: "Google News",
		icon: "https://img.icons8.com/color/48/google-news.png",
		id: "googleNews",
		type: "item",
		itemData: {
			url: "https://www.google.com/news"
		}
	},
	{
		label: "Google Podcasts",
		icon: "https://img.icons8.com/color/48/google-podcasts.png",
		id: "googlePodcasts",
		type: "item",
		itemData: {
			url: "https://www.google.com/podcasts"
		}
	},
	{
		label: "Zoom",
		icon: "https://img.icons8.com/color/48/zoom.png",
		id: "zoom",
		type: "item",
		itemData: {
			url: "https://www.zoom.com"
		}
	},
	{
		label: "Slack",
		icon: "https://img.icons8.com/color/48/slack-new.png",
		id: "slack",
		type: "item",
		itemData: {
			url: "https://www.slack.com"
		}
	},
	{
		label: "Dropbox",
		icon: "https://img.icons8.com/color/48/dropbox.png",
		id: "dropbox",
		type: "item",
		itemData: {
			url: "https://www.dropbox.com"
		}
	},
	{
		label: "Microsoft Teams",
		icon: "https://img.icons8.com/color/48/microsoft-teams.png",
		id: "microsoftTeams",
		type: "item",
		itemData: {
			url: "https://www.microsoft.com/en-us/microsoft-teams/group-chat-software"
		}
	},
	{
		label: "Outlook",
		icon: "https://img.icons8.com/color/48/microsoft-outlook-2019--v1.png",
		id: "outlook",
		type: "item",
		itemData: {
			url: "https://www.outlook.com"
		}
	},
	{
		label: "LinkedIn",
		icon: "https://img.icons8.com/color/48/linkedin.png",
		id: "linkedin",
		type: "item",
		itemData: {
			url: "https://www.linkedin.com"
		}
	},
	{
		label: "Instagram",
		icon: "https://img.icons8.com/color/48/instagram-new.png",
		id: "instagram",
		type: "item",
		itemData: {
			url: "https://www.instagram.com"
		}
	},
	{
		label: "Twitter",
		icon: "https://img.icons8.com/color/48/twitter--v1.png",
		id: "twitter",
		type: "item",
		itemData: {
			url: "https://www.twitter.com"
		}
	},
	{
		label: "Facebook",
		icon: "https://img.icons8.com/color/48/facebook-new.png",
		id: "facebook",
		type: "item",
		itemData: {
			url: "https://www.facebook.com"
		}
	},
	{
		label: "WhatsApp",
		icon: "https://img.icons8.com/color/48/whatsapp--v1.png",
		id: "whatsapp",
		type: "item",
		itemData: {
			url: "https://www.whatsapp.com"
		}
	},
	{
		label: "Spotify",
		icon: "https://img.icons8.com/color/48/spotify--v1.png",
		id: "spotify",
		type: "item",
		itemData: {
			url: "https://www.spotify.com"
		}
	},
	{
		label: "Apple Music",
		icon: "https://img.icons8.com/color/48/apple-music.png",
		id: "appleMusic",
		type: "item",
		itemData: {
			url: "https://www.apple.com/apple-music/"
		}
	},
	{
		label: "TikTok",
		icon: "https://img.icons8.com/color/48/tiktok--v1.png",
		id: "tiktok",
		type: "item",
		itemData: {
			url: "https://www.tiktok.com"
		}
	},
	{
		label: "Reddit",
		icon: "https://img.icons8.com/color/48/reddit--v1.png",
		id: "reddit",
		type: "item",
		itemData: {
			url: "https://www.reddit.com"
		}
	},
	{
		label: "GitHub",
		icon: "https://img.icons8.com/color/48/github--v1.png",
		id: "github",
		type: "item",
		itemData: {
			url: "https://www.github.com"
		}
	},
	{
		label: "Notion",
		icon: "https://img.icons8.com/color/48/notion.png",
		id: "notion",
		type: "item",
		itemData: {
			url: "https://www.notion.so"
		}
	},
	{
		label: "Figma",
		icon: "https://img.icons8.com/color/48/figma.png",
		id: "figma",
			type: "item",
		itemData: {
			url: "https://www.figma.com"
		}
	},
	{
		label: "Trello",
		icon: "https://img.icons8.com/color/48/trello.png",
		id: "trello",
		type: "item",
		itemData: {
			url: "https://www.trello.com"
		}
	},
	{
		label: "Asana",
		icon: "https://img.icons8.com/color/48/asana.png",
		id: "asana",
		type: "item",
		itemData: {
			url: "https://www.asana.com"
		}
	},
	{
		label: "Airbnb",
		icon: "https://img.icons8.com/color/48/airbnb.png",
		id: "airbnb",
		type: "item",
		itemData: {
			url: "https://www.airbnb.com"
		}
	},
	{
		label: "Uber",
		icon: "https://img.icons8.com/color/48/uber.png",
		id: "uber",
		type: "item",
		itemData: {
			url: "https://www.uber.com"
		}
	},
	{
		label: "Lyft",
		icon: "https://img.icons8.com/color/48/lyft.png",
		id: "lyft",
		type: "item",
		itemData: {
			url: "https://www.lyft.com"
		}
	},
	{
		label: "Pinterest",
		icon: "https://img.icons8.com/color/48/pinterest--v1.png",
		id: "pinterest",
		type: "item",
		itemData: {
			url: "https://www.pinterest.com"
		}
	},
	{
		label: "Netflix",
		icon: "https://img.icons8.com/color/48/netflix.png",
		id: "netflix",
		type: "item",
		itemData: {
			url: "https://www.netflix.com"
		}
	},
	{
		label: "Amazon",
		icon: "https://img.icons8.com/color/48/amazon.png",
		id: "amazon",
		type: "item",
		itemData: {
			url: "https://www.amazon.com"
		}
	}
];
