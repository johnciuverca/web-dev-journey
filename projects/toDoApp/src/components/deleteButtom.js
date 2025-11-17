import { refreshContent } from "../framework/utils.js";
import { dataStorage } from "../framework/containerManager.js";

export function createDeleteButton(key) {
    const button = document.createElement('button');
    button.textContent = 'Delete';
    button.addEventListener('click', () => {
        const confirmed = confirm('Are you sure you want to delete this item?');
        if (!confirmed) return;
        dataStorage.deleteData(key);
        refreshContent();
    });
    return button;
}