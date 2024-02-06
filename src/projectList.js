import { projectList } from "./project"
import { getProjectButtons, getRemoveButtons } from "./renderDom"

export const projectContainer = document.querySelector('#project-container')
const minimizeButton = document.querySelector('#minimize-button')

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

function toggleProjectContainer() {
    if(projectContainer.id === 'project-container') {
        projectContainer.id = 'hidden-project-container'
    }
    else {
        projectContainer.id = 'project-container'
    }
}

minimizeButton.addEventListener('click', toggleProjectContainer)