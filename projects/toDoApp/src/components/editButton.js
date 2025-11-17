import { refreshContent } from "../framework/utils.js";
import { dataStorage } from "../framework/containerManager.js";

export function createEditButton(key) {
    const button = document.createElement('button');
    button.textContent = 'Edit';
    button.addEventListener('click', () => {
        const newValue = prompt('Enter new value:');
        if (newValue !== null) {
            dataStorage.updateData(key, newValue);
            refreshContent();
        }
    });
    return button;
}