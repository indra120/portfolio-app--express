const home = require('./home.js')
const { addProjectPage, addProject } = require('./addProject.js')
const deleteProject = require('./deleteProject.js')
const { editProject, editProjectPage } = require('./editProject.js')
const details = require('./details.js')
const signUp = require('./signUp.js')
const signIn = require('./signIn.js')

module.exports = {
  addProject,
  addProjectPage,
  deleteProject,
  details,
  editProject,
  editProjectPage,
  home,
  signUp,
  signIn,
}
