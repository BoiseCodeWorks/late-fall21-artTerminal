import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'



class ProjectsService{

  async getAll(query = ''){
      const res = await api.get('api/projects' + query)
      logger.log('get all projects',res.data)
      AppState.projects = res.data
    // NOTE use this line if you have front-end data models
    // AppState.projects = res.data.map(p => new Project(p))
  }

  async create(projectData){
    const res = await api.post('api/projects', projectData)
    logger.log('project Data',res.data)
    AppState.projects.unshift(res.data)
    // NOTE use this line if you have front-end data models
    // AppState.projects.push(new Project(res.data))
  }

  setActive(project){
    AppState.activeProject = project
  }

}

export const projectsService = new ProjectsService()
