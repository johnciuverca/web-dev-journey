import { DataStorage } from "../data/dataStorageAbstraction.js";
import { importData, saveItem, updateItem, removeItem } from "../data/localStorageData.js";
import { read, update, remove, create } from "../data/mongoDbStorage.js";

const localDataStorage = new DataStorage(
    importData,
    saveItem,
    removeItem,
    updateItem
);

const mongoDbStorage = new DataStorage(
    read,
    update,
    remove,
    create
);

export const dataStorage = localDataStorage;