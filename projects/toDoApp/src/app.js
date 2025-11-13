import { dataStorage } from "./containerManager.js";
import { filterItems } from "./localStorageData.js";

const myData = dataStorage.readData();

loadData(myData);
initAddButton();
initApplyFilterButton();

function refreshContent() {
    window.location.reload();
}

function loadData(data) {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = ''; // Clear existing list items
    for (const key in data) {
        const todoItem = createTodoItem(key, myData[key]);
        todoList.appendChild(todoItem);
    }

    const existingClearButton = document.getElementById("del");
    const buttonExists = existingClearButton !== null;
    const hasElements = Object.entries(myData).length > 0;
    if (!buttonExists && hasElements) {
        const clearAllButton = createClearAllButton();
        clearAllButton.setAttribute("id", "del");
        todoList.appendChild(clearAllButton);
    }

}

function initAddButton() {
    const addButton = document.getElementById('add-todo');
    const newTodoInput = document.getElementById('new-todo');
    addButton.addEventListener('click', () => {
        dataStorage.createData(newTodoInput.value);

        refreshContent();
    });
}

function initApplyFilterButton() {
    const applyFilterButton = document.getElementById('apply-filter');
    const newFilterInput = document.getElementById('filter');
    applyFilterButton.addEventListener('click', () => {
        const filterString = newFilterInput.value;
        const filtered = filterItems(filterString);
        loadData(filtered);
    })
}

function createTodoItem(key, value) {
    const listItem = document.createElement('li');
    listItem.setAttribute("id", key);

    const deleteButton = createDeleteButton(key);
    listItem.appendChild(deleteButton);

    const editButton = createEditButton(key);
    listItem.appendChild(editButton);

    const textLabel = document.createElement('span');
    textLabel.textContent = `.   ${value}`;
    listItem.appendChild(textLabel);

    return listItem;
}

function createDeleteButton(key) {
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

function createEditButton(key) {
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

function createClearAllButton() {
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


