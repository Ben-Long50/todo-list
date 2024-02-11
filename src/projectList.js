import { projectList } from "./project"
import { getProjectButtons, getRemoveButtons, getEditButtons, resetProjectDetails } from "./renderDom"

export const projectContainer = document.querySelector('#project-container')

export function renderProjects() {
    while(projectContainer.firstChild) {
        projectContainer.removeChild(projectContainer.firstChild)
    }

    projectList.forEach((project, index) => {
        const projectButton = document.createElement('li')
        projectButton.classList.add('project-button')
        projectContainer.appendChild(projectButton)
        const projectTitle = document.createElement('h2')
        projectTitle.classList.add('project-title')
        projectTitle.textContent = project.name
        projectButton.appendChild(projectTitle)
        if(index > 0) {
            const buttonContainer = document.createElement('div')
            buttonContainer.classList.add('button-container')
            const editButton = document.createElement('button')
            editButton.classList.add('edit-button')
            editButton.textContent = 'Edit'
            const removeButton = document.createElement('button')
            removeButton.classList.add('remove-button')
            removeButton.textContent = 'X'
            projectButton.appendChild(buttonContainer)
            buttonContainer.appendChild(editButton)
            buttonContainer.appendChild(removeButton)
        }
    })
    getProjectButtons()
    getRemoveButtons(projectContainer)
    getEditButtons(projectContainer)
}

export function renderProjectEdit(e, index) {
    const projectButton = e.target.closest('li')
    const projectTitle = projectButton.firstChild
    const projectEditForm = document.createElement('div')
    projectEditForm.classList.add('project-edit-form')
    const projectTitleInput = document.createElement('input')
    projectTitleInput.classList.add('project-title-input')
    projectTitleInput.value = projectList[index].name
    const confirmButton = document.createElement('button')
    confirmButton.classList.add('project-confirm-button')
    confirmButton.textContent = 'Confirm'
    const cancelButton = document.createElement('button')
    cancelButton.classList.add('project-cancel-button')
    cancelButton.textContent = 'Cancel'
    projectButton.replaceChild(projectEditForm, projectTitle)
    projectEditForm.appendChild(projectTitleInput)
    projectEditForm.appendChild(confirmButton)
    projectEditForm.appendChild(cancelButton)

    cancelButton.addEventListener('click', () => {
        resetProjectDetails(index)
    })

    confirmButton.addEventListener('click', () => {
        projectList[index].name = projectTitleInput.value
        renderProjects()
    })
}