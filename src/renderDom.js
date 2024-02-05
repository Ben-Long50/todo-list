import { projectList, addProject } from './project.js'
import { formatDistanceToNowStrict } from 'date-fns'

export const newProjectButton = document.querySelector('#new-project-button')
export const newTaskButton = document.querySelector('#new-task-button')
export const navBar = document.querySelector('#nav-bar')
export const projectContainer = document.querySelector('#project-container')
const projectTitle = document.querySelector('#project-title')
export const taskContainer = document.querySelector('#task-container')
export const listContainer = document.querySelector('#list-container')
export const minimizeButton = document.querySelector('#minimize-button')
export let index = 0
let taskIndex = 0

export function renderProjectForm() {
    const newProjectForm = document.createElement('div')
    newProjectForm.id = 'new-project-form'
    navBar.insertBefore(newProjectForm, newProjectButton)

    createLabel('Project Name:', 'project-name-input', 'project-name-label', newProjectForm)
    createInput('project-name-input', newProjectForm);

    const formButtons = createFormButtons(newProjectForm, 'create-project-button', 'cancel-project-button')
    
    return {
        newProjectForm,
        createButton: formButtons.createButton,
        cancelButton: formButtons.cancelButton
    }
}

export function renderTaskForm() {
    const newTaskForm = document.createElement('div');
    newTaskForm.id = 'new-task-form';
    listContainer.insertBefore(newTaskForm, newTaskButton);

    createLabel('Task Name:', 'task-name-input', 'task-name-label', newTaskForm);
    createInput('task-name-input', newTaskForm, 'text');

    createLabel('Description:', 'task-desc-input', 'task-desc-label', newTaskForm);
    createInput('task-desc-input', newTaskForm, 'text');

    createLabel('Due Date:', 'task-date-input', 'task-date-label', newTaskForm);
    createInput('task-date-input', newTaskForm, 'date');

    createLabel('Priority:', 'task-priority-input', 'task-priority-label', newTaskForm);
    createRadioInput('task-priority-input', newTaskForm, ['High', 'Medium', 'Low', 'None']);

    const formButtons = createFormButtons(newTaskForm, 'create-task-button', 'cancel-task-button')

    return {
        newTaskForm,
        createButton: formButtons.createButton,
        cancelButton: formButtons.cancelButton
    }
}

function createLabel(text, inputId, labelId, parentElement) {
    const inputLabel = document.createElement('label');
    inputLabel.htmlFor = inputId;
    inputLabel.id = labelId;
    inputLabel.textContent = text;
    parentElement.appendChild(inputLabel);
}

function createInput(inputId, parentElement, type) {
    const inputElement = document.createElement('input');
    inputElement.id = inputId;
    inputElement.type = type
    parentElement.appendChild(inputElement);
}

function createRadioInput(inputClass, parentElement, valueArray) {
    const elementContainer = document.createElement('div')
    elementContainer.id = 'radio-container'
    parentElement.appendChild(elementContainer)

    for(let i = 0; i < valueArray.length; i++) {
        const inputElement = document.createElement('input');
        inputElement.type = 'radio';
        inputElement.classList.add(inputClass);
        inputElement.value = valueArray[i]
        elementContainer.appendChild(inputElement);
    }
}

function createFormButtons (parentElement, createButtonId, cancelButtonId) {
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

export function renderProjects() {
    while(projectContainer.firstChild) {
        projectContainer.removeChild(projectContainer.firstChild)
    }

    projectList.forEach(project => {
        const projectButton = document.createElement('li')
        projectButton.classList.add('project-button')
        const projectTitle = document.createElement('h2')
        projectTitle.classList.add('project-title')
        projectTitle.textContent = project.name
        projectButton.appendChild(projectTitle)
        const removeButton = document.createElement('button')
        removeButton.classList.add('remove-button')
        removeButton.textContent = 'X'
        projectButton.appendChild(removeButton)
        projectContainer.appendChild(projectButton)
    })
    getProjectButtons()
    getRemoveButtons(projectContainer)
}

export function renderTasks() {
    if(projectList[index]) {
        projectTitle.textContent = projectList[index].name
        while(taskContainer.firstChild) {
            taskContainer.removeChild(taskContainer.firstChild)
        }
        const taskArray = projectList[index].taskList
        taskArray.forEach(task => {
            const taskItem = document.createElement('li')
            taskItem.classList.add('task-item')
            const taskTitle = document.createElement('h2')
            taskTitle.classList.add('task-title')
            taskTitle.textContent = task.title
            const taskTimeLeft = document.createElement('div')
            taskTimeLeft.classList.add('task-time-left')
            console.log(task.dueDate)
            taskTimeLeft.textContent = 'Due in: ' + formatDistanceToNowStrict(new Date(task.dueDate))
            const taskRemoveButton = document.createElement('button')
            taskRemoveButton.classList.add('task-remove-button')
            taskRemoveButton.textContent = 'X'
            const taskDetails = document.createElement('div')
            taskDetails.classList.add('task-details')
            const taskDesc = document.createElement('p')
            taskDesc.classList.add('task-description')
            taskDesc.textContent = task.description
            const taskDate = document.createElement('p')
            taskDate.classList.add('task-date')
            taskDate.textContent = 'Due Date: ' + task.dueDate
            const taskPriority = document.createElement('p')
            taskPriority.classList.add('task-priority')
            taskPriority.textContent = 'Priority: ' + task.priority
            taskContainer.appendChild(taskItem)
            taskItem.appendChild(taskTitle)
            taskItem.appendChild(taskTimeLeft)
            taskItem.appendChild(taskRemoveButton)
            taskItem.appendChild(taskDetails)
            taskDetails.appendChild(taskDesc)
            taskDetails.appendChild(taskDate)
            taskDetails.appendChild(taskPriority)
        })
    }
    getTaskButtons()
    getRemoveButtons(taskContainer)
}

export function toggleProjectContainer() {
    if(projectContainer.id === 'project-container') {
        projectContainer.id = 'hidden-project-container'
    }
    else {
        projectContainer.id = 'project-container'
    }
}

function removeProject() {
    if(index === 0) {
        return
    }
    projectList.splice(index, 1)
    index = index - 1
    console.log(index)
    renderProjects()
    renderTasks()
}

function removeTask() {
    projectList[index].taskList.splice(taskIndex, 1)
    taskIndex = taskIndex - 1
    console.log(taskIndex)
    renderTasks()
}

function getProjectButtons() {
    let projectButtons = projectContainer.querySelectorAll('.project-button')
    const projectButtonArray = Array.from(projectButtons)
    projectButtons.forEach(button => {
        button.addEventListener('click', () => {
            index = projectButtonArray.indexOf(button)
            renderTasks()
        })
    })
}

function getRemoveButtons(container) {
    let removeButtons = container.querySelectorAll('.remove-button')
    const removeButtonArray = Array.from(removeButtons)
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            index = removeButtonArray.indexOf(button)
            if(container === projectContainer) {
                removeProject()
            }
            else if(container === taskContainer) {
                removeTask()
            }
        })
    })
}

function getTaskButtons() {
    let taskButtons = taskContainer.querySelectorAll('.task-item')
    const taskButtonArray = Array.from(taskButtons)
    taskButtons.forEach(button => {
        button.addEventListener('click', () => {
            taskIndex = taskButtonArray.indexOf(button)
            const taskDetails = button.querySelector('.task-details')
            if(taskDetails.style.display === 'none') {
                taskDetails.style.display = 'grid'
            }
            else {
                taskDetails.style.display = 'none'
            }
        })
    })
}
addProject('Default')
const gym = addProject('gym')
const study = addProject('study')

gym.addTask('bench', '4x10 at 60% 1rm', 'Febrary, 11 2024', 'High')
study.addTask('The Odin Project', 'Complete To-do List Project', 'February, 12 2024', 'Low')

renderProjects()
renderTasks()