import { r as t, h as i } from './p-ea06816b.js';
const s = window.fin,
	e = class {
		constructor(i) {
			t(this, i),
				(this.showContextGroupList = !1),
				(this.contextGroupId = void 0),
				(this.iconColor = null),
				(this.iconId = null),
				(this.availableContextGroups = []),
				(this.bindViews = !0),
				(this.bindSelf = !0),
				(this.unselectedColor = '#ffffff'),
				(this.listDelay = 500),
				(this.showListOnClick = !0),
				(this.unselectedText =
					'No Context Group Selected' + (this.showListOnClick ? '. Click To Join.' : '')),
				(this.selectedText =
					'Current Context Is {0}' + (this.showListOnClick ? '. Click To Switch/Leave.' : '')),
				(this.joinText = 'Switch to {0} Context Group'),
				(this.leaveText = 'Leave {0} Context Group'),
				(this.isQueryStringEnabled = !1);
		}
		async joinContextGroup(t, i) {
			if (void 0 !== s) {
				if (!0 === this.bindViews && !0 === s.me.isWindow)
					if (void 0 === i) {
						let i = await s.me.getCurrentViews();
						for (let e = 0; e < i.length; e++) await s.me.interop.joinContextGroup(t, i[e].identity);
					} else await s.me.interop.joinContextGroup(t, i);
				this.bindSelf && (await s.me.interop.joinContextGroup(t, s.me.identity));
			}
		}
		async leaveContextGroup(t) {
			if (void 0 !== s) {
				if (!0 === this.bindViews && !0 === s.me.isWindow)
					if (void 0 === t) {
						let t = await s.me.getCurrentViews();
						for (let i = 0; i < t.length; i++) await s.me.interop.removeFromContextGroup(t[i].identity);
					} else await s.me.interop.removeFromContextGroup(t);
				this.bindSelf && (await s.me.interop.removeFromContextGroup(s.me.identity));
			}
		}
		async saveSelectedContextGroup(t) {
			!1 === this.bindSelf && (await s.me.updateOptions({ customData: { selectedContextGroup: t } }));
		}
		async updateContextGroup(t, i, s = !0) {
			let e = this.availableContextGroups.find((i) => i.id === t);
			null != e &&
				(this.contextGroupId === t && s
					? ((this.contextGroupId = void 0),
					  (this.iconColor = this.unselectedColor),
					  (this.iconId = void 0),
					  await this.leaveContextGroup(i))
					: ((this.iconColor = e.color),
					  (this.iconId = e.id),
					  (this.contextGroupId = t),
					  await this.joinContextGroup(t, i)),
				await this.saveSelectedContextGroup(this.contextGroupId),
				(this.showContextGroupList = !1));
		}
		showContextList() {
			void 0 !== this.showListId && clearTimeout(this.showListId),
				(this.showListId = setTimeout(() => {
					(this.showContextGroupList = !0), (this.showListId = void 0);
				}, this.listDelay));
		}
		hideContextList() {
			this.showContextGroupList = !1;
		}
		getContextGroupTooltip(t, i = !1) {
			let s = t.charAt(0).toUpperCase() + t.slice(1);
			return i
				? this.selectedText.replace('{0}', s)
				: t === this.contextGroupId
				? this.leaveText.replace('{0}', s)
				: this.joinText.replace('{0}', s);
		}
		async setupContextPicker() {
			if (void 0 !== s) {
				if (
					(this.bindViews &&
						!0 === s.me.isWindow &&
						(await s.Window.getCurrent()).on('view-attached', async (t) => {
							if (void 0 !== this.contextGroupId)
								setTimeout(async () => {
									await this.updateContextGroup(this.contextGroupId, t.viewIdentity, !1);
								}, 1e3);
							else {
								let i = s.View.wrapSync(t.viewIdentity),
									e = await i.getOptions();
								void 0 !== e.interop &&
									void 0 !== e.interop.currentContextGroup &&
									(await this.updateContextGroup(e.interop.currentContextGroup, t.viewIdentity));
							}
						}),
					(await s.me.interop.getContextGroups()).forEach((t) => {
						this.availableContextGroups.push({
							id: t.id,
							color: t.displayMetadata.color
						});
					}),
					this.isQueryStringEnabled)
				) {
					const t = new URLSearchParams(window.location.search).get('contextGroupId');
					null != t && (await this.updateContextGroup(t));
				}
				if (void 0 === this.contextGroupId) {
					let t,
						i = await s.me.getOptions();
					void 0 !== i.interop && void 0 !== i.interop.currentContextGroup
						? (t = i.interop.currentContextGroup)
						: !1 === this.bindSelf &&
						  void 0 !== i.customData &&
						  void 0 !== i.customData.selectedContextGroup &&
						  (t = i.customData.selectedContextGroup),
						await this.updateContextGroup(t);
				}
			}
		}
		componentWillLoad() {
			this.setupContextPicker().then(() => {});
		}
		render() {
			return this.showContextGroupList
				? i(
						'div',
						{
							id: 'available-context',
							onMouseLeave: this.hideContextList.bind(this)
						},
						' ',
						this.availableContextGroups.map((t) =>
							i(
								'span',
								{
									title: this.getContextGroupTooltip(t.id),
									class: 'fade-in',
									style: {
										padding: '0px 5px',
										color: t.color,
										cursor: 'pointer'
									},
									onClick: () => this.updateContextGroup(t.id)
								},
								'⬤'
							)
						)
				  )
				: void 0 === this.contextGroupId
				? i(
						'div',
						null,
						i(
							'span',
							this.showListOnClick
								? {
										onClick: this.showContextList.bind(this),
										title: this.unselectedText,
										style: {
											padding: '0px 5px',
											color: `${this.unselectedColor}`
										}
								  }
								: {
										onMouseEnter: this.showContextList.bind(this),
										title: this.unselectedText,
										style: {
											padding: '0px 5px',
											color: `${this.unselectedColor}`
										}
								  },
							'⬤'
						)
				  )
				: i(
						'div',
						{ id: 'selected-context' },
						i(
							'span',
							this.showListOnClick
								? {
										onClick: this.showContextList.bind(this),
										title: this.getContextGroupTooltip(this.contextGroupId, !0),
										style: { padding: '0px 5px', color: `${this.iconColor}` }
								  }
								: {
										onMouseEnter: this.showContextList.bind(this),
										title: this.getContextGroupTooltip(this.contextGroupId, !0),
										style: { padding: '0px 5px', color: `${this.iconColor}` }
								  },
							'⬤'
						)
				  );
		}
	};
e.style =
	':host{display:block}@keyframes fadeIn{0%{opacity:0}100%{opacity:1}}.fade-in{animation:fadeIn ease 1s}';
export { e as fin_context_group_picker };
