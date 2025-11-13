import { DataStorage } from "./abstraction.js";
import { importData, saveItem, updateItem, removeItem } from "./localStorageData.js";
import { read, update, remove, create } from "./mongoDbStorage.js";

export const dataStorage = new DataStorage(
    importData,
    saveItem,
    removeItem,
    updateItem
);