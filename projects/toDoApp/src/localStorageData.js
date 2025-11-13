const localStoragePrefix = 'todo_';


export function importData() {
    const rawData = readLocalStorage();
    const myData = filterMyData(rawData);
    return myData;
}

export function saveItem(value) {
    const key = nextAvailableKey(readLocalStorage());
    const newTodo = value.trim();
    if (newTodo === '') return;
    const fullKey = secureKey(key);
    localStorage.setItem(fullKey, newTodo);
    return key;
}

export function removeItem(key) {
    try {
        const fullKey = secureKey(key);
        localStorage.removeItem(fullKey);
        return true;
    } catch {
        return false;
    }
}

export function updateItem(key, newValue) {
    const fullKey = secureKey(key);
    const updatedTodo = newValue.trim();
    if (updatedTodo === '') return false;
    localStorage.setItem(fullKey, updatedTodo);
    return true;
}

export function filterItems(filterString) {
    const initialData = importData();
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
/* helpers */


function filterMyData(data) {
    let result = {};
    for (const key in data) {
        if (key.startsWith(localStoragePrefix)) {
            const sanitizedKey = unsecureKey(key);
            result[sanitizedKey] = data[key];
        }
    }
    return result;
}

function readLocalStorage() {
    let result = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);

        try {
            result[key] = JSON.parse(value);
        } catch (e) {
            result[key] = value;
        }
    }
    return result;
}

function secureKey(key) {
    return localStoragePrefix + key;
}

function unsecureKey(key) {
    if (key.startsWith(localStoragePrefix)) {
        return key.slice(localStoragePrefix.length);
    }
    return key;
}

function nextAvailableKey(localStorageData) {
    let sanitizedKeys = Object.keys(localStorageData)
        .filter(key => key.startsWith(localStoragePrefix))
        .map(key => unsecureKey(key));
    return getMaxKey(sanitizedKeys) + 1;
}

function getMaxKey(keys) {
    const numericKeys = keys.map(key => parseInt(key)).filter(num => !isNaN(num));
    if (numericKeys.length === 0)
        return 0;
    return Math.max(...numericKeys);
}

