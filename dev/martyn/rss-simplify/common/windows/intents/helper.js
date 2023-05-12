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

export function createOptionEntry(label, value, selected = false) {
	const option = document.createElement('option');
	option.selected = selected;
	option.value = value;
	option.text = label;
	return option;
}

export function getSelection(name) {
	const entries = document.getElementsByName(name);

	for (const element of entries) {
		if (element.checked) {
			return element.value;
		}
	}
}

export function setElementVisibility(element, isVisible) {
	element.style.display = isVisible ? 'flex' : 'none';
}
