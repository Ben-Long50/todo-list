import { projectList, addProject } from './project.js'

export const newProjectButton = document.querySelector('#new-project-button')
export const newTaskButton = document.querySelector('#new-task-button')
export const navBar = document.querySelector('#nav-bar')
export const projectContainer = document.querySelector('#project-container')
const projectTitle = document.querySelector('#project-title')
export const taskContainer = document.querySelector('#task-container')
export const listContainer = document.querySelector('#list-container')
export const minimizeButton = document.querySelector('#minimize-button')
export let index = 0

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
    createInput('task-name-input', newTaskForm);

    createLabel('Description:', 'task-desc-input', 'task-desc-label', newTaskForm);
    createInput('task-desc-input', newTaskForm);

    createLabel('Due Date:', 'task-date-input', 'task-date-label', newTaskForm);
    createInput('task-date-input', newTaskForm);

    createLabel('Priority:', 'task-priority-input', 'task-priority-label', newTaskForm);
    createRadioInput('task-priority-input', newTaskForm, 3);

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

function createInput(inputId, parentElement) {
    const inputElement = document.createElement('input');
    inputElement.id = inputId;
    parentElement.appendChild(inputElement);

    return {
        nameValue: inputElement.value
    }
}

function createRadioInput(inputClass, parentElement, n) {
    const elementContainer = document.createElement('div')
    elementContainer.id = 'radio-container'
    parentElement.appendChild(elementContainer)

    for(let i = 1; i <= n; i++) {
        const inputElement = document.createElement('input');
        inputElement.type = 'radio';
        inputElement.classList.add(inputClass);
        elementContainer.appendChild(inputElement);
        console.log(i)
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
    getRemoveButtons()
}

export function renderTasks() {
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
        const taskDetails = document.createElement('div')
        taskDetails.classList.add('task-details')
        const taskDesc = document.createElement('p')
        taskDesc.classList.add('task-description')
        taskDesc.textContent = task.description
        const taskDate = document.createElement('h2')
        taskDate.classList.add('task-date')
        taskDate.textContent = task.dueDate
        const taskPriority = document.createElement('p')
        taskPriority.classList.add('task-priority')
        taskContainer.appendChild(taskItem)
        taskItem.appendChild(taskTitle)
        taskItem.appendChild(taskDetails)
        taskDetails.appendChild(taskDesc)
        taskDetails.appendChild(taskDate)
        taskDetails.appendChild(taskPriority)
    })
    getTaskButtons()
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
    projectList.splice(index, 1)
    index = index - 1
    console.log(index)
    renderProjects()
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

function getRemoveButtons() {
    let removeButtons = projectContainer.querySelectorAll('.remove-button')
    const removeButtonArray = Array.from(removeButtons)
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            index = removeButtonArray.indexOf(button)
            removeProject()
        })
    })
}

function getTaskButtons() {
    let taskButtons = taskContainer.querySelectorAll('.task-item')
    const taskButtonArray = Array.from(taskButtons)
    taskButtons.forEach(button => {
        button.addEventListener('click', () => {
            index = taskButtonArray.indexOf(button)
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

gym.addTask('bench', '4x10 at 60% 1rm', 'now', 1)
study.addTask('The Odin Project', 'Complete To-do List Project', 'now', 1)

renderProjects()
renderTasks()