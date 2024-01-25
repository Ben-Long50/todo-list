export const projectList = [];

export default class Project {
    constructor(name) {
        this.name = name;
        this.taskList = [];
    }

    createTask(title, description, dueDate, priority) {
        return {
            title,
            description,
            dueDate,
            priority,
        }
    }

    addTask(task) {
        this.taskList.push(task)
    }
}

export function addProject(projectName) {
    const newProject = new Project(projectName)
    projectList.push(newProject)
    return newProject
}

export function addTasktoProject(project, title, description, dueDate, priority) {
    const newTask = project.createTask(title, description, dueDate, priority)
    project.addTask(newTask)
}