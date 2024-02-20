
import './styles/main.css'
import './styles/project-form.css'
import './styles/task-form.css'
import './styles/task-item.css'
import { projectList, addProject, getAllTasks, allTasksList } from './project.js'
import { renderProjects } from './projectList'
import { renderTasks } from './taskList'
import { renderProjectForm } from './projectForm.js'
import { renderTaskForm } from './taskForm.js'
import { reloadProjectList } from './storage.js'

if(localStorage.length === 0) {
    const allTasks = addProject('All Tasks')
    const gym = addProject('gym')
    const study = addProject('study')
    
    gym.addTask('Bench Press', '4 sets of 10 reps at 60% 1rm', 'Febrary, 29 2024', '5')
    gym.addTask('Tricep Pushdowns', '3 sets of 10 reps at 80lbs', 'Febrary, 29 2024', '4')
    gym.addTask('Dumbbell Shoulder Press', '4 sets of 8 reps at 70lbs', 'Febrary, 29 2024', '3')
    study.addTask('Complete To-Do List Project', 'Find out how to implement localStorage and reapply the project class methods after parsing from JSON format', 'Febrary, 29 2024', '2')
    study.addTask('Begin Linting Section of The Odin Project', 'Read through the material and complete the assignment exercises', 'March, 5 2024', '1')
    study.addTask('Add localStorage to Library Project', 'Revisit the library project and refactor the code to implement the newly learned methods for local storage', 'March, 10 2024', '3')
    
    getAllTasks()
    allTasks.taskList = allTasksList
}
else {
    reloadProjectList()
        
    getAllTasks()
    projectList[0].taskList = allTasksList
}

renderProjects()
renderTasks()