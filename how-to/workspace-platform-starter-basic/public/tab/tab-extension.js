// Browser Tabs Scroll Controls -Initial Version
setTimeout(() => {
	(() => {
		// Inject CSS
		const style = document.createElement('style');
		style.textContent = `
        /* Browser Tabs Scroll Controls */
        .browser-tabs-scroll-buttons-container {
            display: none;
            flex-direction: row;
            flex-wrap: nowrap;
            align-items: center;
            height: 100%;
            gap: 0;
        }

        .browser-tabs-scroll-buttons-container.visible {
            display: flex;
        }

        .browser-tabs-scroll-button {
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

        .browser-tabs-scroll-button:hover {
            opacity: 1;
            background: var(--tab-button-hover-color, rgba(165, 174, 189, 0.18));
        }

        .browser-tabs-scroll-button:active {
            background: var(--tab-button-active-color, rgba(244, 245, 248, 0.18));
        }

        .browser-tabs-scroll-button svg {
            width: 16px;
            height: 16px;
        }

        .browser-tabs-selected-label {
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

        .browser-tabs-selected-label:hover {
            opacity: 0.8;
        }

        .browser-tabs-scroll-buttons-container.visible .browser-tabs-selected-label {
            display: block;
        }

        .browser-tabs-resize-handle {
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

        .browser-tabs-resize-handle:hover {
            background-color: #fff;
            width: 2px;
        }

        .browser-tabs-scroll-buttons-container.visible .browser-tabs-resize-handle {
            display: block;
        }
    `;
		document.head.append(style);

		// Find the Browser Tabs container using stable selector
		const tabsContainer = document.querySelector('[aria-label="Browser Tabs"][role="tablist"]');

		if (!tabsContainer) {
			console.log('Browser Tabs container not found');
			return;
		}

		// Find the left controls container to add our buttons
		const leftControlsContainer = document.querySelector('[data-testid="browser-left-controls-container"]');

		if (!leftControlsContainer) {
			console.log('Left controls container not found');
			return;
		}

		// Create container for both buttons (side by side)
		const buttonsContainer = document.createElement('div');
		buttonsContainer.className = 'browser-tabs-scroll-buttons-container';
		buttonsContainer.style.marginLeft = 'auto'; // Push to the right side of left controls
		buttonsContainer.style.pointerEvents = 'auto';
		buttonsContainer.style.zIndex = '1000';

		// Create left scroll button
		const leftButton = document.createElement('button');
		leftButton.className = 'browser-tabs-scroll-button left';
		leftButton.setAttribute('aria-label', 'Scroll tabs left');
		leftButton.style.pointerEvents = 'auto';
		leftButton.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16">
            <path fill="#a5aebd" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
    `;

		// Create selected tab label
		const selectedLabel = document.createElement('span');
		selectedLabel.className = 'browser-tabs-selected-label';
		selectedLabel.textContent = '';

		// Create resize handle (pipe separator)
		const resizeHandle = document.createElement('div');
		resizeHandle.className = 'browser-tabs-resize-handle';
		resizeHandle.setAttribute('aria-label', 'Resize label width');

		// Create right scroll button
		const rightButton = document.createElement('button');
		rightButton.className = 'browser-tabs-scroll-button right';
		rightButton.setAttribute('aria-label', 'Scroll tabs right');
		rightButton.style.pointerEvents = 'auto';
		rightButton.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16">
            <path fill="#a5aebd" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
    `;

		// Add label, resize handle, and buttons to container
		buttonsContainer.append(selectedLabel);
		buttonsContainer.append(resizeHandle);
		buttonsContainer.append(leftButton);
		buttonsContainer.append(rightButton);

		// Append buttons container to the left controls (will appear on the right side due to marginLeft: auto)
		leftControlsContainer.append(buttonsContainer);

		// Function to update selected tab label
		/**
		 * Updates the selected tab label with the title of the currently selected tab.
		 */
		function updateSelectedTabLabel() {
			const selectedTab = tabsContainer.querySelector('[aria-selected="true"]');
			if (selectedTab) {
				const title = selectedTab.getAttribute('title');
				console.log('Selected tab title:', title);
				selectedLabel.textContent = title || '';
				selectedLabel.setAttribute('title', title || '');
			}
		}

		/**
		 * Function to check if scrollable and show/hide buttons.
		 */
		function updateScrollButtons() {
			const isScrollable = tabsContainer.scrollWidth > tabsContainer.clientWidth;
			buttonsContainer.classList.toggle('visible', isScrollable);
			updateSelectedTabLabel();
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
						(mutation.attributeName === 'title' && mutation.target.getAttribute('aria-selected') === 'true'))
				) {
					updateSelectedTabLabel();
					break;
				}
			}
		});

		// Observe all tabs for aria-selected and title changes
		mutationObserver.observe(tabsContainer, {
			attributes: true,
			attributeFilter: ['aria-selected', 'title'],
			subtree: true
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
			const selectedTab = tabsContainer.querySelector('[aria-selected="true"]');
			if (selectedTab) {
				selectedTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
			}
		});

		// Drag functionality for resize handle
		let startX = 0;
		let startWidth = 0;
		const minWidth = 0;

		/**
		 * Handles mouse move during dragging of resize handle.
		 * @param e - The mousemove event.
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
		 * Handles mouse up event after dragging of resize handle.
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

		console.log('Browser Tabs scroll controls initialized', {
			leftButton,
			rightButton,
			tabsContainer,
			leftControlsContainer
		});
	})();
}, 10000);
