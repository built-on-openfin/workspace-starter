// Golden Layout Tabs Scroll Controls
setTimeout(() => {
	(() => {
		// Inject CSS
		const style = document.createElement('style');
		style.textContent = `
        /* Golden Layout Tabs Scroll Controls */
        .lm_header {
            position: relative;
        }

        .lm-tabs-scroll-buttons-container {
            display: none;
            flex-direction: row;
            flex-wrap: nowrap;
            align-items: center;
            height: 100%;
            gap: 0;
            background-color: var(--tab-background-color, #1e1f23);
            padding: 0 4px;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 1;
        }

        .lm-tabs-scroll-buttons-container.visible {
            display: flex;
        }

        .lm-tabs-scroll-button {
            width: 28px;
            height: 28px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background-color: var(--tab-background-color, #1e1f23);
            border: none;
            cursor: pointer;
            transition: background-color 0.2s;
            flex-shrink: 0;
            -webkit-app-region: no-drag;
        }

        .lm-tabs-scroll-button:hover {
            opacity: 1;
            background: var(--tab-button-hover-color, rgba(165, 174, 189, 0.18));
        }

        .lm-tabs-scroll-button:active {
            background: var(--tab-button-active-color, rgba(244, 245, 248, 0.18));
        }

        .lm-tabs-scroll-button svg {
            width: 16px;
            height: 16px;
        }

        .lm-tabs-selected-label {
            display: none;
            padding: 0 0 0 8px;
            color: var(--tab-font-color, #a5aebd);
            font-size: 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            min-width: 0;
            flex: 1 1 auto;
            line-height: 28px;
            cursor: pointer;
            -webkit-app-region: no-drag;
        }

        .lm-tabs-selected-label:hover {
            opacity: 0.8;
        }

        .lm-tabs-scroll-buttons-container.visible .lm-tabs-selected-label {
            display: block;
        }

        .lm-tabs-resize-handle {
            display: none;
            width: 1px;
            height: 20px;
            background-color: var(--tab-font-color, #a5aebd);
            cursor: ew-resize;
            flex-shrink: 0;
            margin: 0 8px;
            position: relative;
            -webkit-app-region: no-drag;
        }

        .lm-tabs-resize-handle:hover {
            background-color: #fff;
            width: 2px;
        }

        .lm-tabs-scroll-buttons-container.visible .lm-tabs-resize-handle {
            display: block;
        }
    `;
		document.head.append(style);

		/**
		 * Initialize scroll controls for a given Golden Layout stack.
		 * @param stack stack element to bind to.
		 */
		function initializeStackControls(stack) {
			const header = stack.querySelector('.lm_header');
			const tabsContainer = stack.querySelector('.lm_tabs');

			if (!header || !tabsContainer) {
				return;
			}

			// Check if already initialized
			if (tabsContainer.dataset.scrollControlsInitialized === 'true') {
				return;
			}
			tabsContainer.dataset.scrollControlsInitialized = 'true';

			// Create container for controls
			const buttonsContainer = document.createElement('div');
			buttonsContainer.className = 'lm-tabs-scroll-buttons-container';

			// Create selected tab label
			const selectedLabel = document.createElement('span');
			selectedLabel.className = 'lm-tabs-selected-label';
			selectedLabel.textContent = '';

			// Create resize handle (pipe separator)
			const resizeHandle = document.createElement('div');
			resizeHandle.className = 'lm-tabs-resize-handle';
			resizeHandle.setAttribute('aria-label', 'Resize label width');

			// Create left scroll button
			const leftButton = document.createElement('button');
			leftButton.className = 'lm-tabs-scroll-button left';
			leftButton.setAttribute('aria-label', 'Scroll tabs left');
			leftButton.style.pointerEvents = 'auto';
			leftButton.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16">
            <path fill="#a5aebd" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
    `;

			// Create right scroll button
			const rightButton = document.createElement('button');
			rightButton.className = 'lm-tabs-scroll-button right';
			rightButton.setAttribute('aria-label', 'Scroll tabs right');
			rightButton.style.pointerEvents = 'auto';
			rightButton.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16">
            <path fill="#a5aebd" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
    `;

			// Add elements to container
			buttonsContainer.append(selectedLabel);
			buttonsContainer.append(resizeHandle);
			buttonsContainer.append(leftButton);
			buttonsContainer.append(rightButton);

			// Insert controls as first child of header (before newTabButton and tabs)
			header.insertBefore(buttonsContainer, header.firstChild);

			/**
			 * Update the label showing the title of the selected tab.
			 */
			function updateSelectedTabLabel() {
				const selectedTab = tabsContainer.querySelector('.lm_tab[aria-selected="true"]');
				if (selectedTab) {
					const title = selectedTab.getAttribute('title');
					selectedLabel.textContent = title || '';
					selectedLabel.setAttribute('title', title || '');
				}
			}

			/**
			 * Update the visibility of scroll buttons based on scrollability.
			 */
			function updateScrollButtons() {
				const scrollShadows = tabsContainer.querySelectorAll('.scroll-shadow');
				const isScrollable =
					scrollShadows.length > 0 && tabsContainer.scrollWidth > tabsContainer.clientWidth;

				buttonsContainer.classList.toggle('visible', isScrollable);
				updateSelectedTabLabel();

				// Calculate available space for tabs
				requestAnimationFrame(() => {
					const headerWidth = header.offsetWidth;
					const lmControls = header.querySelector('.lm_controls');
					const newTabButton = header.querySelector('.newTabButton');
					const controlsWidth = lmControls ? lmControls.offsetWidth : 0;
					const newTabButtonWidth = newTabButton ? newTabButton.offsetWidth : 0;
					const buttonsWidth = isScrollable ? buttonsContainer.offsetWidth : 0;

					// Reserve space for: scroll buttons + newTabButton + lm_controls + margin
					const reservedSpace = buttonsWidth + newTabButtonWidth + controlsWidth + 10;
					const availableWidth = headerWidth - reservedSpace;

					// Set max-width on tabs container and padding for scroll buttons
					tabsContainer.style.maxWidth = `${availableWidth}px`;
					tabsContainer.style.paddingLeft = isScrollable ? `${buttonsWidth}px` : '';
				});
			}

			// Initial check
			updateScrollButtons();

			// Watch for changes (when tabs are added/removed)
			const resizeObserver = new ResizeObserver(updateScrollButtons);
			resizeObserver.observe(tabsContainer);

			// Watch for tab selection changes and title updates
			const mutationObserver = new MutationObserver((mutations) => {
				for (const mutation of mutations) {
					if (
						mutation.type === 'attributes' && // Update label when tab is selected or when selected tab's title changes
						(mutation.attributeName === 'aria-selected' ||
							(mutation.attributeName === 'title' &&
								mutation.target.getAttribute('aria-selected') === 'true'))
					) {
						updateSelectedTabLabel();
						break;
					}
					// Check for scroll shadow changes (indicates scrollability changed)
					if (mutation.type === 'childList') {
						updateScrollButtons();
						break;
					}
				}
			});

			// Observe all tabs for aria-selected and title changes
			mutationObserver.observe(tabsContainer, {
				attributes: true,
				attributeFilter: ['aria-selected', 'title'],
				subtree: true,
				childList: true
			});

			// Add click handlers for scrolling
			leftButton.addEventListener('click', (e) => {
				e.preventDefault();
				e.stopPropagation();
				tabsContainer.scrollBy({ left: -200, behavior: 'smooth' });
			});

			// Right-click on left button to scroll to start
			leftButton.addEventListener('contextmenu', (e) => {
				e.preventDefault();
				e.stopPropagation();
				tabsContainer.scrollTo({ left: 0, behavior: 'smooth' });
			});

			rightButton.addEventListener('click', (e) => {
				e.preventDefault();
				e.stopPropagation();
				tabsContainer.scrollBy({ left: 200, behavior: 'smooth' });
			});

			// Right-click on right button to scroll to end
			rightButton.addEventListener('contextmenu', (e) => {
				e.preventDefault();
				e.stopPropagation();
				tabsContainer.scrollTo({ left: tabsContainer.scrollWidth, behavior: 'smooth' });
			});

			// Click on label to scroll selected tab into view
			selectedLabel.addEventListener('click', (e) => {
				e.preventDefault();
				e.stopPropagation();
				const selectedTab = tabsContainer.querySelector('.lm_tab[aria-selected="true"]');
				if (selectedTab) {
					selectedTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
				}
			});

			// Drag functionality for resize handle
			let startX = 0;
			let startWidth = 0;
			const minWidth = 0;

			/**
			 * Handle mouse move for resizing label.
			 * @param e - The mouse move event.
			 */
			function handleMouseMove(e) {
				const deltaX = e.clientX - startX;
				const newWidth = Math.max(minWidth, startWidth + deltaX);

				if (newWidth === 0) {
					selectedLabel.style.display = 'none';
					selectedLabel.style.maxWidth = '0px';
				} else {
					selectedLabel.style.display = 'block';
					selectedLabel.style.maxWidth = `${newWidth}px`;
				}
			}

			/**
			 * Handle mouse up event to stop resizing.
			 */
			function handleMouseUp() {
				document.removeEventListener('mousemove', handleMouseMove);
				document.removeEventListener('mouseup', handleMouseUp);
				document.body.style.cursor = '';
				document.body.style.userSelect = '';
			}

			resizeHandle.addEventListener('mousedown', (e) => {
				startX = e.clientX;
				startWidth = selectedLabel.offsetWidth;
				e.preventDefault();
				document.body.style.cursor = 'ew-resize';
				document.body.style.userSelect = 'none';

				document.addEventListener('mousemove', handleMouseMove);
				document.addEventListener('mouseup', handleMouseUp);
			});

			console.log('Golden Layout tabs scroll controls initialized for stack', stack);
		}

		/**
		 * Initialize controls for all existing stacks on the page.
		 */
		function initializeAllStacks() {
			const stacks = document.querySelectorAll('.lm_stack');
			for (const stack of stacks) {
				initializeStackControls(stack);
			}
		}

		// Initial initialization
		initializeAllStacks();

		// Watch for new stacks being added dynamically
		const stackObserver = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				if (mutation.type === 'childList') {
					for (const node of mutation.addedNodes) {
						if (node.nodeType === Node.ELEMENT_NODE) {
							// Check if the added node is a stack
							if (node.classList && node.classList.contains('lm_stack')) {
								initializeStackControls(node);
							}
							// Also check for stacks within the added node
							const nestedStacks = node.querySelectorAll && node.querySelectorAll('.lm_stack');
							if (nestedStacks) {
								for (const stack of nestedStacks) {
									initializeStackControls(stack);
								}
							}
						}
					}
				}
			}
		});

		// Observe the entire document for new stacks
		stackObserver.observe(document.body, {
			childList: true,
			subtree: true
		});

		console.log('Golden Layout tabs scroll controls system initialized');
	})();
}, 10000);
