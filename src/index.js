import './styles/main.css'
import { projectList, addProject } from './project.js'

const newProjectButton = document.querySelector('#new-project-button')
const newTaskButton = document.querySelector('#new-task-button')
const navBar = document.querySelector('#nav-bar')
const projectContainer = document.querySelector('#project-container')
const projectTitle = document.querySelector('#project-title')
const taskContainer = document.querySelector('#task-container')
const listContainer = document.querySelector('#list-container')
const minimizeButton = document.querySelector('#minimize-button')
let index = 0

function renderProjectForm() {
    const newProjectForm = document.createElement('div')
    newProjectForm.id = 'new-project-form'
    navBar.insertBefore(newProjectForm, newProjectButton)
    const inputLabel = document.createElement('label')
    inputLabel.for = 'project-name-input'
    inputLabel.id = 'project-name-label'
    inputLabel.textContent = 'Project Name'
    newProjectForm.appendChild(inputLabel)
    const projectInput = document.createElement('input')
    projectInput.id = 'project-name-input'
    newProjectForm.appendChild(projectInput)
    const createButton = document.createElement('button')
    createButton.id = 'create-button'
    createButton.textContent = 'Create'
    newProjectForm.appendChild(createButton)
    const cancelButton = document.createElement('button')
    cancelButton.id = 'cancel-button'
    cancelButton.textContent = 'Cancel'
    newProjectForm.appendChild(cancelButton)
    
    return {
        newProjectForm,
        projectInput,
        createButton,
        cancelButton
    }
}

function renderTaskForm() {
    const newTaskForm = document.createElement('div');
    newTaskForm.id = 'new-task-form';
    listContainer.insertBefore(newTaskForm, newTaskButton);

    createLabel('Task Name:', 'task-name-input', 'task-name-label', newTaskForm);
    const taskNameInput = createInput('task-name-input', newTaskForm);

    createLabel('Description:', 'task-desc-input', 'task-desc-label', newTaskForm);
    const taskDescInput = createInput('task-desc-input', newTaskForm);

    createLabel('Due Date:', 'task-date-input', 'task-date-label', newTaskForm);
    const taskDateInput = createInput('task-date-input', newTaskForm);

    createLabel('Priority:', 'task-priority-input', 'task-priority-label', newTaskForm);
    const taskPriorityInput = createRadioInput('task-priority-input', newTaskForm);

    const formButtons = createFormButtons(newTaskForm, 'create-task-button', 'cancel-task-button')

    return {
        newTaskForm,
        taskNameInput,
        taskDescInput,
        taskDateInput,
        taskPriorityInput,
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
}

function createRadioInput(inputId, parentElement) {
    const inputElement = document.createElement('input');
    inputElement.type = 'radio';
    inputElement.id = inputId;
    parentElement.appendChild(inputElement);
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

// function renderTaskForm() {
//     const newTaskForm = document.createElement('div')
//     newTaskForm.id = 'new-task-form'
//     listContainer.insertBefore(newTaskForm, newTaskButton)
//     const inputLabel = document.createElement('label')
//     inputLabel.for = 'task-name-input'
//     inputLabel.id = 'task-name-label'
//     inputLabel.textContent = 'Task Name'
//     newTaskForm.appendChild(inputLabel)
//     const taskNameInput = document.createElement('input')
//     taskNameInput.id = 'task-input'
//     newTaskForm.appendChild(taskNameInput)
//     inputLabel.for = 'task-desc-input'
//     inputLabel.id = 'task-desc-label'
//     inputLabel.textContent = 'Description'
//     newTaskForm.appendChild(inputLabel)
//     const taskDescInput = document.createElement('input')
//     taskDescInput.id = 'task-desc-input'
//     newTaskForm.appendChild(taskDescInput)
//     inputLabel.for = 'task-date-input'
//     inputLabel.id = 'task-date-label'
//     inputLabel.textContent = 'Due Date'
//     newTaskForm.appendChild(inputLabel)
//     const taskDateInput = document.createElement('input')
//     taskDateInput.id = 'task-date-input'
//     newTaskForm.appendChild(taskDateInput)
//     inputLabel.for = 'task-priority-input'
//     inputLabel.id = 'task-priority-label'
//     inputLabel.textContent = 'Priority'
//     newTaskForm.appendChild(inputLabel)
//     const taskPriorityInput = document.createElement('radio')
//     taskPriorityInput.id = 'task-priority-input'
//     newTaskForm.appendChild(taskPriorityInput)
//     const createButton = document.createElement('button')
//     createButton.id = 'create-button'
//     createButton.textContent = 'Create'
//     const cancelButton = document.createElement('button')
//     cancelButton.id = 'cancel-button'
//     cancelButton.textContent = 'Cancel'
//     newTaskForm.appendChild(createButton)
//     newTaskForm.appendChild(cancelButton)
//     return {
//         newTaskForm,
//         taskNameInput,
//         taskDescInput,
//         taskDateInput,
//         taskPriorityInput,
//         createButton,
//         cancelButton
//     }
// }

function renderProjects() {
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

function renderTasks() {
    projectTitle.textContent = projectList[index].name
    while(taskContainer.firstChild) {
        taskContainer.removeChild(taskContainer.firstChild)
    }
    const taskArray = projectList[index].taskList
    taskArray.forEach(task => {
        const taskItem = document.createElement('div')
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
}

function toggleProjectContainer() {
    if(projectContainer.id === 'project-container') {
        projectContainer.id = 'hidden-project-container'
    }
    else {
        projectContainer.id = 'project-container'
    }
}

minimizeButton.addEventListener('click', toggleProjectContainer)

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

newProjectButton.addEventListener('click', () => {
    if(projectContainer.nextElementSibling != newProjectButton) {
        return
    }
    const formElements = renderProjectForm()
    formElements.createButton.addEventListener('click', () => {
        addProject(formElements.projectInput.value)
        console.log(projectList)
        renderProjects()
        formElements.projectInput.value = ''
    })
    formElements.cancelButton.addEventListener('click', () => {
        navBar.removeChild(formElements.newProjectForm)
    })
})

newTaskButton.addEventListener('click', () => {
    if(taskContainer.nextElementSibling != newTaskButton) {
        return
    }
    const formElements = renderTaskForm()
    formElements.createButton.addEventListener('click', () => {
        let nameInput = formElements.taskNameInput.value
        let descInput = formElements.taskDescInput.value
        let dateInput = formElements.taskDateInput.value
        let priorityInput = formElements.taskPriorityInput.value
        projectList[index].addTask(nameInput, descInput, dateInput, priorityInput)
        console.log(projectList)
        renderTasks()
        nameInput = ''
        descInput = ''
        dateInput = ''
        priorityInput = ''
    })
    formElements.cancelButton.addEventListener('click', () => {
        listContainer.removeChild(formElements.newTaskForm)
    })
})

addProject('gym')
addProject('study')

projectList[0].addTask('bench', '4x10 at 60% 1rm', 'now', 1)
projectList[1].addTask('The Odin Project', 'Complete To-do List Project', 'now', 1)

renderProjects()
renderTasks()