import { createEditButton } from "./editButton.js";
import { createDeleteButton } from "./deleteButtom.js";

export function createTodoItem(key, value) {
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