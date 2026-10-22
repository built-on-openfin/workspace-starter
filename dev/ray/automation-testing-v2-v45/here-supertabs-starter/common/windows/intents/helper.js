/**
 * Create a radio button.
 * @param name The name for the button.
 * @param label The label for the button.
 * @param value The value for the button.
 * @param checked Is the button checked by default.
 * @returns The create radio button with label fieldset.
 */
export function createRadioEntry(name, label, value, checked = false) {
	const fieldset = document.createElement('fieldset');
	const radioButton = document.createElement('input');

	radioButton.type = 'radio';
	radioButton.id = value;
	radioButton.value = value;
	radioButton.name = name;
	radioButton.checked = checked;

	const labelForRadioButton = document.createElement('label');
	labelForRadioButton.setAttribute('for', value);
	labelForRadioButton.textContent = label;

	fieldset.classList.add('row');
	fieldset.classList.add('middle');

	fieldset.append(radioButton);
	fieldset.append(labelForRadioButton);
	return fieldset;
}

/**
 * Create an option entry for a select element.
 * @param label The label to display.
 * @param value The value to associated with the entry.
 * @param selected Is the entry selected.
 * @returns The create option element.
 */
export function createOptionEntry(label, value, selected = false) {
	const option = document.createElement('option');
	option.selected = selected;
	option.value = value;
	option.text = label;
	return option;
}

/**
 * Get the selected entry from a named element.
 * @param name The name to lookup.
 * @returns The value of the selected entry.
 */
export function getSelection(name) {
	const entries = document.getElementsByName(name);

	for (const element of entries) {
		if (element.checked) {
			return element.value;
		}
	}
}

/**
 * Set the visibility for an element.
 * @param element The element to change the visibility.
 * @param isVisible Is the element visible.
 */
export function setElementVisibility(element, isVisible) {
	element.style.display = isVisible ? 'flex' : 'none';
}
