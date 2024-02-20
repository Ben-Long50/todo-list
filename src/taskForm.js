import { projectList } from "./project"
import { createLabel, createInput, createRadioInput, createFormButtons, index } from "./renderDom"
import { renderTasks, taskContainer } from "./taskList"

export const newTaskButton = document.querySelector('#new-task-button')
export const listContainer = document.querySelector('#list-container')

export function renderTaskForm() {
    const newTaskForm = document.createElement('div');
    newTaskForm.id = 'new-task-form';
    listContainer.insertBefore(newTaskForm, newTaskButton);

    createLabel('Task Name:', 'task-name-input', 'task-name-label', newTaskForm);
    createInput('task-name-input', newTaskForm, 'text');

    createLabel('Description:', 'task-desc-input', 'task-desc-label', newTaskForm);
    createInput('task-desc-input', newTaskForm, 'text');

    createLabel('Due Date:', 'task-date-input', 'task-date-label', newTaskForm);
    createInput('task-date-input', newTaskForm, 'date');

    createLabel('Priority:', 'task-priority-input', 'task-priority-label', newTaskForm);
    createRadioInput('task-priority-input', newTaskForm, ['5', '4', '3', '2', '1']);

    const formButtons = createFormButtons(newTaskForm, 'create-task-button', 'cancel-task-button')

    return {
        newTaskForm,
        createButton: formButtons.createButton,
        cancelButton: formButtons.cancelButton
    }
}

newTaskButton.addEventListener('click', () => {
    if(taskContainer.nextElementSibling != newTaskButton) {
        return
    }
    const formElements = renderTaskForm()
    formElements.createButton.addEventListener('click', () => {
        const nameValue = document.getElementById('task-name-input').value
        const descValue = document.getElementById('task-desc-input').value
        const dateValue = document.getElementById('task-date-input').value
        const priorityValues = document.querySelectorAll('.task-priority-input')
        function getRaidoValue() {
            for(const radio of priorityValues) {
                if(radio.checked) {
                    return radio.value
                }
            }
        }
        const priorityValue = getRaidoValue()
        projectList[index].addTask(nameValue, descValue, dateValue, priorityValue)
        renderTasks(dateValue)
        document.getElementById('task-name-input').value = ''
        document.getElementById('task-desc-input').value = ''
        document.getElementById('task-date-input').value = ''
        const radioInputs = document.querySelectorAll('.task-priority-input')
        for(const input of radioInputs) {
            input.checked = false
        }
    })
    formElements.cancelButton.addEventListener('click', () => {
        listContainer.removeChild(formElements.newTaskForm)
    })
})
