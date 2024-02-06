import { addProject } from "./project"
import { createLabel, createInput, createFormButtons } from "./renderDom"
import { projectContainer, renderProjects } from "./projectList"

export const newProjectButton = document.querySelector('#new-project-button')
export const navBar = document.querySelector('#nav-bar')

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

newProjectButton.addEventListener('click', () => {
    console.log('hello')
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