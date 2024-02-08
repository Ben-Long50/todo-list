import { projectList } from "./project"
import { getTaskButtons, getRemoveButtons, getEditButtons, index, createEditInput, resetTaskDetails } from "./renderDom"
import { format, formatDistanceToNowStrict } from 'date-fns'

export const taskContainer = document.querySelector('#task-container')
const projectTitle = document.querySelector('#project-title')

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
            const buttonContainer = document.createElement('div')
            buttonContainer.classList.add('button-container')
            const taskEditButton = document.createElement('button')
            taskEditButton.classList.add('edit-button')
            taskEditButton.textContent = 'Edit'
            const taskRemoveButton = document.createElement('button')
            taskRemoveButton.classList.add('remove-button')
            taskRemoveButton.textContent = 'X'
            const taskDetails = document.createElement('div')
            taskDetails.classList.add('task-details')
            taskDetails.style.display = 'none'
            const taskDesc = document.createElement('p')
            taskDesc.classList.add('task-description')
            taskDesc.textContent = task.description
            const taskDate = document.createElement('p')
            taskDate.classList.add('task-date')
            taskDate.textContent = 'Due Date: ' + format(task.dueDate, 'LLLL dd, yyyy')
            const taskPriority = document.createElement('p')
            taskPriority.classList.add('task-priority')
            taskPriority.textContent = 'Priority: ' + task.priority
            taskContainer.appendChild(taskItem)
            taskItem.appendChild(taskTitle)
            taskItem.appendChild(taskTimeLeft)
            taskItem.appendChild(buttonContainer)
            buttonContainer.appendChild(taskEditButton)
            buttonContainer.appendChild(taskRemoveButton)
            taskItem.appendChild(taskDetails)
            taskDetails.appendChild(taskDesc)
            taskDetails.appendChild(taskDate)
            taskDetails.appendChild(taskPriority)
        })
    }
    getTaskButtons()
    getRemoveButtons(taskContainer)
    getEditButtons(taskContainer)
}

export function renderTaskEdit(e, index, taskIndex) {
    const taskButton = e.target.closest('li')
    const taskTitle = taskButton.querySelector('.task-title')
    const taskDetails = taskButton.querySelector('.task-details')
    const taskDesc = taskButton.querySelector('.task-description')
    const taskDueDate = taskButton.querySelector('.task-date')
    const taskPriority = taskButton.querySelector('task-priority')
    const editButtonContainer = document.createElement('div')
    editButtonContainer.classList.add('edit-button-container')
    createEditInput('edit-title-input', taskButton, taskTitle, 'text', projectList[index].taskList[taskIndex].title)
    createEditInput('edit-desc-input', taskDetails, taskDesc, 'text', projectList[index].taskList[taskIndex].description)
    createEditInput('edit-date-input', taskDetails, taskDueDate, 'date', format(projectList[index].taskList[taskIndex].dueDate, 'mm/dd/yyyy'))
    // createEditInput('edit-priority-input', taskDetails, taskPriority, 'text')
    const confirmButton = document.createElement('button')
    confirmButton.classList.add('project-confirm-button')
    confirmButton.textContent = 'Confirm'
    const cancelButton = document.createElement('button')
    cancelButton.classList.add('project-cancel-button')
    cancelButton.textContent = 'Cancel'
    taskDetails.appendChild(editButtonContainer)
    editButtonContainer.appendChild(confirmButton)
    editButtonContainer.appendChild(cancelButton)
    cancelButton.addEventListener('click', () => {
        resetTaskDetails(index)
    })

    confirmButton.addEventListener('click', () => {
        const taskTitleInput = taskButton.querySelector('#edit-title-input')
        const taskDescInput = taskButton.querySelector('#edit-desc-input')
        const taskDateInput = taskButton.querySelector('#edit-date-input')
        projectList[index].taskList[taskIndex].title = taskTitleInput.value
        projectList[index].taskList[taskIndex].description = taskDescInput.value
        projectList[index].taskList[taskIndex].dueDate = taskDateInput.value
        renderTasks()
    })
}