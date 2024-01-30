export const projectList = [];

export default class Project {
    constructor(name) {
        this.name = name;
        this.taskList = [];
    }

    addTask(title, description, dueDate, priority) {
        const newTask = new Task(title, description, dueDate, priority)
        this.taskList.push(newTask)
    }
}

class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

export function addProject(projectName) {
    const newProject = new Project(projectName)
    projectList.push(newProject)
    return newProject
}