import { projectList, deleteProject, getAllTasks } from './project.js'
import { projectContainer, renderProjects, renderProjectEdit } from './projectList.js';
import { renderTasks, taskContainer, renderTaskEdit } from './taskList.js';
import { format } from 'date-fns';

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

export function createEditInput(inputId, parentElement, oldElement, type, preFilledValue) {
    const inputElement = document.createElement('input')
    inputElement.id = inputId
    inputElement.type = type
    inputElement.value = preFilledValue || ''
    parentElement.replaceChild(inputElement, oldElement)
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

function setDetailDisplay(element) {
    const taskButton = element.closest('li')
    if(!taskButton) {
        return
    }
    const taskDetails = taskButton.querySelector('.task-details')
    if(taskDetails.firstChild.tagName.toLowerCase() === 'input' && taskDetails.style.display === 'grid') {
        return
    }
    else if(taskDetails.style.display === 'none') {
        taskDetails.style.display = 'grid'
    }
    else{
        taskDetails.style.display = 'none'
    }
}

function getTaskIndex(element) {
    let taskButtons = taskContainer.querySelectorAll('.task-item')
    const taskButtonArray = Array.from(taskButtons)
    const focusedParent = element.closest('li')
    for(let i = 0; i < taskButtonArray.length; i++) {
        if(taskButtonArray[i] === focusedParent) {
            taskIndex = i
            return taskIndex
        }
        else {
            continue
        }
    }
}

export function getTaskButtons() {
    const taskButtons = taskContainer.querySelectorAll('.task-item')
    taskButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            getTaskIndex(e.target)
            setDetailDisplay(e.target)
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

export function resetProjectDetails(index) {
    const project = projectList[index]
    const projectEditForm = projectContainer.querySelector('.project-edit-form')
    const parentElement = projectEditForm.closest('li')
    const projectTitle = document.createElement('h2')
    projectTitle.classList.add('project-title')
    projectTitle.textContent = project.name
    parentElement.replaceChild(projectTitle, projectEditForm)
}

export function resetTaskDetails(index) {
    const titleInput = taskContainer.querySelector('#edit-title-input')
    const descInput = taskContainer.querySelector('#edit-desc-input')
    const dateInput = taskContainer.querySelector('#edit-date-input')
    const editButtonContainer = taskContainer.querySelector('.edit-button-container')
    const parentElement = titleInput.closest('li')
    const taskDetails = parentElement.querySelector('.task-details')
    const taskIndex = getTaskIndex(titleInput)
    const task = projectList[index].taskList[taskIndex]
    const taskTitle = document.createElement('h2')
    taskTitle.classList.add('task-title')
    taskTitle.textContent = task.title
    const taskDesc = document.createElement('p')
    taskDesc.classList.add('task-description')
    taskDesc.textContent = task.description
    const taskDate = document.createElement('p')
    taskDate.classList.add('task-date')
    taskDate.textContent = 'Due Date: ' + format(task.dueDate, 'LLLL dd, yyyy')
    parentElement.replaceChild(taskTitle, titleInput)
    taskDetails.replaceChild(taskDesc, descInput)
    taskDetails.replaceChild(taskDate, dateInput)
    taskDetails.style.display = 'none'
    taskDetails.removeChild(editButtonContainer)
}

export function getEditButtons(container) {
    let editButtons = container.querySelectorAll('.edit-button')
    const editButtonArray = Array.from(editButtons)
    editButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if(container === projectContainer) {
                if(projectContainer.querySelector('.project-title-input')) {
                    resetProjectDetails(index)
                }
                index = editButtonArray.indexOf(button)
                renderProjectEdit(e, index)
            }
            else if(container === taskContainer) {
                if(taskContainer.querySelector('#edit-title-input')) {
                    resetTaskDetails(index)
                }
                taskIndex = editButtonArray.indexOf(button)
                renderTaskEdit(e, index, taskIndex)
            }
        })
    })
}