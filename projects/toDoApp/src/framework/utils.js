import { dataStorage } from "./containerManager.js";

export function refreshContent() {
    window.location.reload();
}

export function debounce(callback) {
    let timeoutId;
    return function () {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            callback();
        }, 500);
    }
}


export function filterItems(filterString) {
    const initialData = dataStorage.readData();
    const result = [];
    for (let key in initialData) {
        const value = initialData[key];
        //if item meets criteria then add to result
        if (value.startsWith(filterString)) {
            result.push(value);
        }
    }
    return result;
}