import { p as e, b as t } from './p-ea06816b.js';
(() => {
	const t = import.meta.url,
		s = {};
	return '' !== t && (s.resourcesUrl = new URL('.', t).href), e(s);
})().then((e) =>
	t(
		[
			[
				'p-ad39c35c',
				[
					[
						1,
						'fin-context-group-picker',
						{
							bindViews: [4, 'bind-views'],
							bindSelf: [4, 'bind-self'],
							unselectedColor: [1, 'unselected-color'],
							listDelay: [2, 'list-delay'],
							showListOnClick: [4, 'show-list-on-click'],
							unselectedText: [1, 'unselected-text'],
							selectedText: [1, 'selected-text'],
							joinText: [1, 'join-text'],
							leaveText: [1, 'leave-text'],
							isQueryStringEnabled: [4, 'is-query-string-enabled'],
							showContextGroupList: [32],
							contextGroupId: [32]
						}
					]
				]
			]
		],
		e
	)
);
