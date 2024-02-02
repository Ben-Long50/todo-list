
import './styles/main.css'
import './styles/project-form.css'
import './styles/task-form.css'
import './styles/task-item.css'
import { format } from 'date-fns'
import { renderProjectForm, renderTaskForm, renderProjects, renderTasks, newProjectButton, newTaskButton, projectContainer, taskContainer, listContainer, navBar, minimizeButton, toggleProjectContainer, index } from "./renderDom.js"
import { projectList, addProject } from './project.js'

newProjectButton.addEventListener('click', () => {
    if(projectContainer.nextElementSibling != newProjectButton) {
        return
    }
    const formElements = renderProjectForm()
    formElements.createButton.addEventListener('click', () => {
        const element = document.getElementById('project-name-input')
        const nameValue = element.value
        addProject(nameValue)
        renderProjects()
        element.value = ''
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
        const nameValue = document.getElementById('task-name-input').value
        const descValue = document.getElementById('task-desc-input').value
        const dateValue = format(document.getElementById('task-date-input').value, 'LLLL dd, yyyy')
        // let priorityInput = formElements.taskPriorityInput.value
        projectList[index].addTask(nameValue, descValue, dateValue, 1)
        console.log(projectList)
        renderTasks(dateValue)
        document.getElementById('task-name-input').value = ''
        document.getElementById('task-desc-input').value = ''
        document.getElementById('task-date-input').value = ''
        // priorityInput = ''
    })
    formElements.cancelButton.addEventListener('click', () => {
        listContainer.removeChild(formElements.newTaskForm)
    })
})

minimizeButton.addEventListener('click', toggleProjectContainer)