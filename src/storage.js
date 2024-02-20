import { projectList } from "./project";
import Project from "./project";

export function populateStorage() {
    localStorage.setItem('project', JSON.stringify(projectList))
}

export function reloadProjectList() {
    const list = JSON.parse(localStorage.getItem('project'))
    console.log(list)
    for(let i = 0; i < list.length; i++) {
        const reloadedProject = new Project(list[i].name)
        reloadedProject.taskList = list[i].taskList
        projectList.push(reloadedProject)
    }
}