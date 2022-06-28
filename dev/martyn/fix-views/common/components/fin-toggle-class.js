customElements.define(
  'fin-toggle-class',
  class ToggleClass extends HTMLButtonElement {
    /**
     * Runs each time the element is appended to or moved in the DOM
     */
    connectedCallback() {
      this.sync();
      this.applySettings(false);
      this.addEventListener('click', this.onclick);
    }

    /**
     * Runs when the element is removed from the DOM
     */
    disconnectedCallback() {
      this.removeEventListener('click', this.onclick);
    }

    sync() {
      if (window.fin !== undefined) {
        this.key = `fin-toggle-class-${fin.me.identity.uuid}`;

        const sync = this.getAttribute('sync') || 'true';
        if (sync.toLowerCase() !== 'false') {
          const key = this.key;
          window.addEventListener('storage', (event) => {
            if (event.key === key) {
              this.applySettings(false);
            }
          });
        } else {
          this.key += `-${fin.me.identity.name}`;
        }
      }
    }

    applySettings(toggle) {
      if (window.fin !== undefined) {
        const firstClass = this.getAttribute('first-class') || 'theme-dark';
        const secondClass = this.getAttribute('second-class') || 'theme-light';
        const height = this.getAttribute('height') || '24px';
        const width = this.getAttribute('width') || '24px';
        const firstImage = this.getAttribute('first-image');
        const secondImage = this.getAttribute('second-image');
        const target = this.getAttribute('target') || 'body';
        const key = this.key;

        const defaultFirstImage = `<svg stroke="white" fill="white" style="width:${width};height:${height}" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"></path></svg>`;
        const defaultSecondImage = `<svg stroke="currentColor" style="width:${width};height:${height}" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M14 2c1.82 0 3.53.5 5 1.35-2.99 1.73-5 4.95-5 8.65s2.01 6.92 5 8.65A9.973 9.973 0 0114 22C8.48 22 4 17.52 4 12S8.48 2 14 2z"></path></svg>`;

        const getTargetElement = document.querySelector(target);
        const classToApply = localStorage.getItem(key);
        const resolvedFirstImage =
          firstImage !== null ? `<img src="${firstImage}" height="${height}" width="${width}>` : defaultFirstImage;
        const resolvedSecondImage =
          secondImage !== null ? `<img src="${secondImage}" height="${height}" width="${width}>` : defaultSecondImage;

        const result = this.getToggledValue(
          toggle,
          classToApply,
          firstClass,
          secondClass,
          resolvedFirstImage,
          resolvedSecondImage
        );

        if (getTargetElement !== undefined && getTargetElement !== null) {
          if (!getTargetElement.classList.contains(result.classToAdd)) {
            getTargetElement.classList.add(result.classToAdd);
            getTargetElement.classList.remove(result.classToRemove);
          }
          localStorage.setItem(key, result.classToAdd);
        }

        this.innerHTML = result.image;
        this.title = 'Click to toggle style';
        this.style.height = '40px';
        this.style.width = '40px';
        this.style.padding = '0px';
        this.style.textAlign = 'center';
      }
    }

    getToggledValue(toggle, currentClass, firstClass, secondClass, firstImage, secondImage) {
      const result = {
        classToAdd: firstClass,
        classToRemove: secondClass,
        image: firstImage
      };

      if (toggle === true) {
        if (currentClass === firstClass) {
          result.classToAdd = secondClass;
          result.classToRemove = firstClass;
          result.image = secondImage;
        }
      } else {
        result.classToAdd = currentClass;
        result.classToRemove = currentClass === firstClass ? secondClass : firstClass;
        result.image = currentClass === firstClass ? firstImage : secondImage;
      }

      return result;
    }

    onclick() {
      this.applySettings(true);
    }
  },
  { extends: 'button' }
);
