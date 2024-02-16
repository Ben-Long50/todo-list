import { projectList } from "./project";

export function populateStorage() {
    localStorage.setItem('project', JSON.stringify(projectList))
    console.log(localStorage)
    updateProjectList()
}

function updateProjectList() {
    const list = JSON.parse(localStorage.getItem('project'))
    for(let i = 0; i < list.length; i++) {
        projectList[i] = list[i]
    }
    console.log(projectList)
    console.log(list)
}