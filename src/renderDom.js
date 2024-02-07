import { projectList, deleteProject, getAllTasks } from './project.js'
import { projectContainer, renderProjects, renderProjectEdit } from './projectList.js';
import { renderTasks, taskContainer, renderTaskEdit } from './taskList.js';

export let index = 0
export let taskIndex = 0

export function createLabel(text, inputId, labelId, parentElement) {
    const inputLabel = document.createElement('label');
    inputLabel.htmlFor = inputId;
    inputLabel.id = labelId;
    inputLabel.textContent = text;
    parentElement.appendChild(inputLabel);
}

export function createInput(inputId, parentElement, type) {
    const inputElement = document.createElement('input');
    inputElement.id = inputId;
    inputElement.type = type
    parentElement.appendChild(inputElement);
}

export function createEditInput(inputId, parentElement, oldElement, type) {
    const inputElement = document.createElement('input');
    inputElement.id = inputId;
    inputElement.type = type
    parentElement.replaceChild(inputElement, oldElement);
}

export function createRadioInput(inputClass, parentElement, valueArray) {
    const elementContainer = document.createElement('div')
    elementContainer.id = 'radio-container'
    parentElement.appendChild(elementContainer)

    for(let i = 0; i < valueArray.length; i++) {
        createLabel(valueArray[i], inputClass, null, elementContainer)
        const inputElement = document.createElement('input');
        inputElement.type = 'radio';
        inputElement.classList.add(inputClass);
        inputElement.value = valueArray[i]
        elementContainer.appendChild(inputElement);
    }
}

export function createFormButtons (parentElement, createButtonId, cancelButtonId) {
    const createButton = document.createElement('button');
    createButton.classList.add('create-button');
    createButton.id = createButtonId;
    createButton.textContent = 'Create';

    const cancelButton = document.createElement('button');
    cancelButton.classList.add('cancel-button');
    cancelButton.id = cancelButtonId;
    cancelButton.textContent = 'Cancel';

    parentElement.appendChild(createButton);
    parentElement.appendChild(cancelButton);

    return {
        createButton,
        cancelButton
    }
}

export function getProjectButtons() {
    let projectButtons = projectContainer.querySelectorAll('.project-button')
    const projectButtonArray = Array.from(projectButtons)
    projectButtons.forEach(button => {
        button.addEventListener('click', () => {
            index = projectButtonArray.indexOf(button)
            renderTasks()
        })
    })
}

export function getTaskButtons() {
    let taskButtons = taskContainer.querySelectorAll('.task-item')
    const taskButtonArray = Array.from(taskButtons)
    taskButtons.forEach(button => {
        button.addEventListener('click', () => {
            taskIndex = taskButtonArray.indexOf(button)
            console.log(taskIndex)
            const taskDetails = button.querySelector('.task-details')
            if(taskDetails.style.display === 'none') {
                taskDetails.style.display = 'grid'
            }

            else if(taskDetails.firstChild.tagName === 'input') {
                return
            }

            else{
                taskDetails.style.display = 'none'
            }
        })
    })
}

export function getRemoveButtons(container) {
    let removeButtons = container.querySelectorAll('.remove-button')
    const removeButtonArray = Array.from(removeButtons)
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            if(container === projectContainer) {
                index = removeButtonArray.indexOf(button)
                deleteProject(index)
            }
            else if(container === taskContainer) {
                taskIndex = removeButtonArray.indexOf(button)
                projectList[index].deleteTask(taskIndex)
            }
            renderProjects()
            renderTasks()
        })
    })
}

export function getEditButtons(container) {
    let editButtons = container.querySelectorAll('.edit-button')
    const editButtonArray = Array.from(editButtons)
    editButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if(container === projectContainer) {
                index = editButtonArray.indexOf(button)
                renderProjectEdit(e, index)
            }
            else if(container === taskContainer) {
                taskIndex = editButtonArray.indexOf(button)
                renderTaskEdit(e, index, taskIndex)
                getTaskButtons()
            }
        })
    })
}