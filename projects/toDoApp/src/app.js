import { dataStorage } from "./framework/containerManager.js";
import { refreshContent } from "./framework/utils.js";
import { filterItems } from "./framework/utils.js";
import { debounce } from "./framework/utils.js";
import { createTodoItem } from "./components/toDoItem.js";
import { createClearAllButton } from "./components/clearAllButton.js";


const myData = dataStorage.readData();

loadData(myData);
initAddButton();
initFilterInput();

function loadData(data) {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    for (const key in data) {
        const todoItem = createTodoItem(key, data[key]);
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

function initFilterInput() {
    const filterInput = document.getElementById('filter');

    const inputHandler = event => {
        const filterText = filterInput.value;
        const filtered = filterItems(filterText);
        loadData(filtered);
    };

    const deboundcedInputHandler = debounce(() => {
        inputHandler();
    });

    filterInput.addEventListener('input', deboundcedInputHandler);
}




