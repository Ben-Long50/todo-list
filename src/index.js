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
    const projectInput = document.createElement('input')
    projectInput.id = 'project-name-input'
    const createButton = document.createElement('button')
    createButton.id = 'create-button'
    createButton.textContent = 'Create'
    const cancelButton = document.createElement('button')
    cancelButton.id = 'cancel-button'
    cancelButton.textContent = 'Cancel'
    navBar.insertBefore(newProjectForm, newProjectButton)
    newProjectForm.appendChild(projectInput)
    newProjectForm.appendChild(createButton)
    newProjectForm.appendChild(cancelButton)
    return {
        newProjectForm,
        projectInput,
        createButton,
        cancelButton
    }
}

function renderTaskForm() {
    const newTaskForm = document.createElement('div')
    newTaskForm.id = 'new-task-form'
    const taskNameInput = document.createElement('input')
    taskNameInput.id = 'task-input'
    const taskDescInput = document.createElement('input')
    taskDescInput.id = 'task-input'
    const taskDateInput = document.createElement('input')
    taskDateInput.id = 'task-input'
    const taskPriorityInput = document.createElement('radio')
    taskPriorityInput.id = 'task-input'
    const createButton = document.createElement('button')
    createButton.id = 'create-button'
    createButton.textContent = 'Create'
    const cancelButton = document.createElement('button')
    cancelButton.id = 'cancel-button'
    cancelButton.textContent = 'Cancel'
    listContainer.insertBefore(newTaskForm, newTaskButton)
    newTaskForm.appendChild(taskNameInput)
    newTaskForm.appendChild(taskDescInput)
    newTaskForm.appendChild(taskDateInput)
    newTaskForm.appendChild(taskPriorityInput)
    newTaskForm.appendChild(createButton)
    newTaskForm.appendChild(cancelButton)
    return {
        newTaskForm,
        taskNameInput,
        taskDescInput,
        taskDateInput,
        taskPriorityInput,
        createButton,
        cancelButton
    }
}

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
    renderProjects()
}

function getProjectButtons() {
    let projectButtons = projectContainer.querySelectorAll('.project-button')
    const projectButtonArray = Array.from(projectButtons)
    projectButtons.forEach(button => {
        button.addEventListener('click', () => {
            index = projectButtonArray.indexOf(button)
            renderTasks()
            console.log(index)
        })
    })
}

function getRemoveButtons() {
    let removeButtons = projectContainer.querySelectorAll('.remove-button')
    const removeButtonArray = Array.from(removeButtons)
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            index = removeButtonArray.indexOf(button)
            console.log(index)
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