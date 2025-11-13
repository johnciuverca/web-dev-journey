
export class DataStorage {
    constructor(
        readDataImpl,
        createDataImpl,
        deleteDataImpl,
        updateDataImpl,
    ) {
        this._readData = readDataImpl
        this._createData = createDataImpl;
        this._deleteData = deleteDataImpl;
        this._updateData = updateDataImpl;
    }
    readData() {
        return this._readData();
    }

    createData(value) {
        return this._createData(value);
    }

    deleteData(id) {
        return this._deleteData(id);
    }

    updateData(id, newValue) {
        return this._updateData(id, newValue);
    }

}