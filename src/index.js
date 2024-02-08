
import './styles/main.css'
import './styles/project-form.css'
import './styles/task-form.css'
import './styles/task-item.css'
import { addProject, getAllTasks, allTasksList } from './project.js'
import { renderProjects } from './projectList'
import { renderTasks } from './taskList'
import { renderProjectForm } from './projectForm.js'
import { renderTaskForm } from './taskForm.js'

const allTasks = addProject('All Tasks')
const gym = addProject('gym')
const study = addProject('study')

gym.addTask('bench', '4x10 at 60% 1rm', 'Febrary, 11 2024', '5')
gym.addTask('squat', '4x10 at 60% 1rm', 'Febrary, 11 2024', '4')
gym.addTask('bicep curls', '4x10 at 60% 1rm', 'Febrary, 11 2024', '3')
gym.addTask('tricep extensions', '4x10 at 60% 1rm', 'Febrary, 11 2024', '2')
gym.addTask('dumbbell flys', '4x10 at 60% 1rm', 'Febrary, 11 2024', '1')
study.addTask('The Odin Project', 'Complete To-do List Project', 'February, 12 2024', '3')

getAllTasks()
console.log(allTasksList)
allTasks.taskList = allTasksList

renderProjects()
renderTasks()

