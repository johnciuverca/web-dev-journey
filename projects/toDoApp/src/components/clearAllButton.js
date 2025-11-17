import { refreshContent } from "../framework/utils.js";
import { dataStorage } from "../framework/containerManager.js";

export function createClearAllButton() {
    const clearAllButtom = document.createElement('button');
    clearAllButtom.textContent = 'Clear All';
    clearAllButtom.addEventListener('click', () => {
        const toDoListItem = document.getElementById('todo-list');
        for (let i = 0; i < toDoListItem.children.length; i++) {
            const child = toDoListItem.children[i];
            const key = child.getAttribute("id");
            dataStorage.deleteData(key);
        }
        refreshContent();
    });
    return clearAllButtom;
}