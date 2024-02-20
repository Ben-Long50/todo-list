import { populateStorage } from "./storage";

export let projectList = []
export let allTasksList = []

export default class Project {
    constructor(name) {
        this.name = name;
        this.taskList = [];
    }

    addTask(title, description, dueDate, priority) {
        const newTask = new Task(title, description, dueDate, priority)
        this.taskList.push(newTask)
        populateStorage()
    }

    deleteTask(index) {
        this.taskList.splice(index, 1)
        populateStorage()
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
    populateStorage()
    return newProject
}

export function deleteProject(index) {
    projectList.splice(index, 1)
    populateStorage()
}

export function getAllTasks() {
    allTasksList = []
    projectList.forEach((project, index) => {
        if(index > 0) {
            project.taskList.forEach(task => {
                allTasksList.push(task)
            })
        }
    })
}