import './styles/main.css'
import { projectList, addProject, addTasktoProject } from './project.js'

const newProjectButton = document.querySelector('#new-project-button')
const navBar = document.querySelector('#nav-bar')
const projectContainer = document.querySelector('#project-container')
let removeButtons = projectContainer.querySelectorAll('.remove-button')
const minimizeButton = document.querySelector('#minimize-button')

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
    getRemoveButtons()
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

function removeProject(childElement) {
    const projectArray = Array.from(projectContainer.children)
    const parentElement = childElement.closest('li')
    const index = projectArray.indexOf(parentElement)
    console.log(projectArray)
    console.log(index)
    projectList.splice(index, 1)
    renderProjects()
}

function getRemoveButtons() {
    removeButtons = document.querySelectorAll('.remove-button')
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            removeProject(button)
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
