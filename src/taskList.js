import { projectList } from "./project"
import { getTaskButtons, getRemoveButtons, index } from "./renderDom"
import { formatDistanceToNowStrict } from 'date-fns'

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
            const taskRemoveButton = document.createElement('button')
            taskRemoveButton.classList.add('remove-button')
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