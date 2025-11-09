// Browser Tabs Scroll Controls - Baby Steps Version
setTimeout(() => {
(function() {
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
            margin-left: 16px;
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
    `;
    document.head.appendChild(style);

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

    // Add buttons to container
    buttonsContainer.appendChild(leftButton);
    buttonsContainer.appendChild(rightButton);

    // Append buttons container to the left controls (will appear on the right side due to marginLeft: auto)
    leftControlsContainer.appendChild(buttonsContainer);

    // Function to check if scrollable and show/hide buttons
    function updateScrollButtons() {
        const isScrollable = tabsContainer.scrollWidth > tabsContainer.clientWidth;
        
        buttonsContainer.classList.toggle('visible', isScrollable);
        
        console.log('Tabs scrollable:', isScrollable, {
            scrollWidth: tabsContainer.scrollWidth,
            clientWidth: tabsContainer.clientWidth
        });
    }

    // Initial check
    updateScrollButtons();

    // Watch for changes (when tabs are added/removed)
    const observer = new ResizeObserver(updateScrollButtons);
    observer.observe(tabsContainer);

    // Add click handlers for scrolling
    leftButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Left button clicked, scrolling left');
        tabsContainer.scrollBy({ left: -200, behavior: 'smooth' });
    });
    
    leftButton.addEventListener('mousedown', (e) => {
        console.log('Left button mousedown detected');
    });

    rightButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Right button clicked, scrolling right');
        tabsContainer.scrollBy({ left: 200, behavior: 'smooth' });
    });
    
    rightButton.addEventListener('mousedown', (e) => {
        console.log('Right button mousedown detected');
    });
    
    // Add mouseover to test if buttons are receiving any events
    buttonsContainer.addEventListener('mouseover', () => {
        console.log('Mouse over buttons container');
    });

    console.log('Browser Tabs scroll controls initialized', {
        leftButton,
        rightButton,
        tabsContainer,
        leftControlsContainer
    });
})();
}, 10000);
